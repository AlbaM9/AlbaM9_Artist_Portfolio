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
                <div className="flex-grow p-5 mt-16"> {/* Flex-grow para ocupar el espacio restante */}
                    <h1 className="text-4xl font-bold text-white text-center mb-4">{work.title}</h1>
                    <p className="mt-2 text-lg text-white text-center">{work.description}</p>
                </div>
                <div className="flex flex-col lg:flex-row mt-16"> {/* Cambia a flex-row en pantallas grandes */}

                    {work.images && work.images.length > 0 && (
                        <div className="flex justify-center  mb-8 flex-shrink-0 w-full" > {/* Agrega flex-shrink-0 para evitar que la imagen se encoja */}
                            <img
                                src={work.images[0]} // Muestra la primera imagen
                                alt={`Imagen de ${work.title}`}
                                className="h-[60vh] w-auto rounded shadow-lg" // Estilos para la imagen
                            />
                        </div>
                    )}
                    <div className="flex-grow p-5 mt-4 "> {/* Contenedor para los detalles */}
                        <p className="mt-4 text-white text-center">{work.detail}</p>
                    </div>
                </div>
                {/* Aquí puedes agregar más detalles y un carrusel de imágenes */}
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-white text-center">Más Imágenes</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {work.images.slice(1).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Imagen adicional de ${work.title}`}
                                className="rounded-lg shadow-md h-48 object-cover" // Tamaño y estilo para las imágenes adicionales
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer /> {/* Footer estará siempre en la parte inferior */}
        </div>

    );
};


export default Detail;
