"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC<any> = () => {
    return (
        <footer className="w-full bg-white bg-opacity-10 py-6 mt-10">
            <div className="flex justify-center items-center mx-auto px-4 md:px-20">

                <nav className="flex items-center space-x-10">


                    <div className="flex space-x-5 items-center">
                        <a href="https://cults3d.com/es/usuarios/albam9art/modelos-3d" className=" cursor-pointer">
                            <img src="/images/Cults.png" alt="" className='w-6 h-6' />
                        </a>
                        {/*<a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 text-pink-400" aria-hidden="true" />
                        </a>*/}
                        <a href="https://x.com/albam9_art" target="_blank" rel="noreferrer ">
                            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 text-blue-500" aria-hidden="true" />
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