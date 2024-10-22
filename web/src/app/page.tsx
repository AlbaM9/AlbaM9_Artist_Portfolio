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
      backgroundImage: '/images/logoinaleb.png',
      title: "All",
      link: "/jobs?tab=all",
    },
    {
      backgroundImage: '/images/TOTED.png',
      title: "3D Models",
      link: "/jobs?tab=models",  // Añadimos query param
    },

    {
      backgroundImage: '/images/MAJMOD.png',
      title: "3D Prints",
      link: "/jobs?tab=3d-print",  // Añadimos query param
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
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/images/BG_WebApaisant.jpg')" }}
    >
      {/* Header */}
      <Header menuItems={menuItems} />
      {/* Main sections */}
      <Landing />

      <section id="about-me" className="py-16">
        <AboutMe />
      </section>

      <section id="gallery" className="py-16">
        <h1 className="mt-64 lg:mt-0 text-white text-2xl md:text-4xl text-center ">Jobs</h1>
        <div className="flex flex-col items-center mt-4 p-10">
          {/* Elemento Superior */}
          <div className="w-[24rem] h-auto aspect-w-16 aspect-h-9 transition-transform duration-300 hover:scale-105 mb-4">
            <Banners

              backgroundImage={itemsForBanners[0].backgroundImage}
              title={itemsForBanners[0].title}
              link={itemsForBanners[0].link}
            />
          </div>

          {/* Elementos Inferiores */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-18">
            {itemsForBanners.slice(1, 3).map((item, index) => (
              <div

                className="w-[24rem] h-auto aspect-w-16 aspect-h-9 transition-transform duration-300 hover:scale-105"
              >
                <Banners
                  backgroundImage={item.backgroundImage}
                  title={item.title}
                  link={item.link}
                />
              </div>
            ))}
          </div>
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
