import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './main';
import Iniciar from './components/iniciar';
import Registro from './components/registro';
import UsuariosLista from './components/UsuariosLista';
import RutasProtegidas from './components/RutasProtegidas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/iniciar" element={<Iniciar />} />
        <Route path="/registrar" element={<Registro />} />
        <Route
          path="/usuarioslista"
          element={
            <RutasProtegidas>
              <UsuariosLista />
            </RutasProtegidas>
          }
        />
        
      </Routes>
    </Router>
  );
};

export default App;