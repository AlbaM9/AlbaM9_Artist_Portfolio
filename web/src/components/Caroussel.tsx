'use client';

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
    items: any[];
    Component: React.ComponentType<any>;
    showArrows?: boolean;
    showDots?: boolean;
    currentIndex: number;

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
            &#10094;
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
            &#10095;
        </div>
    );
};

const Caroussel: React.FC<CarouselProps> = ({ items, Component, showArrows = true, showDots = false, currentIndex }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    const settings = {
        dots: showDots,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: showArrows,
        prevArrow: showArrows ? <PreviousArrow /> : undefined,
        nextArrow: showArrows ? <NextArrow /> : undefined,
        initialSlide: currentIndex,

    };

    if (!mounted) return null;
    return (
        <div className="carousel-container relative">
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
