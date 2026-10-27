// Imagen grande del negocio. Si aún no tiene, muestra su inicial sobre su color.
function ImagenNegocio({ negocio }) {
  if (negocio.imagen) {
    return <img src={negocio.imagen} alt="" width="400" height="240" />
  }
  return (
    <div className="imagen-vacia" aria-hidden="true">
      {negocio.nombre.charAt(0)}
    </div>
  )
}

export default ImagenNegocio
