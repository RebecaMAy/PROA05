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
