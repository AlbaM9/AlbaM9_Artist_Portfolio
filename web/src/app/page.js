"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import './styles.scss';

import React from 'react';
import { Link } from 'react-scroll';
import './globals.css'


import Header from '../components/Header';
import Caroussel from "../components/Caroussel";
import AboutMe from "../components/AboutMe";
import Landing from "@/components/Landing";

import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className=" italic leading-tight bg-cover bg-top bg-no-repeat "
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/images/castlea.jpg')" }}>

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
    </div>
  )
}


