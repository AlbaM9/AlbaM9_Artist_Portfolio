import React from 'react';

interface Props {
    any?: any;
}

const AboutMe: React.FC<Props> = () => {
    return (
        <section className="flex flex-col items-center mt-[7vh] p-4 sm:p-8 lg:p-12 mb-">
            <h1 className="text-white text-2xl md:text-4xl mb-16">About Me</h1>
            <section className="flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 w-full">
                <section className="desc flex flex-col items-center justify-center lg:w-[50vw]">
                    <p className="p-5 text-white text-lg w-[75%]">
                        Hi! I’m Alba, a visual artist with a lifelong passion for creativity, and more recently, a programmer and 3D modeler. From my earliest sketches to the digital pieces I create today, I’ve always loved expressing ideas through form, color, and texture.
                    </p>
                    <p className="p-5 text-white text-lg w-[75%]">
                        As an adult, I discovered programming and 3D modeling, which opened up new creative possibilities. Coding allows me to build interactive designs, while 3D printing brings my ideas into the physical world.
                    </p>
                    <p className="p-5 text-white text-lg w-[75%]">
                        Whether I’m designing digital artwork or crafting 3D models, I’m passionate about blending art and technology. Thanks for visiting my portfolio—I hope you enjoy exploring my work as much as I’ve enjoyed creating it!
                    </p>
                </section>
                <section className="nameImage flex flex-col items-center lg:items-start text-white text-lg sm:text-xl p-4 sm:p-8">
                    <img
                        className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full object-cover"
                        src="/Images/logoinaleb.png"
                        alt="Alba Melchor Gómez"
                    />
                    <span className="text-md sm:text-lg font-semibold mt-4">Alba Melchor Gómez</span>
                    <span className="text-sm sm:text-base">Full Stack Developer & 3D Artist</span>
                </section>
            </section>
        </section>
    );
}

export default AboutMe;
