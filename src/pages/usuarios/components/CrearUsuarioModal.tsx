import { useState } from "react";
import { crearUsuario } from "@/services/usuarioService";
import { toast } from "sonner";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { AxiosError } from "axios";

import {
  modalOverlay,
  modalHeader,
  modalBody,
  modalFooter,
} from "@/styles/modals";
import { baseInput } from "@/styles/inputs";
import {
  primaryButton,
  secondaryButton,
} from "@/styles/buttons";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CrearUsuarioModal({
  visible,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // limpiar error al modificar inputs
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await crearUsuario({ ...form, rol: "admin" });
      toast.success("Usuario creado correctamente");
      onSuccess();
      onClose();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const mensaje = err?.response?.data?.message || "Error al crear usuario";
      toast.error(mensaje);
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={modalOverlay}>
      <div className="bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-[90vh] mt-8 rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className={`${modalHeader} px-6 py-4 border-b`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-rojo">
            Crear nuevo usuario
          </h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className={`${modalBody} flex-1 overflow-y-auto px-6 py-6 space-y-6`}>
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
                required
                className={`${baseInput} text-xl pr-10`}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                className="absolute right-3 top-9 sm:top-10 text-gray-500 hover:text-gray-700"
                title={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {mostrarPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
              {error && (
                <p className="text-red-600 text-base mt-2">{error}</p>
              )}
            </label>
          </div>

          <div className={`${modalFooter} border-t px-6 py-4 flex justify-end gap-4`}>
            <button
              type="button"
              onClick={onClose}
              className={secondaryButton}
            >
              <span className="hidden sm:inline text-lg">Cancelar</span>
              <X className="w-6 h-6 sm:hidden" />
            </button>
            <button
              type="submit"
              disabled={loading}
              className={primaryButton}
            >
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
