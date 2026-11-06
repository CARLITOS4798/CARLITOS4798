// Configuración central de la marca.
// Cuando se decida el nombre definitivo, basta con cambiarlo aquí
// y se actualizará en toda la página (barra, bienvenida y pie de página).
export const MARCA = {
  nombre: 'Nuestra Tienda',
  lema: 'Emprendimientos familiares en un solo lugar',
}

// Horario de atención. "abre" y "cierra" son la hora en formato de 24 horas
// (22 = 10 p. m.); fuera de ese rango el carrito avisa que se responde al abrir.
export const HORARIO = {
  texto: '8:00 a. m. a 10:00 p. m.',
  abre: 8,
  cierra: 22,
}

export const estaAbierto = (fecha = new Date()) => fecha.getHours() >= HORARIO.abre && fecha.getHours() < HORARIO.cierra

// Domicilio: valor en pesos (sin puntos) que se suma al total, y hasta dónde se lleva.
export const DOMICILIO = {
  precio: 3000,
  zonas: 'Todos los sectores de la isla',
}

// Dónde pasan a recoger los clientes que no piden domicilio.
export const PUNTO_RECOGIDA = 'Sector La Loma, por la iglesia Pueblo Fuerte, donde Yaque'

// Cuenta a la que los clientes transfieren. Se muestra en el carrito cuando eligen pagar por transferencia.
export const CUENTA_TRANSFERENCIA = {
  medio: 'Nequi',
  numero: '301 590 4405',
  titular: 'Yaquelin Chico',
}
