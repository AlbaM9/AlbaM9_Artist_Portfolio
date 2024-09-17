import React from 'react'
import { Link } from 'react-scroll';

import '../styles/landing.scss'; // Importa los estilos globales

function Landing() {
    return (
        <section className="landing">
            <div className="logoLanding">
                <img src="/images/black_mark.png" className="logo"></img>
            </div>

            <h1>Art & Modeling</h1>

            <div className="navButtons">
                <span><Link to="about-me" smooth={true} duration={500}>
                    More...
                </Link></span>
                <span><Link to="gallery" smooth={true} duration={500}>
                    My jobs
                </Link></span>
            </div>

        </section>
    )
}

export default Landing