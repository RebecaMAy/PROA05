// Verificación de usuario al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        window.location.replace('../index.html'); // Redirigir si no está logueado
    } else {
        // Recuperamos el nombre completo del usuario (nombre y apellidos)
        const nombreUsuario = `${usuario.nombre} ${usuario.apellidos}`;

        // Actualizamos el nombre en el header (usuario-caja span)
        const nombreElemento = document.querySelector('.usuario-caja span');
        if (nombreElemento) {
            nombreElemento.textContent = `PAS ${nombreUsuario}`;
        }

        // Actualizamos el nombre en el popover
        const nombrePopover = document.querySelector('#menu-usuario div strong');
        if (nombrePopover) {
            nombrePopover.textContent = nombreUsuario;  // Cambia el nombre dinámicamente en el popover
        }
    }
});


// Usamos 'pageshow' para manejar la restauración de la página desde la caché (botón "Atrás")
window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Si la página viene de la caché y no hay usuario logueado, recargamos la página
    if (event.persisted && !usuario) {
        window.location.replace('../index.html'); // Redirigir al login
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesion = document.getElementById('cerrar-sesion');
    const popup = document.querySelector('.popup');
    const btnConfirmar = popup?.querySelector('.popup-confirmar');
    const btnCancelar = popup?.querySelector('.popup-cancelar');
    const popover = document.getElementById('menu-usuario');

    // Abrir popup al hacer clic en "Cerrar sesión"
    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', (e) => {
            e.preventDefault();
            popup.classList.add('activo');
            document.body.classList.add('menu-abierto'); // bloquea scroll
        });
    }

    // Confirmar cierre de sesión
    btnConfirmar?.addEventListener('click', () => {
        localStorage.removeItem('usuario');
        window.location.href = '../index.html';
    });

    // Cancelar y ocultar el popup
    btnCancelar?.addEventListener('click', () => {
        popup.classList.remove('activo');
        document.body.classList.remove('menu-abierto');
    });

    // Ocultar popover al hacer clic en cualquier enlace dentro
    const enlacesPopover = popover?.querySelectorAll('a') || [];
    enlacesPopover.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (popover.matches(':open')) {
                popover.hidePopover();
            }
        });
    });
});
