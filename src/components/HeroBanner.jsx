import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    titulo: "Encuentra lo que quieres al mejor precio",
    descripcion:
      "Explora productos de vendedores locales con envío rápido y una experiencia simple.",
    etiqueta: "OFERTAS DE LA SEMANA",
    imagen:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600"
  },
  {
    id: 2,
    titulo: "Publica tus productos y comienza a vender",
    descripcion:
      "Crea publicaciones desde tu perfil y administra tus ventas en un solo lugar.",
    etiqueta: "VENDE FÁCIL",
    imagen:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600"
  },
  {
    id: 3,
    titulo: "Compra tecnología, hogar, moda y más",
    descripcion:
      "Filtra por categorías, revisa detalles y agrega productos al carrito.",
    etiqueta: "NUEVAS CATEGORÍAS",
    imagen:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600"
  }
];

function HeroBanner() {
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((actual) => (actual + 1) % slides.length);
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  const avanzar = () => {
    setSlideActual((actual) => (actual + 1) % slides.length);
  };

  const retroceder = () => {
    setSlideActual((actual) =>
      actual === 0 ? slides.length - 1 : actual - 1
    );
  };

  const slide = slides[slideActual];

  return (
    <section
      className="hero-banner hero-banner-slider"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 22, 60, .92), rgba(13, 79, 227, .72), rgba(15, 23, 42, .25)), url(${slide.imagen})` }}
    >
      <button className="hero-arrow left" aria-label="Anterior" onClick={retroceder}>
        <FaChevronLeft />
      </button>

      <div className="hero-content">
        <span className="hero-badge">{slide.etiqueta}</span>
        <h1>{slide.titulo}</h1>
        <p>{slide.descripcion}</p>

        <Button as={Link} to="/productos" className="hero-button">
          Ver ofertas
          <FaArrowRight />
        </Button>
      </div>

      <button className="hero-arrow right" aria-label="Siguiente" onClick={avanzar}>
        <FaChevronRight />
      </button>

      <div className="hero-dots" aria-label="Indicadores visuales del banner">
        {slides.map((item, index) => (
          <button
            key={item.id}
            className={index === slideActual ? "active" : ""}
            onClick={() => setSlideActual(index)}
            aria-label={`Ver slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;
