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
//    disponibles número de unidades en existencia, ej. 3      (opcional)
//                (0 → dice "Agotado"; si no lo pones, no se muestra nada)
//    genero      'mujer', 'hombre' o 'unisex' (opcional). Si algún producto lo
//                tiene, la página muestra el filtro "Para: Mujer / Hombre"
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
      {
        id: 'sandwich-queso-mortadela',
        seccion: 'sandwiches',
        nombre: 'Sándwich de queso y mortadela',
        precio: '$ 2.000',
        imagen: '/imagenes/productos/apetitivos/sandwich-de-queso-y-mortadela.jpg',
        destacado: true,
      },
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
      {
        id: 'jugo-mora',
        seccion: 'bebidas',
        nombre: 'Jugo de mora',
        imagen: '/imagenes/productos/apetitivos/jugo-de-mora.jpg',
        destacado: true,
      },
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
      // genero: 'mujer', 'hombre' o 'unisex' (unisex sale en los dos filtros)
      // disponibles: cuántas unidades hay (ej. disponibles: 2)

      // --- Natura ---
      { id: 'kaiak-clasico-fem', seccion: 'natura', genero: 'mujer', nombre: 'Kaiak Clásico femenino', descripcion: 'Eau de toilette.', imagen: '/imagenes/productos/perfumes/natura/eau-de-toilette-kaiak-clasico-femenino.jpg', destacado: true },
      { id: 'kaiak-aventura-fem', seccion: 'natura', genero: 'mujer', nombre: 'Kaiak Aventura femenino', imagen: '/imagenes/productos/perfumes/natura/kaiak-aventura-femenino.jpg' },
      { id: 'humor-meu-primeiro', seccion: 'natura', genero: 'mujer', nombre: 'Humor Meu Primeiro 75 ml', imagen: '/imagenes/productos/perfumes/natura/perfume-meu-primeiro-humor-natura-75-ml.jpg' },
      { id: 'aguas-frambuesa', seccion: 'natura', genero: 'mujer', nombre: 'Colonia Aguas Frambuesa 150 ml', imagen: '/imagenes/productos/perfumes/natura/colonia-aguas-frambuesa-150ml.jpg' },
      { id: 'tododia-cereza', seccion: 'natura', genero: 'mujer', nombre: 'Body Splash Tododia Cereza Negra y Praliné 200 ml', imagen: '/imagenes/productos/perfumes/natura/body-splash-tododia-cereza-negra-y-praline-natura-200-ml.jpg' },
      { id: 'kaiak-clasico-masc', seccion: 'natura', genero: 'hombre', nombre: 'Kaiak Clásico masculino', descripcion: 'Eau de toilette.', imagen: '/imagenes/productos/perfumes/natura/eau-de-toilette-kaiak-clasico-masculino.jpg', destacado: true },
      { id: 'kaiak-aventura-masc', seccion: 'natura', genero: 'hombre', nombre: 'Kaiak Aventura masculino 100 ml', imagen: '/imagenes/productos/perfumes/natura/perfume-kaiak-aventura-masculino-natura-100-ml.jpg' },
      { id: 'kaiak-urbe-masc', seccion: 'natura', genero: 'hombre', nombre: 'Kaiak Urbe masculino 100 ml', imagen: '/imagenes/productos/perfumes/natura/perfume-kaiak-urbe-masculino-natura-100-ml.jpg' },
      { id: 'ekos-pitanga', seccion: 'natura', genero: 'unisex', nombre: 'Frescor Ekos Pitanga 150 ml', imagen: '/imagenes/productos/perfumes/natura/frescor-ekos-pitanga-150-ml-natura.jpg' },
      { id: 'crema-cupuacu', seccion: 'natura', genero: 'unisex', nombre: 'Crema Ekos Cupuaçu', imagen: '/imagenes/productos/perfumes/natura/crema-cupuacu.jpg' },
      { id: 'tododia-fresa-vainilla', seccion: 'natura', genero: 'unisex', nombre: 'Hidratante corporal Tododia Fresa y Vainilla Dorada 400 ml', imagen: '/imagenes/productos/perfumes/natura/hidratante-corporal-tododia-400ml-aroma-a-ti-fresa-y-vainilla-dorada.jpg' },
      { id: 'lumina-anticaida', seccion: 'natura', genero: 'unisex', nombre: 'Lumina repuesto shampoo anticaída 300 ml', imagen: '/imagenes/productos/perfumes/natura/lumina-repuesto-shampoo-anticaida-300ml.jpg' },
      { id: 'lumina-nutritivo', seccion: 'natura', genero: 'unisex', nombre: 'Lumina repuesto shampoo nutritivo (cabello seco)', imagen: '/imagenes/productos/perfumes/natura/repuesto-shampoo-nutritivo-lumina-cabello-seco.jpg' },
      { id: 'lumina-liso', seccion: 'natura', genero: 'unisex', nombre: 'Lumina Restauración y Liso Prolongado', imagen: '/imagenes/productos/perfumes/natura/natura-lumina-restauracion-e-liso-prolongado.jpg' },
      { id: 'lumina-spray', seccion: 'natura', genero: 'unisex', nombre: 'Lumina spray de aminoácidos (pre-secado)', imagen: '/imagenes/productos/perfumes/natura/natura-lumina-spray-de-aminoacidos-pre-secagem.jpg' },

      // --- Ésika ---
      { id: 'vibranza', seccion: 'esika', genero: 'mujer', nombre: 'Perfume Vibranza', imagen: '/imagenes/productos/perfumes/esika/vibranza-perfume-mujer.jpg', destacado: true },
      { id: 'mithyka', seccion: 'esika', genero: 'mujer', nombre: 'Perfume Mithyka', imagen: '/imagenes/productos/perfumes/esika/perfume-mujer-mithyka.jpg' },
      { id: 'expression', seccion: 'esika', genero: 'mujer', nombre: 'Perfume Expression', imagen: '/imagenes/productos/perfumes/esika/perfume-expression-mujer.jpg' },
      { id: 'fantasia-azul', seccion: 'esika', genero: 'mujer', nombre: 'Perfume Fantasía Azul Infinito', imagen: '/imagenes/productos/perfumes/esika/perfume-fantasia-azul-infinito-mujer.jpg' },
      { id: 'roll-on-imagenes', seccion: 'esika', genero: 'mujer', nombre: 'Desodorante roll-on Imágenes', imagen: '/imagenes/productos/perfumes/esika/desodorante-imagenes-roll-on.jpg' },
      { id: 'roll-on-expression', seccion: 'esika', genero: 'mujer', nombre: 'Desodorante roll-on Expression', imagen: '/imagenes/productos/perfumes/esika/desodorante-roll-on-expression.jpg' },
      { id: 'roll-on-fantasia-azul', seccion: 'esika', genero: 'mujer', nombre: 'Desodorante roll-on Fantasía Azul Infinito', imagen: '/imagenes/productos/perfumes/esika/desodorante-roll-on-fantasia-azul-infinito.jpg' },
      { id: 'blue-intense', seccion: 'esika', genero: 'hombre', nombre: 'Perfume Blue Intense', imagen: '/imagenes/productos/perfumes/esika/blue-intense-hombre.jpg' },
      { id: 'dorsay', seccion: 'esika', genero: 'hombre', nombre: "Perfume D'Orsay 90 ml", imagen: '/imagenes/productos/perfumes/esika/perfume-dorsay-de-esika-90-ml.jpg' },
      { id: 'nitro', seccion: 'esika', genero: 'hombre', nombre: 'Colonia Nitro Cyzone 100 ml', imagen: '/imagenes/productos/perfumes/esika/colonia-nitro-100-ml-cyzone-hombre.jpg' },
      { id: 'roll-on-dorsay', seccion: 'esika', genero: 'hombre', nombre: "Desodorante roll-on D'Orsay", imagen: '/imagenes/productos/perfumes/esika/desodorante-roll-on-dorsay.jpg' },
      { id: 'roll-on-winner', seccion: 'esika', genero: 'hombre', nombre: 'Desodorante roll-on Winner Sport', descripcion: 'Sin alcohol.', imagen: '/imagenes/productos/perfumes/esika/esika-winner-sport-desodorante-roll-on-sin-alcohol.jpg' },

      // --- Yanbal ---
      { id: 'ccori', seccion: 'yanbal', genero: 'mujer', nombre: 'Perfume Ccori 50 ml', imagen: '/imagenes/productos/perfumes/yanbal/perfume-ccori-50ml-mujer.jpg' },
      { id: 'ohm-azul', seccion: 'yanbal', genero: 'hombre', nombre: 'Perfume Ohm (azul)', imagen: '/imagenes/productos/perfumes/yanbal/ohm-perfume-hombre-azul.jpg' },
      { id: 'ohm-negro', seccion: 'yanbal', genero: 'hombre', nombre: 'Perfume Ohm (negro)', imagen: '/imagenes/productos/perfumes/yanbal/ohm-perfume-hombre-negro.jpg' },
      { id: 'solo', seccion: 'yanbal', genero: 'hombre', nombre: 'Perfume Solo 80 ml', imagen: '/imagenes/productos/perfumes/yanbal/perfume-solo-de-yanbal-80-ml-hombre.jpg' },
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
      { id: 'detergentes', nombre: 'Detergentes' },
      { id: 'suavizantes', nombre: 'Suavizantes' },
      { id: 'blanqueadores', nombre: 'Blanqueadores (cloro)' },
      { id: 'limpiapisos', nombre: 'Limpiapisos' },
      { id: 'ambientadores', nombre: 'Ambientadores' },
      { id: 'personal', nombre: 'Cuidado personal' },
      { id: 'bebes', nombre: 'Bebés' },
    ],
    productos: [
      // --- Detergentes ---
      { id: 'bonaropa-1kg', seccion: 'detergentes', nombre: 'Detergente Bonaropa 1 kg', imagen: '/imagenes/productos/aseo/detergente-bonaropa-1kg.jpg', destacado: true },
      { id: 'dersa-125', seccion: 'detergentes', nombre: 'Detergente Dersa 125 g', imagen: '/imagenes/productos/aseo/detergente-dersa-125g.jpg' },
      { id: 'dersa-250', seccion: 'detergentes', nombre: 'Detergente Dersa 250 g', imagen: '/imagenes/productos/aseo/detergente-dersa-250g.jpg' },
      { id: 'dersa-500', seccion: 'detergentes', nombre: 'Detergente Dersa 500 g', imagen: '/imagenes/productos/aseo/detergente-dersa-500g.jpg' },
      { id: 'fab-pequeno', seccion: 'detergentes', nombre: 'Fab pequeño' },
      { id: 'fab-1kg', seccion: 'detergentes', nombre: 'Fab mediano 1 kg' },
      { id: 'fab-grande', seccion: 'detergentes', nombre: 'Fab grande' },
      // --- Suavizantes ---
      { id: 'aromatel-floral', seccion: 'suavizantes', nombre: 'Suavizante Aromatel Floral 180 ml', imagen: '/imagenes/productos/aseo/suavizante-aromatel-floral-180-ml.jpg' },
      { id: 'aromatel-floral-10x', seccion: 'suavizantes', nombre: 'Suavizante Aromatel Floral 10X 180 ml', imagen: '/imagenes/productos/aseo/suavizante-aromatel-floral-10x-180-ml.jpg' },
      { id: 'aromatel-mandarina', seccion: 'suavizantes', nombre: 'Suavizante Aromatel Mandarina 180 ml', imagen: '/imagenes/productos/aseo/suavizante-aromatel-mandarina-180-ml.jpg' },
      { id: 'aromatel-manzana', seccion: 'suavizantes', nombre: 'Suavizante Aromatel Manzana 180 ml', imagen: '/imagenes/productos/aseo/suavizante-aromatel-manzana-180-ml.jpg' },
      { id: 'bonaropa-suav-floral', seccion: 'suavizantes', nombre: 'Suavizante Bonaropa Floral 1000 ml', imagen: '/imagenes/productos/aseo/suavizante-bonaropa-floral-x-1000-ml.jpg' },
      { id: 'bonaropa-suav-manzana', seccion: 'suavizantes', nombre: 'Suavizante Bonaropa Manzana 1000 ml', imagen: '/imagenes/productos/aseo/suavizante-bonaropa-manzana-x-1000-ml.jpg' },
      { id: 'bonaropa-suav-xtra', seccion: 'suavizantes', nombre: 'Suavizante Bonaropa Xtra Perfume 1000 ml', imagen: '/imagenes/productos/aseo/suavizante-bonaropa-xtra-perfume-x-1000-ml.jpg' },
      { id: 'suavitel', seccion: 'suavizantes', nombre: 'Suavitel' },
      // --- Blanqueadores (cloro) ---
      { id: 'blancox-500', seccion: 'blanqueadores', nombre: 'Blanqueador Blancox 500 ml', imagen: '/imagenes/productos/aseo/blanqueador-blancox-500ml.jpg' },
      { id: 'brilla-king-2000', seccion: 'blanqueadores', nombre: 'Blanqueador Brilla King 2000 ml', imagen: '/imagenes/productos/aseo/blanqueador-brilla-king-2000ml.jpg' },
      { id: 'cloro-bolsa', seccion: 'blanqueadores', nombre: 'Cloro en bolsa' },
      // --- Limpiapisos ---
      { id: 'fabuloso-lavanda', seccion: 'limpiapisos', nombre: 'Fabuloso Lavanda 180 ml', imagen: '/imagenes/productos/aseo/limpia-pisos-fabuloso-lavanda-180ml.jpg', destacado: true },
      { id: 'fabuloso-floral', seccion: 'limpiapisos', nombre: 'Fabuloso Floral 180 ml', imagen: '/imagenes/productos/aseo/limpia-pisos-fabuloso-floral-180ml.jpg' },
      { id: 'fabuloso-bebe', seccion: 'limpiapisos', nombre: 'Fabuloso Bebé 180 ml', imagen: '/imagenes/productos/aseo/limpia-pisos-fabuloso-bebe-180ml.jpg' },
      { id: 'fabuloso-desinfectante', seccion: 'limpiapisos', nombre: 'Fabuloso Desinfectante 180 ml', imagen: '/imagenes/productos/aseo/limpia-pisos-fabuloso-desinfectante-180ml.jpg' },
      { id: 'fabuloso-tarro', seccion: 'limpiapisos', nombre: 'Fabuloso en tarro' },
      { id: 'brilla-king-floral', seccion: 'limpiapisos', nombre: 'Limpiador Brilla King Floral 1 L', imagen: '/imagenes/productos/aseo/limpiador-floral-brilla-king-1-l.jpg' },
      { id: 'brilla-king-lavanda', seccion: 'limpiapisos', nombre: 'Limpiador Brilla King Lavanda 1 L', imagen: '/imagenes/productos/aseo/limpiador-lavanda-brilla-king-1-l.jpg' },
      { id: 'brilla-king-manzana', seccion: 'limpiapisos', nombre: 'Limpiador Brilla King Manzana Canela 1 L', imagen: '/imagenes/productos/aseo/limpiador-manzana-canela-brilla-king-1-l.jpg' },
      // --- Ambientadores ---
      { id: 'hosh-lavanda', seccion: 'ambientadores', nombre: 'Ambientador Hosh Lavanda 400 ml', imagen: '/imagenes/productos/aseo/ambientador-lavanda-hosh-400-ml.jpg' },
      { id: 'hosh-manzana', seccion: 'ambientadores', nombre: 'Ambientador Hosh Manzana Canela 360 ml', imagen: '/imagenes/productos/aseo/ambientador-en-aerosol-manzana-canela-hosh-360-ml.jpg' },
      { id: 'hosh-desinfectante', seccion: 'ambientadores', nombre: 'Hosh desinfectante y elimina olores 400 ml', imagen: '/imagenes/productos/aseo/desinfectante-y-elimina-olores-hosh-400-ml.jpg' },
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
