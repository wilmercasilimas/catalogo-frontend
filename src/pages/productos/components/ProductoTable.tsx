import type { Producto } from "@/types/producto";
import Acciones from "./Acciones";
import { Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import VerProductoModal from "./VerProductoModal";
import ConfirmarEliminarModal from "@/components/ui/ConfirmarModal";
// ✅ nuevo modal
import axios from "@/lib/axiosInstance";
import {
  tableBase,
  tableHeader,
  tableHeaderCell,
  tableRow,
  tableCell,
  tdImg,
  tdImgPreview,
  tdSinValor,
  tdVariantes,
  badgeModelo,
  verDetallesBtn,
} from "@/styles/tables";

interface Props {
  productos: Producto[];
  onEditar: (producto: Producto) => void;
}

export default function ProductoTable({ productos, onEditar }: Props) {
  const [productoDetalle, setProductoDetalle] = useState<Producto | null>(null);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null);

  const confirmarEliminar = (id: string) => {
    setIdAEliminar(id);
    setMostrarConfirmar(true);
  };

  const handleEliminar = async () => {
    if (!idAEliminar) return;
    try {
      await axios.delete(`/productos/${idAEliminar}`);
      toast.success("Producto eliminado correctamente");
      window.location.reload();
    } catch {
      toast.error("Error al eliminar el producto");
    } finally {
      setMostrarConfirmar(false);
    }
  };

  const handleToggleEstado = async (id: string) => {
    try {
      const producto = productos.find((p) => p._id === id);
      if (!producto) return;

      await axios.patch(`/productos/${id}/estado`, {
        estado: !producto.estado,
      });

      toast.success("Estado actualizado correctamente");
      window.location.reload();
    } catch {
      toast.error("Error al cambiar el estado del producto.");
    }
  };

  const handleVerDetalle = (producto: Producto) => {
    setProductoDetalle(producto);
  };

  const cerrarModalDetalle = () => setProductoDetalle(null);

  return (
    <div className="space-y-4">
      <VerProductoModal
        abierto={!!productoDetalle}
        cerrar={cerrarModalDetalle}
        producto={productoDetalle!}
      />

      <ConfirmarEliminarModal
        abierto={mostrarConfirmar}
        mensaje="¿Estás seguro de eliminar este producto?"
        onConfirmar={handleEliminar}
        onCancelar={() => setMostrarConfirmar(false)}
      />

      {/* Versión tabla para pantallas grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className={tableBase}>
          <thead className={tableHeader}>
            <tr>
              <th className={tableHeaderCell}>Imagen</th>
              <th className={tableHeaderCell}>Nombre</th>
              <th className={tableHeaderCell}>Categoría</th>
              <th className={tableHeaderCell}>Tipo</th>
              <th className={tableHeaderCell}>Variantes</th>
              <th className={tableHeaderCell}>Estado</th>
              <th className={tableHeaderCell}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto._id} className={tableRow}>
                <td className={tdImg}>
                  {producto.imagen?.secure_url ? (
                    <img
                      src={producto.imagen.secure_url}
                      alt={producto.nombre}
                      className={tdImgPreview}
                    />
                  ) : (
                    <span className={tdSinValor}>Sin imagen</span>
                  )}
                </td>
                <td className={tableCell + " font-medium"}>
                  {producto.nombre}
                </td>
                <td className={tableCell}>
                  <span translate="no">{producto.categoria}</span>
                </td>
                <td className={tableCell}>{producto.tipo}</td>
                <td className={tdVariantes}>
                  {producto.variantes?.length > 0 ? (
                    producto.variantes.map((v, index) => (
                      <div key={index} className={badgeModelo}>
                        Modelo: {v.modelo}
                      </div>
                    ))
                  ) : (
                    <span className={tdSinValor}>Sin variantes</span>
                  )}
                </td>
                <td className={tableCell}>
                  {producto.estado ? "Disponible" : "No disponible"}
                </td>
                <td className={tableCell}>
                  <Acciones
                    id={producto._id}
                    estado={producto.estado}
                    onEliminar={confirmarEliminar}
                    onToggleEstado={handleToggleEstado}
                    onEditar={() => onEditar(producto)}
                  />
                  <button
                    onClick={() => handleVerDetalle(producto)}
                    className={verDetallesBtn}
                  >
                    <Eye className="w-4 h-4" />
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Versión móvil tipo "card" */}
      <div className="md:hidden space-y-4">
        {productos.map((producto) => (
          <div
            key={producto._id}
            className="bg-white shadow rounded p-4 space-y-2"
          >
            <div className="flex items-center gap-4">
              {producto.imagen?.secure_url ? (
                <img
                  src={producto.imagen.secure_url}
                  alt={producto.nombre}
                  className="w-16 h-16 object-cover rounded border"
                />
              ) : (
                <span className="text-gray-400 italic text-sm">Sin imagen</span>
              )}
              <div>
                <p className="font-semibold text-gray-800">{producto.nombre}</p>
                <p className="text-xs text-gray-500" translate="no">
                  {producto.categoria}
                </p>

                <p className="text-xs text-gray-500">{producto.tipo}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold">Variantes:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {producto.variantes?.length > 0 ? (
                  producto.variantes.map((v, i) => (
                    <span key={i} className={badgeModelo}>
                      {v.modelo}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 italic text-xs">
                    Sin variantes
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs">
              Estado:{" "}
              <span className="font-medium">
                {producto.estado ? "disponible" : "No disponible"}
              </span>
            </p>

            <div className="flex items-center justify-between mt-2">
              <Acciones
                id={producto._id}
                estado={producto.estado}
                onEliminar={confirmarEliminar}
                onToggleEstado={handleToggleEstado}
                onEditar={() => onEditar(producto)}
              />
              <button
                onClick={() => handleVerDetalle(producto)}
                className={verDetallesBtn}
              >
                <Eye className="w-4 h-4" />
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
