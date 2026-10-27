// =====================================================================
//  CONTENIDO DE LA TIENDA: NEGOCIOS Y PRODUCTOS
//  Todo lo que se ve en la página sale de este archivo.
// =====================================================================
//
//  📷 FOTOS Y LOGOS
//  1. Guarda la imagen en la carpeta  public/imagenes/
//       - logos e imágenes de negocios → public/imagenes/negocios/
//       - fotos de productos           → public/imagenes/productos/
//  2. Escribe la ruta empezando por "/imagenes/...". Ejemplo:
//       imagen: '/imagenes/productos/jugo-de-mora.jpg',
//  Consejo: nombres sin espacios ni tildes (usa guiones).
//
//  ✏️ ESPACIOS LIBRES
//  Los productos con  nombre: ''  (vacío) NO se muestran en la página.
//  Son espacios guardados para llenar después: escribe el nombre (y el
//  precio) y el producto aparece solo.
//
//  ➕ AÑADIR UN EMPRENDIMIENTO
//  Copia un bloque completo { id: ..., ... productos: [...] }, pégalo
//  antes del cierre "]" del final y cambia sus datos. La página crea
//  sola su tarjeta, su página propia, su filtro y su enlace en el pie.
//
//  CAMPOS DE UN NEGOCIO
//    id          identificador único, minúsculas y guiones (aparece en la dirección)
//    nombre      nombre visible
//    categoria   etiqueta corta (ej. 'Comidas y bebidas')
//    descripcion texto de presentación
//    imagen      imagen grande de la tarjeta y la portada  (opcional)
//    logo        logo del negocio                          (opcional)
//    tono        color: 'calido', 'fresco', 'dorado', 'verde', 'ciruela' o 'hielo'
//    secciones   grupos en que se ordenan los productos (opcional), ej. Sándwiches
//                y Jugos, o las revistas Natura / Ésika / Yanbal. Cada sección:
//                  id, nombre, descripcion (opcional),
//                  enlace (opcional: dirección de un catálogo digital)
//    productos   lista de productos (ver abajo)
//
//  CAMPOS DE UN PRODUCTO
//    id          identificador único dentro del negocio
//    nombre      nombre visible (vacío = espacio libre, no se muestra)
//    descripcion texto corto                                (opcional)
//    precio      texto tal como quieres que se vea, ej. '$ 5.000'
//                (opcional; si no está dice "Precio por definir")
//    imagen      foto del producto                          (opcional)
//    seccion     id de la sección a la que pertenece, ej. 'jugos'
//                (si no tiene, aparece en "Otros productos")
//    insignia    sello corto sobre la foto, ej. 'La primera de la casa' (opcional)
//    destacado   true → también aparece en "Productos destacados" del inicio
//    demo        true → producto de EJEMPLO (muestra el sello "Demostración").
//                Cuando pongas productos reales, borra los que tengan demo: true.
// =====================================================================

