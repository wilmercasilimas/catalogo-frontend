import { useEffect, useState, useCallback } from "react";
import PedidoTable from "@/pages/pedidos/components/PedidoTable";
import BuscadorPedidos from "@/pages/pedidos/components/BuscadorPedidos";
import type { Pedido } from "@/types/pedido";
import axios from "@/lib/axiosInstance";
import { toast } from "sonner";

interface PedidoBackend {
  _id: string;
  cliente: {
    nombre?: string;
    email?: string;
    telefono?: string;
    empresa?: string;
  };
  items: {
    cantidad: number;
    variante?: {
      modelo?: string;
      medida?: string;
      material?: string;
      descripcion?: string;
    };
  }[];
  estado: string;
  codigo: string;
  createdAt: string;
  updatedAt: string;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const transformarPedido = (p: PedidoBackend): Pedido => ({
    _id: p._id,
    nombre: p.cliente?.nombre || "N/A",
    correo: p.cliente?.email || "N/A",
    telefono: p.cliente?.telefono || "N/A",
    empresa: p.cliente?.empresa || "",
    codigo: p.codigo || "N/A",
    productos:
      p.items?.map((el) => ({
        nombre: el.variante?.descripcion || "Producto sin descripción",
        modelo: el.variante?.modelo || "N/A",
        cantidad: el.cantidad || 0,
      })) || [],
    estado: p.estado as Pedido["estado"],
    creadoEn: p.createdAt,
    actualizadoEn: p.updatedAt,
  });

  const obtenerPedidos = useCallback(async () => {
    try {
      const { data } = await axios.get<PedidoBackend[]>("/pedidos");
      const transformados = data.map(transformarPedido);
      setPedidos(transformados);
    } catch {
      toast.error("Error al obtener los pedidos");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    obtenerPedidos();
  }, [obtenerPedidos]);

  const pedidosFiltrados = pedidos.filter((pedido) => {
  const termino = busqueda.toLowerCase();
  return (
    pedido.nombre.toLowerCase().includes(termino) ||
    pedido.empresa?.toLowerCase().includes(termino) || // 👈 protegido con ?
    pedido.codigo.toLowerCase().includes(termino)
  );
});


  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-zinc-800 mb-4">Gestión de Pedidos</h1>

      <BuscadorPedidos valor={busqueda} onChange={setBusqueda} />

      {cargando ? (
        <p className="text-gray-500">Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className="text-gray-500">No hay pedidos registrados.</p>
      ) : (
        <PedidoTable pedidos={pedidosFiltrados} actualizar={obtenerPedidos} />
      )}
    </div>
  );
}
