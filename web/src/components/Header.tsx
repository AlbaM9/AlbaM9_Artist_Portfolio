"use client";

//import '../styles/header.scss';
import React from 'react';

import Link from 'next/link'; // Importa el Link de Next.js

interface HeaderProps {
    menuItems: Array<React.ReactNode>; // Permite cualquier tipo de componente React en el menú
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => {
    return (
        <div className="flex  justify-between items-center fixed top-0 w-full z-50 bg-white bg-opacity-10 px-2 py-2">


            <Link href="/" className="text-white cursor-pointer hover:text-gray-600 hover:scale-110 transform transition duration-300">
                <img
                    src="/Images/logoinale.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain ml-10"
                />
            </Link>

            <nav>
                <ul className="flex space-x-6 md:space-x-20 items-center mr-5">
                    {/* Renderiza los items del menú pasados como prop */}
                    {menuItems.map((item, index) => (
                        <li key={index} className="text-white cursor-pointer hover:text-gray-600">
                            {item} {/* Acepta cualquier componente */}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Header; 