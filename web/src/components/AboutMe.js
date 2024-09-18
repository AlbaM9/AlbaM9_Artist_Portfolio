import React from 'react'
import '../styles/aboutMe.scss';

function AboutMe() {
    return (
        <section className="about_main">
            <h1 className="title">About Me</h1>
            <section className="aboutMe">
                <section className="desc">
                    <p>Hi! I’m Alba, a visual artist with a lifelong passion for creativity, and more recently, a programmer and 3D modeler. From my earliest sketches to the digital pieces I create today, I’ve always loved expressing ideas through form, color, and texture.</p> <p>As an adult, I discovered programming and 3D modeling, which opened up new creative possibilities. Coding allows me to build interactive designs, while 3D printing brings my ideas into the physical world.</p> <p>Whether I’m designing digital artwork or crafting 3D models, I’m passionate about blending art and technology. Thanks for visiting my portfolio—I hope you enjoy exploring my work as much as I’ve enjoyed creating it!</p>

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

export default AboutMegit 