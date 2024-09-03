import React, { useState } from "react";

const FormularioAgregar = ({ onAgregar }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      ...formData,
      id: new Date().getTime(),
    };
    onAgregar(nuevoUsuario);
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      tel: "",
    });
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <form className="p-4 rounded" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="Nombre1"
            className="form-label text-bg-light text-bg-dark"
          >
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="Nombre1"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="Apellido1"
            className="form-label text-bg-light text-bg-dark"
          >
            Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="Apellido1"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label text-bg-light text-bg-dark"
          >
            Email
          </label>
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
          <label
            htmlFor="dni"
            className="form-label text-bg-light text-bg-dark"
          >
            DNI
          </label>
          <input
            type="text"
            className="form-control"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="Telefono"
            className="form-label text-bg-light text-bg-dark"
          >
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            id="Telefono"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar Usuario
        </button>
      </form>
    </div>
  );
};

export default FormularioAgregar;
