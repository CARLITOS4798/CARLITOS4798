import { formatoPesos, useCarrito } from './carrito'
import IconoCarrito from './IconoCarrito'

// Barra fija abajo cuando hay productos en el carrito, para ir al pedido desde cualquier parte.
function BotonCarritoFlotante() {
  const carrito = useCarrito()
  if (carrito.totalUnidades === 0 || carrito.abierto) return null
  const unidades = `${carrito.totalUnidades} ${carrito.totalUnidades === 1 ? 'producto' : 'productos'}`
  return (
    <button type="button" className="carrito-flotante" onClick={carrito.abrir}>
      <IconoCarrito />
      <span>Ver mi pedido · {unidades}</span>
      {carrito.totalPesos > 0 && <strong>{formatoPesos(carrito.totalPesos)}</strong>}
    </button>
  )
}

export default BotonCarritoFlotante
