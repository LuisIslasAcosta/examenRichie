import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './iniciar.css'; // Importa el archivo CSS

const Iniciar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('https://3.148.205.107/usuario/iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('authToken', data.access_token); // Guarda el token
          navigate('/usuarioslista'); // Redirige a UsuariosLista usando navigate
        } else {
          setMensaje('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('Hubo un problema al iniciar sesión.');
      });
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      {mensaje && <p className="error-message">{mensaje}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="input-group">
          <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
        </div>
        <button type="submit" className="submit-button">Iniciar Sesión</button>
      </form>
      <p className="register-text">
        ¿No estás registrado?{' '}
        <Link to="/registrar" className="register-link">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Iniciar;
