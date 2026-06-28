import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearCLP } from "../utils/formatters.js";

function ProductCard({ id, nombre, precio, imagen, descripcion, envio }) {
  return (
    <Card className="product-card">
      <div className="product-image-container">
        <Card.Img src={imagen} alt={nombre} />
      </div>

      <Card.Body className="product-card-body">
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>

        <div className="product-footer">
          <strong>{formatearCLP(precio)}</strong>
          {envio && <Badge className="shipping-badge">{envio}</Badge>}
        </div>

        <Button
          as={Link}
          to={`/producto/${id}`}
          className="product-detail-button"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
