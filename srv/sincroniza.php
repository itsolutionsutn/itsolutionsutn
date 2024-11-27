<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_PASATIEMPO.php";
require_once __DIR__ . "/modelo/validaPasatiempo.php";
require_once __DIR__ . "/bd/pasatiempoAgrega.php";
require_once __DIR__ . "/bd/pasatiempoBusca.php";
require_once __DIR__ . "/bd/pasatiempoConsultaNoEliminados.php";
require_once __DIR__ . "/bd/pasatiempoModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaPasatiempo($modelo);
  $modeloEnElServidor = pasatiempoBusca($modeloEnElCliente[PAS_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[PAS_ELIMINADO] === 0) {
    pasatiempoAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[PAS_ELIMINADO] === 0
   && $modeloEnElCliente[PAS_ELIMINADO] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
   pasatiempoModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[PAS_ELIMINADO] === 0
   && $modeloEnElServidor[PAS_ELIMINADO] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[PAS_MODIFICACION] >
    $modeloEnElServidor[PAS_MODIFICACION]
   ) {
    // La versión del cliente es más nueva y prevalece.
    pasatiempoModifica($modeloEnElCliente);
   }
  }
 }

 $lista = pasatiempoConsultaNoEliminados();

 devuelveJson($lista);
});
