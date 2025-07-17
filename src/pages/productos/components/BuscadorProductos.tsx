import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  buscadorContainer,
  buscadorInput,
  buscadorWrapper,
  buscadorIcono,
} from "@/styles/inputs";

interface Props {
  onBuscar: (texto: string) => void;
}

export default function BuscadorProductos({ onBuscar }: Props) {
  const [valor, setValor] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onBuscar(valor.trim());
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [valor, onBuscar]); // ✅ Dependencias completas

  return (
    <div className={buscadorWrapper}>
      <div className={buscadorContainer}>
        <Search className={buscadorIcono} />
        <input
          type="text"
          placeholder="Buscar producto o categoría..."
          className={buscadorInput}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
    </div>
  );
}
