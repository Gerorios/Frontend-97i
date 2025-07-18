import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
const ProtectedRoutesMedico = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || user.role !== 'medico') {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutesMedico;
