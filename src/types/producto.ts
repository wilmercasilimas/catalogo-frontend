export interface Variante {
  modelo: string; // ✅ importante: requerido por Mongoose y usado en el frontend
  nombre: string;
  precio: number;
  stock: number;
}

export interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  tipo: string;
  estado: boolean;
  imagen: {
    secure_url: string; // ✅ este campo es el único devuelto desde el backend
    public_id: string;
  };
  variantes: Variante[];
  createdAt?: string;
  updatedAt?: string;
}
