import React, { useState, useEffect } from 'react';
import TablaUsuarios from '../Components/Admin/TablaUsuarios';
import { Paginacion } from '../Components/Admin/Paginacion';
import { Container } from 'react-bootstrap';
const PageAdmin = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://backend-turnero97i.onrender.com/api/getAllUsers?numeroPagina=${currentPage - 1}&limite=${usersPerPage}`);

        if (!res.ok) {
          throw new Error('Error al obtener los usuarios');
        }
    
        const data = await res.json();
        
        setUsers([...data.getUsers]); 
        setTotalUsers(data.count);
        console.log("Updated users state:", data.getUsers);
      } catch (error) {
        setErrorMessage('Error al obtener los usuarios');
      }
    };
    
    fetchUsers();
  }, [currentPage, usersPerPage]);
  

  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await fetch(`https://backend-turnero97i.onrender.com/api/userRoleChange/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
  
      if (!res.ok) {
        throw new Error('Error al cambiar el rol del usuario');
      }
  
      const data = await res.json();
  
     
      const updatedUsers = users.map(user =>
        user._id === id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setErrorMessage('Error al cambiar el rol del usuario');
    }
  };



  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='contenedor-todo'>
    <Container>
      <h1 className="my-4 text-center">Administración de Usuarios</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <TablaUsuarios users={users} onRoleChange={handleRoleChange} />
      <Paginacion
        usersPerPage={usersPerPage}
        totalUsers={totalUsers}
        paginate={paginate}
      />
    </Container>
    </div>
  );
};

export default PageAdmin;
