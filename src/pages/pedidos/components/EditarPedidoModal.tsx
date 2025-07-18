import { useState } from "react";
import type { Pedido } from "@/types/pedido";
import axios from "@/lib/axiosInstance";
import { toast } from "sonner";
import {
  modalOverlay,
  modalContainer,
  modalHeader,
  modalBody,
  modalFooter,
  closeButton,
} from "@/styles/modals";
import { primaryButton, secondaryButton } from "@/styles/buttons";
import { X } from "lucide-react";

interface Props {
  abierto: boolean;
  cerrar: () => void;
  pedido: Pedido;
  onEditado: () => void;
}

export default function EditarPedidoModal({
  abierto,
  cerrar,
  pedido,
  onEditado,
}: Props) {
  const [estado, setEstado] = useState<Pedido["estado"]>(
    pedido?.estado || "pendiente"
  );
  const [cargando, setCargando] = useState(false);

  const handleGuardar = async () => {
    setCargando(true);
    try {
      await axios.put(`/pedidos/${pedido._id}`, { estado });
      toast.success("Pedido actualizado");
      onEditado();
      cerrar();
    } catch {
      toast.error("Error al actualizar el pedido");
    } finally {
      setCargando(false);
    }
  };

  if (!abierto) return null;

  // Determinar si el pedido es editable
  const esEditable = pedido.estado === "pendiente";

  return (
    <div className={modalOverlay}>
      <div className={modalContainer}>
        {/* Encabezado */}
        <header className={modalHeader}>
          <h2 className="text-lg font-semibold">Editar pedido</h2>
          <button onClick={cerrar} className={closeButton}>
            <X size={20} />
          </button>
        </header>

        {/* Cuerpo */}
        <div className={modalBody}>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Estado del pedido:
          </label>

          {esEditable ? (
            <select
  value={estado}
  onChange={(e) => setEstado(e.target.value as Pedido["estado"])}
  className="w-full border rounded px-3 py-2 text-sm"
  disabled={pedido.estado === "cancelado"} // si es cancelado, no editable
>
  {["pendiente", "procesado", "cancelado"]
    .filter((opcion) => {
      if (pedido.estado === "cancelado") return false; // no editable
      if (pedido.estado === "procesado" && opcion === "pendiente") return false;
      return true;
    })
    .map((opcion) => (
      <option key={opcion} value={opcion}>
        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
      </option>
    ))}
</select>


          ) : (
            <p className="text-sm text-gray-600 italic">
              Este pedido no se puede modificar desde su estado actual.
            </p>
          )}
        </div>

        {/* Footer fijo */}
        <footer className={modalFooter}>
  <button onClick={cerrar} className={secondaryButton}>
    Cerrar
  </button>
  {esEditable && (
    <button
      onClick={handleGuardar}
      className={primaryButton}
      disabled={cargando}
    >
      Guardar
    </button>
  )}
</footer>

      </div>
    </div>
  );
}
