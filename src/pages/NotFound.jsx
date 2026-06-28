import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container fluid="xl" className="page-container">
      <section className="auth-card">
        <h1>404</h1>
        <p>Página no encontrada.</p>
        <Link to="/">Volver al inicio</Link>
      </section>
    </Container>
  );
}

export default NotFound;
