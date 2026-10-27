import { useEffect, useState } from 'react'

// Enrutador mínimo basado en el "#" de la dirección (sin bibliotecas extra).
//   #/negocio/apetitivos  → página de un negocio
//   #negocios, #productos → secciones de la página de inicio
// Funciona en cualquier servidor sin configuración adicional.

export const rutaNegocio = (id) => `#/negocio/${id}`

function leerRuta() {
  const hash = window.location.hash
  const coincidencia = hash.match(/^#\/negocio\/([\w-]+)/)
  if (coincidencia) return { pagina: 'negocio', id: coincidencia[1] }
  return { pagina: 'inicio', seccion: hash.length > 1 ? hash.slice(1) : null }
}

export function useRuta() {
  const [ruta, setRuta] = useState(leerRuta)

  useEffect(() => {
    const alCambiar = () => setRuta(leerRuta())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  return ruta
}
