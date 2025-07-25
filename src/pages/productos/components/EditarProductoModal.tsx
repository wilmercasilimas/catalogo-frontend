// ✅ EditarProductoModal.tsx corregido (envío funcional)
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "@/lib/axiosInstance";
import { textInput, textareaInput, fileInput } from "@/styles/inputs";
import { primaryButton } from "@/styles/buttons";
import {
  modalOverlay,
  modalHeader,
  modalFooter,
  closeButton,
} from "@/styles/modals";
import type { Producto } from "@/types/producto";

const varianteSchema = z.object({ modelo: z.string().min(1, "Requerido") });

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  descripcion: z.string().min(1, "Requerido"),
  categoria: z.string().min(1, "Requerido"),
  tipo: z.string().min(1, "Requerido"),
  variantes: z.array(varianteSchema).min(1, "Agregar al menos una variante"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  abierto: boolean;
  cerrar: () => void;
  producto: Producto;
  actualizarLista: () => void;
}

export default function EditarProductoModal({
  abierto,
  cerrar,
  producto,
  actualizarLista,
}: Props) {
  const [cargando, setCargando] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      categoria: "",
      tipo: "",
      variantes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variantes",
  });

  useEffect(() => {
    if (producto && abierto) {
      reset({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        tipo: producto.tipo,
        variantes: producto.variantes.map((v) => ({ modelo: v.modelo })),
      });
    }
  }, [producto, abierto, reset]);

  const onSubmit = async (data: FormData) => {
    setCargando(true);
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("descripcion", data.descripcion);
      formData.append("categoria", data.categoria);
      formData.append("tipo", data.tipo);
      formData.append("variantes", JSON.stringify(data.variantes));

      const fileInput = document.querySelector<HTMLInputElement>(
        'input[name="imagen"]'
      );
      const file = fileInput?.files?.[0];
      if (file) formData.append("imagen", file);

      await axios.put(`/productos/${producto._id}`, formData);
      actualizarLista();
      reset();
      cerrar();
    } catch {
      // manejo opcional
    } finally {
      setCargando(false);
    }
  };

  if (!abierto) return null;

  return (
    <div className={modalOverlay}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-2xl h-full md:h-auto bg-white rounded-lg shadow-lg flex flex-col max-h-[95vh]">
          <div className={modalHeader}>
            Editar producto
            <button onClick={cerrar} className={closeButton}>
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto px-6 py-4 space-y-4 flex-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Nombre:
                </label>
                <input {...register("nombre")} className={textInput} />
                {errors.nombre && (
                  <p className="text-xs text-red-600">
                    {errors.nombre.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Categoría:
                </label>
                <input {...register("categoria")} className={textInput} />
                {errors.categoria && (
                  <p className="text-xs text-red-600">
                    {errors.categoria.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Tipo:</label>
                <input {...register("tipo")} className={textInput} />
                {errors.tipo && (
                  <p className="text-xs text-red-600">{errors.tipo.message}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium block mb-1">
                  Descripción:
                </label>
                <textarea
                  {...register("descripcion")}
                  className={textareaInput}
                  rows={3}
                ></textarea>
                {errors.descripcion && (
                  <p className="text-xs text-red-600">
                    {errors.descripcion.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Imagen:</label>
              <input
                type="file"
                accept="image/*"
                name="imagen"
                className={fileInput}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Variantes</h3>
              {fields.map((field, i) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-10">
                    <input
                      {...register(`variantes.${i}.modelo`)}
                      className={textInput}
                    />
                    {errors.variantes?.[i]?.modelo && (
                      <p className="text-xs text-red-600">
                        {errors.variantes[i]?.modelo?.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="text-red-600 hover:underline text-xs"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ modelo: "" })}
                className="text-sm text-blue-600 hover:underline"
              >
                + Agregar variante
              </button>
            </div>

            <div className={modalFooter}>
              <button
                type="submit"
                disabled={cargando}
                className={primaryButton}
              >
                {cargando ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
