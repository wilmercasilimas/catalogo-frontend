import { NavLink } from "react-router-dom";
import { Box, PackageCheck, Users } from "lucide-react";
import CerrarSesionButton from "@/components/CerrarSesionButton";

const links = [
  {
    to: "/admin/productos",
    label: "Productos",
    icon: Box,
  },
  {
    to: "/admin/pedidos",
    label: "Pedidos",
    icon: PackageCheck,
  },
  {
    to: "/admin/usuarios",
    label: "Usuarios",
    icon: Users,
  },
];

interface Props {
  cerrar?: () => void;
}

export default function Sidebar({ cerrar }: Props) {
  

  return (
    <aside className="w-60 min-h-screen bg-zinc-100 border-r flex flex-col text-gray-800">
      <div className="flex justify-center items-center px-4 py-6 border-b border-gray-300">
  <img
    src="/FIRECAT.png"
    alt="Logo Firecat"
    className="h-44 w-auto"
  />
</div>


      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={cerrar} // ✅ esto hace que se cierre el menú móvil
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 text-sm font-semibold uppercase tracking-wide ${
                isActive
                  ? "bg-white text-rojo border-l-4 border-rojo"
                  : "text-gray-700 hover:bg-white"
              }`
            }
          >
            <Icon className="w-5 h-5 text-rojo" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-300 px-4 py-3">
  <CerrarSesionButton />
</div>

    </aside>
  );
}
