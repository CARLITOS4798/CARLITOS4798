import { createContext, useContext } from 'react'

// Estado compartido del carrito (lo llena CarritoProvider).
export const CarritoContexto = createContext(null)

export const useCarrito = () => useContext(CarritoContexto)

// Máximo que se puede pedir de un producto: sus unidades disponibles, o 99 si no lleva la cuenta.
export const maximoPedido = (producto) =>
  typeof producto.disponibles === 'number' ? Math.max(producto.disponibles, 0) : 99

// '$ 2.000' → 2000.  Sin precio → null.
export const precioNumero = (precio) => {
  const digitos = (precio || '').replace(/\D/g, '')
  return digitos ? Number(digitos) : null
}

export const formatoPesos = (valor) => `$ ${valor.toLocaleString('es-CO')}`
