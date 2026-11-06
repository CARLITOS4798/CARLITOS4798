import { useEffect, useRef, useState } from 'react'
import { CUENTA_TRANSFERENCIA, DOMICILIO, HORARIO, PUNTO_RECOGIDA, estaAbierto } from '../config/marca'
import { enlaceWhatsApp } from '../data/negocios'
import IconoWhatsApp from '../components/IconoWhatsApp'
import { formatoPesos, maximoPedido, useCarrito } from './carrito'
import ContadorCantidad from './ContadorCantidad'

const CLAVE_DATOS = 'nuestra-tienda-datos-entrega'
const DATOS_VACIOS = { entrega: 'domicilio', nombre: '', direccion: '', barrio: '', pago: 'Efectivo', notas: '' }
const PAGO_TRANSFERENCIA = `Transferencia / ${CUENTA_TRANSFERENCIA.medio}`
const FORMAS_DE_PAGO = ['Efectivo', PAGO_TRANSFERENCIA]

// Datos para transferir, con el recordatorio de mandar el comprobante.
function DatosTransferencia() {
  return (
    <div className="carrito__cuenta">
      <p>
        Transfiere a <strong>{CUENTA_TRANSFERENCIA.medio}</strong>
      </p>
      <p className="carrito__cuenta-numero">{CUENTA_TRANSFERENCIA.numero}</p>
      <p>A nombre de {CUENTA_TRANSFERENCIA.titular}</p>
      <p className="carrito__nota">Envíanos el comprobante por el mismo chat de WhatsApp.</p>
    </div>
  )
}

// Los datos de entrega se recuerdan en el navegador del cliente para su próximo pedido.
function leerDatos() {
  try {
    return { ...DATOS_VACIOS, ...JSON.parse(localStorage.getItem(CLAVE_DATOS)), notas: '' }
  } catch {
    return DATOS_VACIOS
  }
}

// Número de pedido con la fecha y la hora del envío (día-mes-hora-minuto), ej. "0511-1432".
// Sin servidor no hay consecutivo; así cada pedido se distingue y se busca fácil en WhatsApp.
function numeroPedido() {
  const ahora = new Date()
  const dos = (n) => String(n).padStart(2, '0')
  return `${dos(ahora.getDate())}${dos(ahora.getMonth() + 1)}-${dos(ahora.getHours())}${dos(ahora.getMinutes())}`
}

const costoEntrega = (datos) => (datos.entrega === 'domicilio' ? DOMICILIO.precio : 0)

// Texto del pedido que llega por WhatsApp, agrupado por negocio.
function mensajePedido(numero, lineas, totalPesos, hayPreciosPendientes, datos) {
  const negocios = [...new Map(lineas.map((l) => [l.negocio.id, l.negocio])).values()]
  const bloques = negocios.map((negocio) => {
    const renglones = lineas
      .filter((l) => l.negocio.id === negocio.id)
      .map((l) => {
        const precio = l.precio === null ? 'precio por confirmar' : formatoPesos(l.precio * l.cantidad)
        return `• ${l.cantidad} x ${l.producto.nombre} — ${precio}`
      })
    return [`*${negocio.nombre}*`, ...renglones].join('\n')
  })

  const conDomicilio = datos.entrega === 'domicilio'
  let total = totalPesos > 0 ? `*Total:* ${formatoPesos(totalPesos + costoEntrega(datos))}` : '*Total:* por confirmar'
  if (totalPesos > 0 && hayPreciosPendientes) total += ' + productos por confirmar'

  const entrega = conDomicilio
    ? [
        '*Entrega:* Domicilio',
        `*Dirección:* ${datos.direccion.trim()}${datos.barrio.trim() ? `, barrio ${datos.barrio.trim()}` : ''}`,
      ]
    : ['*Entrega:* Paso a recogerlo']

  return [
    `*Pedido #${numero}*`,
    'Hola, quiero hacer este pedido:',
    '',
    bloques.join('\n\n'),
    '',
    ...(conDomicilio ? [`*Domicilio:* ${formatoPesos(DOMICILIO.precio)}`] : []),
    total,
    '',
    `*Nombre:* ${datos.nombre.trim()}`,
    ...entrega,
    `*Pago:* ${datos.pago}`,
    ...(datos.notas.trim() ? [`*Notas:* ${datos.notas.trim()}`] : []),
  ].join('\n')
}

