import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Section2 = () => {

  const [estudios, setEstudios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoEstudio: '',
    medicoId: '',
    message: '',
    fecha: new Date() // Nuevo campo para la fecha
  });

  // Obtener médicos del backend
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener token del almacenamiento local

        const response = await fetch('http://localhost:3000/api/medicos', {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en los headers
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data && data.medicos) {
          
          setMedicos(data.medicos);

        } else {
          console.error('El formato de los datos no es correcto:', data);
        }
      } catch (error) {
        console.error('Error al obtener los médicos:', error);
      }
    };
    fetchMedicos();

    const fetchEstudios = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:3000/api/tipo-estudios', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
    
        if (data && Array.isArray(data.getTipoEstudios)) {
          setEstudios(data.getTipoEstudios);
          data.getTipoEstudios.forEach((estudio) => {
          });
        } else {
          console.error('El formato de los datos no es correcto:', data);
        }
      } catch (error) {
        console.error('Error al obtener los estudios:', error);
      }
    };
    fetchEstudios();
  }, []);


  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Manejar cambios en la fecha
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      fecha: date
    });
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    
    // Obtén el token y los datos del usuario del localStorage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); // Obtiene los datos del usuario
  
    if (!token) {
      alert("Debes estar logueado para solicitar un turno");
      return;
    }
  
    const formDataWithUser = {
      user: user.idUser,  // Usa el ID del usuario almacenado
      tipoEstudio: formData.tipoEstudio,
      phone_number: formData.telefono,
      medico: formData.medicoId,
      message: formData.message,
      fecha: formData.fecha.toISOString()
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/createAppointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Enviar el token en los headers si es necesario
        },
        body: JSON.stringify(formDataWithUser)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Turno solicitado con éxito");
          setFormData({
          nombre: "",
          email: "",
          telefono: "",
          tipoEstudio: "",
          medicoId: "",
          fecha: null,
          message: "",

        });
      } else {
        alert(data.msg || "Error al solicitar turno");
      }
    } catch (error) {
      alert("Error al enviar el formulario:", error);
    }
  };
  
  return (
    <Container>
      <Row id='section-turnos'>
        <Col lg={6} id="solicitudTurno">
          <h2>Solicitar Turnos</h2>
          <hr className="w-25" />
          <p>Rellena el formulario y solicita el turno con el médico que necesites!</p>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nombre" className='mb-2'>
                  <Form.Control
                    type="text"
                    placeholder="Nombre y apellido"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="telefono">
                  <Form.Control
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="tipoEstudio">
                  <Form.Select
                    value={formData.tipoEstudio}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elegir estudio</option>
                    {estudios.map((estudio) => (
                      <option key={estudio._id} value={estudio._id}>
                        {estudio.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="medicoId">
                  <Form.Select
                    value={formData.medicoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Elegir Médico</option>
                    {medicos.map((medico) => (
                      <option key={medico._id} value={medico._id}>
                        {medico.name} {medico.last_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <DatePicker
                    selected={formData.fecha}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="message">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Mensaje"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">
              Solicitar Turno
            </Button>
          </Form>
        </Col>

        <Col lg={6} className="mt-4 mt-lg-0">
          <h2>Preguntas Frecuentes</h2>
          <hr className="w-25" />
          <p>Algunas de las preguntas que nuestros pacientes suelen tener...</p>
          <Accordion className='mt-4'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>¿Qué es un estudio de alta complejidad?</Accordion.Header>
              <Accordion.Body>
                Son estudios de Resonancia Magnética, Tomografía Computada ó Mamografía Digital que profundizan en la exploración diagnóstica para una evaluación más completa de los tejidos.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>¿Es necesaria internación?</Accordion.Header>
              <Accordion.Body>
                No. Los estudios se realizan de manera ambulatoria, es decir que el paciente se va el mismo día que se realiza la práctica. Las prácticas pueden durar entre 45 minutos y 1 hora dependiendo el estudio.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>¿Qué preparación debo realizar?</Accordion.Header>
              <Accordion.Body>
                Depende el estudio a realizarse.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>¿Cuándo recibiré mis resultados?</Accordion.Header>
              <Accordion.Body>
                Los resultados suelen estar disponibles entre 24 y 48 horas después del examen. Su médico recibirá los resultados y los discutirá con usted en su cita de seguimiento.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Mi médico realizó un pedido ¿todavía sirve?</Accordion.Header>
              <Accordion.Body>
                Las órdenes ó prescripciones médicas tienen una validez de 30 días. Debiendo contar con la siguiente información: Datos del paciente y obra social, práctica a realizar, diagnóstico, fecha, firma y sello del médico especialista que lo deriva.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Section2;
