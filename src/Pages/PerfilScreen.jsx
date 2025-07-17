import React, { useState } from 'react';

const PerfilScreen = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
  });

  // Función para actualizar usuario en el servidor
  const actualizarUsuario = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Datos actualizados con éxito");
        
        

        // Actualizar solo name y email en localStorage, manteniendo idUser y role
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = {
          ...storedUser,
          name: data.update.name,       // Actualizar el nuevo nombre
          email: data.update.email,     // Actualizar el nuevo email
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        alert("Error al actualizar el usuario: " + (data.message || "Respuesta inválida"));
      }
    } catch (error) {
      alert("Error en la solicitud: " + error.message);
    }
  };

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para guardar los cambios
  const handleSave = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const userId = user.idUser;
      actualizarUsuario(userId, formData);
    } else {
      alert("No se pudo actualizar: ID del usuario no encontrado");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Editar Perfil</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default PerfilScreen;
