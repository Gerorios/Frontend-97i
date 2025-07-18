import React from "react";
import Paciente from "../PanelMedicos/Pacientes";

const TablaPacientes = ({ pacientes, onAceptar, onRechazar }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark text-center">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Consulta</th>
            <th>Mensaje</th>
            <th>Turno</th>
            {onAceptar && onRechazar && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody className="text-center">
          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
              onAceptar={onAceptar}
              onRechazar={onRechazar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPacientes;
