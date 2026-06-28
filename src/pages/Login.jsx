import { useContext, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const { iniciarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("info");

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    const resultado = iniciarSesion(email, password);

    if (!resultado.ok) {
      setTipoMensaje("danger");
      setMensaje(resultado.mensaje);
      return;
    }

    setTipoMensaje("success");
    setMensaje(resultado.mensaje);

    setTimeout(() => {
      navigate("/perfil");
    }, 500);
  };

  return (
    <Container fluid="xl" className="page-container">
      <section className="auth-card">
        <h1>Inicio de sesión</h1>

        <p className="auth-help-text">
          Ingresa con una cuenta creada en la pantalla de registro.
          También puedes usar la cuenta demo: <strong>demo@mercadolocal.cl</strong> / <strong>12345678</strong>
        </p>

        {mensaje && (
          <Alert variant={tipoMensaje}>
            {mensaje}
          </Alert>
        )}

        <Form onSubmit={manejarSubmit}>
          <Form.Group>
            <Form.Label>Mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="correo@ejemplo.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="primary-action w-100">
            Iniciar sesión
          </Button>

          <Button as={Link} to="/registro" className="secondary-action w-100">
            Crear cuenta
          </Button>

          <Button type="button" className="secondary-action w-100">
            Recuperar contraseña
          </Button>
        </Form>
      </section>
    </Container>
  );
}

export default Login;
