'use client';  // Esto convierte al componente en un Client Component

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/caroussel.scss';

import Banners from "./Banners";

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
        <>

            <h1>Jobs</h1>
            <div className="carousel-container">


                <Slider {...settings}>
                    <div>
                        <Banners
                            backgroundImage='/images/DSC_0587.JPG'
                            title="3D Models"
                            link="">
                        </Banners>
                    </div>
                    <div>
                        <Banners
                            backgroundImage='/images/1624276288557.jpg'
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
