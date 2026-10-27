import { NEGOCIOS } from '../data/negocios'
import EncabezadoSeccion from './EncabezadoSeccion'
import TarjetaNegocio from './TarjetaNegocio'

function Negocios() {
  return (
    <section id="negocios" className="seccion seccion--negocios" aria-labelledby="titulo-negocios">
      <div className="contenedor">
        <EncabezadoSeccion
          id="titulo-negocios"
          etiqueta="Nuestros negocios"
          titulo="Elige un negocio para conocerlo"
        />
        <div className="grilla-negocios">
          {NEGOCIOS.map((negocio) => (
            <TarjetaNegocio key={negocio.id} negocio={negocio} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Negocios
