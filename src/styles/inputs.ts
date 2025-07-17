// src/styles/inputs.ts

export const baseInput =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rojoIncendio";

export const textInput = baseInput;

export const textareaInput = baseInput + " resize-none";

export const fileInput =
  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-rojoIncendio file:text-white hover:file:bg-red-700 cursor-pointer";

export const selectInput = baseInput + " bg-white cursor-pointer";

// Estilos para el buscador inteligente
export const buscadorWrapper = "w-full max-w-xl mx-auto px-2 sm:px-4";
export const buscadorContainer = "relative w-full";
export const buscadorInput =
  "w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-rojoIncendio focus:border-rojoIncendio transition placeholder:text-sm";
export const buscadorIcono =
  "absolute top-1/2 left-3 -translate-y-1/2 text-gray-400";
