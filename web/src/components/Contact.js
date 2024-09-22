import React from 'react'
//import '../styles/contact.scss';

function Contact() {
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
        </>
    );
}
export default Contact