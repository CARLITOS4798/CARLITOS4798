import { buscarSeccion } from '../data/negocios'

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

function TarjetaProducto({ producto, negocio, mostrarNegocio = true }) {
  const seccion = buscarSeccion(negocio, producto.seccion)
  return (
    <article className={`tarjeta-producto tono-${negocio.tono || 'verde'}`}>
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
        {producto.insignia && !producto.demo && (
          <span className="sello-insignia">
            <span aria-hidden="true">★</span> {producto.insignia}
          </span>
        )}
      </div>
      <div className="tarjeta-producto__cuerpo">
        {(mostrarNegocio || seccion) && (
          <p className="tarjeta-producto__negocio">
            {[mostrarNegocio && negocio.nombre, seccion?.nombre].filter(Boolean).join(' · ')}
          </p>
        )}
        <h3>{producto.nombre}</h3>
        <p className="tarjeta-producto__nota">
          {producto.descripcion ||
            (producto.demo
              ? `Espacio reservado para un producto real de ${negocio.categoria.toLowerCase()}.`
              : '')}
        </p>
        <p className="tarjeta-producto__precio">{producto.precio || 'Precio por definir'}</p>
      </div>
    </article>
  )
}

export default TarjetaProducto
