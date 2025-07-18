import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../../helpers/ApiLogin';
import { AuthContext } from '../../Context/AuthContext';

const IniciarSesion = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  if (!show) return null;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const result = await authLogin(formValues);
      if (!result?.token) {
        setErrorMessage(result?.msg || 'Mail o contraseña incorrectos');
        return;
      }
      login({ userData: result.user, token: result.token });

      if (result.user.role === 'admin')      navigate('/admin');
      else if (result.user.role === 'medico') navigate('/medico');
      else if (result.user.role === 'usuario') navigate('/');
      else setErrorMessage('No tienes permiso para acceder');

      handleClose();
    } catch {
      setErrorMessage('Error al iniciar sesión');
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar Sesión</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}
              <button type="submit" className="btn btn-primary mt-2">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;
