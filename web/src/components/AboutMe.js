import React from 'react'
import '../styles/aboutMe.scss';

function AboutMe() {
    return (
        <section className="about_main">
            <h1 className="title">About Me</h1>
            <section className="aboutMe">
                <section className="desc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                </section>
                <section className="nameImage">
                    <img className="meImg" src="https://m.media-amazon.com/images/I/71BlMzossmL._AC_UF894,1000_QL80_.jpg" alt="Imagen 1"></img>
                    <span>Alba Melchor Gómez</span>
                    <span>Full Stack Developer & 3D Artist</span>
                </section>
            </section>
        </section >
    )
}

export default AboutMe