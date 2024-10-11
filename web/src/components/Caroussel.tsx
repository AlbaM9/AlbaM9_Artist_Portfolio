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
    showArrows?: boolean; // Nueva prop para mostrar o no flechas
    showDots?: boolean;
    currentIndex: number;
    // Nueva prop para mostrar o no dots
}

const PreviousArrow: React.FC<ArrowProps> = ({ className, style, onClick, }) => {
    return (
        <div
            className={`${className} flex items-center justify-center w-16 h-16 rounded-full z-10 cursor-pointer text-3xl`}
            style={{
                ...style,
                display: "block",
                position: "absolute",
                bottom: "20px",
                left: "10px",
                transform: "scale(1.8)",
                zIndex: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",

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
            className={`${className} flex items-center justify-center w-16 h-16 rounded-full z-10 cursor-pointer text-3xl`}
            style={{
                ...style,
                display: "block",
                position: "absolute",
                bottom: "20px",
                right: "10px",
                transform: "scale(1.8)",
                zIndex: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
            }}
            onClick={onClick}
        >
            &#10095; {/* Flecha derecha */}
        </div>
    );
};

const Caroussel: React.FC<CarouselProps> = ({ items, Component, showArrows = true, showDots = false, currentIndex }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Solo se renderiza cuando el componente está montado en el cliente
    }, []);


    const settings = {
        dots: showDots, // Se muestra o no dependiendo de la prop
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: showArrows, // Se muestra o no dependiendo de la prop
        prevArrow: showArrows ? <PreviousArrow /> : undefined, // Condicional para mostrar la flecha anterior
        nextArrow: showArrows ? <NextArrow /> : undefined,
        initialSlide: currentIndex, // Establece el índice inicial del carrusel
        // Condicional para mostrar la flecha siguiente
    };

    if (!mounted) return null; // Evita renderizar en el servidor

    return (
        <div className="carousel-container relative"> {/* Asegura que el contenedor sea relative */}
            <Slider {...settings}>
                {items.map((item, index) => (
                    <div key={index}>
                        <Component {...item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Caroussel;
