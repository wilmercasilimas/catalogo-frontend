import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "@/lib/axiosInstance";
import { Search, XCircle } from "lucide-react";
import debounce from "lodash.debounce";

interface Pedido {
  codigo: string;
  estado: string;
  createdAt: string;
  cliente: {
    nombre: string;
    email: string;
    telefono: string;
    empresa: string;
  };
  items: {
    producto: {
      nombre: string;
    };
    variante: {
      modelo?: string;
    };
    cantidad: number;
  }[];
}

export default function BuscadorPedidos() {
  const [mostrarInput, setMostrarInput] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState<Pedido[] | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const limpiarBusqueda = () => {
    setBusqueda("");
    setResultado(null);
    setError("");
  };

  // ✅ Memoizamos la función principal
  const buscarPedidos = useCallback(async (valor: string) => {
    if (!valor || valor.length < 5) return;

    setCargando(true);
    setError("");
    setResultado(null);

    try {
      const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
      const esCodigo = /^CAT-\d{4}$/i.test(valor.trim());

      if (esEmail) {
        const { data } = await axios.get(`/pedidos/publico?email=${valor.trim()}`);
        setResultado(data);
      } else if (esCodigo) {
        const { data } = await axios.get(`/pedidos?codigo=${valor.trim().toUpperCase()}`);
        setResultado(Array.isArray(data) ? data : [data]);
      } else {
        setError("Ingresa un correo válido o un código tipo CAT-1234.");
      }
    } catch (err) {
      console.error("Error al buscar pedido:", err);
      setError("No se encontró ningún pedido con esa información.");
    } finally {
      setCargando(false);
    }
  }, []);

  // ✅ Debounce correctamente memorizado
  const debouncedBuscar = useMemo(() => debounce(buscarPedidos, 500), [buscarPedidos]);

  useEffect(() => {
    debouncedBuscar(busqueda);
    return () => {
      debouncedBuscar.cancel();
    };
  }, [busqueda, debouncedBuscar]);

  return (
    <div className="mb-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 relative">
        <button
          onClick={() => setMostrarInput(!mostrarInput)}
          className="text-rojo hover:text-red-700"
          title="Buscar pedido"
        >
          <Search size={22} />
        </button>

        {mostrarInput && (
          <>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por código (CAT-1234) o email"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {busqueda && (
              <button
                onClick={limpiarBusqueda}
                className="absolute right-2 text-gray-400 hover:text-red-500"
                title="Limpiar búsqueda"
              >
                <XCircle size={18} />
              </button>
            )}
          </>
        )}
      </div>

      {cargando && <p className="text-sm text-gray-500 mt-2">Buscando pedido...</p>}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      {resultado && resultado.length > 0 && (
        <div className="mt-4 bg-white border rounded shadow p-4 space-y-4 text-sm">
          {resultado.map((pedido, i) => (
            <div key={i} className="border-b pb-3">
              <p><strong>Código:</strong> {pedido.codigo}</p>
              <p><strong>Cliente:</strong> {pedido.cliente.nombre} ({pedido.cliente.email})</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
              <p><strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleDateString()}</p>
              <p className="mt-2 font-medium">Items:</p>
              <ul className="list-disc list-inside text-gray-700">
                {pedido.items.map((item, idx) => (
                  <li key={idx}>
                    {item.producto.nombre} — {item.variante.modelo || "sin modelo"} × {item.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resultado && resultado.length === 0 && !error && (
        <p className="text-sm text-gray-600 mt-3">No se encontró ningún pedido con esa información.</p>
      )}
    </div>
  );
}
