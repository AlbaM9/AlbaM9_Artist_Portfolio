"use client";
import React, { useState } from 'react';
import workItems from '../workItems.json';

import '../globals.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';


interface workItems {
    id: number;
    title: string;
    description: string;
    category: '2d-print' | 'models'; // Define las categorías posibles (elimino 'all' porque no es una categoría)
    images: string[];
}


const JobsPage: React.FC<any> = () => {
    const [activeTab, setActiveTab] = useState<'2d-print' | 'models' | 'all'>('all');

    // Filtrar los trabajos según la categoría seleccionada
    const filteredWorks = activeTab === 'all'
        ? workItems  // Mostrar todos los trabajos si la pestaña activa es 'all'
        : workItems.filter((work) => work.category === activeTab);

    return (
        <div
            className="bg-cover bg-top bg-fixed bg-no-repeat"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),  url('/images/plantRoom.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
            <Header />
            <div className="flex flex-col items-center  text-white p-10  ">
                {/* Pestañas para seleccionar entre "2D Print" y "Models" */}
                <div className="flex justify-center mb-4 mt-28">

                    <button
                        className={`px-4 py-2 rounded-r-lg ${activeTab === 'all' ? 'bg-slate-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveTab('all')}
                    >
                        Todos
                    </button>
                    <button
                        className={`px-4 py-2 rounded-l-lg ${activeTab === '2d-print' ? 'bg-slate-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveTab('2d-print')}
                    >
                        2D Print
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'models' ? 'bg-slate-500 text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => setActiveTab('models')}
                    >
                        Models
                    </button>
                    {/* Botón para ver todos los trabajos */}

                </div>

                {/* Listado de trabajos filtrados */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredWorks.map((work) => (
                        <div key={work.id} className="rounded-lg p-4 shadow-lg">
                            <h3 className="font-bold text-xl mb-2">{work.title}</h3>
                            <p>{work.description}</p>
                            <img src={work.images[0]} className="w-full h-auto object-cover mt-4 rounded-full aspect-square " alt={`Imagen de ${work.title}`} />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

        </div>
    );
};


export default JobsPage;
