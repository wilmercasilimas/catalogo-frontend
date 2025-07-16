export const modalOverlay =
  "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

export const modalContainer =
  "w-full max-w-2xl h-full md:h-auto max-h-[95vh] md:max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden mx-4 sm:mx-6"; // ← ajuste móvil

export const modalHeader =
  "flex justify-between items-center px-6 py-4 border-b text-lg font-semibold text-rojoIncendio";

export const modalBody =
  "overflow-y-auto max-h-[calc(100vh-12rem)] px-6 py-4 space-y-4 overflow-x-hidden"; // ← evita scroll horizontal

export const modalFooter =
  "flex justify-end px-6 py-4 border-t bg-white sticky bottom-0 z-10";

export const closeButton =
  "text-gray-500 hover:text-red-600 transition-colors";
