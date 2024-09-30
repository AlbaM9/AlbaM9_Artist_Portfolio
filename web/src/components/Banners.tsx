import React from 'react'
//import '../styles/banners.scss'; // Importa los estilos globales
interface BannersProps {
    backgroundImage: string;
    title: string;
    link?: string; // Si 'link' es opcional, puedes usar '?'
}


const Banners: React.FC<BannersProps> = ({ backgroundImage, title, link }) => {
    return (
        <section className="flex justify-center items-center">
            <div
                className="w-[43vw] aspect-square bg-cover bg-top bg-no-repeat rounded-full flex flex-col justify-center items-center"
                style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', }}
            >
                <h1 className="text-2xl md:text-3xl text-white border-2 border-white px-4 py-2 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black hover:opacity-80 transform hover:scale-110">
                    {title}
                </h1>
            </div>
        </section>
    );
}

export default Banners