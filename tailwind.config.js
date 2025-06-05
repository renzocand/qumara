/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        qumara: {
          primary: "#EEDCB6",   // crema
          dark: "#0A3732",      // verde oscuro
          accent: "#FFD700",    // amarillo
        },
      },
    },
  },
  plugins: [],
};
