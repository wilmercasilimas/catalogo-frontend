import { X } from "lucide-react";
import {
  modalOverlay,
  modalHeader,
  closeButton,
  modalFooter,
} from "@/styles/modals";
import { primaryButton } from "@/styles/buttons";
import type { Producto } from "@/types/producto";

interface Props {
  abierto: boolean;
  cerrar: () => void;
  producto: Producto | null;
}

export default function VerProductoModal({ abierto, cerrar, producto }: Props) {
  if (!abierto || !producto) return null;

  return (
    <div className={modalOverlay}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-xl h-auto bg-white rounded-lg shadow-lg flex flex-col">
          <div className={modalHeader}>
            Detalles del producto
            <button onClick={cerrar} className={closeButton}>
              <X size={20} />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4 text-sm text-gray-800">
            <div>
              <p className="font-medium text-gray-600">Descripción:</p>
              <p>{producto.descripcion}</p>
            </div>

            <div>
              <p>
                Fecha de creación:{" "}
                {producto.createdAt
                  ? new Date(producto.createdAt).toLocaleString()
                  : "No disponible"}
              </p>
              <p>
                Última actualización:{" "}
                {producto.updatedAt
                  ? new Date(producto.updatedAt).toLocaleString()
                  : "No disponible"}
              </p>
            </div>
          </div>

          <div className={modalFooter}>
            <button onClick={cerrar} className={primaryButton}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
