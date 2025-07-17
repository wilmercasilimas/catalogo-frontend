import { Pencil, Trash2, CircleCheck, CircleX } from "lucide-react";

interface Props {
  id: string;
  estado: boolean;
  onEliminar: (id: string) => void;
  onToggleEstado: (id: string) => void;
  onEditar: () => void;
}

export default function Acciones({
  id,
  estado,
  onEliminar,
  onToggleEstado,
  onEditar,
}: Props) {
  return (
    <div className="flex gap-2">
      <button
        title="Editar"
        className="text-blue-600 hover:text-blue-800 transition"
        onClick={onEditar}
      >
        <Pencil size={18} />
      </button>

      <button
        title={estado ? "Marcar como no disponible" : "Marcar como disponible"}
        className={`text-sm ${
          estado ? "text-yellow-600" : "text-green-600"
        } hover:opacity-80`}
        onClick={() => onToggleEstado(id)}
      >
        {estado ? <CircleX size={18} /> : <CircleCheck size={18} />}
      </button>

      <button
        title="Eliminar"
        className="text-red-600 hover:text-red-800 transition"
        onClick={() => onEliminar(id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
