import { useState } from "react";
import { useCarritoStore } from "@/store/useCarritoStore";
import { primaryButton, secondaryButton, disabledButton } from "@/styles/buttons";

interface Variante {
  modelo?: string;
  medida?: string;
  material?: string;
  descripcion?: string;
}

interface Producto {
  _id: string;
  nombre: string;
  descripcion?: string;
  imagen?: {
    url?: string;
  };
  variantes?: Variante[];
}

interface Props {
  abierto: boolean;
  cerrar: () => void;
  producto: Producto | null;
}

export default function AgregarProductoModal({ abierto, cerrar, producto }: Props) {
  const [varianteSeleccionada, setVarianteSeleccionada] = useState<Variante | null>(null);
  const [cantidad, setCantidad] = useState("");

  const agregarItem = useCarritoStore((state) => state.agregarItem);

  if (!abierto || !producto) return null;

  const handleAgregar = () => {
    const cantidadNum = parseInt(cantidad);
    if (!varianteSeleccionada || isNaN(cantidadNum) || cantidadNum < 1) return;

    agregarItem({ producto, variante: varianteSeleccionada, cantidad: cantidadNum });
    cerrar();
    setCantidad("");
    setVarianteSeleccionada(null);
  };

  const deshabilitar = !varianteSeleccionada || !cantidad || parseInt(cantidad) < 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-6 relative text-sm text-gray-800">
        <button
          onClick={cerrar}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-2 text-rojo">Agregar al pedido</h2>

        <img
          src={producto.imagen?.url || "/placeholder.jpg"}
          alt={producto.nombre}
          className="w-full h-40 object-cover rounded mb-3"
        />

        <p className="font-semibold">{producto.nombre}</p>
        {producto.descripcion && (
          <p className="text-gray-600 text-sm mb-2">{producto.descripcion}</p>
        )}

        <div className="mb-3">
          <p className="font-medium mb-1">Selecciona una variante:</p>
          <div className="flex flex-wrap gap-2">
            {producto.variantes?.map((v, i) => (
              <button
                key={i}
                onClick={() => setVarianteSeleccionada(v)}
                className={`px-3 py-1 rounded border text-sm ${
                  varianteSeleccionada === v
                    ? "bg-rojo text-white"
                    : "bg-white text-gray-800 border-gray-300"
                }`}
              >
                {v.modelo || "Sin modelo"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cantidad:</label>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full border rounded px-3 py-1 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={cerrar} className={secondaryButton}>
            Cancelar
          </button>
          <button
            onClick={handleAgregar}
            disabled={deshabilitar}
            className={`${primaryButton} ${deshabilitar ? disabledButton : ""}`}
          >
            Agregar al pedido
          </button>
        </div>
      </div>
    </div>
  );
}
