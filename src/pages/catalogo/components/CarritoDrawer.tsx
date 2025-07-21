import { useCarritoStore } from "@/store/useCarritoStore";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

export default function CarritoDrawer({ onClose }: Props) {
  const { items, eliminarItem } = useCarritoStore();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro semitransparente */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Drawer lateral */}
      <div className="relative w-full max-w-sm bg-white shadow-lg h-full p-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          title="Cerrar"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-rojo mb-4">🛒 Tu pedido</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay productos en el carrito.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="border rounded p-3 flex flex-col bg-gray-50 shadow-sm"
              >
                <p className="font-semibold text-gray-800">{item.producto.nombre}</p>
                <p className="text-sm text-gray-600">
                  Variante: <strong>{item.variante.modelo || "Sin modelo"}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Cantidad: <strong>{item.cantidad}</strong>
                </p>
                <button
                  onClick={() => eliminarItem(index)}
                  className="mt-2 text-xs text-red-500 hover:underline self-end"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
