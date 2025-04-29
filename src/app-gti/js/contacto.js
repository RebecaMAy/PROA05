document.querySelector('.formulario-contacto')?.addEventListener('submit', function (e) {
    e.preventDefault();

    let formularioValido = true;

    const campos = this.querySelectorAll('input, select, textarea');

    // Expresión regular para validar que el campo de email tenga un formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Recorre todos los campos del formulario para validarlos
    campos.forEach(campo => {
        campo.classList.remove('campo-error');
    });

    campos.forEach(campo => {
        if (campo.tagName === 'SELECT' && (campo.selectedIndex === 0 || campo.value === "")) {
            formularioValido = false;
            campo.classList.add('campo-error');
        }

        if ((campo.tagName === 'INPUT' || campo.tagName === 'TEXTAREA') && campo.value.trim() === '') {
            formularioValido = false;
            campo.classList.add('campo-error');
        }

        if (campo.id === 'email' && !emailRegex.test(campo.value.trim())) {
            formularioValido = false;
            campo.classList.add('campo-error');
        }
    });

    if (!formularioValido) {
        alert('Por favor, completa todos los campos correctamente antes de enviar el formulario.');
        return;
    }

    // Si el formulario es válido, selecciona el popup y lo muestra
    const popup = document.getElementById('popup-confirmacion');
    popup.classList.add('activo');
    document.body.classList.add('menu-abierto'); // Evita scroll de fondo

    // Botón de cerrar dentro del popup
    const btnCerrar = popup.querySelector('.btn-cerrar-popup');

    btnCerrar.addEventListener('click', () => {
        // Oculta el popup
        popup.classList.remove('activo');
        document.body.classList.remove('menu-abierto');

        // Limpia todos los campos del formulario
        this.reset();

        // Limpia las clases de error
        campos.forEach(campo => campo.classList.remove('campo-error'));
    }, { once: true });
});
