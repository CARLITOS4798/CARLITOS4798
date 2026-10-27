import { useEffect, useState } from 'react'
import { MARCA } from '../config/marca'
import Logo from './Logo'

const ENLACES = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'negocios', texto: 'Nuestros negocios' },
  { id: 'productos', texto: 'Productos' },
]

function Navbar({ pagina }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [seccionVisible, setSeccionVisible] = useState('inicio')
  // En la página de un negocio se resalta "Nuestros negocios".
  const seccionActiva = pagina === 'negocio' ? 'negocios' : seccionVisible

  // Resalta en la barra la sección de inicio que se está viendo.
  useEffect(() => {
    if (pagina !== 'inicio') return undefined
    const secciones = ENLACES.map((enlace) => document.getElementById(enlace.id)).filter(Boolean)
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setSeccionVisible(entrada.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    secciones.forEach((seccion) => observador.observe(seccion))
    return () => observador.disconnect()
  }, [pagina])

  // Cierra el menú del celular con la tecla Escape.
  useEffect(() => {
    if (!menuAbierto) return undefined
    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') setMenuAbierto(false)
    }
    window.addEventListener('keydown', alPresionarTecla)
    return () => window.removeEventListener('keydown', alPresionarTecla)
  }, [menuAbierto])

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="navbar">
      <div className="contenedor navbar__interior">
        <a href="#inicio" className="marca" onClick={cerrarMenu}>
          <Logo />
          <span>{MARCA.nombre}</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          <span className={`hamburguesa ${menuAbierto ? 'hamburguesa--abierta' : ''}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="menu-principal"
          className={`navbar__menu ${menuAbierto ? 'navbar__menu--abierto' : ''}`}
          aria-label="Navegación principal"
        >
          <ul className="navbar__enlaces">
            {ENLACES.map((enlace) => (
              <li key={enlace.id}>
                <a
                  href={`#${enlace.id}`}
                  className={seccionActiva === enlace.id ? 'activo' : undefined}
                  aria-current={seccionActiva === enlace.id ? 'true' : undefined}
                  onClick={cerrarMenu}
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
          <a href="#negocios" className="boton boton--primario boton--pequeno" onClick={cerrarMenu}>
            Explorar negocios
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
