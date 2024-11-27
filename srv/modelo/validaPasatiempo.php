<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_PASATIEMPO.php";

function validaPasatiempo($objeto)
{

 $objeto = validaJson($objeto);

 if (!isset($objeto->PAS_ID) || !is_string($objeto->PAS_ID))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El id debe ser texto.",
   type: "/error/idincorrecto.html",
  );

 if (!isset($objeto->PAS_NOMBRE) || !is_string($objeto->PAS_NOMBRE))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El nombre debe ser texto.",
   type: "/error/nombreincorrecto.html",
  );

 if (!isset($objeto->PAS_MODIFICACION)  || !is_int($objeto->PAS_MODIFICACION))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "La modificacion debe ser número.",
   type: "/error/modificacionincorrecta.html",
  );

  if (!isset($objeto->PAS_ELIMINADO) || !is_int($objeto->PAS_ELIMINADO))
  throw new ProblemDetails(
   status: BAD_REQUEST,
   title: "El campo eliminado debe ser entero.",
   type: "/error/eliminadoincorrecto.html",
  );

 return [
  PAS_ID => $objeto->PAS_ID,
  PAS_NOMBRE => $objeto->PAS_NOMBRE,
  PAS_MODIFICACION => $objeto->PAS_MODIFICACION,
  PAS_ELIMINADO => $objeto->PAS_ELIMINADO
 ];
}
