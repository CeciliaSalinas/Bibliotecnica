
<?php

//guardarlos valores que recibo por POST
$nombre = $_POST ['nombre'];
$apellido = $_POST['apellido'];
$email = $_POST['email'];
$provincia = $_POST['provincia'];
$mensaje = $_POST['mensaje'];

 //isset:  función que verifica si una variable está definida y no es nula. es un valor booleano
 //verifica si el campo 'estudiante' existe dentro del array $_POST.
$estudiante = isset($_POST['estudiante']);

// Si $_POST['libros'] no existe o es vacío, guardamos la cadena vacía. Si no,
// guardamos el valor recibido
$libros = empty($_POST['libros']) ? '' : $_POST['libros'];

//validamos errores
$errores = revisarErrores($nombre, $apellido, $libros, $cuotas);

//si no hubo errores calculo respuesta
if (count($errores)==0){
    $respuesta = calcularPrecios($cuotas, $provincia, $estudiante);
}

//agrego los errores a la respuesta
$respuesta['errores'] = $errores;

//configurar la respuesta HTTP para que sea interpretada correctamente como un objeto JSON y luego enviar dicho objeto JSON al cliente.
header('Content-Type: application/json; charset=utf-8');

//json_encode() convierte un valor de PHP (como un array o un objeto) en una cadena JSON.
//$respuesta es la variable que contiene los datos que deseas convertir a JSON.
echo json_encode($respuesta);

/**
 * Revisa que los valores recibidos por POST pasen las validaciones:
 *
 * @ return array Retorna un array con los errores (puede estar vacío si no hay
 *               errores).
 */

function revisarErrores($nombre, $apellido, $libros, $cuotas){

    $errores = [];

     //En este caso, strlen($nombre) calcula la longitud de la cadena almacenada en la variable $nombre.
    if (strlen($nombre) < 3){
        $errores[] = "Error: el nombre debe tener al menos tres letras";
    }

    if (strlen($apellido) < 2){
        $errores[] = "Error: el apellido debe tener al menos dos letras";
    }

    if (tiene_numeros($nombre)) {
        $errores[] = "Error: El nombre contiene números";
    }
    if (tiene_numeros($apellido)) {
        $errores[] = "Error: El nombre contiene números";
    }

    //verifica si una variable está vacía. Retorna true si la variable no existe,
    //El operador de negación lógica ! invierte el resultado de empty().
    if (!empty($_POST['libros'])) {
        $tipo = $_POST['libros'];
    } else {
        $errores[] = "Error: debe elegir un tipo de formato de libro";
    }

    if (!is_numeric($cuotas) || $cuotas <= 0) {
        $errores[] = "Error: la cantidad de cuotas debe ser un nro > 0";
    }

    return $errores
}


    /**
 * Esta función calcula el precio de la suscripción.
 * @ return Array Retorna un array que contiene el precio base, el total de
 *               recargos, el total de descuentos y el precio final.
 */

 function calcular_precios($provincia, $cuotas, $es_estudiante)
 {
     $descuento = 0;
     $recargo = 0;
     $precio_base = 1000;
     $descuento_contado = 0.05;
     $max_cuotas_sin_recargo = 6;
     $recargo_muchas_cuotas = 0.1;
     $recargo_envio = 200;
     $descuento_estudiante = 0.15;
 
     if ($cuotas == 1) {
         $descuento += $precio_base * $descuento_contado;
     }
     if ($provincia != 's') {
         $recargo += $recargo_envio;
     }
     if ($cuotas > $max_cuotas_sin_recargo) {
         $recargo += $precio_base * $recargo_muchas_cuotas;
     }
     if ($es_estudiante) {
         $descuento += $precio_base * $descuento_estudiante;
     }
     $respuesta['precio_base'] = $precio_base;
     $respuesta['descuento'] = $descuento;
     $respuesta['recargo'] = $recargo;
     $respuesta['total'] = $precio_base + $recargo - $descuento;
 
     return $respuesta;
 }
 
/**
 * Esta función verifica si la cadena recibida por parámetro tiene dígitos o no.
 * @ param string $texto El texto a analizar
 * @ return boolean true si tiene dígitos, false si no los tiene.
 */
function tiene_numeros($texto) {
    for ($i = 0; $i < strlen($texto); $i++) {
        if (is_numeric($texto[$i])) {
            return true;
        }
    }
    return false;
}
<?