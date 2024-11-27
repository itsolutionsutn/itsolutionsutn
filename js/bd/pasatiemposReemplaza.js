import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_PASATIEMPO, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén PASATIEMPO y guarda nuevospasatiempos.
 * @param {import("../modelo/PASATIEMPO.js").PASATIEMPO[]} nuevospasatiempos
 */
export async function pasatiemposReemplaza(nuevospasatiempos) {
 return bdEjecuta(Bd, [ALMACEN_PASATIEMPO], transaccion => {
  const almacenPasatiempo = transaccion.objectStore(ALMACEN_PASATIEMPO)
  almacenPasatiempo.clear()
  for (const objeto of nuevospasatiempos) {
   almacenPasatiempo.add(objeto)
  }
 })
}