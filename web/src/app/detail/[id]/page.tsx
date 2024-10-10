'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import workItems from '../../workItems.json'; // Ajusta la ruta según sea necesario

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';


// Define la interfaz para los trabajos
interface Work {
    id: number;
    title: string;
    description: string;
    images: string[];
    detail: string;
    linkThingiverse: string
}

const Detail = () => {

    const { id } = useParams(); // Obtiene el id de la URL
    const [work, setWork] = useState<Work | null>(null); // Cambiar a Work | null

    const menuItems = [
        <Link key="home" href="/">Home</Link>,
        <Link key="contact" href="/contact">Contact</Link>,
    ];


    useEffect(() => {
        if (id) {
            const workId = Number(id); // Convertimos id a número
            const foundWork = workItems.find((item: Work) => item.id === workId);
            setWork(foundWork || null); // Manejo de caso en que no se encuentra el trabajo
        }
    }, [id]);

    if (!work) {
        return <div>Trabajo no encontrado</div>; // Manejo de error simple
    }

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/images/fire.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className='p-16'>
                <div className="flex-grow p-5 mt-16 justify-center"> {/* Flex-grow para ocupar el espacio restante */}
                    <h1 className="text-4xl font-bold text-white text-center mb-4">{work.title}</h1>
                    <p className="mt-2 text-lg text-white text-center">{work.description}</p>
                </div>

                <div className="flex flex-row mt-16 justify-between gap-10"> {/* Flex-row con gap entre elementos */}
                    {/* Imagen */}
                    {work.images && work.images.length > 0 && (
                        <div className="flex-shrink-0 pl-16"> {/* flex-shrink-0 evita que la imagen se encoja */}
                            <img
                                src={work.images[0]} // Muestra la primera imagen
                                alt={`Imagen de ${work.title}`}
                                className="h-[60vh] w-auto rounded shadow-lg" // Estilos para la imagen
                            />
                        </div>
                    )}

                    {/* Detalles del trabajo */}
                    <div className="p-10text-white text-left flex-grow pl-8"> {/* flex-grow para que el texto crezca con el espacio disponible */}
                        <p className="text-lg mt-10">{work.detail}</p>
                        {work.linkThingiverse && (

                            <div className='flex flex-col '>
                                <p className="text-lg mt-10">Get model?</p>
                                <a href={work.linkThingiverse}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img
                                        src="/images/logoTV.png"
                                        alt={`Imagen adicional de ${work.title}`}
                                        className="rounded-lg shadow-md h-[40px] w-[40px] mt-4 transition-transform duration-300 hover:scale-150" // Ajusta el tamaño de la imagen
                                    />
                                </a>
                            </div>)}
                        <div className='flex flex-col '>
                            <p className="text-lg mt-10">Do we talk?</p>
                            <Link
                                href="/contact" // Cambia 'to' por 'href' y utiliza el nombre de la ruta en minúsculas.
                                className="w-[200px] text-lg border border-white rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:border-black hover:text-black transform hover:scale-110 mt-4"
                            >
                                Contact me
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Carrusel de imágenes adicionales */}
                <div className="flex flex-col items-center mt-16"> {/* Centering the entire content */}
                    <h2 className="text-2xl font-semibold text-white text-center">More images</h2>
                    <div className="flex justify-center overflow-x-auto mt-4"> {/* Flex container for horizontal layout */}
                        <div className="flex space-x-10"> {/* Horizontal spacing between images */}
                            {work.images.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Imagen adicional de ${work.title}`}
                                    className="rounded-lg shadow-md h-48 object-cover" // Size and style for additional images
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer estará siempre en la parte inferior */}
        </div>

    );
};


export default Detail;
