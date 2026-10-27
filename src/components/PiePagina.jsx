import { MARCA } from '../config/marca'
import { NEGOCIOS } from '../data/negocios'
import { rutaNegocio } from '../hooks/useRuta'
import Logo from './Logo'

function PiePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className="pie">
      <div className="contenedor pie__grilla">
        <div className="pie__marca">
          <a href="#inicio" className="marca marca--clara">
            <Logo />
            <span>{MARCA.nombre}</span>
          </a>
          <p>{MARCA.lema}.</p>
        </div>

        <div>
          <h2 className="pie__titulo">Nuestros negocios</h2>
          <ul className="pie__lista">
            {NEGOCIOS.map((negocio) => (
              <li key={negocio.id}>
                <a href={rutaNegocio(negocio.id)}>{negocio.nombre}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="pie__titulo">Contacto</h2>
          <ul className="pie__lista pie__contacto">
            <li>
              <span>Teléfono / WhatsApp</span> Por confirmar
            </li>
            <li>
              <span>Correo electrónico</span> Por confirmar
            </li>
            <li>
              <span>Ubicación</span> Por confirmar
            </li>
          </ul>
        </div>
      </div>

      <div className="contenedor pie__inferior">
        <p>
          © {anio} {MARCA.nombre}. Todos los derechos reservados.
        </p>
        <p>Sitio en construcción · Primera versión</p>
      </div>
    </footer>
  )
}

export default PiePagina
