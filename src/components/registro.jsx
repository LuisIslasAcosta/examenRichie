import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './iniciar.css'; // Importa el archivo CSS

const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    fecha_nacimiento: '', // Nuevo campo para la fecha de nacimiento
  });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://3.148.205.107/usuario/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMensaje(data.error);
        } else {
          localStorage.setItem('authUserId', data.id); // Almacena el ID del usuario registrado
          setMensaje('¡Registro exitoso! Ahora puedes seleccionar tu foto de perfil.');
          setForm({ nombre: '', email: '', password: '', telefono: '', fecha_nacimiento: '' });
          navigate('/seleccionar-foto'); // Redirige a la selección de foto de perfil
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('Hubo un problema con el registro.');
      });
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      {mensaje && <p className="success-message">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required className="input-field" />
          <input type="email" name="email" placeholder="Correo Electrónico" value={form.email} onChange={handleChange} required className="input-field" />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className="input-field" />
          <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="input-field" />
          <input type="date" name="fecha_nacimiento" placeholder="Fecha de Nacimiento" value={form.fecha_nacimiento} onChange={handleChange} className="input-field" />
        </div>
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
      <p className="register-text">
        ¿Ya estás registrado?{' '}
        <Link to="/iniciar" className="register-link">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

export default Registro;
