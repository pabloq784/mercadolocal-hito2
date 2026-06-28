import { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { formatearCLP, limpiarPrecioCLP } from "../utils/formatters.js";

function NuevaPublicacion() {
  const { autenticado, usuario } = useContext(AuthContext);
  const { agregarProductoPublicado, categorias } = useContext(ProductContext);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    precio: "",
    stock: "",
    estado: "Nuevo",
    imagen: ""
  });

  const [mensaje, setMensaje] = useState("");

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;

    if (name === "precio") {
      setFormulario((actual) => ({
        ...actual,
        precio: limpiarPrecioCLP(value)
      }));
      return;
    }

    setFormulario((actual) => ({ ...actual, [name]: value }));
  };

  const publicarProducto = (evento) => {
    evento.preventDefault();

    if (!formulario.nombre || !formulario.descripcion || !formulario.categoria) {
      setMensaje("Completa nombre, descripción y categoría.");
      return;
    }

    if (Number(formulario.precio) <= 0 || Number(formulario.stock) <= 0) {
      setMensaje("Precio y stock deben ser mayores a 0.");
      return;
    }

    agregarProductoPublicado(formulario, usuario);
    setMensaje("Producto publicado correctamente. Lo verás en tu perfil, en Mis publicaciones.");

    setTimeout(() => {
      navigate("/perfil?seccion=publicaciones");
    }, 800);
  };

  if (!autenticado) {
    return (
      <Container fluid="xl" className="page-container">
        <section className="auth-card">
          <h1>Nueva publicación</h1>
          <Alert variant="info">
            Para publicar un producto primero debes iniciar sesión.
          </Alert>

          <Button as={Link} to="/login" className="primary-action w-100">
            Iniciar sesión
          </Button>
        </section>
      </Container>
    );
  }

  return (
    <Container fluid="xl" className="page-container">
      <section className="publication-form-page">
        <h1>Nueva publicación</h1>
        <p className="auth-help-text">
          Este producto se guardará en localStorage y aparecerá en tu perfil.
        </p>

        {mensaje && <Alert variant={mensaje.includes("correctamente") ? "success" : "danger"}>{mensaje}</Alert>}

        <Form onSubmit={publicarProducto}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={formulario.nombre} onChange={actualizarCampo} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="descripcion" as="textarea" rows={3} value={formulario.descripcion} onChange={actualizarCampo} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={formulario.categoria} onChange={actualizarCampo} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              name="precio"
              value={formulario.precio ? formatearCLP(formulario.precio) : ""}
              onChange={actualizarCampo}
              placeholder="$0"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stock" type="number" min="1" value={formulario.stock} onChange={actualizarCampo} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Select name="estado" value={formulario.estado} onChange={actualizarCampo}>
              <option>Nuevo</option>
              <option>Usado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>URL imagen principal</Form.Label>
            <Form.Control name="imagen" value={formulario.imagen} onChange={actualizarCampo} placeholder="https://..." />
          </Form.Group>

          <Button type="submit" className="primary-action">
            Publicar producto
          </Button>
        </Form>
      </section>
    </Container>
  );
}

export default NuevaPublicacion;
