<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Catalogo</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <script src="js/menu.js" defer></script>
</head>
<body>
<?php // PROVISIONAL SIN EL LOGIN
$usuario = json_decode(file_get_contents("../api/data/usuarioActivo.json"));
$logueado = $usuario && $usuario->logeado;
$rutaBase = "./";
include $logueado ? 'includes/headerLogueado.inc' : 'includes/headerNoLogueado.inc';
?>

    <h2>Catálogo</h2>

</body>
</html>
