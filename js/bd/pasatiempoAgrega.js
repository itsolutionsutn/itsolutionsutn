import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_PASATIEMPO, Bd } from "./Bd.js"
import { validaNombre } from "../modelo/validaNombre.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/PASATIEMPO.js").PASATIEMPO} modelo
 */
export async function pasatiempoAgrega(modelo) {
 validaNombre(modelo.PAS_NOMBRE)
 modelo.PAS_MODIFICACION = Date.now()
 modelo.PAS_ELIMINADO = 0
 // Genera id único en internet.
 modelo.PAS_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_PASATIEMPO], transaccion => {
  const almacenPasatiempo = transaccion.objectStore(ALMACEN_PASATIEMPO)
  almacenPasatiempo.add(modelo)
 })
}

exportaAHtml(pasatiempoAgrega)