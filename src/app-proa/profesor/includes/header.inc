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
            <span>Profesor Pridmore Starsmeare</span>
        </button>
    </div>
</header>

<!-- Popover pefil -->
<div id="menu-usuario" popover>
    <div>Bienvenido<br><strong>Pridmore Starsmeare</strong></div>
    <div><a href="./logout.php">Cerrar sesión</a></div>
</div>

<!-- Popover avisos -->
<div id="menu-avisos" popover>
    <div class="aviso-item">
        <strong>Cierre de la tarea "Proyecto de Álgebra" realizado</strong>
        <div class="fecha-aviso">2024-04-25</div>
    </div>
    <div class="aviso-item">
        <strong>Nuevo foro abierto: Debate sobre Inteligencia Artificial</strong>
        <div class="fecha-aviso">2024-04-24</div>
    </div>
    <div class="aviso-item">
        <strong>Se te ha asignado el grupo B de Álgebra II</strong>
        <div class="fecha-aviso">2024-04-23</div>
    </div>
</div>


