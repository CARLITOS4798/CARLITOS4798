import { MARCA } from '../config/marca'
import { NEGOCIOS } from '../data/negocios'
import imagenHero from '../assets/ilustraciones/hero.svg'

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="contenedor hero__interior">
        <div className="hero__texto">
          <p className="etiqueta">{MARCA.lema}</p>
          <h1>
            Todo lo que necesitas, <span className="resaltado">en un mismo lugar</span>
          </h1>
          <p className="hero__descripcion">
            Bienvenido a {MARCA.nombre}, el espacio que reúne los emprendimientos{' '}
            {NEGOCIOS.map((negocio, i) => (
              <span key={negocio.id}>
                {i > 0 && (i === NEGOCIOS.length - 1 ? ' y ' : ', ')}
                <strong>{negocio.nombre}</strong>
              </span>
            ))}
            . Conócelos y descubre lo que cada uno tiene para ti.
          </p>
          <div className="hero__acciones">
            <a href="#negocios" className="boton boton--primario">
              Explorar negocios
              <span aria-hidden="true">→</span>
            </a>
            <a href="#productos" className="boton boton--secundario">
              Ver productos
            </a>
          </div>
        </div>

        <div className="hero__imagen">
          <img
            src={imagenHero}
            alt="Ilustración de una pequeña tienda de barrio con toldo, vitrina y plantas"
            width="520"
            height="440"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
