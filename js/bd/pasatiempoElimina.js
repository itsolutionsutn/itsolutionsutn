import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_PASATIEMPO, Bd } from "./Bd.js"
import { pasatiempoBusca } from "./pasatiempoBusca.js"

/**
 * @param { string } id
 */
export async function pasatiempoElimina(id) {
 const modelo = await pasatiempoBusca(id)
 if (modelo !== undefined) {
  modelo.PAS_MODIFICACION = Date.now()
  modelo.PAS_ELIMINADO = 1
  return bdEjecuta(Bd, [ALMACEN_PASATIEMPO], transaccion => {
   const almacenPasatiempo = transaccion.objectStore(ALMACEN_PASATIEMPO)
   almacenPasatiempo.put(modelo)
  })
 }
}

exportaAHtml(pasatiempoElimina)