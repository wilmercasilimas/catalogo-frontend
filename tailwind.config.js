/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rojoIncendio: '#B91C1C',     // tono profesional alusivo al fuego
        grisOscuro: '#1F2937',       // fondo o texto neutro
        verdeAccion: '#16A34A',      // botones de acción
      },
    },
  },
  plugins: [],
}
