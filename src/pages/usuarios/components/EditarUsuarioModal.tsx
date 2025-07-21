// src/pages/usuarios/components/EditarUsuarioModal.tsx
import { useState, useEffect } from "react";
import { editarUsuario } from "@/services/usuarioService";
import { toast } from "sonner";
import { Check, Eye, EyeOff, X } from "lucide-react";
import axios from "axios";

import {
  modalOverlay,
  modalHeader,
  modalBody,
  modalFooter,
} from "@/styles/modals";
import { baseInput } from "@/styles/inputs";
import { primaryButton, secondaryButton } from "@/styles/buttons";
import type { Usuario } from "@/types/usuario";

interface Props {
  visible: boolean;
  usuario: Usuario | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditarUsuarioModal({
  visible,
  usuario,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        email: usuario.email,
        password: "",
      });
      setError(""); // limpiar error al abrir modal
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // limpiar error al editar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    setLoading(true);
    try {
      await editarUsuario(usuario._id, form);
      toast.success("Usuario actualizado correctamente");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const mensaje =
        axios.isAxiosError(error) &&
        (error.response?.data?.message || error.response?.data?.error)
          ? error.response.data.message || error.response.data.error
          : "Error al editar usuario";
      toast.error(mensaje);
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  if (!visible || !usuario) return null;

  return (
    <div className={modalOverlay}>
      <div className="bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-[90vh] mt-8 rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className={`${modalHeader} px-6 py-4 border-b`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-rojo">
            Editar usuario
          </h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div
            className={`${modalBody} flex-1 overflow-y-auto px-6 py-6 space-y-6`}
          >
            <label className="block text-xl font-semibold">
              Nombre
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className={`${baseInput} text-xl`}
              />
            </label>

            <label className="block text-xl font-semibold">
              Correo electrónico
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className={`${baseInput} text-xl`}
              />
            </label>

            <label className="block text-xl font-semibold relative">
              Contraseña
              <input
                type={mostrarPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`${baseInput} text-xl pr-10`}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-9 sm:top-10 text-gray-500 hover:text-gray-700"
                title={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {mostrarPassword ? (
                  <EyeOff className="w-6 h-6" />
                ) : (
                  <Eye className="w-6 h-6" />
                )}
              </button>
              {error && (
                <p className="text-red-600 text-base mt-2">{error}</p>
              )}
            </label>
          </div>

          <div
            className={`${modalFooter} border-t px-6 py-4 flex justify-end gap-4`}
          >
            <button type="button" onClick={onClose} className={secondaryButton}>
              <span className="hidden sm:inline text-lg">Cancelar</span>
              <X className="w-6 h-6 sm:hidden" />
            </button>
            <button type="submit" disabled={loading} className={primaryButton}>
              <span className="hidden sm:inline text-lg">
                {loading ? "Guardando..." : "Guardar"}
              </span>
              <Check className="w-6 h-6 sm:hidden" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
