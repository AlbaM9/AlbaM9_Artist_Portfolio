"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

import React from 'react';
import { Link } from 'react-scroll';

import Header from '../components/Header';
import Caroussel from "../components/Caroussel";
import AboutMe from "../components/AboutMe";
import Banners from "../components/Banners";
import Landing from "@/components/Landing";

import Contact from "@/components/Contact";

export default function Home() {



  return (
    <>
      {<Header></Header>}
      <Landing></Landing>




      <div id="about-me">
        <AboutMe></AboutMe>
      </div>
      <div id="gallery">
        <Caroussel ></Caroussel>
      </div>
      <div className="bans">


      </div>
      <div id="contact" >
        <Contact></Contact>
      </div>


    </>
  )
}

