// Botones − cantidad + para cambiar cuántas unidades se piden.
function ContadorCantidad({ cantidad, maximo, onCambio, nombre, pequeno = false }) {
  return (
    <div className={`contador ${pequeno ? 'contador--pequeno' : ''}`} role="group" aria-label={`Cantidad de ${nombre}`}>
      <button
        type="button"
        className="contador__boton"
        onClick={() => onCambio(cantidad - 1)}
        aria-label={cantidad === 1 ? `Quitar ${nombre} del carrito` : `Quitar una unidad de ${nombre}`}
      >
        −
      </button>
      <span className="contador__numero" aria-live="polite">
        {cantidad}
      </span>
      <button
        type="button"
        className="contador__boton"
        onClick={() => onCambio(cantidad + 1)}
        disabled={cantidad >= maximo}
        aria-label={`Agregar una unidad de ${nombre}`}
      >
        +
      </button>
    </div>
  )
}

export default ContadorCantidad
