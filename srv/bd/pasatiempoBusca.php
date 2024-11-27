<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_PASATIEMPO.php";

/**
 * @return false | array{
 *   PAS_ID: string,
 *   PAS_NOMBRE: string,
 *   PAS_MODIFICACION: int,
 *   PAS_ELIMINADO: int
 *  }
 */
function pasatiempoBusca(string $id): false|array
{
 return selectFirst(
  pdo: Bd::pdo(),
  from: PASATIEMPO,
  where: [PAS_ID => $id]
 );
}
