'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import workItems from '../../workItems.json'; // Ajusta la ruta según sea necesario

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Caroussel from '../../../components/Caroussel';


interface Quotes {
    quote: string; // El texto de la cita
    author: string; // El autor de la cita
}
// Define la interfaz para los trabajos
interface Work {
    id: number;
    title: string;
    description: string;
    images: string[];
    detail: string;
    linkThingiverse: string;
    quotes: Quotes;

}

const ImageComponent = ({ image, onClick }: { image: string; onClick: () => void; }) => (
    <div className="flex justify-center cursor-pointer" onClick={onClick}>
        <img
            src={image}
            alt="Imagen del trabajo"
            className="h-[60vh] w-auto rounded shadow-lg"
        />
    </div>
);


const Detail = () => {

    const { id } = useParams(); // Obtiene el id de la URL
    const [work, setWork] = useState<Work | null>(null); // Cambiar a Work | null
    const [showModal, setShowModal] = useState<boolean>(false); // Estado para mostrar el modal
    const [currentIndex, setCurrentIndex] = useState<number>(0); // Estado para la imagen actual en el modal


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


    const handleImageClick = (index: number) => {
        setCurrentIndex(index); // Establecer la imagen actual
        setShowModal(true);     // Mostrar el modal
    };

    const closeModal = () => {
        setShowModal(false);    // Ocultar el modal
    };

    if (!work) {
        return <div>Trabajo no encontrado</div>; // Manejo de error simple
    }

    console.log(showModal);
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

                <div className='flex flex-row mt-16'> {/* Flex-row con gap entre elementos */}
                    {/* Imagen */}
                    {work.images && work.images.length > 0 && (
                        <div className="w-[50vw] h-auto cursor-pointer">
                            <Caroussel
                                items={work.images.map((image, index) => ({
                                    image,
                                    onClick: () => handleImageClick(index), // Abrir modal al hacer clic
                                }))}
                                Component={ImageComponent}
                            />
                        </div>
                    )}

                    {/* Detalles del trabajo */}
                    <div className="p-10 text-white flex-grow pl-8"> {/* Ajuste del padding */}
                        <p className="text-lg mt-10">{work.detail}</p>
                        <p className="text-lg mt-10 italic text-right font-extralight">
                            &quot;{work.quotes.quote}&quot; {/* Texto de la cita con comillas */}
                        </p>
                        <div className="flex justify-center"> {/* Añade un contenedor flex para alinear a la derecha */}
                            <span className="text-lg italic font-extralight ">
                                - {work.quotes.author} {/* Nombre del autor */}
                            </span>
                        </div>

                        <div className='flex flex-row justify-center gap-20 mt-20'>
                            {work.linkThingiverse && (
                                <div className='flex flex-col items-center'>
                                    <p className="text-lg mt-10">Get model?</p>
                                    <a href={work.linkThingiverse}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <img
                                            src="/images/logoTV.png"
                                            alt={`Imagen adicional de ${work.title}`}
                                            className="rounded-lg shadow-md h-[40px] w-[40px] mt-4 transition-transform duration-300 hover:scale-150"// Abre el modal al hacer clic // Ajusta el tamaño de la imagen
                                        />
                                    </a>
                                </div>
                            )}
                            <div className='flex flex-col items-center '>
                                <p className="text-lg mt-10">Do we talk?</p>
                                <Link
                                    href="/contact" // Cambia 'to' por 'href' y utiliza el nombre de la ruta en minúsculas.
                                    className="w-[200px] text-lg border text-center border-white rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:border-black hover:text-black transform hover:scale-110 mt-4"
                                >
                                    Contact me
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal para las imágenes */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
                        <div className="relative w-[90vw] h-[90vh] overflow-hidden"> {/* Agregar overflow-hidden para evitar que se desborde */}
                            <button
                                className="absolute top-4 right-4 text-white text-4xl z-50 cursor-pointer"
                                onClick={closeModal}
                            >
                                &#10005; {/* Icono de cierre */}
                            </button>
                            <Caroussel
                                items={work.images.map(image => ({ image }))}
                                Component={ImageComponent}
                            />
                        </div>
                    </div>
                )}

                {/* Carrusel de imágenes adicionales */}
                <div className="flex flex-col items-center mt-16">
                    <h2 className="text-2xl font-semibold text-white text-center">More images</h2>
                    <div className="flex justify-center overflow-x-auto mt-4">
                        <div className="flex space-x-10">
                            {work.images.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Imagen adicional de ${work.title}`}
                                    className="rounded-lg shadow-md h-48 object-cover"

                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Detail;
