// src/pages/usuarios/UsuariosPage.tsx
import { useEffect, useState } from "react";
import { getUsuarios, eliminarUsuario } from "@/services/usuarioService";
import type { Usuario } from "@/types/usuario";

import {
  tableBase,
  tableHeader,
  tableHeaderCell,
  tableRow,
  tableCell,
  tableActions,
} from "@/styles/tables";
import {
  primaryButton,
  iconOnlyMobile,
  textOnlyDesktop,
  fullButtonResponsive,
} from "@/styles/buttons";

import { Pencil, Trash, Plus } from "lucide-react";
import { toast } from "sonner";

import CrearUsuarioModal from "./components/CrearUsuarioModal";
import EditarUsuarioModal from "./components/EditarUsuarioModal";
import ConfirmarModal from "@/components/ui/ConfirmarModal";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] =
    useState<Usuario | null>(null);

  const cargarUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      toast.error("Error al cargar usuarios");
    }
  };

  const confirmarEliminar = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarConfirmar(true);
  };

  const eliminar = async () => {
    if (!usuarioSeleccionado) return;
    try {
      await eliminarUsuario(usuarioSeleccionado._id);
      toast.success("Usuario eliminado");
      cargarUsuarios();
    } catch {
      toast.error("Error al eliminar usuario");
    } finally {
      setMostrarConfirmar(false);
      setUsuarioSeleccionado(null);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <section className="p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg sm:text-xl font-bold uppercase text-rojo">
            Usuarios
          </h1>
          <button
            onClick={() => setMostrarCrear(true)}
            className={`${primaryButton} ${fullButtonResponsive}`}
          >
            <Plus className={iconOnlyMobile} />
            <span className={textOnlyDesktop}>Crear usuario</span>
          </button>
        </div>

        <div className="overflow-x-auto w-full rounded shadow text-sm">
          <table className={tableBase}>
            <thead className={tableHeader}>
              <tr>
                <th className={tableHeaderCell}>Nombre</th>
                <th className={tableHeaderCell}>Correo Electrónico</th>
                <th className={tableHeaderCell}>Rol</th>
                <th className={tableHeaderCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u._id} className={tableRow}>
                  <td className={tableCell}>{u.nombre}</td>
                  <td className={tableCell}>{u.email}</td>
                  <td className={tableCell}>{u.rol}</td>
                  <td className={tableCell}>
                    <div className={tableActions}>
                      <button
                        onClick={() => {
                          setUsuarioSeleccionado(u);
                          setMostrarEditar(true);
                        }}
                        className="text-blue-600 hover:underline hidden md:inline"
                        title="Editar"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmarEliminar(u)}
                        className="text-red-600 hover:underline hidden md:inline"
                        title="Eliminar"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => {
                          setUsuarioSeleccionado(u);
                          setMostrarEditar(true);
                        }}
                        className="text-blue-600 md:hidden"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmarEliminar(u)}
                        className="text-red-600 md:hidden"
                        title="Eliminar"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      <CrearUsuarioModal
        visible={mostrarCrear}
        onClose={() => setMostrarCrear(false)}
        onSuccess={cargarUsuarios}
      />

      <EditarUsuarioModal
        visible={mostrarEditar}
        usuario={usuarioSeleccionado}
        onClose={() => {
          setMostrarEditar(false);
          setUsuarioSeleccionado(null);
        }}
        onSuccess={cargarUsuarios}
      />

      <ConfirmarModal
        abierto={mostrarConfirmar}
        mensaje="¿Estás seguro de eliminar este usuario?"
        onCancelar={() => {
          setMostrarConfirmar(false);
          setUsuarioSeleccionado(null);
        }}
        onConfirmar={eliminar}
      />
    </section>
  );
}