const DATOS = [
  {
    id: 'apetitivos',
    nombre: 'Apetitivos Dios Proveerá',
    categoria: 'Sándwiches y jugos naturales',
    descripcion:
      'Sándwiches preparados al momento, jugos naturales de fruta y nuestra chicha de arroz, con la que empezó todo.',
    imagen: '/imagenes/negocios/apetitivos.svg',
    logo: '', // ej. '/imagenes/negocios/apetitivos-logo.png'
    tono: 'calido',
    secciones: [
      { id: 'sandwiches', nombre: 'Sándwiches', descripcion: 'Preparados al momento.' },
      { id: 'bebidas', nombre: 'Jugos y bebidas', descripcion: 'Jugos naturales de fruta y bebidas de la casa.' },
    ],
    productos: [
      // --- Sándwiches ---
      { id: 'sandwich-queso-jamon', seccion: 'sandwiches', nombre: 'Sándwich de queso y jamón', precio: '$ 2.000', destacado: true },
      { id: 'sandwich-2', seccion: 'sandwiches', nombre: '', precio: '' },
      { id: 'sandwich-3', seccion: 'sandwiches', nombre: '', precio: '' },
      { id: 'sandwich-4', seccion: 'sandwiches', nombre: '', precio: '' },
      { id: 'sandwich-5', seccion: 'sandwiches', nombre: '', precio: '' },
      // --- Jugos y bebidas ---
      {
        id: 'chicha-arroz',
        seccion: 'bebidas',
        nombre: 'Chicha de arroz',
        descripcion: 'La primogénita del negocio: con ella empezó Apetitivos Dios Proveerá.',
        insignia: 'La primera de la casa',
        destacado: true,
      },
      { id: 'jugo-mora', seccion: 'bebidas', nombre: 'Jugo de mora', destacado: true },
      { id: 'jugo-maracuya', seccion: 'bebidas', nombre: 'Jugo de maracuyá' },
      { id: 'jugo-guayaba', seccion: 'bebidas', nombre: 'Jugo de guayaba' },
    ],
  },
  {
    // ✏️ NOMBRE PROVISIONAL: cambia "nombre" cuando decidan el nombre definitivo.
    id: 'perfumes',
    nombre: 'Perfumes y Cremas',
    categoria: 'Perfumes y cremas',
    descripcion:
      'Perfumes, cremas, maquillaje y cuidado personal por catálogo: Natura, Ésika y Yanbal. Mira los productos de cada revista y haz tu pedido.',
    imagen: '/imagenes/negocios/perfumes.svg',
    logo: '',
    tono: 'ciruela',
    // Una sección por revista.  enlace → revista digital de la campaña actual (opcional)
    secciones: [
      {
        id: 'natura',
        nombre: 'Natura',
        descripcion: 'Perfumería, cuidado de la piel y del cabello.',
        enlace: '',
      },
      {
        id: 'esika',
        nombre: 'Ésika',
        descripcion: 'Fragancias, maquillaje y cuidado personal.',
        enlace: '',
      },
      {
        id: 'yanbal',
        nombre: 'Yanbal',
        descripcion: 'Fragancias, maquillaje, tratamiento facial y joyería.',
        enlace: '',
      },
    ],
    productos: [
      { id: 'demo-1', seccion: 'natura', nombre: 'Perfume de ejemplo', destacado: true, demo: true },
      { id: 'demo-2', seccion: 'natura', nombre: 'Crema de ejemplo', demo: true },
      { id: 'demo-3', seccion: 'esika', nombre: 'Perfume de ejemplo', destacado: true, demo: true },
      { id: 'demo-4', seccion: 'esika', nombre: 'Labial de ejemplo', demo: true },
      { id: 'demo-5', seccion: 'yanbal', nombre: 'Perfume de ejemplo', demo: true },
      { id: 'demo-6', seccion: 'yanbal', nombre: 'Crema de ejemplo', demo: true },
      // Ejemplo de un producto real de revista (quita las // para usarlo):
      // {
      //   id: 'natura-kaiak',
      //   seccion: 'natura',
      //   nombre: 'Kaiak Clásico 100 ml',
      //   descripcion: 'Escribe aquí la descripción.',
      //   precio: '$ 0.000',
      //   imagen: '/imagenes/productos/natura-kaiak.jpg',
      // },
    ],
  },
  {
    id: 'variedades',
    nombre: 'Variedades Jehová Nisi',
    categoria: 'Productos de aseo',
    descripcion:
      'Productos de aseo para el hogar y el cuidado personal: detergentes, limpiadores, ambientadores, pañales y más.',
    imagen: '/imagenes/negocios/variedades.svg',
    logo: '',
    tono: 'verde',
    secciones: [
      { id: 'ropa', nombre: 'Lavado de ropa' },
      { id: 'hogar', nombre: 'Limpieza del hogar' },
      { id: 'personal', nombre: 'Cuidado personal' },
      { id: 'bebes', nombre: 'Bebés' },
    ],
    productos: [
      // --- Lavado de ropa ---
      { id: 'fab-pequeno', seccion: 'ropa', nombre: 'Fab pequeño' },
      { id: 'fab-1kg', seccion: 'ropa', nombre: 'Fab mediano 1 kg', destacado: true },
      { id: 'fab-grande', seccion: 'ropa', nombre: 'Fab grande' },
      { id: 'suavitel', seccion: 'ropa', nombre: 'Suavitel' },
      // --- Limpieza del hogar ---
      { id: 'cloro-bolsa', seccion: 'hogar', nombre: 'Cloro en bolsa' },
      { id: 'cloro-tarro', seccion: 'hogar', nombre: 'Cloro en tarro' },
      { id: 'fabuloso-bolsa', seccion: 'hogar', nombre: 'Fabuloso en bolsa', destacado: true },
      { id: 'fabuloso-tarro', seccion: 'hogar', nombre: 'Fabuloso en tarro' },
      {
        id: 'ambientadores',
        seccion: 'hogar',
        nombre: 'Ambientadores',
        descripcion: 'Varios aromas disponibles. Pregunta por tu favorito.',
      },
      // --- Cuidado personal ---
      { id: 'jabon-bano', seccion: 'personal', nombre: 'Jabones de baño' },
      { id: 'aceite-corporal', seccion: 'personal', nombre: 'Aceite para el cuerpo' },
      { id: 'ego', seccion: 'personal', nombre: 'Ego para el cabello' },
      { id: 'nosotras', seccion: 'personal', nombre: 'Toallas higiénicas Nosotras' },
      // --- Bebés ---
      {
        id: 'panales',
        seccion: 'bebes',
        nombre: 'Pañales para niño',
        descripcion: 'Desde la etapa 3 hasta la etapa 5.',
        destacado: true,
      },
      // --- Espacios libres: escribe el nombre y elige su sección ---
      { id: 'aseo-libre-1', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-2', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-3', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-4', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-5', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-6', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-7', seccion: '', nombre: '', precio: '' },
      { id: 'aseo-libre-8', seccion: '', nombre: '', precio: '' },
    ],
  },
  {
    // ✏️ NOMBRE PROVISIONAL: cambia "nombre" cuando decidan el nombre definitivo.
    id: 'hielo',
    nombre: 'Venta de Hielo',
    categoria: 'Hielo',
    descripcion:
      'Hielo para tus bebidas, neveras y celebraciones. Pídelo en la cantidad que necesites.',
    imagen: '/imagenes/negocios/hielo.svg',
    logo: '',
    tono: 'hielo',
    productos: [
      { id: 'bolsa-2kg', nombre: 'Bolsa de hielo 2 kg', precio: '$ 1.000', destacado: true },
    ],
  },
]

