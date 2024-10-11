"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link as ScrollLink } from 'react-scroll';
import { useState } from "react";

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


  const itemsForBanners = [

    {
      backgroundImage: '/images/TOTED.png',
      title: "3D Models",
      link: "/jobs?tab=models",  // Añadimos query param
    },
    {
      backgroundImage: '/images/logoinaleb.png',
      title: "All",
      link: "/jobs?tab=all",
    },
    {
      backgroundImage: '/images/MAJMOD.png',
      title: "3D Prints",
      link: "/jobs?tab=2d-print",  // Añadimos query param
    }
  ];
  const menuItems = [
    <ScrollLink to="about-me" smooth={true} duration={500}>About Me</ScrollLink>,
    <ScrollLink to="gallery" smooth={true} duration={500}>Jobs</ScrollLink>,
    <ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink>,

  ];
  return (
    <div
      className="italic leading-tight bg-cover bg-top bg-fixed bg-no-repeat"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('/images/BG_WebApaisant.jpg')" }}
    >
      {/* Header */}
      <Header menuItems={menuItems} />
      {/* Main sections */}
      <Landing />

      <section id="about-me" className="py-16">
        <AboutMe />
      </section>

      <section id="gallery" className="py-16">
        <h1 className="text-white text-3xl text-center mb-[20vh]">Jobs</h1>
        <div className="flex flex-row justify-center gap-10 mt-20 mb-24">
          {itemsForBanners.map((item, index) => (
            <div className="w-[28rem] h-auto aspect-w-16 aspect-h-9  transition-transform duration-300 hover:scale-105">
              <Banners
                key={index}  // Asigna un key único, en este caso el index del array
                backgroundImage={item.backgroundImage}
                title={item.title}
                link={item.link}

              />
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16">
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
