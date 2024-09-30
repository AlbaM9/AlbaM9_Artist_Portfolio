"use client";

//import '../styles/header.scss';
import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Importa el Link de react-scroll y le asigna un alias
import Link from 'next/link'; // Importa el Link de Next.js


const Header: React.FC<any> = () => {
    return (
        <div className="flex justify-between items-center fixed top-0 w-full z-50 bg-white bg-opacity-10 px-2 py-2  ">

            <Link href="/" className="text-white cursor-pointer hover:text-gray-600 hover:scale-110 transform transition duration-300">
                <img
                    src="images/logoinale.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain ml-10"
                />
            </Link>

            <nav>
                <ul className="flex space-x-20 items-center mr-5">
                    <li>
                        <ScrollLink to="about-me" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            About Me
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink to="gallery" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            Jobs
                        </ScrollLink>
                    </li>

                    <li>
                        <ScrollLink to="contact" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            Contact
                        </ScrollLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header; 