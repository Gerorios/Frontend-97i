import { Navigate } from 'react-router-dom';

const ProtectedRoutesAdmin = ({ user, children }) => {
  console.log('Usuario en ProtectedRoutesAdmin:', user);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoutesAdmin;
