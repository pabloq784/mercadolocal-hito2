import { createContext, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);

      if (existe) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [...actual, { ...producto, cantidad }];
    });
  };

  const sumarProducto = (id) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const restarProducto = (id) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item
      )
    );
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, cantidad) }
          : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = useMemo(() => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  }, [carrito]);

  const total = useMemo(() => {
    return carrito.reduce(
      (suma, item) => suma + item.precio * item.cantidad,
      0
    );
  }, [carrito]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        sumarProducto,
        restarProducto,
        cambiarCantidad,
        eliminarProducto,
        vaciarCarrito,
        cantidadTotal,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
