import { useContext, useEffect, useMemo, useState } from "react";
import { Alert, Col, Container, Pagination, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SidebarFiltros from "../components/SidebarFiltros.jsx";

const PRODUCTOS_POR_PAGINA = 8;

function Productos() {
  const { productos, categorias } = useContext(ProductContext);
  const [params, setParams] = useSearchParams();
  const [paginaActual, setPaginaActual] = useState(1);

  const busqueda = (params.get("buscar") || "").toLowerCase();
  const categoria = params.get("categoria") || "";

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const coincideBusqueda =
        busqueda === "" ||
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda);

      const coincideCategoria =
        categoria === "" || producto.categoria === categoria;

      return coincideBusqueda && coincideCategoria;
    });
  }, [productos, busqueda, categoria]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA)
  );

  const productosPagina = useMemo(() => {
    const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;

    return productosFiltrados.slice(inicio, fin);
  }, [productosFiltrados, paginaActual]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoria]);

  const cambiarCategoria = (valor) => {
    if (valor === "") {
      setParams({});
    } else {
      setParams({ categoria: valor });
    }
  };

  return (
    <Container fluid="xl" className="page-container">
      <div className="catalog-layout">
        <SidebarFiltros
          categorias={categorias}
          categoriaActiva={categoria}
          onCategoriaChange={cambiarCategoria}
        />

        <section className="catalog-content">
          <div className="page-title-row">
            <div>
              <h1>Explorar productos</h1>
              <p>
                {productosFiltrados.length} resultados encontrados
                {categoria && ` en ${categoria}`}
              </p>
            </div>
          </div>

          {productosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron productos con los filtros seleccionados.
            </Alert>
          ) : (
            <>
              <Row className="g-4">
                {productosPagina.map((producto) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={producto.id}>
                    <ProductCard {...producto} />
                  </Col>
                ))}
              </Row>

              <div className="pagination-info">
                Página {paginaActual} de {totalPaginas}
              </div>

              <Pagination className="catalog-pagination">
                <Pagination.Prev
                  disabled={paginaActual === 1}
                  onClick={() => setPaginaActual((actual) => Math.max(1, actual - 1))}
                />

                {Array.from({ length: totalPaginas }, (_, index) => {
                  const numeroPagina = index + 1;

                  return (
                    <Pagination.Item
                      key={numeroPagina}
                      active={numeroPagina === paginaActual}
                      onClick={() => setPaginaActual(numeroPagina)}
                    >
                      {numeroPagina}
                    </Pagination.Item>
                  );
                })}

                <Pagination.Next
                  disabled={paginaActual === totalPaginas}
                  onClick={() => setPaginaActual((actual) => Math.min(totalPaginas, actual + 1))}
                />
              </Pagination>
            </>
          )}
        </section>
      </div>
    </Container>
  );
}

export default Productos;
