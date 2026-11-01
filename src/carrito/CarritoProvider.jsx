import { useCallback, useEffect, useMemo, useState } from 'react'
import { buscarNegocio } from '../data/negocios'
import { CarritoContexto, maximoPedido, precioNumero } from './carrito'

const CLAVE = 'nuestra-tienda-carrito'

// El carrito se guarda en el navegador de cada cliente, para que no se pierda al recargar.
function leerGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    return Array.isArray(guardado) ? guardado : []
  } catch {
    return []
  }
}

function CarritoProvider({ children }) {
  // Cada item: { negocioId, productoId, cantidad }
  const [items, setItems] = useState(leerGuardado)
  const [abierto, setAbierto] = useState(false)
  // Funciones estables: el panel las usa en efectos y no deben cambiar con cada cantidad.
  const abrir = useCallback(() => setAbierto(true), [])
  const cerrar = useCallback(() => setAbierto(false), [])

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
      // Sin almacenamiento (modo privado): el carrito funciona igual mientras la página esté abierta.
    }
  }, [items])

  // Une cada item con los datos actuales del producto. Se descartan los que ya no existen
  // o se agotaron, y la cantidad nunca pasa de las unidades disponibles.
  const lineas = useMemo(
    () =>
      items
        .map((item) => {
          const negocio = buscarNegocio(item.negocioId)
          const producto = negocio?.productos.find((p) => p.id === item.productoId)
          if (!producto || producto.demo) return null
          const cantidad = Math.min(item.cantidad, maximoPedido(producto))
          if (cantidad <= 0) return null
          return { ...item, cantidad, negocio, producto, precio: precioNumero(producto.precio) }
        })
        .filter(Boolean),
    [items],
  )

  const valor = useMemo(() => {
    const cambiarCantidad = (negocioId, productoId, cantidad) =>
      setItems((anteriores) => {
        const esEste = (item) => item.negocioId === negocioId && item.productoId === productoId
        if (cantidad <= 0) return anteriores.filter((item) => !esEste(item))
        if (anteriores.some(esEste)) {
          return anteriores.map((item) => (esEste(item) ? { ...item, cantidad } : item))
        }
        return [...anteriores, { negocioId, productoId, cantidad }]
      })

    const cantidadDe = (negocioId, productoId) =>
      lineas.find((l) => l.negocioId === negocioId && l.productoId === productoId)?.cantidad || 0

    return {
      lineas,
      totalUnidades: lineas.reduce((suma, l) => suma + l.cantidad, 0),
      totalPesos: lineas.reduce((suma, l) => suma + (l.precio ?? 0) * l.cantidad, 0),
      hayPreciosPendientes: lineas.some((l) => l.precio === null),
      cantidadDe,
      cambiarCantidad,
      vaciar: () => setItems([]),
      abierto,
      abrir,
      cerrar,
    }
  }, [lineas, abierto, abrir, cerrar])

  return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>
}

export default CarritoProvider
