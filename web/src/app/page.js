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

export default function Home() {



  return (
    <>
      <Header></Header>
      <Landing></Landing>




      <div id="about-me">
        <AboutMe></AboutMe>
      </div>
      <div id="gallery">
        <Caroussel ></Caroussel>
      </div>
      <div className="bans">
        <div id="models">
          {/*<div>
            <Banners
              backgroundImage='https://wallpapers.com/images/featured/zelda-rkp03okh2d43ik06.jpg'
              title="3D Models"
              link="">
            </Banners>
          </div>*/}
        </div>
        {/*<div id="printings">
          <Banners
            backgroundImage="/images/DSC_0587.JPG"
            title="3D Printings"
            link="">
          </Banners>
        </div>*/}
      </div>


    </>
  )
}

