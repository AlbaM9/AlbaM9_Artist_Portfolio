"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-white bg-opacity-10 py-6 mt-10">
            <div className="flex justify-end gap-[33vw]
             items-center mx-auto px-4 md:px-20">


                {/* Footer links */}
                <nav>
                    <ul className="flex space-x-10 items-center">
                        <li>
                            <a href="#" className="text-white cursor-pointer hover:text-gray-600">
                                Home
                            </a>
                        </li>


                        <li>
                            <a href="#contact" className="text-white cursor-pointer hover:text-gray-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Social Media Icons (optional) */}
                <div className="flex space-x-5 mr-10">
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <img src="images/facebook-icon.png" alt="Facebook" className="w-6 h-6 object-contain" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                        <img src="images/instagram-icon.png" alt="Instagram" className="w-6 h-6 object-contain" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                        <img src="images/twitter-icon.png" alt="Twitter" className="w-6 h-6 object-contain" />
                    </a>
                </div>
            </div>

            {/* Copyright section */}
            <div className="text-center text-white mt-4 text-sm">
                &copy; {new Date().getFullYear()} AlbaM9Art. All Rights Reserved.
            </div>
        </footer >
    );
};

export default Footer;