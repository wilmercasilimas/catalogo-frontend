import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.resolve();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // ❌ Eliminar esta sección:
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:4000",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
