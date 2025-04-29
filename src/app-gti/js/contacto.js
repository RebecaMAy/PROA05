document.querySelector('.formulario-contacto')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formulario = this;
    let formularioValido = true;

    const campos = formulario.querySelectorAll('input, select, textarea');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Limpiar errores anteriores
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        formularioValido = false;
    }


    campos.forEach(campo => {
        const valor = campo.value.trim();

        if ((campo.tagName === 'INPUT' || campo.tagName === 'TEXTAREA') && valor === '') {
            mostrarError(campo, 'Campo obligatorio');
            return;
        }

        if (campo.tagName === 'SELECT' && (campo.selectedIndex === 0 || campo.value === '')) {
            mostrarError(campo, 'Campo obligatorio');
            return;
        }

        if (campo.id === 'nombre') {
            const partes = valor.split(' ').filter(p => p);
            if (partes.length < 2) {
                mostrarError(campo, 'Debe incluir nombre y apellidos');
            }
        }

        if (campo.id === 'email' && valor !== '' && !emailRegex.test(valor)) {
            mostrarError(campo, 'Correo inválido');
        }

        if (campo.id === 'mensaje' && valor.length < 20) {
            mostrarError(campo, 'El mensaje debe tener al menos 20 caracteres');
        }
    });


    if (!formularioValido) return;

    // Mostrar toast de éxito
    const toast = document.createElement('div');
    toast.textContent = 'Consulta enviada correctamente';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '1em 2em';
    toast.style.backgroundColor = 'var(--color-principal)';
    toast.style.color = '#fff';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    toast.style.fontFamily = 'var(--fuente-lato)';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        formulario.reset();
    }, 2000);
});
