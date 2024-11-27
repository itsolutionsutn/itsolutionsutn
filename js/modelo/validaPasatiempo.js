/**
 * @param { any } objeto
 * @returns {import("./PASATIEMPO.js").PASATIEMPO}
 */
export function validaPasatiempo(objeto) {
	if (typeof objeto.PAS_ID !== "string") throw new Error("El id debe ser texto.");

	if (typeof objeto.PAS_NOMBRE !== "string") throw new Error("El nombre debe ser texto.");

	if (typeof objeto.PAS_MODIFICACION !== "number") throw new Error("El campo modificacion debe ser número.");

	if (typeof objeto.PAS_ELIMINADO !== "number") throw new Error("El campo eliminado debe ser número.");

	return objeto;
}
