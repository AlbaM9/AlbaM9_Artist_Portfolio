"use client";

import '../styles/header.scss'; // Importa los estilos globales
import React from 'react';
import { Link } from 'react-scroll';

const Header = ({ title }) => {
    return (
        <div className="header">
            {<img src="/images/black_mark.png" className="logo"></img>}

            <nav>
                <ul className="navMenu">
                    <li><Link to="about-me" smooth={true} duration={500}>
                        About Me
                    </Link></li>
                    <li><Link to="gallery" smooth={true} duration={500}>
                        Gallery
                    </Link></li>
                    <li> <Link to="models" smooth={true} duration={500}>
                        3D Models
                    </Link></li>
                    <li> <Link to="printings" smooth={true} duration={500}>
                        3D Printings
                    </Link></li>
                    <li>Contact</li>
                </ul>
            </nav>


        </div>
    );
};

export default Header; 