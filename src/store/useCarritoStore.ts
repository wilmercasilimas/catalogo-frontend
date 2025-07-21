// src/store/useCarritoStore.ts
import { create } from "zustand";

interface Variante {
  modelo?: string;
  medida?: string;
  material?: string;
  descripcion?: string;
}

interface Producto {
  _id: string;
  nombre: string;
  imagen?: {
    url?: string;
  };
}

interface ItemPedido {
  producto: Producto;
  variante: Variante;
  cantidad: number;
}

interface CarritoStore {
  items: ItemPedido[];
  agregarItem: (item: ItemPedido) => void;
  eliminarItem: (index: number) => void;
  limpiar: () => void;
}

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
