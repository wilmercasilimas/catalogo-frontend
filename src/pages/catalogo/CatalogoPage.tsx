import { useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import AgregarProductoModal from "./components/AgregarProductoModal";
import CarritoDrawer from "./components/CarritoDrawer";
import FormularioClienteModal from "./components/FormularioClienteModal";
import { useCarritoStore } from "@/store/useCarritoStore";
import BuscadorPedidos from "./components/BuscadorPedidos";
import CerrarSesionButton from "@/components/CerrarSesionButton";

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

export default function CatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] =
    useState(false);

  const items = useCarritoStore((state) => state.items);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const { data } = await axios.get<Producto[]>("/productos");
        setProductos(data);
      } catch (error) {
        console.error("❌ Error al cargar productos", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Logo + título centrados */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-3">
          <img
            src="/FIRECAT.png"
            alt="Logo"
            className="h-10 w-auto rounded-md shadow-sm"
          />
          <h1 className="text-2xl font-bold text-zinc-800">Catálogo</h1>
        </div>

        <CerrarSesionButton />
      </div>

      <BuscadorPedidos />

      {cargando ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {productos.map((producto) => (
            <div
              key={producto._id}
              onClick={() => setProductoSeleccionado(producto)}
              className="bg-white rounded shadow hover:shadow-md transition p-2 flex flex-col items-center cursor-pointer"
            >
              <img
                src={producto.imagen?.url || "/placeholder.jpg"}
                alt={producto.nombre}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium text-center text-gray-800">
                {producto.nombre}
              </p>
            </div>
          ))}
        </div>
      )}

      <AgregarProductoModal
        abierto={!!productoSeleccionado}
        cerrar={() => setProductoSeleccionado(null)}
        producto={productoSeleccionado}
      />

      {mostrarCarrito && (
        <CarritoDrawer
          onClose={() => setMostrarCarrito(false)}
          onFinalizar={() => {
            setMostrarCarrito(false);
            setMostrarFormularioCliente(true);
          }}
        />
      )}

      {mostrarFormularioCliente && (
        <FormularioClienteModal
          abierto={mostrarFormularioCliente}
          cerrar={() => setMostrarFormularioCliente(false)}
        />
      )}

      <button
        onClick={() => setMostrarCarrito(true)}
        className="fixed bottom-4 right-4 z-50 bg-transparent border-none rounded-full p-3 transition-transform duration-200 hover:scale-110 hover:brightness-110 focus:outline-none"
        aria-label="Ver carrito"
      >
        <span className="text-4xl text-rojo">🛒</span>
        {items.length > 0 && (
          <span className="ml-2 font-bold text-base text-black dark:text-white">
            {items.length}
          </span>
        )}
      </button>
    </div>
  );
}
