import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Sidebar fijo en escritorio */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar móvil superpuesto */}
      {sidebarAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarAbierto(false)}
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro del sidebar
          >
            <Sidebar cerrar={() => setSidebarAbierto(false)} />
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        <Topbar abrirSidebar={() => setSidebarAbierto(true)} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
