import { Search } from "lucide-react";
import {
  buscadorWrapper,
  buscadorContainer,
  buscadorInput,
  buscadorIcono,
} from "@/styles/inputs";

interface Props {
  valor: string;
  onChange: (nuevoValor: string) => void;
}

export default function BuscadorPedidos({ valor, onChange }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const limpio = valor.trim().toLowerCase();
      onChange(limpio);
    }
  };

  const handleBuscar = () => {
    const limpio = valor.trim().toLowerCase();
    if (!limpio) return;
    onChange(limpio);
  };

  return (
    <div className={buscadorWrapper}>
      <div className={buscadorContainer}>
        <input
          type="text"
          placeholder="Buscar pedido por código, nombre o empresa..."
          className={buscadorInput}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleBuscar}
          className={buscadorIcono}
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
