import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import saluFoto from '../assets/integrantes/salu.jpeg';
import geroFoto from '../assets/integrantes/gero.jpeg';
import nachoFoto from '../assets/integrantes/nacho.jpg';
import magaliFoto from '../assets/integrantes/magali.jpeg';
import gonzaloFoto from '../assets/integrantes/gonzalo.jpeg';
import '../assets/Styles/About.css';

const integrantes = [
  { nombre: 'Salustiano Robles Teran', foto: saluFoto },
  { nombre: 'Geronimo Rios Antenucci', foto: geroFoto },
  { nombre: 'Ignacio Albarracin',     foto: nachoFoto },
  { nombre: 'Mercedes Magali Navarro', foto: magaliFoto },
  { nombre: 'Gonzalo Martinez',        foto: gonzaloFoto }
];

const AboutScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600,  settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-3">Acerca de Nosotros</h2>
      <Row className="justify-content-center mb-4">
        <Col md={10}>
          <p className="lead text-center">
            Somos un grupo de estudiantes de programación apasionados por las tecnologías y comprometidos
            con el desarrollo de soluciones que mejoren la experiencia de pacientes y profesionales de la salud.
            Esta plataforma de turnos médicos es fruto de nuestro trabajo colaborativo, donde combinamos
            innovación, usabilidad y seguridad para ofrecer un sistema confiable y fácil de usar.
          </p>
        </Col>
      </Row>

      <Slider {...settings}>
        {integrantes.map((integrante, idx) => (
          <div key={idx} className="px-2">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={integrante.foto}
                alt={`Foto de ${integrante.nombre}`}
                className="fixed-size-img"
              />
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title className="text-center mb-0">{integrante.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <p className="text-center text-muted">
            Nuestra misión es brindar una herramienta eficiente y accesible que facilite la gestión de turnos
            en clínicas y consultorios. Con un diseño intuitivo y funcionalidades clave como
            paneles diferenciados para pacientes, médicos y administradores, buscamos optimizar
            el flujo de trabajo y la comunicación en el sector salud.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
