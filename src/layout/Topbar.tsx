import { Menu } from "lucide-react";

interface Props {
  abrirSidebar: () => void;
}

export default function Topbar({ abrirSidebar }: Props) {
  return (
    <header className="w-full bg-black text-white flex items-center px-4 h-14 shadow">
      {/* Botón hamburguesa visible solo en móviles */}
      <button
        className="md:hidden text-white mr-3"
        onClick={abrirSidebar}
      >
        <Menu size={22} />
      </button>

      {/* Logo o texto del panel */}
      <h1 className="text-lg font-bold tracking-wide uppercase">
        Catálogo 🔥
      </h1>
    </header>
  );
}
