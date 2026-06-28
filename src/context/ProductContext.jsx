import { createContext, useEffect, useState } from "react";
import { obtenerProductos, obtenerCategorias } from "../services/productService.js";

export const ProductContext = createContext();

const STORAGE_PRODUCTOS = "mercadolocal_productos_v2";

function cargarProductosDesdeStorage(productosBase) {
  const productosGuardados = localStorage.getItem(STORAGE_PRODUCTOS);

  if (productosGuardados) {
    return JSON.parse(productosGuardados);
  }

  localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(productosBase));
  return productosBase;
}

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const productosData = await obtenerProductos();
        const categoriasData = await obtenerCategorias();

        setProductos(cargarProductosDesdeStorage(productosData));
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Error cargando datos simulados:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const guardarProductos = (productosActualizados) => {
    setProductos(productosActualizados);
    localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(productosActualizados));
  };

  const agregarProductoPublicado = (producto, usuario) => {
    const nuevoProducto = {
      id: Date.now(),
      nombre: producto.nombre,
      precio: Number(producto.precio),
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      stock: Number(producto.stock),
      estado: producto.estado,
      vendedor: usuario.nombre,
      vendedorId: usuario.id,
      envio: "Envío acordado con vendedor",
      imagen:
        producto.imagen ||
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=900"
    };

    guardarProductos([nuevoProducto, ...productos]);

    return nuevoProducto;
  };

  const editarProductoPublicado = (idProducto, idUsuario, productoEditado) => {
    const productosActualizados = productos.map((producto) => {
      if (producto.id !== idProducto || producto.vendedorId !== idUsuario) {
        return producto;
      }

      return {
        ...producto,
        nombre: productoEditado.nombre,
        descripcion: productoEditado.descripcion,
        categoria: productoEditado.categoria,
        precio: Number(productoEditado.precio),
        stock: Number(productoEditado.stock),
        estado: productoEditado.estado,
        imagen: productoEditado.imagen || producto.imagen
      };
    });

    guardarProductos(productosActualizados);
  };

  const eliminarProductoPublicado = (idProducto, idUsuario) => {
    const productosActualizados = productos.filter(
      (producto) => !(producto.id === idProducto && producto.vendedorId === idUsuario)
    );

    guardarProductos(productosActualizados);
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        categorias,
        cargando,
        agregarProductoPublicado,
        editarProductoPublicado,
        eliminarProductoPublicado
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
