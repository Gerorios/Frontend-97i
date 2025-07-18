import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const MyAppointments = () => {
  const { token } = useContext(AuthContext);
  const [turnos, setTurnos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/myAppointments", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(res.statusText);
        const { appointments } = await res.json();
        setTurnos(appointments);
      } catch (err) {
        setError("No se pudieron cargar tus turnos");
        console.error(err);
      }
    };
    fetchTurnos();
  }, [token]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Mis Turnos</h2>
      {turnos.length === 0 ? (
        <p>No tienes turnos agendados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Estudio</th>
              <th>Médico</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map(t => (
              <tr key={t._id}>
                <td>{t.tipoEstudio?.name}</td>
                <td>
                  {t.medico?.name} {t.medico?.last_name}
                </td>
                <td>{new Date(t.fecha).toLocaleString()}</td>
                <td>
                  {t.estado === "pendiente" && (
                    <span className="badge bg-warning text-dark">Pendiente</span>
                  )}
                  {t.estado === "aceptado" && (
                    <span className="badge bg-success">Aceptado</span>
                  )}
                  {t.estado === "rechazado" && (
                    <span className="badge bg-danger">Rechazado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
