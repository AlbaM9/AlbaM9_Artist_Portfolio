"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link as ScrollLink } from 'react-scroll';
import React from 'react';
import './globals.css';

import Header from '../components/Header';
import AboutMe from "../components/AboutMe";
import Landing from "../components/Landing";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Banners from "../components/Banners";

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
  const itemsForBanners = [
    {
      id: 1,
      backgroundImage: '/Images/logoinaleb.png',
      title: "All",
      link: "/jobs?tab=all",
    },
    {
      id: 2,
      backgroundImage: '/Images/TOTED.png',
      title: "3D Models",
      link: "/jobs?tab=models",
    },
    {
      id: 3,
      backgroundImage: '/Images/MAJMOD.png',
      title: "3D Prints",
      link: "/jobs?tab=3d-print",
    }
  ];

  const menuItems = [
    <ScrollLink key="about-me" to="about-me" smooth={true} duration={500}>About Me</ScrollLink>,
    <ScrollLink key="jobs" to="gallery" smooth={true} duration={500}>Jobs</ScrollLink>,
    <ScrollLink key="contact" to="contact" smooth={true} duration={500}>Contact</ScrollLink>,
  ];

  return (
    <div
      className="overflow-x-hidden italic leading-tight bg-cover bg-top bg-fixed bg-no-repeat"
      style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/Images/BG_WebApaisant.jpg')" }}
    >
      {/* Header */}
      <Header menuItems={menuItems} />
      {/* Main sections */}
      <Landing />
      <section id="about-me" className="mt-16 md:mt-32">
        <AboutMe />
      </section>

      <section id="gallery" className=" mt-18  md:mt-24 lg:mt-32 lg:mb-32 ">
        <h1 className="text-white text-2xl md:text-4xl text-center">Jobs</h1>
        <div className="flex flex-col items-center  mt-4 sm:p-6 md:p-8 lg:p-10">
          {/* Elemento Superior */}
          <div className="flex justify-center w-full mb-4">
            <div className="w-full sm:w-[20rem] md:w-[24rem] h-auto aspect-w-16 aspect-h-9 transition-transform duration-300 hover:scale-105">
              <Banners
                backgroundImage={itemsForBanners[0].backgroundImage}
                title={itemsForBanners[0].title}
                link={itemsForBanners[0].link}
              />
            </div>
          </div>

          {/* Elementos Inferiores */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 ">
            {itemsForBanners.slice(1, 3).map((item) => (
              <div key={item.id} className="flex justify-center mb-4 w-full">
                <div className="w-full sm:w-[20rem] md:w-[24rem] h-auto aspect-w-16 aspect-h-9 transition-transform duration-300 hover:scale-105">
                  <Banners
                    backgroundImage={item.backgroundImage}
                    title={item.title}
                    link={item.link}
                  />
                </div>
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
