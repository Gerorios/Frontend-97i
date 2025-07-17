import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalTurno = ({ medico, cerrarModal, selectedUser }) => {
  const [dni, setDni] = useState("");
  const [consulta, setConsulta] = useState("");
  const [turno, setTurno] = useState("");
  const [tipoEstudio, setTipoEstudio] = useState(""); // Nuevo campo para tipo de estudio

  const guardarTurno = async () => {
    const formData = {
      user: selectedUser,                  // ID del usuario que saca el turno
      medico: medico._id,                  // ID del médico recibido por props
      message: consulta,                   // Usar `consulta` como `message`
      fecha: new Date(turno).toISOString(), // Convertir `turno` a ISO string
      tipoEstudio,                         // Asegúrate de tener este campo en el formulario
    };
    

    try {
      const response = await fetch("http://localhost:3000/api/createAppointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error en la creación de la cita");
      }

      const result = await response.json();
      alert("Cita creada exitosamente:", result);
    } catch (error) {
      alert("Error al guardar el turno:", error);
    }
  };

  return (
    <Modal show={!!medico} onHide={cerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sacar turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Usted está sacando turno con el médico {medico?.nombre} {medico?.apellido} en la especialidad {medico?.especialidad}.
        </p>
        <div className="mb-3">
          <label htmlFor="dni" className="form-label">
            DNI:
          </label>
          <input
            type="number"
            className="form-control"
            id="dni"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="consulta" className="form-label">
            Consulta:
          </label>
          <input
            type="text"
            className="form-control"
            id="consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="turno" className="form-label">
            Fecha del Turno:
          </label>
          <input
            type="date"
            className="form-control"
            id="turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipoEstudio" className="form-label">
            Tipo de Estudio:
          </label>
          <input
            type="text"
            className="form-control"
            id="tipoEstudio"
            value={tipoEstudio}
            onChange={(e) => setTipoEstudio(e.target.value)}
            required
          />
        </div>
        <Button variant="primary" onClick={guardarTurno}>
          Guardar Turno
        </Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTurno;
