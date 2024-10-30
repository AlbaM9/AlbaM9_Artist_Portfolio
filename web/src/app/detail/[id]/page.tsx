'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, Suspense } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Caroussel from '../../../components/Caroussel';
import RingLoader from "react-spinners/RingLoader";

interface Work {
    id: number;
    title: string;
    description: string;
    detail: string;
    linkThingiverse: string;
    quote: string;
    author: string;
    images: { url: string; id: number }[];
}

const ImageComponent = ({ image, onClick, isModal = false }: { image: string; onClick: () => void; isModal?: boolean }) => (
    <div className="flex justify-center items-center w-full h-full cursor-pointer" onClick={onClick}>
        <img
            src={image}
            alt="Imagen del trabajo"
            className={`shadow-lg w-full h-full ${isModal ? 'object-contain rounded-none' : 'object-cover w-[65vw] aspect-square rounded-full'}`}
        />
    </div>
);

const Detail = () => {
    const { id } = useParams();
    const [DetailWork, setDetailWork] = useState<Work | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const carouselRef = useRef<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWork = async () => {
            if (!id) {
                console.warn('ID no está definido');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/item/${id}`);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status}`);
                }

                const data: Work = await response.json();
                const sortedImages = data.images.sort((a, b) => a.id - b.id);
                setDetailWork({ ...data, images: sortedImages });

                if (sortedImages.length > 0) {
                    setCurrentImage(sortedImages[0].url);
                }
            } catch (error) {
                setError('Error al cargar el trabajo. Por favor, inténtalo de nuevo más tarde.');
                console.error('Error al cargar el trabajo:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWork();
    }, [id]);

    const handleImageClick = (image: string) => {
        setCurrentImage(image);
        setShowModal(true);
    };

    const handleImageSelect = (image: string) => {
        setCurrentImage(image);
        if (carouselRef.current) {
            const index = DetailWork?.images.findIndex((img) => img.url === image) || 0;
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

    // Estado de carga o error


    return (
        <div className="flex flex-col min-h-screen bg-cover bg-fixed bg-center bg-no-repeat " style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/Images/fire.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className="p-16 flex-grow  flex items-center justify-center transition-opacity duration-500">
                {loading ? (
                    <div className="flex items-center justify-center h-screen text-white">
                        <RingLoader color="#ffffff" loading={loading} size={60} />
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-screen text-white">
                        {error}
                    </div>
                ) : DetailWork == null ? (
                    <div className="flex items-center justify-center h-screen text-white">
                        Trabajo no encontrado
                    </div>
                ) : (
                    <div className="flex-grow p-5 justify-center">
                        <h1 className="text-4xl font-bold text-white text-center mb-4">{DetailWork.title}</h1>
                        <p className="mt-2 text-lg text-white text-center">{DetailWork.description}</p>

                        <div className="flex flex-col lg:flex-row mb-18 items-center justify-center">
                            {DetailWork.images && DetailWork.images.length > 0 && (
                                <div className="w-[65vw] lg:w-[50vw] lg:mb-32 xl:w-[35vw] xl:mt-0 xl:ml-18 cursor-pointer">
                                    <Caroussel
                                        items={DetailWork.images.map((image) => ({
                                            image: image.url,
                                            onClick: () => handleImageClick(image.url),
                                        }))}
                                        showArrows={false}
                                        showDots={true}
                                        Component={ImageComponent}
                                        currentIndex={DetailWork.images.findIndex((img) => img.url === currentImage) || 0}
                                    />
                                </div>
                            )}

                            <div className="pt-8 md:p-10 md:pl-8 lg:p-4 text-white flex-grow">
                                <p className="text-lg mt-10 sm:text-center">{DetailWork.detail}</p>
                                <p className="text-lg mt-18 italic text-center font-extralight md:pr-18 md:pl-18 pb-6 xl:pr-36 xl:pl-36">
                                    &quot;{DetailWork.quote}&quot;
                                </p>
                                <div className="flex justify-end pr-18 xl:pr-36 xl:pl-36">
                                    <span className="text-lg italic font-extralight">
                                        - {DetailWork.author}
                                    </span>
                                </div>

                                <div className="flex flex-row justify-start gap-20 mt-18">
                                    {DetailWork.linkThingiverse && (
                                        <div className="flex flex-col items-center">
                                            <p className="text-lg mt-10">Get model?</p>
                                            <a href={DetailWork.linkThingiverse} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src="/Images/Cults.png"
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
                    </div>
                )}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 pt-10">
                        <div className="relative w-[80vw] h-[95vh] overflow-hidden flex flex-col">
                            <button
                                className="absolute top-4 right-4 text-white text-4xl z-50 cursor-pointer"
                                onClick={closeModal}
                            >
                                &#10005;
                            </button>

                            <div className="flex justify-center items-center h-[75%]">
                                <ImageComponent image={currentImage!} onClick={() => { }} isModal={true} />
                            </div>

                            <div className="flex justify-center overflow-y-auto space-x-4 py-4 mt-8 mb-8">
                                {DetailWork?.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.url}
                                        alt={`Imagen adicional de ${DetailWork.title}`}
                                        className={`rounded-lg cursor-pointer h-[125px] ${currentImage === image.url ? 'opacity-100' : 'opacity-50'}`}
                                        onClick={() => handleImageSelect(image.url)}
                                    />
                                ))}
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
