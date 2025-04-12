import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import './usuarios.css';

const UsuariosLista = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editMode, setEditMode] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para acceder a esta página.');
      navigate('/iniciar');
      return;
    }
    fetch('https://3.148.205.107/usuario/todos')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setUsuarios(data);
        } else {
          setMensaje('No se encontraron usuarios.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
        setMensaje('Hubo un problema al obtener los usuarios.');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/iniciar');
  };

  const toggleEditMode = (userId) => {
    setEditMode((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const handleFileChangeUser = (userId, e) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({ ...prev, [userId]: file }));
  };

  const handleUpdatePhoto = async (userId) => {
    setLoading(true);
    const file = selectedFiles[userId];
    if (!file) {
      setMensaje(`No has seleccionado un archivo para el usuario ${userId}`);
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('foto_perfil', file);
    try {
      const response = await fetch('https://3.148.205.107/usuario/subir-foto', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMensaje(data.msg);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.id === userId ? { ...usuario, foto_perfil: data.nuevaFoto } : usuario
        )
      );
      setEditMode((prev) => ({ ...prev, [userId]: false }));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="">
      <aside className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <h2>Menú</h2>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt />
          Cerrar Sesión
        </button>
      </aside>
      <main className="main-content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h2>Lista de Usuarios</h2>
        {mensaje && <p className="error-message">{mensaje}</p>}
        <div className="user-cards">
          {usuarios.map((usuario) => (
            <div key={usuario.id} className="user-card">
              <img
                src={usuario.foto_perfil || 'https://via.placeholder.com/150'}
                alt={usuario.nombre}
                className="user-avatar"
              />
              <h3>{usuario.nombre}</h3>
              <p>Email: {usuario.email}</p>
              <p>Teléfono: {usuario.telefono || 'No registrado'}</p>
              <p>Fecha de Nacimiento: {usuario.fecha_nacimiento || 'No registrada'}</p>
              <button onClick={() => toggleEditMode(usuario.id)} className="edit-button" disabled={loading}>
                {loading ? 'Cargando...' : 'Editar Foto'}
              </button>
              <br /><br />
              {editMode[usuario.id] && (
                <div className="edit-photo">
                  <input type="file" onChange={(e) => handleFileChangeUser(usuario.id, e)} />
                  <br /><br />
                  <button onClick={() => handleUpdatePhoto(usuario.id)} className="update-button" disabled={loading}>
                    Actualizar Foto
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UsuariosLista;