// ProtectedRoutesMedico.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoutesMedico = ({ user, children }) => {
  console.log('Usuario en ProtectedRoutesMedico:', user);
  if (!user || user.role !== 'medico') {
    return <Navigate to="/" />;  // Redirigir si no es médico
  }
  return children;
};

export default ProtectedRoutesMedico;
