import React from 'react';
import { Navigate } from 'react-router-dom';

const RutasProtegidas = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Comprueba si el token existe

  if (!isAuthenticated) {
    return <Navigate to="/iniciar" replace />; // Redirige al login si no hay autenticación
  }

  return children; // Renderiza el componente protegido si está autenticado
};

export default RutasProtegidas;