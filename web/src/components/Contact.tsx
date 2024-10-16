import React, { useState, useEffect } from 'react';
import Link from 'next/link';



const Contact: React.FC<any> = () => {

    const [showArrow, setShowArrow] = useState<boolean>(false);
    const [lastScrollY, setLastScrollY] = useState<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY: number = window.scrollY;


            if (currentScrollY > 300) {
                setShowArrow(true);


                if (currentScrollY > lastScrollY) {
                    setShowArrow(false);
                }
            } else {
                setShowArrow(false);
            }


            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

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
                <Link
                    href="/contact"
                    className="text-lg border border-white rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:border-black hover:text-black transform hover:scale-110"
                >
                    Contact me
                </Link>
            </div>


            {showArrow && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-125 hover:bg-opacity-100"
                    style={{ opacity: 0.7 }}
                >
                    ↑
                </button>
            )}
        </>
    );
}

export default Contact;
