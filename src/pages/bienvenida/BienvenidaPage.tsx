import { BotonAcceso } from "./BotonAcceso";
import { opcionesAcceso } from "./dataOpciones";

export default function BienvenidaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">

        {/* 🔥 Logo grande */}
        <img
          src="/FIRECAT.png"
          alt="Logo Firecat"
          className="h-28 w-auto sm:h-32"
        />

        {/* 🟥 Título */}
        <h1 className="text-2xl sm:text-3xl font-bold text-rojoIncendio leading-snug">
          Bienvenido al <br className="sm:hidden" />
          Catálogo de Productos
        </h1>

        {/* 🧭 Opciones de acceso */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {opcionesAcceso.map((op) => (
            <BotonAcceso
              key={op.id}
              icono={op.icono}
              titulo={op.titulo}
              descripcion={op.descripcion}
              ruta={op.ruta}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
