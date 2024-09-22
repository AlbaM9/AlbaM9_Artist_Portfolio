import React from 'react'
import { Link } from 'react-scroll';

//import '../styles/landing.scss'; // Importa los estilos globales

function Landing() {
    return (
        <section className="flex flex-col justify-center items-center h-screen text-aliceblue">
            <div className="mb-4">
                <img src="/images/black_mark.png" alt="Logo" className="w-2/2 opacity-60 " />
            </div>

            <h1 className="text-2xl md:text-4xl">Art & Modeling</h1>

            <div className="mt-8 flex gap-20">
                <span className="text-lg border border-white text-white p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:border-black hover:text-black transform hover:scale-110 hover:opacity-60">
                    <Link to="about-me" smooth={true} duration={500}>
                        More...
                    </Link>
                </span>
                <span className="text-lg border border-white text-white p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:border-black hover:text-black transform hover:scale-110 hover:opacity-60">
                    <Link to="gallery" smooth={true} duration={500}>
                        My jobs
                    </Link>
                </span>
            </div>
        </section>
    );
}

export default Landing