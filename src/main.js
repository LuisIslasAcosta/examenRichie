import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleRegister = () => {
    navigate('/registrar'); // Redirige a la vista de registro
  };

  const handleLogin = () => {
    navigate('/iniciar'); // Redirige a la vista de inicio de sesión
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bienvenido a Mi Aplicación React</h1>
      <button
        onClick={handleRegister}
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Registrarse
      </button>
      <button
        onClick={handleLogin}
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Main;