'use client';  // Esto convierte al componente en un Client Component

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

interface CarouselProps {
    items: any[];  // Lista de datos para los componentes
    Component: React.ComponentType<any>; // Componente pasado como prop
}
const PreviousArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className}  flex items-center justify-center w-16 h-16 rounded-full z-10 cursor-pointer text-3xl`} // Tamaño y estilo más grande
            style={{
                ...style,
                display: "block",
                position: "absolute",
                bottom: "20px",  // Posicionada en la parte inferior
                left: "10px",    // Cercana al borde izquierdo
                transform: "scale(1.8)",  // Hacemos las flechas más grandes
                zIndex: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",  // Añadimos una sombra más visible
            }}
            onClick={onClick}
        >
            &#10094; {/* Flecha izquierda */}
        </div>
    );
};

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
        <div
            className={`${className}  flex items-center justify-center w-16 h-16 rounded-full z-10 cursor-pointer text-3xl`} // Tamaño y estilo más grande
            style={{
                ...style,
                display: "block",
                position: "absolute",
                bottom: "20px",  // Posicionada en la parte inferior
                right: "10px",   // Cercana al borde derecho
                transform: "scale(1.8)",  // Hacemos las flechas más grandes
                zIndex: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",  // Añadimos una sombra más visible
            }}
            onClick={onClick}
        >
            &#10095; {/* Flecha derecha */}
        </div>
    );
};

const Caroussel: React.FC<CarouselProps> = ({ items, Component }) => {
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

            <div className="carousel-container">
                <Slider {...settings}>

                    {items.map((item, index) => (
                        <div key={index}>
                            {/* Renderizamos el componente que se pasa como prop */}
                            <Component {...item} />
                        </div>
                    ))}

                </Slider>
            </div>
        </>
    );
};

export default Caroussel;
