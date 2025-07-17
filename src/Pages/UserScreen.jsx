import React, { useState, useEffect } from 'react';
import TablaMedico from '../Components/PanelUsuario/TablaMedico'; 
import ModalTurno from '../Components/PanelUsuario/ModalTurno'

const UserScreen = () => {
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);

  // Función para obtener los médicos de la base de datos
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token del almacenamiento local

        const response = await fetch('http://localhost:3000/api/medicos', {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en los headers
          }
        });

        const data = await response.json();
        console.log(data)

          // Establecer los médicos en el estado
          setMedicos(data.medicos);

      } catch (error) {
        alert('Error al obtener los médicos:', error);
      }
    };

    fetchMedicos();
  }, []);

  // Abre el modal con el médico seleccionado
  const abrirModal = (medico) => {
    setMedicoSeleccionado(medico);
  };

  // Cierra el modal
  const cerrarModal = () => {
    setMedicoSeleccionado(null);
  };

  console.log(medicos)

  return (
    <div className="container mt-5">
      <h1 className="text-center my-4">Nuestros Médicos</h1>
      <TablaMedico medicos={medicos} abrirModal={abrirModal} />
      {medicoSeleccionado && (
        <ModalTurno medico={medicoSeleccionado} cerrarModal={cerrarModal} />
      )}
    </div>
  );
};

export default UserScreen;
