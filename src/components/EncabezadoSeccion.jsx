// Título reutilizable para cada sección de la página.
function EncabezadoSeccion({ etiqueta, titulo, descripcion, id }) {
  return (
    <div className="encabezado-seccion">
      {etiqueta && <p className="etiqueta">{etiqueta}</p>}
      <h2 id={id}>{titulo}</h2>
      {descripcion && <p className="encabezado-seccion__descripcion">{descripcion}</p>}
    </div>
  )
}

export default EncabezadoSeccion
