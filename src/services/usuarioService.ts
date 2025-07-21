// src/services/usuarioService.ts
import axios from "@/lib/axiosInstance";
import type { Usuario } from "@/types/usuario";

export const getUsuarios = async (): Promise<Usuario[]> => {
  const res = await axios.get("/usuarios");
  return res.data;
};

export const crearUsuario = async (data: Partial<Usuario>) => {
  const res = await axios.post("/usuarios", data);
  return res.data;
};

export const editarUsuario = async (id: string, data: Partial<Usuario>) => {
  const res = await axios.put(`/usuarios/${id}`, data);
  return res.data;
};

export const eliminarUsuario = async (id: string) => {
  const res = await axios.delete(`/usuarios/${id}`);
  return res.data;
};
