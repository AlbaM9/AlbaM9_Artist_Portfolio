import React, { useState, useEffect } from 'react';
// import '../styles/contact.scss';

function Contact() {
    // Estado para controlar la visibilidad de la flecha
    const [showArrow, setShowArrow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0); // Estado para rastrear la última posición de scroll

    // Manejar el scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Mostrar flecha si el usuario ha bajado más de 300px y está desplazándose hacia abajo
            if (currentScrollY > 300 && currentScrollY > lastScrollY) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }

            // Actualizar la posición de scroll actual
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]); // Escuchar cambios en `lastScrollY`

    return (
        <>
            <h1 className="text-2xl md:text-4xl text-white text-center mb-8">Contact</h1>

            <div className="contactMe flex justify-center items-center gap-40 my-10 text-white text-lg">
                <div className="w-[45vw]">
                    <p className="mb-4">
                        <strong>Are you looking for artistic innovation with a unique flair?</strong><br />
                        As a 3D artist, I’m passionate about creating visually captivating and original designs that bring your creative ideas to life.
                        Whether it's intricate 3D models or custom artwork, I aim to deliver pieces that inspire and make an impact.
                    </p>

                    <p className="mb-4">
                        In addition to my artistic skills, I offer technical expertise in 3D printing and programming, giving your projects a functional edge.
                        This combination of creativity and technology allows me to craft high-quality, professional work that not only looks great but works seamlessly.
                    </p>

                    <p>
                        <strong>Let’s bring your vision to life!</strong> Feel free to reach out, and we can collaborate on something extraordinary that blends artistry with innovation.
                    </p>
                </div>
                <a
                    href="mailto:albamelchorgomez@gmail.com"
                    className="text-lg border border-white rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:border-black hover:text-black transform hover:scale-110"
                >
                    Contact me
                </a>
            </div>

            {/* Flecha que aparece cuando haces scroll hacia abajo */}
            {showArrow && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-10 right-10 bg-white text-black p-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110"
                >
                    ↑
                </button>
            )}
        </>
    );
}

export default Contact;
