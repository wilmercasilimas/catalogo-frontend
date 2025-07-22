// src/store/useCarritoStore.ts
import { create } from "zustand";

// 👉 Tipos exportables para uso en otros archivos (como CatalogoPage.tsx)
export interface Variante {
  modelo?: string;
  medida?: string;
  material?: string;
  descripcion?: string;
}

export interface Producto {
  _id: string;
  nombre: string;
  imagen?: {
    url?: string;
  };
}

export interface ItemPedido {
  producto: Producto;
  variante: Variante;
  cantidad: number;
}

export interface CarritoStore {
  items: ItemPedido[];
  agregarItem: (item: ItemPedido) => void;
  eliminarItem: (index: number) => void;
  limpiar: () => void;
}

// ✅ Zustand con tipado correcto
export const useCarritoStore = create<CarritoStore>((set) => ({
  items: [],
  agregarItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  eliminarItem: (index) =>
    set((state) => ({
      items: state.items.filter((_, i) => i !== index),
    })),
  limpiar: () => set({ items: [] }),
}));
