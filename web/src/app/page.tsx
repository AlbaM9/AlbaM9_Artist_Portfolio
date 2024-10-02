"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import React, { Component } from 'react';
//import { Link } from 'react-scroll'; // Si usas este componente, asegúrate de que está correctamente importado y tipado
import './globals.css';

import Header from '../components/Header';
import Caroussel from "../components/Caroussel";
import AboutMe from "../components/AboutMe";
import Landing from "../components/Landing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import Banners from "../components/Banners";

// Definimos el tipo de las props si fuera necesario
interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  return (
    <div
      className="italic leading-tight bg-cover bg-top bg-fixed bg-no-repeat"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/images/BG_WebApaisant.jpg')" }}
    >
      {/* Header */}
      <Header />

      {/* Main sections */}
      <Landing />

      <section id="about-me" className="py-16">
        <AboutMe />
      </section>

      <section id="gallery" className="py-16">
        <Caroussel />
      </section>

      <section id="contact" className="py-16">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
