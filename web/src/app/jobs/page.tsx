'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import workItems from '../workItems.json'; // Ajusta la ruta según sea necesario
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Work {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    images: string[];
}

const JobsPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'2d-print' | 'models' | 'all'>('all');
    const [searchText, setSearchText] = useState('');

    // Effecto para obtener la pestaña activa
    useEffect(() => {
        const tab = searchParams.get('tab');
        setActiveTab(tab === 'models' || tab === '2d-print' || tab === 'all' ? tab as '2d-print' | 'models' | 'all' : 'all');
    }, [searchParams]);

    // Cambia la ruta y el estado activo de la pestaña
    const handleTabClick = (tab: '2d-print' | 'models' | 'all') => {
        setActiveTab(tab);
        router.push(`/jobs?tab=${tab}`);
    };

    const menuItems = [
        <Link key="home" href="/">Home</Link>,
        <Link key="contact" href="/contact">Contact</Link>,
    ];

    // Filtrar trabajos según la categoría y la búsqueda
    const filteredWorks = workItems.filter((work: Work) => {
        const matchesCategory = activeTab === 'all' || work.category === activeTab;
        const matchesSearch =
            work.title.toLowerCase().includes(searchText.toLowerCase()) ||
            work.description.toLowerCase().includes(searchText.toLowerCase()) ||
            work.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase())); // Filtrado por tags

        return matchesCategory && matchesSearch;
    });


    const handleImageClick = (workId: number) => {
        router.push(`/detail/${workId}`); // Redirige a la página de detalle con el ID del trabajo
    };

    return (
        <div className="bg-cover bg-top bg-fixed bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('/images/plantRoom.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className="flex flex-col items-center text-white pt-[10vh] bg-transparent ">
                {/* Contenedor para el campo de búsqueda y botones */}
                <div className="flex flex-col md:flex-row items-center justify-center mb-4 w-full max-w-md space-x-20">
                    <div className="flex space-x-5">
                        <button
                            key="all"
                            onClick={() => handleTabClick('all')}
                            className={`w-auto bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 h-12 ${activeTab === 'all' ? 'ring-2 ring-blue-400' : ''}`} // Añadir efecto de halo
                        >
                            All
                        </button>
                        <button
                            key="models"
                            onClick={() => handleTabClick('models')}
                            className={`bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 h-12 ${activeTab === 'models' ? 'ring-2 ring-green-400' : ''}`} // Añadir efecto de halo
                        >
                            3DModels
                        </button>
                        <button
                            key="2d-print"
                            onClick={() => handleTabClick('2d-print')}
                            className={`bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-red-400 focus:ring-2 focus:ring-red-400 h-12 ${activeTab === '2d-print' ? 'ring-2 ring-red-400' : ''}`} // Añadir efecto de halo
                        >
                            3DPrints
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Looking for something?"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="p-2 mb-4 md:mb-0 mr-4 rounded bg-white bg-opacity-40 text-white placeholder:text-gray-400 flex-grow border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200 h-12"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10">
                    {filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <div key={work.id} className="rounded-lg p-4 shadow-lg flex flex-col justify-center items-center text-center">
                                <h3 className="font-bold text-xl mb-2">{work.title}</h3>
                                <p>{work.description}</p>

                                <img
                                    src={work.images[0]}
                                    className="w-full h-auto object-cover mt-10 rounded-full aspect-square hover:scale-110 transform transition duration-300 cursor-pointer"
                                    alt={`Imagen de ${work.title}`}
                                    onClick={() => handleImageClick(work.id)} // Pasa el ID del trabajo al hacer clic
                                />

                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center text-xl text-white h-[100vh]">
                            "Sorry, I have not worked on this yet! Keep in touch :)"
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );

};

export default JobsPage;
