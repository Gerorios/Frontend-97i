import React from 'react';
import {Carousel} from 'react-bootstrap';
import Button from './Button';
import "../../assets/Styles/HeroSection.css";
import img1 from "../../assets/Img/1.jpeg";
import img2 from "../../assets/Img/2.jpeg";
import img3 from "../../assets/Img/3.jpeg";

const HeroSection = () => {
  return (
    <Carousel interval={5000} fade>
      <Carousel.Item>
        <div className="carousel-image-container">
          <img className="d-block w-100" src={img1} alt="First slide" />
          <div className="overlay"></div>
          <Carousel.Caption className="centered-caption">
            <h2 className='texto-imagen'>Bienvenido a la Clínica</h2>
            <p className='texto-imagen'>Atención médica de calidad a tu alcance.</p>
            <a href="#medicos-profesionales">
              <Button text = {"Conocer mas"} className="Btn-carousel"/>
            </a>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-image-container">
          <img className="d-block w-100" src={img2} alt="Second slide" />
          <div className="overlay"></div>
          <Carousel.Caption className="centered-caption">
            <h2 className='texto-imagen'>Nuestros Servicios</h2>
            <p className='texto-imagen'>Especialidades médicas adaptadas a tus necesidades.</p>
            <a href="#section-info"><Button text = {"Ver servicios"} className="Btn-carousel"/></a>
          </Carousel.Caption>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-image-container">
          <img className="d-block w-100" src={img3} alt="Third slide" />
          <div className="overlay"></div>
          <Carousel.Caption className="centered-caption">
            <h2 className='texto-imagen'>Solicita tu Turno Ahora</h2>
            <p className='texto-imagen'>Fácil y rápido, agenda tu cita en línea.</p>
            <a href="#section-turnos"><Button text = {"Ver Turnos"} className="Btn-carousel"/></a>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;


