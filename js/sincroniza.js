import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { pasatiempoConsultaTodos } from "./bd/pasatiempoConsultaTodos.js"
import { pasatiemposReemplaza } from "./bd/pasatiemposReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaPasatiempos } from "./modelo/validaPasatiempos.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await pasatiempoConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const pasatiempos = validaPasatiempos(respuesta.body)
   await pasatiemposReemplaza(pasatiempos)
   renderiza(lista, pasatiempos)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)

}

exportaAHtml(sincroniza)