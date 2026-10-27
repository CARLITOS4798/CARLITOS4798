import { useState } from 'react'
import TarjetaProducto from './TarjetaProducto'

const GENEROS = [
  { id: 'todos', nombre: 'Todos' },
  { id: 'mujer', nombre: 'Mujer' },
  { id: 'hombre', nombre: 'Hombre' },
]

// Productos de un negocio agrupados por secciones (Sándwiches y Jugos, revistas Natura / Ésika / Yanbal...).
// Se usa cuando el negocio tiene  secciones  en src/data/negocios.js
// Fila de botones de filtro (uno activo a la vez).
function Filtros({ etiqueta, opciones, valor, onCambio, titulo }) {
  return (
    <div className="filtros" role="group" aria-label={etiqueta}>
      {titulo && <span className="filtros__titulo">{titulo}</span>}
      {opciones.map((opcion) => (
        <button
          key={opcion.id}
          type="button"
          className={`filtro ${valor === opcion.id ? 'filtro--activo' : ''}`}
          aria-pressed={valor === opcion.id}
          onClick={() => onCambio(opcion.id)}
        >
          {opcion.nombre}
        </button>
      ))}
    </div>
  )
}

function ProductosPorSeccion({ negocio }) {
  const [filtro, setFiltro] = useState('todos')
  const [genero, setGenero] = useState('todos')

  // El filtro Mujer / Hombre solo aparece si algún producto tiene "genero".
  // Los productos unisex salen en los dos.
  const conGenero = negocio.productos.some((p) => p.genero)
  const productos =
    genero === 'todos'
      ? negocio.productos
      : negocio.productos.filter((p) => p.genero === genero || p.genero === 'unisex')

  // Productos sin sección asignada van en un grupo aparte, para que no se pierdan.
  const sinSeccion = productos.filter((p) => !negocio.secciones.some((s) => s.id === p.seccion))
  const grupos = [
    ...negocio.secciones.map((seccion) => ({
      ...seccion,
      productos: productos.filter((p) => p.seccion === seccion.id),
    })),
    ...(sinSeccion.length > 0 ? [{ id: 'otros', nombre: 'Otros productos', productos: sinSeccion }] : []),
  ]
  const visibles = (filtro === 'todos' ? grupos : grupos.filter((g) => g.id === filtro)).filter(
    // Con el filtro de género puesto, se esconden las secciones que quedan vacías.
    (g) => genero === 'todos' || g.productos.length > 0,
  )

  return (
    <>
      <Filtros
        etiqueta="Filtrar productos por sección"
        opciones={[{ id: 'todos', nombre: 'Todos' }, ...grupos]}
        valor={filtro}
        onCambio={setFiltro}
      />
      {conGenero && (
        <Filtros
          etiqueta="Filtrar productos para mujer u hombre"
          titulo="Para:"
          opciones={GENEROS}
          valor={genero}
          onCambio={setGenero}
        />
      )}
      {visibles.length === 0 && (
        <p className="estado-vacio">No hay productos con este filtro por ahora.</p>
      )}

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
