import type { Pedido } from "@/types/pedido";

interface Props {
  abierto: boolean;
  cerrar: () => void;
  pedido: Pedido;
}

function parseFechaPedido(fecha?: string): string {
  if (!fecha || typeof fecha !== "string") return "Sin fecha";

  const date = new Date(fecha);

  return isNaN(date.getTime())
    ? "Sin fecha"
    : date.toLocaleDateString("es-VE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
}


export default function VerPedidoModal({ abierto, cerrar, pedido }: Props) {
  if (!abierto || !pedido) return null;

  const {
    _id,
    codigo,
    estado,
    nombre,
    correo,
    telefono,
    empresa,
    productos,
    creadoEn,
  } = pedido;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative text-sm text-gray-800">
        <button
          onClick={cerrar}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-rojo mb-4">Detalle del pedido</h2>

        <div className="space-y-2">
          <p><strong>Identificación:</strong> {_id || "N/A"}</p>
          <p><strong>Código:</strong> {codigo || "N/A"}</p>
          <p>
            <strong>Estado:</strong>
            <span className={`ml-2 px-2 py-1 rounded text-xs uppercase font-medium 
              ${estado === "pendiente"
                ? "bg-yellow-100 text-yellow-800"
                : estado === "procesado"
                ? "bg-blue-100 text-blue-800"
                : estado === "enviado"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"}`}>
              {estado}
            </span>
          </p>

          <hr className="my-2" />

          <p><strong>Cliente:</strong> {nombre || "N/A"}</p>
          <p><strong>Correo:</strong> {correo || "N/A"}</p>
          <p><strong>Teléfono:</strong> {telefono || "N/A"}</p>
          {empresa && <p><strong>Empresa:</strong> {empresa}</p>}
          <p><strong>Fecha:</strong> {parseFechaPedido(creadoEn)}</p>

          {Array.isArray(productos) && productos.length > 0 && (
  <div className="mt-4">
    <p className="font-medium text-sm">Productos:</p>
    <ul className="mt-1 list-disc pl-5 text-sm text-gray-700 space-y-1">
      {productos.map((item, index) => (
        <li key={index}>
          <span className="font-semibold">{item.descripcion || item.nombre}</span>{" "}
          — Modelo: <span className="font-medium">{item.modelo}</span> —{" "}
          Cantidad: <span className="text-gray-900">{item.cantidad}</span>
        </li>
      ))}
    </ul>
  </div>
)}

        </div>

        <div className="mt-6 text-right">
          <button
            onClick={cerrar}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
