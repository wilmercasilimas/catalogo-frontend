import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";


const schema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(4, { message: "La contraseña es obligatoria" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setCargando(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data); // ✅ CORRECTA

      const token = res.data?.usuario?.token;

      localStorage.setItem("token", token);
      window.location.href = "/admin";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.msg || "Error de conexión. Intenta nuevamente."
        );
      } else {
        setError("Error inesperado. Intenta nuevamente.");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-5"
      >
        <h1 className="text-xl font-bold text-rojoIncendio text-center">
          Iniciar sesión
        </h1>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            {...register("email")}
            className="w-full mt-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rojoIncendio"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Contraseña</label>
          <div className="relative">
            <input
              type={verPassword ? "text" : "password"}
              {...register("password")}
              className="w-full mt-1 border rounded px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-rojoIncendio"
            />
            <button
              type="button"
              onClick={() => setVerPassword((v) => !v)}
              className="absolute right-2 top-3 text-zinc-500"
            >
              {verPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-rojoIncendio text-white py-2 rounded font-medium hover:bg-red-700 transition flex justify-center items-center gap-2"
        >
          {cargando && <Loader2 className="animate-spin w-4 h-4" />}
          {cargando ? "Ingresando..." : "Acceder"}
        </button>
      </form>
    </div>
  );
}
