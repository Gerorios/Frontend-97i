import React from 'react';
import { Container, Card } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import saluFoto from '../assets/integrantes/salu.jpeg';
import geroFoto from '../assets/integrantes/gero.jpeg';
import nachoFoto from '../assets/integrantes/nacho.jpg';
import magaliFoto from '../assets/integrantes/magali.jpeg';
import gonzaloFoto from '../assets/integrantes/gonzalo.jpeg';


const integrantes = [
  {
    nombre: 'Salustiano Robles Teran',
    foto: saluFoto,
  },
  {
    nombre: 'Geronimo Rios Antenucci',
    foto: geroFoto,
  },
  {
    nombre: 'Ignacio Albarracin',
    foto: nachoFoto,
  },
  {
    nombre: 'Mercedes Magali Navarro',
    foto: magaliFoto,
  },
  {
    nombre: 'Gonzalo Martinez',
    foto: gonzaloFoto,
  }
];

const AboutScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Acerca de Nosotros</h2>
      <Slider {...settings}>
        {integrantes.map((integrante, index) => (
          <div key={index} className="p-3">
            <Card>
              <Card.Img
                variant="top"
                src={integrante.foto}
                alt={`Foto de ${integrante.nombre}`}
                className="img-fluid fixed-size-img"
              />
              <Card.Body>
                <Card.Title>{integrante.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>

      <style>{`
        .fixed-size-img {
          width: 100%;
          height: 500px; 
          object-fit: cover; 
        }
      `}</style>
    </Container>
  );
}

export default AboutScreen;
