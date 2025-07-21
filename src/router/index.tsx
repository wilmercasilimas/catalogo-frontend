import { Routes, Route, BrowserRouter } from "react-router-dom";
import BienvenidaPage from "@/pages/bienvenida/BienvenidaPage";
import LoginPage from "@/pages/login/LoginPage";
import AdminLayout from "@/layout/AdminLayout";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProductosPage from "@/pages/productos/ProductosPage";
import PedidosPage from "@/pages/pedidos/PedidosPage";
import UsuariosPage from "@/pages/usuarios/UsuariosPage";
import CatalogoPage from "@/pages/catalogo/CatalogoPage";


export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BienvenidaPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogo" element={<CatalogoPage />} />

        {/* Rutas protegidas de admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
         <Route path="productos" element={<ProductosPage />} />
         <Route path="pedidos" element={<PedidosPage />} />
         <Route path="usuarios" element={<UsuariosPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
