import { MARCA } from '../config/marca'
import { NEGOCIOS, enlaceWhatsApp } from '../data/negocios'
import { rutaNegocio } from '../hooks/useRuta'
import Logo from './Logo'

function PiePagina() {
  const anio = new Date().getFullYear()
  // Un renglón por número distinto: si todos los negocios comparten número, sale una sola vez.
  const conNumero = NEGOCIOS.filter((negocio) => enlaceWhatsApp(negocio, ''))
  const numeros = [...new Set(conNumero.map((negocio) => negocio.whatsapp.replace(/\D/g, '')))]
  const conWhatsApp = numeros.map((numero) => {
    const negocios = conNumero.filter((negocio) => negocio.whatsapp.replace(/\D/g, '') === numero)
    return {
      ...negocios[0],
      nombre: negocios.length === NEGOCIOS.length ? null : negocios.map((n) => n.nombre).join(', '),
    }
  })

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
            {conWhatsApp.length > 0 ? (
              conWhatsApp.map((negocio) => (
                <li key={negocio.id}>
                  <span>Teléfono / WhatsApp{negocio.nombre && ` · ${negocio.nombre}`}</span>
                  <a
                    href={enlaceWhatsApp(negocio, `Hola, vi la página de ${MARCA.nombre}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {negocio.whatsapp}
                  </a>
                </li>
              ))
            ) : (
              <li>
                <span>Teléfono / WhatsApp</span> Por confirmar
              </li>
            )}
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
