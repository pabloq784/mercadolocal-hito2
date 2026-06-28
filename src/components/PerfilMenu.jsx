import { Button } from "react-bootstrap";
import { FaBoxOpen, FaPlusCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

function PerfilMenu({ seccionActiva, setSeccionActiva }) {
  return (
    <aside className="profile-sidebar">
      <Button
        className={seccionActiva === "datos" ? "active" : ""}
        onClick={() => setSeccionActiva("datos")}
      >
        <FaUser />
        Datos personales
      </Button>

      <Button
        className={seccionActiva === "publicaciones" ? "active" : ""}
        onClick={() => setSeccionActiva("publicaciones")}
      >
        <FaBoxOpen />
        Mis publicaciones
      </Button>

      <Button
        className={seccionActiva === "nueva" ? "active" : ""}
        onClick={() => setSeccionActiva("nueva")}
      >
        <FaPlusCircle />
        Nueva publicación
      </Button>

      <Button
        className="logout"
        onClick={() => setSeccionActiva("logout")}
      >
        <FaSignOutAlt />
        Cerrar sesión
      </Button>
    </aside>
  );
}

export default PerfilMenu;
