// src/types/pedido.ts

export interface Pedido {
  _id: string;
  nombre: string;
  correo: string;
  telefono: string;
  empresa?: string;
  codigo: string;
  productos: {
    nombre: string;
    modelo: string;
    medida?: string;
    material?: string;
    descripcion?: string;
    cantidad: number;
  }[];
  estado: "pendiente" | "procesado" | "enviado" | "cancelado";
  creadoEn: string;
  actualizadoEn: string;
}
