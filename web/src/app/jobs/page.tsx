'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface Work {
    id: number;
    title: string;
    description: string;
    category: string;
    tags: string[];
    images: { url: string; id: number }[];
}

const JobsPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<'3d-print' | 'models' | 'all'>('all');
    const [searchText, setSearchText] = useState('');
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tab = searchParams.get('tab');
        setActiveTab(tab === 'models' || tab === '3d-print' || tab === 'all' ? tab as '3d-print' | 'models' | 'all' : 'all');
    }, [searchParams]);

    useEffect(() => {
        const fetchWorks = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/items');
                const data = await response.json();
                console.log('Datos de la API:', data);

                if (Array.isArray(data)) {
                    const formattedData = data.map((work: any) => {
                        return {
                            ...work,
                            images: work.images || [],
                        };
                    });

                    console.log(formattedData);
                    setWorks(formattedData);
                } else {
                    console.error('Datos no válidos:', data);
                }
            } catch (error) {
                console.error('Error al cargar trabajos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    console.log(works);

    const handleTabClick = (tab: '3d-print' | 'models' | 'all') => {
        setActiveTab(tab);
        router.push(`/jobs?tab=${tab}`);
    };

    const menuItems = [
        <Link key="home" href="/">Home</Link>,
        <Link key="contact" href="/contact">Contact</Link>,
    ];

    const filteredWorks = works.filter((work: Work) => {
        const matchesCategory = activeTab === 'all' || work.category === activeTab;
        const matchesSearch =
            work.title.toLowerCase().includes(searchText.toLowerCase()) ||
            work.description.toLowerCase().includes(searchText.toLowerCase()) ||
            work.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const handleImageClick = (workId: number) => {
        router.push(`/detail/${workId}`);
    };

    return (
        <div className="bg-cover bg-top bg-fixed bg-no-repeat" style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('/images/plantRoom.jpg')"
        }}>
            <Header menuItems={menuItems} />
            <div className="flex flex-col items-center text-white pt-[10vh] bg-transparent">

                <div className="flex flex-col md:flex-row items-center justify-center mb-4 w-full max-w-md space-x-20">
                    <div className="flex space-x-5">
                        <button
                            key="all"
                            onClick={() => handleTabClick('all')}
                            className={`w-auto bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 h-12 ${activeTab === 'all' ? 'ring-2 ring-blue-400' : ''}`}
                        >
                            All
                        </button>
                        <button
                            key="models"
                            onClick={() => handleTabClick('models')}
                            className={`bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-green-400 focus:ring-2 focus:ring-green-400 h-12 ${activeTab === 'models' ? 'ring-2 ring-green-400' : ''}`}
                        >
                            3DModels
                        </button>
                        <button
                            key="3d-print"
                            onClick={() => handleTabClick('3d-print')}
                            className={`bg-white bg-opacity-40 hover:bg-opacity-60 text-white font-semibold py-2 px-4 rounded transition duration-200 border border-transparent focus:border-red-400 focus:ring-2 focus:ring-red-400 h-12 ${activeTab === '3d-print' ? 'ring-2 ring-red-400' : ''}`}
                        >
                            3DPrints
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Looking for something?"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="p-2 mb-4 mt-4 md:mt-0 md:mb-0 mr-4 rounded bg-white bg-opacity-40 text-white placeholder:text-gray-400 flex-grow border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition duration-200 h-12"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 p-10">
                    {loading ? (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center text-xl text-white h-[100vh]">
                            Loading...
                        </div>
                    ) : filteredWorks.length > 0 ? (
                        filteredWorks.map((work) => (
                            <div key={work.id} className="rounded-lg p-4 shadow-lg flex flex-col justify-center items-center text-center">
                                <h3 className="font-bold text-xl mb-2">{work.title}</h3>
                                <p>{work.description}</p>
                                <img
                                    src={work.images.length > 0 ? work.images[0].url : '/default-image.jpg'}
                                    className="w-full h-auto object-cover mt-10 rounded-full aspect-square hover:scale-110 transform transition duration-300 cursor-pointer"
                                    alt={`Imagen de ${work.title}`}
                                    onClick={() => handleImageClick(work.id)}
                                    width={500} // Establecer un ancho apropiado
                                    height={500} // Establecer una altura apropiada
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center text-center text-xl text-white h-[100vh]">
                            Sorry, I have not worked on this yet! Keep in touch!
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </div>
    );
};

// Componente que envuelve JobsPage en Suspense
const Page = () => {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <JobsPage />
        </Suspense>
    );
};

export default Page;
