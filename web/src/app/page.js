// pages/index.js

// Importa en tu archivo _app.js o _app.tsx
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss'; // Importa los estilos globales



import Header from '../components/Header'; // Asegúrate de que la ruta sea correcta
import Caroussel from "../components/Caroussel";
import AboutMe from "../components/AboutMe";
import Banners from "../components/Banners";

export default function Home() {



  return (
    <>
      <body>
        <Header></Header>
        <Caroussel></Caroussel>
        <AboutMe></AboutMe>
        <Banners backgroundImage='https://wallpapers.com/images/featured/zelda-rkp03okh2d43ik06.jpg' title="3D Models" link=""></Banners>
        <Banners backgroundImage="/images/DSC_0587.JPG" title="3D Printings" link=" "></Banners>
      </body >

    </>
  )
}

