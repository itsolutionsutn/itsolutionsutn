import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaId } from "../modelo/validaId.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { ALMACEN_PASATIEMPO, Bd } from "./Bd.js"
import { pasatiempoBusca } from "./pasatiempoBusca.js"

/**
 * @param { import("../modelo/PASATIEMPO.js").PASATIEMPO } modelo
 */
export async function pasatiempoModifica(modelo) {
 validaNombre(modelo.PAS_NOMBRE)
 if (modelo.PAS_ID === undefined)
  throw new Error(`Falta PAS_ID de ${modelo.PAS_NOMBRE}.`)
 validaId(modelo.PAS_ID)
 const anterior = await pasatiempoBusca(modelo.PAS_ID)
 if (anterior !== undefined) {
  modelo.PAS_MODIFICACION = Date.now()
  modelo.PAS_ELIMINADO = 0
  return bdEjecuta(Bd, [ALMACEN_PASATIEMPO], transaccion => {
   const almacenPasatiempo = transaccion.objectStore(ALMACEN_PASATIEMPO)
   almacenPasatiempo.put(modelo)
  })
 }
}

exportaAHtml(pasatiempoModifica)