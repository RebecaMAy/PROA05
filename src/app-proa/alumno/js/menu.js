document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesion = document.getElementById('cerrar-sesion');

    if (cerrarSesion) {
        cerrarSesion.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que recargue la página

            // Eliminar usuario y redirigir
            localStorage.removeItem('usuario');
            window.location.href = '../index.html';
        });
    }

    // Lógica para ocultar el popover si está abierto
    const popover = document.getElementById('menu-usuario');
    const enlacesPopover = popover?.querySelectorAll('a') || [];

    enlacesPopover.forEach(enlace => {
        enlace.addEventListener('click', (event) => {
            if (popover.matches(':open')) {
                popover.hidePopover();
            }
        });
    });
});
