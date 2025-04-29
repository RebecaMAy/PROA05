<?php
// Lógica de autenticación PROVISIONAL sin el login
$usuario = json_decode(file_get_contents("../api/data/usuarioActivo.json"));
$logueado = $usuario && $usuario->logeado;
$ctaLink = $logueado ? "../app-proa/index.php" : "login.php";
$rutaBase = "./";
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Descubre PROA</title>
    <link rel="stylesheet" href="css/estilos.css">
    <link rel="stylesheet" href="css/header.css">
    <link rel="stylesheet" href="css/pagProducto.css">
    <script src="js/menu.js" defer></script>
</head>
<body>

<?php
// Mostrar el header según el estado de login
include $logueado ? 'includes/headerLogueado.inc' : 'includes/headerNoLogueado.inc';
?>

<!-- Primera seccion -->
<section class="contenedor">
    <h1>Descubre PROA</h1>
    <p class="parrafo-principal">
        PROA, el campus virtual que convierte la educación universitaria en una experiencia dinámica y a medida para profesores y alumnos.
    </p>

    <div class="cta-contenedor">
        <p class="parrafo-secundario">
            Regístrate y prueba la demo
        </p>
        <a href="<?= $ctaLink ?>" class="btnCTA-PROA">Probar DEMO</a>
    </div>
</section>

<!-- Segunda seccion -->
<section class="caracteristicas-principales">
    <h2>Características Principales</h2>
    <div class="caracteristicas-grid">
        <div class="caracteristica">
            <img src="icons/demoMultiperfil.svg" alt="Demo multiperfil">
            <h3>DEMO multiperfil</h3>
            <p class="parrafo-secundario">Prueba PROA como profesor, personal administrativo o alumno</p>
        </div>
        <div class="caracteristica">
            <img src="icons/accesoMultiplataforma.svg" alt="Acceso multiplataforma">
            <h3>Acceso multiplataforma</h3>
            <p class="parrafo-secundario">Navega por PROA desde tu móvil, tablet o portátil sin perder claridad ni funciones</p>
        </div>
        <div class="caracteristica">
            <img src="icons/interfazIntuitiva.svg" alt="Interfaz intuitiva">
            <h3>Interfaz intuitiva</h3>
            <p class="parrafo-secundario">Diseño centrado en el usuario para una experiencia fluida</p>
        </div>
    </div>
</section>

<!-- Tercera sección -->
<section class="seccion-diferenciadora">
    <div class="contenedor-diferenciador">
        <div class="texto-diferenciador">
            <h2>¿Qué hace a PROA diferente?</h2>
            <p class="parrafo-secundario">
                PROA es el primer módulo educativo desarrollado por GTI: un campus virtual diseñado específicamente para instituciones educativas, inicialmente orientado a universidades.
            </p>
            <p class="parrafo-secundario">
                En su versión mínima viable, PROA incluye funcionalidades clave como exámenes y calificaciones, tanto para el profesor como para el alumno, además de las funciones de gestión del PAS. Cada usuario accede con credenciales proporcionadas al registrarse, lo que permite asignar automáticamente su rol como alumno, profesor o PAS.
            </p>
            <p class="parrafo-secundario">
                Nuestra propuesta se diferencia por ofrecer una interfaz clara, intuitiva y centrada en la experiencia de usuario, eliminando las frustraciones comunes de las plataformas educativas tradicionales.
            </p>
            <p class="parrafo-secundario">
                Además, ofrecemos una demo funcional para que los representantes universitarios puedan explorar el producto antes de contratarlo, una práctica poco común en el sector.
            </p>
        </div>
        <div class="imagen-diferenciador">
            <img src="img/pcFondoPROA.svg" alt="Vista de PROA en PC">
        </div>
    </div>
</section>

</body>
</html>
