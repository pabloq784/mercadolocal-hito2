import productos from "../mock/productos.json";
import categorias from "../mock/categorias.json";

// HITO 2:
// Por ahora el frontend consume datos simulados desde archivos JSON.



export const obtenerProductos = async () => {
  return productos;
};

export const obtenerCategorias = async () => {
  return categorias;
};

export const obtenerProductoPorId = async (id) => {
  return productos.find((producto) => producto.id === Number(id));
};
