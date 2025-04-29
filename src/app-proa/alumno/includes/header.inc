<header>
    <div class="header-izquierda">
        <a href="./index.php">
            <img src="../icons/logoBlanco.svg" alt="Logo PROA" class="logo">
        </a>
    </div>

    <div class="header-derecha">
        <button class="boton-notificacion" popovertarget="menu-avisos">
            <img src="../icons/avisos.svg" alt="Notificaciones" class="icono-notificacion">
        </button>

        <button class="usuario-caja" popovertarget="menu-usuario">
            <img src="../icons/perfil.svg" alt="Icono usuario" class="icono-usuario">
            <span>Debora Rawstorne</span>
        </button>
    </div>
</header>

<!-- Popover pefil -->
<div id="menu-usuario" popover>
    <div>Bienvenida<br><strong>Debora Rawstorne</strong></div>
    <div><a href="./logout.php">Cerrar sesión</a></div>
</div>

<!-- Popover avisos -->
<div id="menu-avisos" popover>
    <div class="aviso-item">
        <strong>Nuevo examen disponible en Álgebra</strong>
        <div class="fecha-aviso">2024-03-20</div>
    </div>
    <div class="aviso-item">
        <strong>Resultados actualizados en Física</strong>
        <div class="fecha-aviso">2024-04-01</div>
    </div>
    <div class="aviso-item">
        <strong>Recordatorio: entrega de proyecto final UX</strong>
        <div class="fecha-aviso">2024-04-15</div>
    </div>
</div>

