import React from 'react'

import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

interface BannersProps {
    backgroundImage: string;
    title: string;
    link?: any;


}


const Banners: React.FC<BannersProps> = ({ backgroundImage, title, link, }) => {
    return (
        <section className="flex justify-center items-center">
            <Link href={link} className="group w-[60vw] md:w-[50vw] lg:w-[43vw] aspect-square relative flex flex-col">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat rounded-full relative transition-transform duration-300 ease-in-out"
                    style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
                >
                    {/* Efecto de filtro BYN */}
                    <div className="absolute inset-0 w-full h-full rounded-full bg-black bg-opacity-30 transition-all duration-300 ease-in-out filter group-hover:filter-none group-hover:bg-opacity-0"></div>


                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-full transition-all duration-300 ease-in-out filter grayscale group-hover:grayscale-0"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    ></div>


                    <div className="absolute top-2 left-0 right-0 p-4 flex justify-center">
                        <h1 className="relative z-10 text-2xl md:text-3xl text-white ">
                            {title}
                        </h1>
                    </div>
                </div>
            </Link>
        </section>
    );
}

export default Banners