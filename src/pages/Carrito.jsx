import { useContext } from "react";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { CartContext } from "../context/CartContext.jsx";

function Carrito() {
  const {
    carrito,
    sumarProducto,
    restarProducto,
    eliminarProducto,
    total
  } = useContext(CartContext);

  return (
    <Container fluid="xl" className="page-container">
      <section className="cart-card">
        <h1>Carrito de compras</h1>

        {carrito.length === 0 ? (
          <Alert variant="info">
            Tu carrito está vacío. Agrega productos desde el catálogo.
          </Alert>
        ) : (
          <>
            <Table responsive className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Valor</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="cart-product">
                        <img src={item.imagen} alt={item.nombre} />
                        <span>{item.nombre}</span>
                      </div>
                    </td>

                    <td>${item.precio.toLocaleString("es-CL")}</td>

                    <td>
                      <div className="cart-quantity">
                        <button onClick={() => restarProducto(item.id)}>
                          <FaMinus />
                        </button>

                        <span>{item.cantidad}</span>

                        <button onClick={() => sumarProducto(item.id)}>
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    <td>
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </td>

                    <td>
                      <button
                        className="delete-button"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="cart-summary">
              <span>Total</span>
              <strong>${total.toLocaleString("es-CL")}</strong>
            </div>

            <div className="text-end">
              <Button className="primary-action">
                Pagar
              </Button>
            </div>
          </>
        )}
      </section>
    </Container>
  );
}

export default Carrito;
