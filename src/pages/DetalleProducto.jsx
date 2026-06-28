import { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

function DetalleProducto() {
  const { id } = useParams();
  const { productos } = useContext(ProductContext);
  const { agregarProducto } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const producto = productos.find((item) => item.id === Number(id));

  if (!producto) {
    return (
      <Container fluid="xl" className="page-container">
        <Alert variant="warning">Producto no encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container fluid="xl" className="page-container">
      <section className="detail-card">
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <div className="detail-image">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
          </Col>

          <Col lg={6}>
            <span className="detail-category">{producto.categoria}</span>
            <h1>{producto.nombre}</h1>
            <p className="detail-description">{producto.descripcion}</p>

            <div className="detail-meta">
              <span>Estado: {producto.estado}</span>
              <span>Stock: {producto.stock}</span>
              <span>Vendedor: {producto.vendedor}</span>
            </div>

            <strong className="detail-price">
              ${producto.precio.toLocaleString("es-CL")}
            </strong>

            <Form.Group className="quantity-control">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </Form.Group>

            <Button
              className="primary-action"
              onClick={() => agregarProducto(producto, cantidad)}
            >
              <FaShoppingCart />
              Agregar al carrito
            </Button>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default DetalleProducto;
