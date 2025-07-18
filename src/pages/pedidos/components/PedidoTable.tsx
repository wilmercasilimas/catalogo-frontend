import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Pedido } from "@/types/pedido";
import ConfirmarEliminarModal from "@/components/ui/ConfirmarModal";
import VerPedidoModal from "@/pages/pedidos/components/VerPedidoModal";
import EditarPedidoModal from "@/pages/pedidos/components/EditarPedidoModal";
import axios from "@/lib/axiosInstance";
import { toast } from "sonner";
import {
  tableBase,
  tableHeader,
  tableHeaderCell,
  tableRow,
  tableCell,
  verDetallesBtn,
  badgeEstado,
} from "@/styles/tables";

interface Props {
  pedidos: Pedido[];
  actualizar: () => void;
}

export default function PedidoTable({ pedidos, actualizar }: Props) {
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null);
  const [modoEditar, setModoEditar] = useState(false);

  const handleVer = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setModoEditar(false);
  };

  const handleEditar = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setModoEditar(true);
  };

  const cerrarModales = () => setPedidoSeleccionado(null);

  const confirmarEliminar = (id: string) => {
    setIdAEliminar(id);
    setMostrarConfirmar(true);
  };

  const handleEliminar = async () => {
    if (!idAEliminar) return;
    try {
      await axios.delete(`/pedidos/${idAEliminar}`);
      toast.success("Pedido eliminado correctamente");
      actualizar();
    } catch {
      toast.error("Error al eliminar el pedido");
    } finally {
      setMostrarConfirmar(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <VerPedidoModal abierto={!!pedidoSeleccionado && !modoEditar} cerrar={cerrarModales} pedido={pedidoSeleccionado!} />
      <EditarPedidoModal abierto={!!pedidoSeleccionado && modoEditar} cerrar={cerrarModales} pedido={pedidoSeleccionado!} onEditado={actualizar} />

      <ConfirmarEliminarModal
        abierto={mostrarConfirmar}
        mensaje="¿Deseas eliminar este pedido?"
        onConfirmar={handleEliminar}
        onCancelar={() => setMostrarConfirmar(false)}
      />

      <table className={tableBase}>
        <thead className={tableHeader}>
          <tr>
            <th className={tableHeaderCell}>Cliente</th>
            <th className={tableHeaderCell}>Fecha</th>
            <th className={tableHeaderCell}>Estado</th>
            <th className={tableHeaderCell}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p._id} className={tableRow}>
  <td className={tableCell}>{p.nombre}</td>
  <td className={tableCell}>{new Date(p.creadoEn).toLocaleDateString()}</td>
  <td className={tableCell}>
    <span className={badgeEstado(p.estado)}>{p.estado}</span>
  </td>
  <td className={tableCell + " flex gap-2"}>
    <button onClick={() => handleVer(p)} className={verDetallesBtn}><Eye className="w-4 h-4" /></button>
    <button onClick={() => handleEditar(p)} className={verDetallesBtn}><Pencil className="w-4 h-4" /></button>
    <button onClick={() => confirmarEliminar(p._id)} className={verDetallesBtn}><Trash2 className="w-4 h-4" /></button>
  </td>
</tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}