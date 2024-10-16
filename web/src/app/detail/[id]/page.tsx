'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Caroussel from '../../../components/Caroussel';


interface Work {
    id: number;
    title: string;
    description: string;
    images: string[];
    detail: string;
    linkThingiverse: string;
    quote: string;
    author: string;


}


const ImageComponent = ({ image, onClick, isModal = false }: { image: string; onClick: () => void; isModal?: boolean }) => (
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
    const [DetailWork, setDetailWork] = useState<Work | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const carouselRef = useRef<any>(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null); // Estado de error

    useEffect(() => {
        const fetchWork = async () => {
            setLoading(true);
            setError(null); // Resetear el estado de error antes de la solicitud
            try {
                const response = await fetch(`http://localhost:3000/api/detail/${id}`); // Cambia la URL según sea necesario

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data: Work = await response.json();
                setDetailWork(data);
                if (data && data.images.length > 0) {
                    setCurrentImage(data.images[0]);
                }
            } catch (error) {
                setError('Error al cargar el trabajo. Por favor, inténtalo de nuevo más tarde.');
                console.error('Error al cargar el trabajo:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchWork();
        }
    }, [id]);

    const handleImageClick = (image: string) => {
        setCurrentImage(image);
        setShowModal(true);
    };

    const handleImageSelect = (image: string) => {
        setCurrentImage(image);
        if (carouselRef.current) {
            const index = DetailWork?.images.indexOf(image) || 0;
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

    if (loading) {
        return <div className="text-white text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!DetailWork) {
        return <div className="text-white text-center">Trabajo no encontrado</div>;
    }

    console.log(DetailWork)

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/images/fire.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className="p-16">
                <div className="flex-grow p-5 mt-6 justify-center">
                    <h1 className="text-4xl font-bold text-white text-center mb-4">{DetailWork.title}</h1>
                    <p className="mt-2 text-lg text-white text-center">{DetailWork.description}</p>
                </div>

                <div className="flex flex-row mt-6 mb-18">
                    {DetailWork.images && DetailWork.images.length > 0 && (
                        <div className="w-[50vw] h-auto cursor-pointer">
                            <Caroussel
                                items={DetailWork.images.map((image) => ({
                                    image,
                                    onClick: () => handleImageClick(image),
                                }))}
                                showArrows={false}
                                showDots={true}
                                Component={ImageComponent}
                                currentIndex={DetailWork.images.indexOf(currentImage || '')}
                            />
                        </div>
                    )}

                    <div className="p-10 text-white flex-grow pl-8">
                        <p className="text-lg mt-10">{DetailWork.detail}</p>
                        <p className="text-lg mt-18 italic text-center font-extralight pr-18 pl-18 pb-6">
                            &quot;{DetailWork.quote}&quot;
                        </p>
                        <div className="flex justify-end pr-18">
                            <span className="text-lg italic font-extralight">
                                - {DetailWork.author}
                            </span>
                        </div>

                        <div className="flex flex-row justify-start gap-20 mt-18">
                            {DetailWork.linkThingiverse && (
                                <div className="flex flex-col items-center">
                                    <p className="text-lg mt-10">Get model?</p>
                                    <a href={DetailWork.linkThingiverse}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <img
                                            src="/images/logoTV.png"
                                            alt={`Imagen adicional de ${DetailWork.title}`}
                                            className="rounded-lg shadow-md h-[40px] w-[40px] mt-4 transition-transform duration-300 hover:scale-150"
                                        />
                                    </a>
                                </div>
                            )}
                            <div className="flex flex-col items-center">
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

                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col justify-center items-center z-50 pt-18">
                        <div className="relative w-[80vw] h-[80vh] overflow-hidden">
                            <button
                                className="absolute top-4 right-4 text-white text-4xl z-50 cursor-pointer"
                                onClick={closeModal}
                            >
                                &#10005;
                            </button>
                            <ImageComponent image={currentImage!} onClick={() => { }} isModal={true} />
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex justify-center overflow-x-auto">
                                <div className="flex space-x-10 mb-18">
                                    {DetailWork.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Imagen adicional de ${DetailWork.title}`}
                                            className={`rounded-lg shadow-md h-32 object-cover cursor-pointer ${currentImage === image ? 'border-2 border-blue-500' : ''}`}
                                            onClick={() => handleImageSelect(image)}
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
