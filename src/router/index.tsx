import { Routes, Route, BrowserRouter } from "react-router-dom";
import BienvenidaPage from "@/pages/bienvenida/BienvenidaPage";
import LoginPage from "@/pages/login/LoginPage";
import AdminLayout from "@/layout/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductosPage from "@/pages/productos/ProductosPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BienvenidaPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas de admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
         <Route path="productos" element={<ProductosPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
