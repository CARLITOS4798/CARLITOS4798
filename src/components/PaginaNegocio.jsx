import { NEGOCIOS, buscarNegocio, hayDemos } from '../data/negocios'
import { rutaNegocio } from '../hooks/useRuta'
import AvisoDemo from './AvisoDemo'
import ImagenNegocio from './ImagenNegocio'
import ProductosPorSeccion from './ProductosPorSeccion'
import TarjetaProducto from './TarjetaProducto'

function BotonVolver({ className = '' }) {
  return (
    <a href="#inicio" className={`boton boton--secundario ${className}`}>
      <span aria-hidden="true">←</span> Volver al inicio
    </a>
  )
}

function PaginaNegocio({ id }) {
  const negocio = buscarNegocio(id)

  if (!negocio) {
    return (
      <section className="seccion">
        <div className="contenedor no-encontrado">
          <h1>No encontramos este negocio</h1>
          <p>Es posible que la dirección esté mal escrita.</p>
          <BotonVolver />
        </div>
      </section>
    )
  }

  const productos = negocio.productos
  const otros = NEGOCIOS.filter((n) => n.id !== negocio.id)

  return (
    <div className={`pagina-negocio tono-${negocio.tono || 'verde'}`}>
      <section className="negocio-portada" aria-labelledby="titulo-negocio">
        <div className="contenedor">
          <BotonVolver className="boton--pequeno negocio-portada__volver" />
          <div className="negocio-portada__interior">
            <div>
              <div className="tarjeta-negocio__cabecera">
                {negocio.logo && (
                  <img className="logo-negocio" src={negocio.logo} alt={`Logo de ${negocio.nombre}`} />
                )}
                <p className="insignia">{negocio.categoria}</p>
              </div>
              <h1 id="titulo-negocio">{negocio.nombre}</h1>
              <p className="negocio-portada__descripcion">{negocio.descripcion}</p>
              {/* Botón (no enlace) para no cambiar el "#" de la dirección, que define la página. */}
              <button
                type="button"
                className="boton boton--negocio"
                onClick={() => document.getElementById('productos-negocio')?.scrollIntoView()}
              >
                Ver productos <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="negocio-portada__imagen">
              <ImagenNegocio negocio={negocio} />
            </div>
          </div>
        </div>
      </section>

      <section id="productos-negocio" className="seccion" aria-labelledby="titulo-productos-negocio">
        <div className="contenedor">
          <div className="encabezado-seccion">
            <p className="etiqueta">Productos</p>
            <h2 id="titulo-productos-negocio">Productos de {negocio.nombre}</h2>
          </div>
          {hayDemos(productos) && <AvisoDemo />}
          {negocio.secciones?.length > 0 ? (
            <ProductosPorSeccion negocio={negocio} />
          ) : productos.length > 0 ? (
            <div className="grilla-productos">
              {productos.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  producto={producto}
                  negocio={negocio}
                  mostrarNegocio={false}
                />
              ))}
            </div>
          ) : (
            <p className="estado-vacio">Pronto publicaremos los productos de este negocio.</p>
          )}
        </div>
      </section>

      <section className="seccion seccion--alterna seccion--compacta">
        <div className="contenedor otros-negocios">
          {otros.length > 0 && (
            <div>
              <p className="etiqueta">También te puede interesar</p>
              {otros.map((otro) => (
                <a key={otro.id} href={rutaNegocio(otro.id)} className="otros-negocios__enlace">
                  {otro.nombre} <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          )}
          <BotonVolver />
        </div>
      </section>
    </div>
  )
}

export default PaginaNegocio
