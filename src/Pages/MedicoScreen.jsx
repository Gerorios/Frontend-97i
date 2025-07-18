import React, { useState, useEffect, useCallback } from 'react';
import TablaPacientes from '../Components/PanelMedicos/TablaPacientes';

const MedicoScreen = () => {

  const [citas, setCitas] = useState([]);

  
  const fetchPacientes = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://backend-turnero97i.onrender.com/api/medico/Appointment', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setCitas(data.appointments);
    } catch (error) {
      console.error('Error fetching pacientes:', error);
      alert('Error al cargar las citas');
    }
  }, []);

  
  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes]);


  const aceptarPaciente = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-turnero97i.onrender.com/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado: 'aceptado' })
      });
      if (!res.ok) throw new Error(res.statusText);
      await fetchPacientes();
    } catch (error) {
      console.error('Error accepting appointment:', error);
      alert('Error al aceptar la cita');
    }
  };

  
  const rechazarPaciente = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-turnero97i.onrender.com/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ estado: 'rechazado' })
      });
      if (!res.ok) throw new Error(res.statusText);
      await fetchPacientes();
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      alert('Error al rechazar la cita');
    }
  };

  const pacientesPendientes  = citas.filter(c => c.estado === 'pendiente');
  const pacientesAceptados   = citas.filter(c => c.estado === 'aceptado');
  const pacientesRechazados  = citas.filter(c => c.estado === 'rechazado');

  return (
    <div className="container">
      <h1 className="text-center my-4">Gestión de Pacientes</h1>
      
      <h2>Pacientes Pendientes</h2>
      <TablaPacientes 
        pacientes={pacientesPendientes}
        onAceptar={aceptarPaciente}
        onRechazar={rechazarPaciente}
      />

      <h2>Pacientes Aceptados</h2>
      <TablaPacientes pacientes={pacientesAceptados} />

      <h2>Pacientes Rechazados</h2>
      <TablaPacientes pacientes={pacientesRechazados} />
    </div>
  );
}

export default MedicoScreen;
