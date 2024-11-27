<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PASATIEMPO.php";

/**
 * @return array{
 *   PAS_ID: string,
 *   PAS_NOMBRE: string,
 *   PAS_MODIFICACION: int,
 *   PAS_ELIMINADO: int
 *  }[]
 */
function pasatiempoConsultaNoEliminados()
{
 return select(
  pdo: Bd::pdo(),
  from: PASATIEMPO,
  where: [PAS_ELIMINADO => 0],
  orderBy: PAS_NOMBRE
 );
}
