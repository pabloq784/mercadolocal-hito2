import { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Registro() {
  const { registrarUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmarPassword: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value
    }));
  };

  const manejarRegistro = (evento) => {
    evento.preventDefault();

    if (formulario.password.length < 6) {
      setTipoMensaje("danger");
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (formulario.password !== formulario.confirmarPassword) {
      setTipoMensaje("danger");
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    const resultado = registrarUsuario(formulario);

    if (!resultado.ok) {
      setTipoMensaje("danger");
      setMensaje(resultado.mensaje);
      return;
    }

    setTipoMensaje("success");
    setMensaje("Cuenta creada correctamente. Ahora puedes iniciar sesión.");

    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <Container fluid="xl" className="page-container">
      <section className="auth-card large">
        <h1>Creación de cuenta</h1>

        <p className="auth-help-text">
          Esta cuenta se guarda de forma simulada en el navegador usando localStorage.
        </p>

        {mensaje && (
          <Alert variant={tipoMensaje}>
            {mensaje}
          </Alert>
        )}

        <Form onSubmit={manejarRegistro}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              value={formulario.nombre}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido"
              value={formulario.apellido}
              onChange={actualizarCampo}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Rut</Form.Label>
            <Form.Control
              name="rut"
              value={formulario.rut}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formulario.email}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              name="telefono"
              value={formulario.telefono}
              onChange={actualizarCampo}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              value={formulario.direccion}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formulario.password}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmarPassword"
              value={formulario.confirmarPassword}
              onChange={actualizarCampo}
              required
            />
          </Form.Group>

          <Button type="submit" className="primary-action w-100">
            Crear cuenta
          </Button>
        </Form>
      </section>
    </Container>
  );
}

export default Registro;
