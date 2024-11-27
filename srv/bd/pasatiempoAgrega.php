<?php

require_once __DIR__ . "/../../lib/php/validaNombre.php";
require_once __DIR__ . "/../../lib/php/insert.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PASATIEMPO.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PAS_ID: string,
 *   PAS_NOMBRE: string,
 *   PAS_MODIFICACION: int,
 *   PAS_ELIMINADO: int
 *  } $modelo
 */
function pasatiempoAgrega(array $modelo)
{
 validaId($modelo[PAS_ID]);
 validaNombre($modelo[PAS_NOMBRE]);
 insert(pdo: Bd::pdo(), into: PASATIEMPO, values: $modelo);
}
