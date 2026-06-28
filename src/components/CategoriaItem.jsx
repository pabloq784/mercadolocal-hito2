import { FaCouch, FaDumbbell, FaMobileAlt, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

const iconos = {
  "Electrónica": FaMobileAlt,
  "Hogar y Decoración": FaCouch,
  "Deportes y Outdoor": FaDumbbell,
  "Moda y Accesorios": FaShoppingBag
};

function CategoriaItem({ nombre }) {
  const Icono = iconos[nombre] || FaMobileAlt;

  return (
    <Link
      to={`/productos?categoria=${encodeURIComponent(nombre)}`}
      className="category-item"
    >
      <div className="category-icon-circle">
        <Icono />
      </div>

      <span>{nombre}</span>
    </Link>
  );
}

export default CategoriaItem;
