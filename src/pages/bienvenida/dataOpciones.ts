import { UserCog, ShoppingCart } from "lucide-react";

export const opcionesAcceso = [
  {
    id: "cliente",
    titulo: "Soy Cliente",
    descripcion: "Explorar productos y realizar pedidos sin registro.",
    icono: ShoppingCart,
    ruta: "/catalogo",
  },
  {
    id: "admin",
    titulo: "Soy Administrador",
    descripcion: "Gestionar productos y pedidos. Requiere login.",
    icono: UserCog,
    ruta: "/login",
  },
];
