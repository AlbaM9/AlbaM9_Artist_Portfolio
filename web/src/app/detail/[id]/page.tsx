'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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

const ImageComponent = ({ image, onClick, isModal = false }: { image: string; onClick: () => void; isModal?: boolean; }) => (
    <div className="flex justify-center cursor-pointer" onClick={onClick}>
        <img
            src={image}
            alt="Imagen del trabajo"
            className={`h-[65vh] ${isModal ? 'w-auto rounded-none' : 'w-[65vh] rounded-full object-cover'} shadow-lg`}
        />
    </div>
);
const Detail = () => {
    const { id } = useParams(); // Obtiene el id de la URL
    const [work, setWork] = useState<Work | null>(null); // Cambiar a Work | null
    const [showModal, setShowModal] = useState<boolean>(false); // Estado para mostrar el modal
    const [currentImage, setCurrentImage] = useState<string | null>(null); // Estado para la imagen actual
    const carouselRef = useRef<any>(null); // Crear referencia para el carrusel


    useEffect(() => {
        if (id) {
            const workId = Number(id);
            const foundWork = workItems.find((item: Work) => item.id === workId);
            setWork(foundWork || null);
            if (foundWork && foundWork.images.length > 0) {
                setCurrentImage(foundWork.images[0]);
            }
        }
    }, [id]);


    const handleImageClick = (image: string) => {
        setCurrentImage(image);
        setShowModal(true);
    };


    const handleImageSelect = (image: string) => {
        setCurrentImage(image);
        if (carouselRef.current) {
            const index = work?.images.indexOf(image) || 0;
            carouselRef.current.slickGoTo(index);
        }
    };


    const closeModal = () => {
        setShowModal(false);
    };


    const menuItems = [
        <Link key="home" href="/">Home</Link>,
        <Link key="contact" href="/contact">Contact</Link>,
        <Link key="jobs" href="/jobs">Jobs</Link>,
    ];

    if (!work) {
        return <div>Trabajo no encontrado</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/images/fire.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className='p-16'>
                <div className="flex-grow p-5 mt-6 justify-center">
                    <h1 className="text-4xl font-bold text-white text-center mb-4">{work.title}</h1>
                    <p className="mt-2 text-lg text-white text-center">{work.description}</p>
                </div>

                <div className='flex flex-row mt-6 mb-18'>
                    {/* Imagen */}
                    {work.images && work.images.length > 0 && (
                        <div className="w-[50vw] h-auto cursor-pointer">
                            <Caroussel

                                items={work.images.map((image) => ({
                                    image,
                                    onClick: () => handleImageClick(image),
                                }))}
                                showArrows={false}
                                showDots={true}
                                Component={ImageComponent}
                                currentIndex={work.images.indexOf(currentImage || '')}
                            />
                        </div>
                    )}

                    {/* Detalles del trabajo */}
                    <div className="p-10 text-white flex-grow pl-8">
                        <p className="text-lg mt-10">{work.detail}</p>
                        <p className="text-lg mt-18 italic text-center font-extralight pr-18 pl-18 pb-6">
                            &quot;{work.quotes.quote}&quot;
                        </p>
                        <div className="flex justify-end pr-18">
                            <span className="text-lg italic font-extralight ">
                                - {work.quotes.author}
                            </span>
                        </div>

                        <div className='flex flex-row justify-start  gap-20 mt-18'>
                            {work.linkThingiverse && (
                                <div className='flex flex-col items-center'>
                                    <p className="text-lg mt-10">Get model?</p>
                                    <a href={work.linkThingiverse}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <img
                                            src="/images/logoTV.png"
                                            alt={`Imagen adicional de ${work.title}`}
                                            className="rounded-lg shadow-md h-[40px] w-[40px] mt-4 transition-transform duration-300 hover:scale-150"
                                        />
                                    </a>
                                </div>
                            )}
                            <div className='flex flex-col items-center '>
                                <p className="text-lg mt-10">Do we talk?</p>
                                <Link
                                    href="/contact"
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
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50 pt-18">
                        <div className="relative w-[80vw] h-[80vh] overflow-hidden">
                            <button
                                className="absolute top-4 right-4 text-white text-4xl z-50 cursor-pointer"
                                onClick={closeModal}
                            >
                                &#10005;
                            </button>
                            <ImageComponent image={currentImage!} onClick={() => { }} isModal={true} /> {/* Mostrar la imagen actual */}
                        </div>

                        {/* Añadir margen en la parte superior del contenedor de imágenes */}
                        <div className="flex flex-col items-center "> {/* Cambiado mt-2 a mt-6 */}
                            <div className="flex justify-center overflow-x-auto">
                                <div className="flex space-x-10 mb-18">
                                    {work.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Imagen adicional de ${work.title}`}
                                            className={`rounded-lg shadow-md h-32 object-cover cursor-pointer ${currentImage === image ? 'border-2 border-blue-500' : ''}`}
                                            onClick={() => handleImageSelect(image)} // Maneja el clic en la miniatura
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Detail;
