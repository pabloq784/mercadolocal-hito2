import { Button, Form } from "react-bootstrap";

function SidebarFiltros({ categorias = [], categoriaActiva = "", onCategoriaChange }) {
  return (
    <aside className="filters-sidebar">
      <h2>Filtros</h2>

      <Button
        className={categoriaActiva === "" ? "active" : ""}
        onClick={() => onCategoriaChange("")}
      >
        Todos
      </Button>

      {categorias.map((categoria) => (
        <Button
          key={categoria.id}
          className={categoriaActiva === categoria.nombre ? "active" : ""}
          onClick={() => onCategoriaChange(categoria.nombre)}
        >
          {categoria.nombre}
        </Button>
      ))}

      <Form.Group className="mt-4">
        <Form.Label>Ordenar por</Form.Label>
        <Form.Select>
          <option>Más recientes</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
        </Form.Select>
      </Form.Group>
    </aside>
  );
}

export default SidebarFiltros;
