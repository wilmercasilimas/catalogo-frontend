// src/pages/catalogo/components/FormularioClienteModal.tsx
import { useState } from "react";
import { useCarritoStore } from "@/store/useCarritoStore";
import { primaryButton, secondaryButton } from "@/styles/buttons";
import axios from "@/lib/axiosInstance";

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

export default function FormularioClienteModal({ abierto, cerrar }: Props) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");
  const [codigoPedido, setCodigoPedido] = useState("");
  const [resumenPedido, setResumenPedido] = useState<typeof items>([]);

  const items = useCarritoStore((state) => state.items);
  const limpiarCarrito = useCarritoStore((state) => state.limpiar);

  if (!abierto) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nombre || !correo || !telefono || !empresa || items.length === 0) return;

    try {
      const response = await axios.post("/pedidos", {
        cliente: { nombre, email: correo, telefono, empresa },
        items: items.map((item) => ({
          producto: item.producto._id,
          variante: item.variante,
          cantidad: item.cantidad,
        })),
      });

      if (
        response &&
        typeof response.data === "object" &&
        "codigo" in response.data &&
        typeof response.data.codigo === "string"
      ) {
        setCodigoPedido(response.data.codigo);
        setResumenPedido([...items]); // ✅ guardar antes de limpiar
        setMensajeEnviado(
          `Gracias, ${nombre}. Tu pedido fue recibido con el código ${response.data.codigo}. Te escribiremos a ${correo} en breve.`
        );
      } else {
        setMensajeEnviado("Pedido enviado pero no se recibió un código de confirmación.");
      }

      limpiarCarrito();
      setNombre("");
      setCorreo("");
      setTelefono("");
      setEmpresa("");
    } catch (error) {
      console.error("❌ Error al enviar pedido:", error);
      setMensajeEnviado("Hubo un error al procesar tu pedido. Por favor, intenta más tarde.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative text-sm">
        <button
          onClick={cerrar}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        {mensajeEnviado ? (
          <div className="text-green-700 font-semibold text-center py-6 space-y-4">
            <p>{mensajeEnviado}</p>

            {resumenPedido.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded p-4 text-left text-sm text-green-900">
                <p className="font-semibold mb-2">Resumen del pedido:</p>
                <ul className="space-y-2">
                  {resumenPedido.map((item, index) => (
                    <li key={index} className="border-b pb-1">
                      <p className="font-medium">
                        {item.producto.nombre || "Producto sin nombre"}
                      </p>
                      <p className="text-gray-700">
                        Variante: <strong>{item.variante.modelo || "Sin modelo"}</strong>
                        {" · "}Cantidad: <strong>{item.cantidad}</strong>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {codigoPedido && (
              <p className="text-sm text-gray-700">
                Guarda este código: <strong>{codigoPedido}</strong>
              </p>
            )}

            <button onClick={cerrar} className={primaryButton}>
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold text-rojo">Datos del Cliente</h2>

            <div>
              <label className="block font-medium mb-1">Nombre completo:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Correo electrónico:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Teléfono:</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Empresa:</label>
              <input
                type="text"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={cerrar}
                className={secondaryButton}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={primaryButton}
              >
                Enviar pedido
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
