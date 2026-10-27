import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Negocios from './components/Negocios'
import ProductosDestacados from './components/ProductosDestacados'
import PaginaNegocio from './components/PaginaNegocio'
import PiePagina from './components/PiePagina'
import { useRuta } from './hooks/useRuta'
import './App.css'

function App() {
  const ruta = useRuta()

  // Al cambiar de página: subir al inicio, o ir a la sección pedida (#negocios, #productos...).
  useEffect(() => {
    if (ruta.pagina === 'negocio') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else if (ruta.seccion) {
      document.getElementById(ruta.seccion)?.scrollIntoView()
    }
  }, [ruta])

  return (
    <>
      <a href="#contenido" className="saltar-contenido">
        Saltar al contenido
      </a>
      <Navbar pagina={ruta.pagina} />
      <main id="contenido">
        {ruta.pagina === 'negocio' ? (
          <PaginaNegocio key={ruta.id} id={ruta.id} />
        ) : (
          <>
            <Hero />
            <Negocios />
            <ProductosDestacados />
          </>
        )}
      </main>
      <PiePagina />
    </>
  )
}

export default App
