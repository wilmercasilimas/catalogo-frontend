import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
  icono: LucideIcon;
  titulo: string;
  descripcion: string;
  ruta: string;
}

export function BotonAcceso({ icono: Icono, titulo, descripcion, ruta }: Props) {
  return (
    <Link
      to={ruta}
      className={cn(
        "flex flex-col items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-zinc-100 transition-colors",
        "w-36 h-36 sm:w-52 sm:h-52 text-center uppercase tracking-wide font-semibold text-gray-800"
      )}
    >
      <Icono className="w-8 h-8 sm:w-10 sm:h-10 text-rojo" />
      <h3 className="text-sm sm:text-base">{titulo}</h3>
      <p className="hidden sm:block text-xs text-gray-500 normal-case font-normal tracking-normal">
        {descripcion}
      </p>
    </Link>
  );
}
