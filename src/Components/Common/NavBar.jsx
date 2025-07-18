import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import IniciarSesion from '../Home/IniciarSesion';
import Registrarse from '../Home/Registrarse';
import { AuthContext } from '../../Context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span
            className="navbar-brand"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            ProSalud
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              {user && (
                <>
                  {user.role === 'admin' && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/admin">
                        Panel Admin
                      </NavLink>
                    </li>
                  )}
                  {user.role === 'medico' && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/medico">
                        Panel Médico
                      </NavLink>
                    </li>
                  )}
                  {user.role === 'usuario' && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/perfil">
                        Perfil
                      </NavLink>
                    </li>
                  )}
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Sobre Nosotros
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              {!user ? (
                <>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Registrarse
                  </button>
                </>
              ) : (
                <>
                  <span className="navbar-text me-3">
                    Bienvenido, {user.name}
                  </span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <IniciarSesion
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
      <Registrarse
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
      />
    </>
  );
};

export default NavBar;
