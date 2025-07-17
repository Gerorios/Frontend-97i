import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/Styles/Section1.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faTooth, faBrain, faChild, faFemale } from '@fortawesome/free-solid-svg-icons';

const SectionInfo = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          
        },
      },
    ],
  };

  const services = [
    { title: 'Cardiología', description: 'Servicios de cardiología avanzada.', icon: faHeartbeat, size: "2xl" },
    { title: 'Odontología', description: 'Cuidado dental para toda la familia.', icon: faTooth, size: "2x" },
    { title: 'Neurología', description: 'Tratamiento para enfermedades neurológicas.', icon: faBrain, size: "2x" },
    { title: 'Pediatría', description: 'Atención médica para niños y adolescentes.', icon: faChild, size: "2x" },
    { title: 'Ginecología', description: 'Tratamiento para problemas del suelo pelviano.', icon: faFemale, size: "2x" },
  ];

  return (
    <div className='contenedor-section' id='section-info'>
      <div className="titulos mb-5">
        <h2 className="text-center text-primary">
          Excelencia Médica, Cuidado Integral
        </h2>
        <h2 className="text-center fw-bold mt-3">
          Servicios <span id="span-title">y Especialidades Médicas</span>
        </h2>
        <p className="text-center fw-bold mt-3">
          <span id="span-subtitle">Confiados en que la mejor prevención es un diagnóstico temprano, sumamos servicios, equipamiento y especialidades médicas.</span>
        </p>
      </div>

      <div className="container service-carousel">
        <Slider {...settings}>
          {services.map((service, index) => (
            <div key={index} className="service-item mt-5 ">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} size={service.size} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionInfo;
