import React from 'react';

const Paciente = ({ paciente, onAceptar, onRechazar }) => {
    return (
        <tr>
            <td>{paciente.user?.name || 'N/A'}</td>
            <td>{paciente.user?.last_name || 'N/A'}</td>
            <td>{paciente.user?.email || 'N/A'}</td>
            <td>{paciente.user?.phone_number || 'N/A'}</td>
            <td>{paciente.tipoEstudio?.name || 'N/A'}</td>
            <td>{paciente.message || 'N/A'}</td>
            <td>{new Date(paciente.fecha).toLocaleString()}</td>
            {onAceptar && onRechazar && (
                <td>
                    <button className="btn btn-success m-1" onClick={() => onAceptar(paciente._id)}>Aceptar</button>
                    <button className="btn btn-danger" onClick={() => onRechazar(paciente._id)}>Rechazar</button>
                </td>
            )}
        </tr>
    );
};

export default Paciente;
