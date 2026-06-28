import { useContext, useState } from "react";
import { Alert, Button, Container, Form, Modal } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import PerfilMenu from "../components/PerfilMenu.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { formatearCLP, limpiarPrecioCLP } from "../utils/formatters.js";

function Perfil() {
  const [params] = useSearchParams();
  const seccionInicial = params.get("seccion") || "datos";
  const [seccionActiva, setSeccionActiva] = useState(seccionInicial);
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [direccionEditada, setDireccionEditada] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);

  const {
    usuario,
    autenticado,
    cerrarSesion,
    agregarDireccion,
    editarDireccion,
    eliminarDireccion
  } = useContext(AuthContext);

  const {
    productos,
    editarProductoPublicado,
    eliminarProductoPublicado,
    categorias
  } = useContext(ProductContext);

  const navigate = useNavigate();

  const publicaciones = usuario
    ? productos.filter((producto) => producto.vendedorId === usuario.id)
    : [];

  const manejarCambioSeccion = (seccion) => {
    if (seccion === "logout") {
      cerrarSesion();
      navigate("/login");
      return;
    }

    setSeccionActiva(seccion);
  };

  const manejarAgregarDireccion = (evento) => {
    evento.preventDefault();
    agregarDireccion(nuevaDireccion);
    setNuevaDireccion("");
  };

  const comenzarEdicionDireccion = (indice, direccion) => {
    setIndiceEditando(indice);
    setDireccionEditada(direccion);
  };

  const guardarEdicionDireccion = (indice) => {
    editarDireccion(indice, direccionEditada);
    setIndiceEditando(null);
    setDireccionEditada("");
  };

  const abrirEdicionProducto = (producto) => {
    setProductoEditando({
      ...producto,
      precio: String(producto.precio),
      stock: String(producto.stock)
    });
  };

  const actualizarProductoEditando = (evento) => {
    const { name, value } = evento.target;

    if (name === "precio") {
      setProductoEditando((actual) => ({
        ...actual,
        precio: limpiarPrecioCLP(value)
      }));
      return;
    }

    setProductoEditando((actual) => ({
      ...actual,
      [name]: value
    }));
  };

  const guardarProductoEditado = () => {
    editarProductoPublicado(productoEditando.id, usuario.id, productoEditando);
    setProductoEditando(null);
  };

  if (!autenticado || !usuario) {
    return (
      <Container fluid="xl" className="page-container">
        <section className="auth-card">
          <h1>Mi perfil</h1>
          <Alert variant="info">
            No hay una sesión activa. Para ver tus datos personales, publicaciones y direcciones, primero debes iniciar sesión.
          </Alert>

          <Button as={Link} to="/login" className="primary-action w-100 mb-3">
            Iniciar sesión
          </Button>

          <Button as={Link} to="/registro" className="secondary-action w-100">
            Crear cuenta
          </Button>
        </section>
      </Container>
    );
  }

  const renderPublicaciones = () => (
    <section className="profile-content">
      <div className="profile-section-header">
        <h1>Mis publicaciones</h1>
        <Button as={Link} to="/publicar" className="primary-action">
          Nueva publicación
        </Button>
      </div>

      {publicaciones.length === 0 ? (
        <Alert variant="info">
          Aún no tienes publicaciones creadas.
        </Alert>
      ) : (
        publicaciones.map((producto) => (
          <article className="publication-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />

            <div>
              <h2>{producto.nombre}</h2>
              <p>{formatearCLP(producto.precio)}</p>
              <small>{producto.categoria}</small>
            </div>

            <div className="publication-actions">
              <button onClick={() => abrirEdicionProducto(producto)}>
                <FaEdit />
              </button>

              <button onClick={() => eliminarProductoPublicado(producto.id, usuario.id)}>
                <FaTrashAlt />
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );

  const renderNuevaPublicacion = () => (
    <section className="profile-content">
      <h1>Nueva publicación</h1>
      <Alert variant="info">
        Para crear una publicación completa, usa el formulario principal.
      </Alert>

      <Button as={Link} to="/publicar" className="primary-action">
        Ir a Nueva publicación
      </Button>
    </section>
  );

  const renderDatosPersonales = () => (
    <section className="profile-content">
      <h1>Datos personales</h1>

      <Form className="profile-form">
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={`${usuario.nombre} ${usuario.apellido || ""}`.trim()}
            readOnly
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Rut</Form.Label>
          <Form.Control value={usuario.rut || ""} readOnly />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mail</Form.Label>
          <Form.Control value={usuario.email || ""} readOnly />
        </Form.Group>

        <Button className="secondary-action">
          Cambiar contraseña
        </Button>
      </Form>

      <div className="address-card">
        <h2>Direcciones</h2>

        {(usuario.direcciones || []).length === 0 && (
          <Alert variant="secondary">No tienes direcciones guardadas.</Alert>
        )}

        <div className="address-list">
          {(usuario.direcciones || []).map((direccion, indice) => (
            <div className="address-item" key={`${direccion}-${indice}`}>
              {indiceEditando === indice ? (
                <Form.Control
                  value={direccionEditada}
                  onChange={(e) => setDireccionEditada(e.target.value)}
                />
              ) : (
                <span>{direccion}</span>
              )}

              <div className="address-actions">
                {indiceEditando === indice ? (
                  <button onClick={() => guardarEdicionDireccion(indice)}>
                    Guardar
                  </button>
                ) : (
                  <button onClick={() => comenzarEdicionDireccion(indice, direccion)}>
                    <FaEdit />
                  </button>
                )}

                <button onClick={() => eliminarDireccion(indice)}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Form className="add-address-form" onSubmit={manejarAgregarDireccion}>
          <Form.Control
            placeholder="Agregar nueva dirección"
            value={nuevaDireccion}
            onChange={(e) => setNuevaDireccion(e.target.value)}
          />
          <Button type="submit" className="primary-action">
            <FaPlus /> Agregar
          </Button>
        </Form>
      </div>
    </section>
  );

  const renderContenido = () => {
    if (seccionActiva === "publicaciones") return renderPublicaciones();
    if (seccionActiva === "nueva") return renderNuevaPublicacion();
    return renderDatosPersonales();
  };

  return (
    <Container fluid="xl" className="page-container">
      <div className="profile-layout">
        <PerfilMenu
          seccionActiva={seccionActiva}
          setSeccionActiva={manejarCambioSeccion}
        />

        {renderContenido()}
      </div>

      <Modal
        show={Boolean(productoEditando)}
        onHide={() => setProductoEditando(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar publicación</Modal.Title>
        </Modal.Header>

        {productoEditando && (
          <Modal.Body>
            <Form className="profile-form">
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  value={productoEditando.nombre}
                  onChange={actualizarProductoEditando}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={productoEditando.descripcion}
                  onChange={actualizarProductoEditando}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Select
                  name="categoria"
                  value={productoEditando.categoria}
                  onChange={actualizarProductoEditando}
                >
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.nombre}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  name="precio"
                  value={formatearCLP(productoEditando.precio)}
                  onChange={actualizarProductoEditando}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="stock"
                  value={productoEditando.stock}
                  onChange={actualizarProductoEditando}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={productoEditando.estado}
                  onChange={actualizarProductoEditando}
                >
                  <option>Nuevo</option>
                  <option>Usado</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label>URL imagen</Form.Label>
                <Form.Control
                  name="imagen"
                  value={productoEditando.imagen}
                  onChange={actualizarProductoEditando}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setProductoEditando(null)}>
            Cancelar
          </Button>

          <Button className="primary-action" onClick={guardarProductoEditado}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Perfil;
