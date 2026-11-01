import { buscarSeccion, enlaceWhatsApp, estadoDisponibilidad } from '../data/negocios'
import { maximoPedido, useCarrito } from '../carrito/carrito'
import ContadorCantidad from '../carrito/ContadorCantidad'
import IconoCarrito from '../carrito/IconoCarrito'
import IconoWhatsApp from './IconoWhatsApp'

const NOMBRE_GENERO = { mujer: 'Mujer', hombre: 'Hombre', unisex: 'Unisex' }

// Ícono que se muestra mientras el producto no tenga foto.
function IconoFoto() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="6" y="10" width="36" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="17" cy="20" r="4" fill="currentColor" />
      <path d="M8 35l11-10 8 7 6-5 9 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

// Estado según las unidades: disponible, quedan pocas o agotado.
// Solo aparece si el producto tiene el campo "disponibles".
function Disponibles({ estado, cantidad }) {
  if (!estado) return null
  const unidades = `${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'}`
  const texto = {
    agotado: 'Agotado',
    pocas: cantidad === 1 ? '¡Última unidad!' : `¡Quedan pocas! · ${unidades}`,
    disponible: `Disponible · ${unidades}`,
  }[estado]
  return <span className={`disponibles disponibles--${estado}`}>{texto}</span>
}

function TarjetaProducto({ producto, negocio, mostrarNegocio = true }) {
  const seccion = buscarSeccion(negocio, producto.seccion)
  const estado = estadoDisponibilidad(producto)
  const agotado = estado === 'agotado'
  const carrito = useCarrito()
  const enCarrito = carrito.cantidadDe(negocio.id, producto.id)
  const cambiar = (cantidad) => carrito.cambiarCantidad(negocio.id, producto.id, cantidad)
  // Agotado: en vez de agregar al carrito, se pregunta por WhatsApp cuándo vuelve a llegar.
  const preguntar =
    agotado && enlaceWhatsApp(negocio, `Hola, ¿cuándo vuelve a llegar ${producto.nombre} (${negocio.nombre})?`)
  return (
    <article
      className={`tarjeta-producto tono-${negocio.tono || 'verde'} ${agotado ? 'tarjeta-producto--agotado' : ''}`}
    >
      <div className="tarjeta-producto__imagen">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
        ) : (
          <>
            <IconoFoto />
            <span>{producto.demo ? 'Imagen de ejemplo' : 'Foto próximamente'}</span>
          </>
        )}
        {producto.demo && <span className="sello-demo">Demostración</span>}
        {agotado && <span className="sello-agotado">Agotado</span>}
        {producto.insignia && !producto.demo && (
          <span className="sello-insignia">
            <span aria-hidden="true">★</span> {producto.insignia}
          </span>
        )}
      </div>
      <div className="tarjeta-producto__cuerpo">
        {(mostrarNegocio || seccion) && (
          <p className="tarjeta-producto__negocio">
            {[mostrarNegocio && negocio.nombre, seccion?.nombre, NOMBRE_GENERO[producto.genero]]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <h3>{producto.nombre}</h3>
        <p className="tarjeta-producto__nota">
          {producto.descripcion ||
            (producto.demo
              ? `Espacio reservado para un producto real de ${negocio.categoria.toLowerCase()}.`
              : '')}
        </p>
        <div className="tarjeta-producto__pie">
          <p className="tarjeta-producto__precio">{producto.precio || 'Precio por definir'}</p>
        </div>
        <Disponibles estado={estado} cantidad={producto.disponibles} />
        {preguntar ? (
          <a
            href={preguntar}
            className="boton boton--pequeno boton--secundario tarjeta-producto__accion"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preguntar por WhatsApp cuándo llega ${producto.nombre}`}
          >
            <IconoWhatsApp /> Preguntar cuándo llega
          </a>
        ) : (
          !producto.demo &&
          !agotado &&
          (enCarrito > 0 ? (
            <div className="tarjeta-producto__accion tarjeta-producto__en-carrito">
              <ContadorCantidad
                cantidad={enCarrito}
                maximo={maximoPedido(producto)}
                onCambio={cambiar}
                nombre={producto.nombre}
              />
              <button type="button" className="enlace-carrito" onClick={carrito.abrir}>
                Ver carrito
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="boton boton--pequeno boton--agregar tarjeta-producto__accion"
              onClick={() => cambiar(1)}
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              <IconoCarrito /> Agregar al carrito
            </button>
          ))
        )}
      </div>
    </article>
  )
}

export default TarjetaProducto
