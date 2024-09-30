import React from 'react'
import { Link } from 'react-scroll';

//import '../styles/landing.scss'; // Importa los estilos globales

const Landing: React.FC<any> = () => {
    return (
        <section className="flex flex-col items-center h-[100vh] text-aliceblue bg-no-repeat bg-contain " >

            <div
                className="mb-4 mt-[10vh] bg-no-repeat w-full h-[60%] 0 reveal-animation"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center, rgba(0, 0, 0, 0.3), transparent 70%), url('/images/logofinalefix2.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",

                    filter: "blur(1.2px)", // Desenfoque general en la imagen
                }}
            >
                {/*<img src="/images/black_mark.png" className=" items-center justify-center"></img>*/}
            </div>


            <h1 className="text-3xl md:text-5xl pt-5">Art & Modeling</h1>


            <div className="mt-10 flex gap-20 ">
                <span className="text-lg border border-white text-white p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:border-black hover:text-black transform hover:scale-110 hover:opacity-60">
                    <Link to="about-me" smooth={true} duration={500}>
                        More...
                    </Link>
                </span>

            </div>
        </section >
    );
}

export default Landing