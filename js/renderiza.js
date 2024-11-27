import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/PASATIEMPO.js").PASATIEMPO[]} pasatiempos
 */
export function renderiza(lista, pasatiempos) {
 let render = ""
 for (const modelo of pasatiempos) {
  if (modelo.PAS_ID === undefined)
   throw new Error(`Falta PAS_ID de ${modelo.PAS_NOMBRE}.`)
  const nombre = htmlentities(modelo.PAS_NOMBRE)
  const searchParams = new URLSearchParams([["id", modelo.PAS_ID]])
  const params = htmlentities(searchParams.toString())
  render += /* html */
   `<li>
     <p><a href="modifica.html?${params}">${nombre}</a></p>
    </li>`
 }
 lista.innerHTML = render
}

exportaAHtml(renderiza)