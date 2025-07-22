// src/components/CerrarSesionButton.tsx
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function CerrarSesionButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirige al panel de bienvenida
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-medium px-3 py-2"
      title="Cerrar sesión"
    >
      <LogOut className="h-5 w-5" />
      <span className="hidden md:inline">Cerrar sesión</span>
    </button>
  );
}
