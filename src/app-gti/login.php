<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Iniciar sesión</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/login.css">
    <script src="js/menu.js" defer></script>
</head>
<body>
<?php
$usuario = json_decode(file_get_contents("../api/data/usuarioActivo.json"));
$logueado = $usuario && $usuario->logeado;
$rutaBase = "./";
include $logueado ? 'includes/headerLogueado.inc' : 'includes/headerNoLogueado.inc';
?>

<section class="login">
    <form class="formulario-login">
        <h2>Iniciar sesión</h2>

        <div class="campo">
            <label for="correo">Correo de la institución *</label>
            <input type="email" id="correo" class="input-base">
        </div>

        <div class="campo">
            <label for="contrasena">Contraseña *</label>
            <input type="password" id="contrasena" class="input-base">
        </div>

        <a href="#" class="enlace-secundario">¿Olvidaste tu contraseña?</a>

        <button type="submit" class="btn">Iniciar sesión</button>

        <p class="texto-secundario">
            ¿No tienes una cuenta?
            <a href="registro.php" class="enlace-secundario">Regístrate</a>
        </p>
    </form>
</section>

</body>
</html>