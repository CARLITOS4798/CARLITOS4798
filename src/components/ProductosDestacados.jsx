import { useState } from 'react'
import { NEGOCIOS, TODOS_LOS_PRODUCTOS, buscarNegocio, hayDemos } from '../data/negocios'
import AvisoDemo from './AvisoDemo'
import EncabezadoSeccion from './EncabezadoSeccion'
import TarjetaProducto from './TarjetaProducto'

// En el inicio solo aparecen los productos marcados con  destacado: true
const DESTACADOS = TODOS_LOS_PRODUCTOS.filter((producto) => producto.destacado)

const FILTROS = [{ id: 'todos', texto: 'Todos' }, ...NEGOCIOS.map((n) => ({ id: n.id, texto: n.nombre }))]

function ProductosDestacados() {
  const [filtro, setFiltro] = useState('todos')
  const productos =
    filtro === 'todos' ? DESTACADOS : DESTACADOS.filter((p) => p.negocioId === filtro)

  return (
    <section id="productos" className="seccion seccion--alterna" aria-labelledby="titulo-productos">
      <div className="contenedor">
        <EncabezadoSeccion
          id="titulo-productos"
          etiqueta="Productos"
          titulo="Productos destacados"
          descripcion="Una muestra de lo que ofrece cada negocio."
        />

        {hayDemos(productos) && <AvisoDemo />}

        <div className="filtros" role="group" aria-label="Filtrar productos por negocio">
          {FILTROS.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              className={`filtro ${filtro === opcion.id ? 'filtro--activo' : ''}`}
              aria-pressed={filtro === opcion.id}
              onClick={() => setFiltro(opcion.id)}
            >
              {opcion.texto}
            </button>
          ))}
        </div>

        {productos.length > 0 ? (
          <div className="grilla-productos" aria-live="polite">
            {productos.map((producto) => (
              <TarjetaProducto
                key={`${producto.negocioId}-${producto.id}`}
                producto={producto}
                negocio={buscarNegocio(producto.negocioId)}
              />
            ))}
          </div>
        ) : (
          <p className="estado-vacio">Pronto publicaremos productos aquí.</p>
        )}
      </div>
    </section>
  )
}

export default ProductosDestacados