// ---------------------------------------------------------------------
// Funciones de apoyo (no es necesario modificarlas)
// ---------------------------------------------------------------------

// Convierte '/imagenes/...' en una ruta que funciona aunque la página se publique
// dentro de una subcarpeta (por ejemplo usuario.github.io/tienda/).
const rutaPublica = (ruta) => (ruta?.startsWith('/') ? import.meta.env.BASE_URL + ruta.slice(1) : ruta)

// Los espacios libres (productos sin nombre) no se muestran en la página.
export const NEGOCIOS = DATOS.map((negocio) => ({
  ...negocio,
  imagen: rutaPublica(negocio.imagen),
  logo: rutaPublica(negocio.logo),
  productos: negocio.productos
    .filter((producto) => producto.nombre?.trim())
    .map((producto) => ({ ...producto, imagen: rutaPublica(producto.imagen) })),
}))

export const buscarNegocio = (id) => NEGOCIOS.find((negocio) => negocio.id === id)

export const TODOS_LOS_PRODUCTOS = NEGOCIOS.flatMap((negocio) =>
  negocio.productos.map((producto) => ({ ...producto, negocioId: negocio.id })),
)

export const hayDemos = (productos) => productos.some((producto) => producto.demo)

export const buscarSeccion = (negocio, id) => negocio.secciones?.find((seccion) => seccion.id === id)
