// src/styles/inputs.ts

export const baseInput =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rojoIncendio";

export const textInput = baseInput;

export const textareaInput = baseInput + " resize-none";

export const fileInput =
  "block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-rojoIncendio file:text-white hover:file:bg-red-700 cursor-pointer";

export const selectInput = baseInput + " bg-white cursor-pointer";
