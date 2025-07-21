// src/pages/catalogo/components/CarritoDrawer.tsx
import { useCarritoStore } from "@/store/useCarritoStore";
import { X } from "lucide-react";
import { primaryButton } from "@/styles/buttons";

interface Props {
  onClose: () => void;
  onFinalizar: () => void; // ✅ Agregado
}

export default function CarritoDrawer({ onClose, onFinalizar }: Props) {
  const { items, eliminarItem } = useCarritoStore();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fondo oscuro */}
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />

      {/* Drawer lateral */}
      <div className="relative w-full max-w-sm bg-white shadow-lg h-full p-4 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
          title="Cerrar"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold text-rojo mb-6 mt-1">🛒 Tu pedido</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No hay productos en el carrito.
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 border rounded p-3 shadow-sm"
                >
                  <img
                    src={item.producto.imagen?.url || "/placeholder.jpg"}
                    alt={item.producto.nombre}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-800">
                      {item.producto.nombre}
                    </p>
                    <p className="text-gray-600">
                      Variante:{" "}
                      <strong>{item.variante.modelo || "Sin modelo"}</strong>
                    </p>
                    <p className="text-gray-600">
                      Cantidad: <strong>{item.cantidad}</strong>
                    </p>
                    <button
                      onClick={() => eliminarItem(index)}
                      className="mt-2 text-xs text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* ✅ Botón Finalizar funcional */}
            <button
              className={`${primaryButton} mt-6 w-full`}
              onClick={onFinalizar}
            >
              Finalizar pedido
            </button>
          </>
        )}
      </div>
    </div>
  );
}
