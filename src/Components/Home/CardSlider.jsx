import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import medico1 from '../../assets/staffMedicos/1.jpg'
import medico2 from '../../assets/staffMedicos/1.png'
import medico3 from '../../assets/staffMedicos/2.png'
import medico4 from '../../assets/staffMedicos/3.png'

const CardSlider = () => {
  const doctors = [
    {
      name: "Dr. Josefina Garcia Pinna",
      description: "Cardióloga con más de 10 años de experiencia.",
      image: medico1,
    },
    {
      name: "Dra. Beatriz Galvez",
      description: "Diagnostico por imagenes / Tomografia multicorte / Resonancia magenetica de alto campo",
      image: medico2,
    },
    {
      name: "Dr Claudia Morales",
      description: "Especialista en clinica pediatra",
      image: medico3,
    },
    {
      name: "Dra. jorge White",
      description: "Clinico Medico / Radiologia digital / Ecografia",
      image: medico4,
    },
  ];

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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="container mb-5" id="medicos-profesionales">
      <h1 className="text-center my-4">Nuestros Profesionales De Salud</h1>
      <hr className="h-25"/>
      <Slider {...settings}>
        {doctors.map((doctor, index) => (
          <div key={index} className="p-2">
            <div className="card" style={{ width: '20rem', maxHeight: "30rem", height: "22rem" }}>
              <img src={doctor.image} className="card-img-top" alt={doctor.name} style={{maxHeight: "14rem", height : "100%"}} />
              <div className="card-body">
                <h5 className="card-title">{doctor.name}</h5>
                <p className="card-text">{doctor.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