function PanelCarrito() {
  const carrito = useCarrito()
  const { lineas, abierto, cerrar } = carrito
  const [datos, setDatos] = useState(leerDatos)
  const [enviado, setEnviado] = useState(null) // número del pedido enviado, o null
  const [intentoEnviar, setIntentoEnviar] = useState(false)
  const botonCerrar = useRef(null)

  // Al abrir: foco en "Cerrar", Escape cierra, y la página de atrás no se desplaza.
  useEffect(() => {
    if (!abierto) return undefined
    botonCerrar.current?.focus()
    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') cerrar()
    }
    window.addEventListener('keydown', alPresionarTecla)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', alPresionarTecla)
      document.body.style.overflow = ''
    }
  }, [abierto, cerrar])

  const cambiarDato = (campo) => (evento) => setDatos((d) => ({ ...d, [campo]: evento.target.value }))

  const faltaNombre = !datos.nombre.trim()
  const faltaDireccion = datos.entrega === 'domicilio' && !datos.direccion.trim()

  const enviar = (evento) => {
    evento.preventDefault()
    setIntentoEnviar(true)
    if (faltaNombre || faltaDireccion || lineas.length === 0) return
    try {
      localStorage.setItem(CLAVE_DATOS, JSON.stringify({ ...datos, notas: '' }))
    } catch {
      // Sin almacenamiento: no pasa nada, solo no se recuerdan los datos.
    }
    // Todos los negocios comparten número; se usa el del primer producto del pedido.
    const numero = numeroPedido()
    const mensaje = mensajePedido(numero, lineas, carrito.totalPesos, carrito.hayPreciosPendientes, datos)
    window.open(enlaceWhatsApp(lineas[0].negocio, mensaje), '_blank', 'noopener')
    setEnviado(numero)
  }

  const terminar = (vaciar) => {
    if (vaciar) carrito.vaciar()
    setEnviado(null)
    setIntentoEnviar(false)
    cerrar()
  }

  const negocios = [...new Map(lineas.map((l) => [l.negocio.id, l.negocio])).values()]

  return (
    <div className={`carrito ${abierto ? 'carrito--abierto' : ''}`} aria-hidden={!abierto} inert={!abierto}>
      <div className="carrito__fondo" onClick={cerrar} />
      <aside className="carrito__panel" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito">
        <header className="carrito__cabecera">
          <h2 id="titulo-carrito">Tu pedido</h2>
          <button ref={botonCerrar} type="button" className="carrito__cerrar" onClick={cerrar} aria-label="Cerrar carrito">
            ×
          </button>
        </header>

        {enviado ? (
          <div className="carrito__cuerpo carrito__listo">
            <p className="carrito__listo-icono" aria-hidden="true">✓</p>
            <h3>¡Ya casi!</h3>
            <p>
              Tu pedido es el <strong>#{enviado}</strong>.
            </p>
            <p>Se abrió WhatsApp con tu pedido escrito. Solo falta tocar <strong>Enviar</strong> en el chat.</p>
            {datos.pago === PAGO_TRANSFERENCIA && <DatosTransferencia />}
            <button type="button" className="boton boton--primario" onClick={() => terminar(true)}>
              Ya lo envié, vaciar carrito
            </button>
            <button type="button" className="boton boton--secundario" onClick={() => setEnviado(null)}>
              Volver al pedido
            </button>
          </div>
        ) : lineas.length === 0 ? (
          <div className="carrito__cuerpo carrito__vacio">
            <p>Tu carrito está vacío.</p>
            <p>Agrega productos de cualquiera de nuestros negocios y pide todo en un solo domicilio.</p>
            <a href="#negocios" className="boton boton--primario" onClick={cerrar}>
              Ver negocios
            </a>
          </div>
        ) : (
          <form className="carrito__cuerpo" onSubmit={enviar} noValidate>
            {negocios.map((negocio) => (
              <section key={negocio.id} className="carrito__grupo" aria-label={negocio.nombre}>
                <h3>{negocio.nombre}</h3>
                <ul>
                  {lineas
                    .filter((l) => l.negocio.id === negocio.id)
                    .map((l) => (
                      <li key={l.productoId} className="carrito__linea">
                        <div className={`carrito__foto tono-${negocio.tono || 'verde'}`}>
                          {l.producto.imagen && <img src={l.producto.imagen} alt="" />}
                        </div>
                        <div className="carrito__detalle">
                          <p className="carrito__nombre">{l.producto.nombre}</p>
                          <p className="carrito__precio">
                            {l.precio === null ? 'Precio por confirmar' : formatoPesos(l.precio * l.cantidad)}
                          </p>
                        </div>
                        <ContadorCantidad
                          pequeno
                          cantidad={l.cantidad}
                          maximo={maximoPedido(l.producto)}
                          onCambio={(cantidad) => carrito.cambiarCantidad(l.negocioId, l.productoId, cantidad)}
                          nombre={l.producto.nombre}
                        />
                      </li>
                    ))}
                </ul>
              </section>
            ))}

            {datos.entrega === 'domicilio' && (
              <div className="carrito__subtotal">
                <span>Domicilio</span>
                <span>{formatoPesos(DOMICILIO.precio)}</span>
              </div>
            )}
            <div className="carrito__total">
              <span>Total</span>
              <strong>
                {carrito.totalPesos > 0 ? formatoPesos(carrito.totalPesos + costoEntrega(datos)) : 'Por confirmar'}
              </strong>
            </div>
            {carrito.hayPreciosPendientes && (
              <p className="carrito__nota">Los productos sin precio te los confirmamos por WhatsApp.</p>
            )}

            <fieldset className="carrito__campos">
              <legend>¿Cómo lo recibes?</legend>
              <div className="carrito__opciones">
                {[
                  { id: 'domicilio', texto: 'Domicilio' },
                  { id: 'recoger', texto: 'Paso a recogerlo' },
                ].map((opcion) => (
                  <label key={opcion.id} className="carrito__opcion">
                    <input
                      type="radio"
                      name="entrega"
                      value={opcion.id}
                      checked={datos.entrega === opcion.id}
                      onChange={cambiarDato('entrega')}
                    />
                    {opcion.texto}
                  </label>
                ))}
              </div>
              <p className="carrito__nota">
                {datos.entrega === 'domicilio'
                  ? `Domicilio ${formatoPesos(DOMICILIO.precio)} · ${DOMICILIO.zonas}.`
                  : `Recoges en: ${PUNTO_RECOGIDA}.`}
              </p>

              <label className="campo">
                <span>Nombre *</span>
                <input
                  type="text"
                  autoComplete="name"
                  value={datos.nombre}
                  onChange={cambiarDato('nombre')}
                  aria-invalid={intentoEnviar && faltaNombre}
                />
                {intentoEnviar && faltaNombre && <small className="campo__error">Escribe tu nombre.</small>}
              </label>

              {datos.entrega === 'domicilio' && (
                <>
                  <label className="campo">
                    <span>Dirección *</span>
                    <input
                      type="text"
                      autoComplete="street-address"
                      placeholder="Ej. Calle 10 # 5-20, casa 3"
                      value={datos.direccion}
                      onChange={cambiarDato('direccion')}
                      aria-invalid={intentoEnviar && faltaDireccion}
                    />
                    {intentoEnviar && faltaDireccion && (
                      <small className="campo__error">Escribe la dirección para el domicilio.</small>
                    )}
                  </label>
                  <label className="campo">
                    <span>Barrio</span>
                    <input type="text" value={datos.barrio} onChange={cambiarDato('barrio')} />
                  </label>
                </>
              )}

              <label className="campo">
                <span>Forma de pago</span>
                <select value={datos.pago} onChange={cambiarDato('pago')}>
                  {FORMAS_DE_PAGO.map((forma) => (
                    <option key={forma}>{forma}</option>
                  ))}
                </select>
              </label>
              {datos.pago === PAGO_TRANSFERENCIA && <DatosTransferencia />}

              <label className="campo">
                <span>Notas (opcional)</span>
                <textarea
                  rows="2"
                  placeholder="Ej. sin cebolla, llamar al llegar, pago con billete de $ 50.000"
                  value={datos.notas}
                  onChange={cambiarDato('notas')}
                />
              </label>
            </fieldset>

            <p className="carrito__nota">
              Horario de atención: {HORARIO.texto}
              {!estaAbierto() && ' Ahora estamos cerrados: puedes enviar tu pedido y te respondemos al abrir.'}
            </p>

            <div className="carrito__enviar">
              <button type="submit" className="boton boton--whatsapp">
                <IconoWhatsApp /> Enviar pedido por WhatsApp
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  )
}

export default PanelCarrito
