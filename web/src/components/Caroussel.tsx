'use client';  // Esto convierte al componente en un Client Component

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import '../styles/caroussel.scss';

import Banners from "./Banners";

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}


const PreviousArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {

    return (
        <div
            className={`${className}  flex items-center justify-center w-12 h-12 rounded-full z-10 cursor-pointer text-3xl`} // Clases de Tailwind
            style={{
                ...style,
                display: "block",
                left: "450px",
                transform: "scale(2)", // Escala a 1.5 veces el tamaño original
                // Ajusta la posición a la izquierda (ajusta según sea necesario)
            }}
            onClick={onClick}
        >

        </div>
    );
};

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {

    return (
        <div
            className={`${className} p-2 z-10 cursor-pointer w-3`} // Clases de Tailwind
            style={{
                ...style,
                display: "block",
                right: "450px", transform: "scale(2) ", // Ajusta la posición a la derecha (ajusta según sea necesario)
            }}
            onClick={onClick}
        >
            &#10095; {/* Símbolo de flecha hacia la derecha */}
        </div>
    );
};

const Caroussel = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Solo se renderiza cuando el componente está montado en el cliente
    }, []);

    const settings = {
        dots: false, // Desactiva los dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true, // Activa las flechas
        prevArrow: <PreviousArrow />, // Flecha personalizada para retroceder
        nextArrow: <NextArrow />,     // Flecha personalizada para avanzar
    };

    if (!mounted) return null; // Evita renderizar en el servidor


    return (
        <>
            <h1 className="text-white text-3xl text-center mb-[5vh]">Jobs</h1>
            <div className="carousel-container">
                <Slider {...settings}>
                    <div>
                        <Banners
                            backgroundImage='/images/logoinaleb.png'
                            title="All"
                            link="">
                        </Banners>
                    </div>
                    <div>
                        <Banners
                            backgroundImage='/images/TOTED.png'
                            title="3D Models"
                            link="">
                        </Banners>
                    </div>
                    <div>
                        <Banners
                            backgroundImage='/images/MAJMOD.png'
                            title="3D Prints"
                            link="">
                        </Banners>
                    </div>

                </Slider>
            </div>
        </>
    );
};

export default Caroussel;
