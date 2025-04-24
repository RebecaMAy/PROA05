<header>
    <div class="header-izquierda">
        <a href="<?= $rutaBase ?>../index.php">
            <img src="<?= $rutaBase ?>img/logoGTI.svg" alt="Logo GTI" class="logo">
        </a>
    </div>

    <div class="header-derecha">
        <nav class="activo">
            <a href="<?= $rutaBase ?>catalogo.php">Catálogo</a>
            <a href="<?= $rutaBase ?>preguntasFrecuentes.php">Preguntas Frecuentes</a>
            <a href="<?= $rutaBase ?>contacto.php">Contacto</a>
        </nav>

        <a href="<?= $rutaBase ?>login.php">
            <img src="<?= $rutaBase ?>icons/perfilGTI.svg" alt="Perfil GTI" class="icono-perfil">
        </a>
    </div>

    <!-- MENÚ HAMBURGUESA -->
    <button id="hamburguesa">
        <div></div>
        <div></div>
        <div></div>
    </button>
</header>

<!-- MENÚ HAMBURGUESA (solo visible en móvil) -->
<nav class="menu-movil oculto">
    <div class="menu-superior">
        <a href="<?= $rutaBase ?>../index.php">
            <img src="<?= $rutaBase ?>img/logoGTI.svg" alt="Logo GTI" class="logo-menu">
        </a>
        <button id="cerrar-menu">✕</button>
    </div>

    <ul class="menu-enlaces">
        <li><a href="<?= $rutaBase ?>catalogo.php">Catálogo</a></li>
        <li><a href="<?= $rutaBase ?>preguntasFrecuentes.php">Preguntas Frecuentes</a></li>
        <li><a href="<?= $rutaBase ?>contacto.php">Contacto</a></li>
    </ul>

    <div class="menu-acciones">
        <button class="btn btn-secundario" onclick="location.href='<?= $rutaBase ?>login.php'">Iniciar sesión</button>
        <button class="btn btn-principal" onclick="location.href='<?= $rutaBase ?>registro.php'">Regístrate</button>
    </div>
</nav>



