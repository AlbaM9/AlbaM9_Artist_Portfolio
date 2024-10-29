// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        dancing: ['Dancing Script'],
      },
      spacing: {
        // Añade valores personalizados aquí
        '18': '4.5rem',  // gap-18 por ejemplo
        '22': '5.5rem',  // gap-22 por ejemplo
      },
    },
  },
  plugins: [],
};
