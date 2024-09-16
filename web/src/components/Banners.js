import React from 'react'
import '../styles/banners.scss'; // Importa los estilos globales


function Banners({ backgroundImage, title, link }) {
    return (
        <section className="banSect">

            <div className="banner" style={{
                backgroundImage: `url(${backgroundImage})`
            }} >
                <h1 className="title">{title}</h1>
                <a>Ver modelos</a>
            </div>
        </section >
    )
}

export default Banners