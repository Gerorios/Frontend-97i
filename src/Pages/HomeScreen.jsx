import React from "react";

import CardSlider from "../Components/Home/CardSlider"
import Pasos from "../Components/Home/Pasos"
import HeroSection from "../Components/Home/HeroSection";
import SectionInfo from "../Components/Home/SectionInfo";
import Section2 from "../Components/Home/Section2"
import Footer from "../Components/Common/Footer";
const HomeScreen = () => {
  return (
    <>
    <div className="App">
      <HeroSection/>
      <SectionInfo />
      <Pasos/>
      <Section2 />
      <h1 className="text-center my-4">Nuestros Médicos</h1>
      <hr className="h-25"/>
      <CardSlider/>
      <Footer/>
    </div>
        
    </>

  )
}
export default HomeScreen