"use client";

import '../styles/header.scss'; // Importa los estilos globales
import React from 'react';
import { Link } from 'react-scroll';

const Header = ({ title }) => {
    return (
        <div className="header">
            {<img ></img>}

            <nav>
                <ul className="navMenu">
                    <li><Link to="about-me" smooth={true} duration={500}>
                        About Me
                    </Link></li>

                    <li> <Link to="models" smooth={true} duration={500}>
                        3D Models
                    </Link></li>
                    <li> <Link to="printings" smooth={true} duration={500}>
                        3D Printings
                    </Link></li>
                    <li> <Link to="contact" smooth={true} duration={500}>
                        Contact
                    </Link></li>
                </ul>
            </nav>


        </div>
    );
};

export default Header; 