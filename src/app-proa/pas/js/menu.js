const popover = document.getElementById('menu-usuario');
const enlacesPopover = popover.querySelectorAll('a');

enlacesPopover.forEach(enlace => {
    enlace.addEventListener('click', (event) => {
        // Si aún no se ha ocultado, lo ocultamos
        if (popover.matches(':open')) {
            popover.hidePopover();
        }
    });
});

