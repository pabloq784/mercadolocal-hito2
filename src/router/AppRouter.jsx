import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import Productos from "../pages/Productos.jsx";
import DetalleProducto from "../pages/DetalleProducto.jsx";
import Carrito from "../pages/Carrito.jsx";
import Perfil from "../pages/Perfil.jsx";
import Login from "../pages/Login.jsx";
import Registro from "../pages/Registro.jsx";
import NuevaPublicacion from "../pages/NuevaPublicacion.jsx";
import NotFound from "../pages/NotFound.jsx";

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/publicar" element={<NuevaPublicacion />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
