"use client";

// app/contact/page.tsx
import React, { useState } from 'react';
import '../globals.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import Link from 'next/link'; // Importa el Link de Next.js
import emailjs from 'emailjs-com';


const menuItems = [
    <Link href="/" className="text-white cursor-pointer hover:text-gray-600 hover:scale-110 transform transition duration-300">Home

    </Link>,
    <Link href="/jobs" className="text-white cursor-pointer hover:text-gray-600 hover:scale-110 transform transition duration-300">Jobs

    </Link>,
];


const ContactForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm(
            process.env.NEXT_PUBLIC_SERVICE_ID as string,  // Service ID
            process.env.NEXT_PUBLIC_TEMPLATE_ID as string, // Template ID
            e.currentTarget,                   // Form element
            process.env.NEXT_PUBLIC_USER_ID as string
        )
            .then((result) => {
                console.log(result.text);
                setSuccess(true);
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            }, (error) => {
                console.log(error.text);
                setError('Error al enviar el correo. Inténtalo de nuevo más tarde.');
            });
    };

    return (
        <div
            className=""
            style={{
                backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),  url('/images/playground.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",


            }}
        >

            <Header menuItems={menuItems} />
            <section className="flex flex-col items-center h-[100vh] text-white p-10 "

            >
                <h2 className="text-4xl mb-6 mt-[5vh]">Contact Me</h2>
                {success && <p className="text-green-400">Email sent successfully!</p>}
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={sendEmail} className="w-full max-w-lg p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-semibold mb-2">Subject:</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                            className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-semibold mb-2">Description:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full p-2 rounded-lg bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-lg border  border-white text-white p-2 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:border-black hover:text-black transform hover:scale-110 hover:opacity-60"
                    >
                        Send
                    </button>
                </form>
            </section>

            <Footer />

        </div>
    );
}

export default ContactForm;
