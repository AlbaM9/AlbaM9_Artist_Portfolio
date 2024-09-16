'use client';  // Esto convierte al componente en un Client Component

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/caroussel.scss';

const Caroussel = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Solo se renderiza cuando el componente está montado en el cliente
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (!mounted) return null; // Evita renderizar en el servidor

    return (
        <div>

            <Slider {...settings}>
                <div>
                    <img className="carImg" src="/images/DSC_0575.JPG" alt="Imagen 1" />
                </div>
                <div>
                    <img className="carImg" src="https://wallpapers.com/images/featured/zelda-rkp03okh2d43ik06.jpg" alt="Imagen 2" />
                </div>
                <div>
                    <img className="carImg" src="https://images2.alphacoders.com/130/1301855.jpg" alt="Imagen 3" />
                </div>
            </Slider>
        </div>
    );
};

export default Caroussel;
