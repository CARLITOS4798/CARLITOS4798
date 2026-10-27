import { rutaNegocio } from '../hooks/useRuta'
import ImagenNegocio from './ImagenNegocio'

function TarjetaNegocio({ negocio }) {
  return (
    <article className={`tarjeta-negocio tono-${negocio.tono || 'verde'}`}>
      <a href={rutaNegocio(negocio.id)} className="tarjeta-negocio__imagen" tabIndex={-1} aria-hidden="true">
        <ImagenNegocio negocio={negocio} />
      </a>
      <div className="tarjeta-negocio__cuerpo">
        <div className="tarjeta-negocio__cabecera">
          {negocio.logo && (
            <img className="logo-negocio" src={negocio.logo} alt={`Logo de ${negocio.nombre}`} />
          )}
          <p className="insignia">{negocio.categoria}</p>
        </div>
        <h3>{negocio.nombre}</h3>
        <p className="tarjeta-negocio__descripcion">{negocio.descripcion}</p>
        <a href={rutaNegocio(negocio.id)} className="boton boton--negocio">
          Entrar a {negocio.nombre}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

export default TarjetaNegocio
