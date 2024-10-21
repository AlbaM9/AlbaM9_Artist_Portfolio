"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC<any> = () => {
    return (
        <footer className="w-full bg-white bg-opacity-10 py-6 mt-10">
            <div className="flex justify-center items-center mx-auto px-4 md:px-20"> {/* Centering the content */}
                {/* Footer links and Social Media Icons in the same flex container */}
                <nav className="flex items-center space-x-10"> {/* Use space-x-10 for spacing */}
                    <ul className="flex items-center">
                        <li>
                            <a href="#" className="text-white cursor-pointer hover:text-gray-600">
                                Home
                            </a>
                        </li>
                    </ul>
                    {/* Social Media Icons */}
                    <div className="flex space-x-5 items-center"> {/* Center icons vertically */}
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" aria-hidden="true" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" aria-hidden="true" />
                        </a>
                    </div>
                </nav>
            </div>

            {/* Copyright section */}
            <div className="text-center text-white mt-4 text-sm">
                &copy; {new Date().getFullYear()} AlbaM9Art. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;