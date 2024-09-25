"use client";

//import '../styles/header.scss';
import React from 'react';
import { Link } from 'react-scroll';

const Header = ({ title }) => {
    return (
        <div className="flex justify-between items-center fixed top-0 w-full z-50 bg-white bg-opacity-10 px-2 py-2  ">

            <a href="#" className="text-white cursor-pointer hover:text-gray-600  hover:scale-110 transform transition duration-300">
                <img

                    src="images/logoinale.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain ml-10"
                />
            </a>

            <nav>
                <ul className="flex space-x-20 items-center mr-5">
                    <li>
                        <Link to="about-me" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            About Me
                        </Link>
                    </li>
                    <li>
                        <Link to="models" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            3D Models
                        </Link>
                    </li>
                    <li>
                        <Link to="printings" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            3D Printings
                        </Link>
                    </li>
                    <li>
                        <Link to="contact" smooth={true} duration={500} className="text-white cursor-pointer hover:text-gray-600">
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header; 