// pages/index.js

// Importa en tu archivo _app.js o _app.tsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta
import Caroussel from "../components/Caroussel";
import AboutMe from "@/components/AboutMe";
import Banners from "@/components/Banners";

export default function Home() {
  return (
    <>
      <body>
        <Header></Header>
        <Caroussel></Caroussel>
        <AboutMe></AboutMe>
        <Banners></Banners>
        <Banners></Banners>
      </body>

    </>
  )
}

