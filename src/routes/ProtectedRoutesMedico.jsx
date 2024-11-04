// ProtectedRoutesMedico.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoutesMedico = ({ user, children }) => {
  if (!user || user.role !== 'medico') {
    return <Navigate to="/" />;  // Redirigir si no es médico
  }
  return children;
};

export default ProtectedRoutesMedico;
