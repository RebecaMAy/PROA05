<header>
    <div class="header-izquierda">
        <img src="../icons/logoBlanco.svg" alt="Logo PROA" class="logo">
    </div>

    <div class="header-derecha">
        <button class="boton-notificacion" popovertarget="menu-avisos">
            <img src="../icons/avisos.svg" alt="Notificaciones" class="icono-notificacion">
        </button>

        <button class="usuario-caja" popovertarget="menu-usuario">
            <img src="../icons/perfil.svg" alt="Icono usuario" class="icono-usuario">
            <span>PAS Brooke Malimoe</span>
        </button>
    </div>
</header>

<!-- Popover pefil -->
<div id="menu-usuario" popover>
    <div>Bienvenido<br><strong>Brooke Malimoe</strong></div>
    <div><a href="./logout.php">Cerrar sesión</a></div>
</div>

<!-- Popover avisos -->
<div id="menu-avisos" popover>
    <div class="aviso-item">
        <strong>Nuevo profesor asignado a Matemáticas Aplicadas</strong>
        <div class="fecha-aviso">2024-04-22</div>
    </div>
    <div class="aviso-item">
        <strong>Alta de nueva asignatura: Introducción a la Programación</strong>
        <div class="fecha-aviso">2024-04-20</div>
    </div>
    <div class="aviso-item">
        <strong>Alumno Juan Pérez asignado a Física II</strong>
        <div class="fecha-aviso">2024-04-19</div>
    </div>
</div>


