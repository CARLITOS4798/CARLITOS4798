import { useState } from 'react'
import TarjetaProducto from './TarjetaProducto'

// Productos de un negocio agrupados por secciones (Sándwiches y Jugos, revistas Natura / Ésika / Yanbal...).
// Se usa cuando el negocio tiene  secciones  en src/data/negocios.js
function ProductosPorSeccion({ negocio }) {
  const [filtro, setFiltro] = useState('todos')

  // Productos sin sección asignada van en un grupo aparte, para que no se pierdan.
  const sinSeccion = negocio.productos.filter(
    (p) => !negocio.secciones.some((s) => s.id === p.seccion),
  )
  const grupos = [
    ...negocio.secciones.map((seccion) => ({
      ...seccion,
      productos: negocio.productos.filter((p) => p.seccion === seccion.id),
    })),
    ...(sinSeccion.length > 0 ? [{ id: 'otros', nombre: 'Otros productos', productos: sinSeccion }] : []),
  ]
  const visibles = filtro === 'todos' ? grupos : grupos.filter((g) => g.id === filtro)

  return (
    <>
      <div className="filtros" role="group" aria-label="Filtrar productos por sección">
        {[{ id: 'todos', nombre: 'Todos' }, ...grupos].map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={`filtro ${filtro === opcion.id ? 'filtro--activo' : ''}`}
            aria-pressed={filtro === opcion.id}
            onClick={() => setFiltro(opcion.id)}
          >
            {opcion.nombre}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {visibles.map((grupo) => (
          <section key={grupo.id} className="seccion-productos" aria-labelledby={`seccion-${grupo.id}`}>
            <div className="seccion-productos__cabecera">
              <div>
                <h3 id={`seccion-${grupo.id}`}>{grupo.nombre}</h3>
                {grupo.descripcion && <p>{grupo.descripcion}</p>}
              </div>
              {grupo.enlace && (
                <a
                  href={grupo.enlace}
                  className="boton boton--secundario boton--pequeno"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver catálogo digital <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            {grupo.productos.length > 0 ? (
              <div className="grilla-productos">
                {grupo.productos.map((producto) => (
                  <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    negocio={negocio}
                    mostrarNegocio={false}
                  />
                ))}
              </div>
            ) : (
              <p className="estado-vacio">Pronto publicaremos los productos de esta sección.</p>
            )}
          </section>
        ))}
      </div>
    </>
  )
}

export default ProductosPorSeccion
