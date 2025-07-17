import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ProductoTable from "@/pages/productos/components/ProductoTable";
import CrearProductoModal from "@/pages/productos/components/CrearProductoModal";
import EditarProductoModal from "@/pages/productos/components/EditarProductoModal";
import BuscadorProductos from "@/pages/productos/components/BuscadorProductos";

import type { Producto } from "@/types/producto";
import { Plus } from "lucide-react";
import { primaryButton } from "@/styles/buttons";
import { sectionBase, actionRow, dashboardSection } from "@/styles/layout";

type ProductoAPI = Omit<Producto, "imagen"> & {
  imagen?: {
    url: string;
    public_id: string;
  };
};

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState<Producto | null>(null);

  const cargarProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/productos?estado=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const productosNormalizados: Producto[] = (res.data as ProductoAPI[]).map(
        (p) => ({
          ...p,
          imagen: {
            secure_url: p.imagen?.url || "",
            public_id: p.imagen?.public_id || "",
          },
        })
      );

      setProductos(productosNormalizados);
      setProductosFiltrados(productosNormalizados);
    } catch {
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleBuscar = useCallback((termino: string) => {
    if (!termino.trim()) {
      setProductosFiltrados(productos);
      return;
    }

    const term = termino.toLowerCase();
    const filtrados = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.categoria.toLowerCase().includes(term)
    );

    setProductosFiltrados(filtrados);
  }, [productos]);

  return (
    <div className={`${sectionBase} ${dashboardSection}`}>
      <div className={actionRow}>
        <h2 className="text-xl font-bold text-rojo uppercase tracking-wide">
          Productos
        </h2>

        <button
          onClick={() => setModalAbierto(true)}
          className={`${primaryButton} flex items-center gap-2`}
        >
          <Plus size={18} className="block" />
          <span className="hidden md:inline uppercase tracking-wide">
            Crear producto
          </span>
        </button>
      </div>

      <div className="my-4">
        <BuscadorProductos onBuscar={handleBuscar} />
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-gray-600 text-sm">Cargando productos...</p>
        ) : error ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : (
          <ProductoTable
            productos={productosFiltrados}
            onEditar={(producto) => setProductoAEditar(producto)}
          />
        )}
      </div>

      <CrearProductoModal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        actualizarLista={cargarProductos}
      />

      {productoAEditar && (
        <EditarProductoModal
          abierto={!!productoAEditar}
          cerrar={() => setProductoAEditar(null)}
          producto={productoAEditar}
          actualizarLista={cargarProductos}
        />
      )}
    </div>
  );
}
