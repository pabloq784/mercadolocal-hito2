import { useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import CategoriaItem from "../components/CategoriaItem.jsx";
import ProductCard from "../components/ProductCard.jsx";
import TrustBar from "../components/TrustBar.jsx";
import { Link } from "react-router-dom";

function Home() {
  const { productos, categorias, cargando } = useContext(ProductContext);

  if (cargando) {
    return (
      <div className="loading-screen">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <Container fluid="xl" className="home-container">
        <HeroBanner />

        <section className="section-block">
          <div className="section-header">
            <div>
              <h2>Explora por categorías</h2>
              <p>Encuentra productos por tipo y navega rápidamente.</p>
            </div>

            <Link to="/productos">Ver todas →</Link>
          </div>

          <div className="categories-grid">
            {categorias.slice(0, 4).map((categoria) => (
              <CategoriaItem key={categoria.id} {...categoria} />
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-header">
            <div>
              <h2>Productos recomendados</h2>
            </div>

            <Link to="/productos">Ver todas →</Link>
          </div>

          <Row className="g-4">
            {productos.slice(0, 4).map((producto) => (
              <Col xs={12} md={6} lg={3} key={producto.id}>
                <ProductCard {...producto} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      <TrustBar />
    </>
  );
}

export default Home;
