import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoutesAdmin = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log('Usuario en ProtectedRoutesAdmin:', user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoutesAdmin;
