document.querySelector('.registro-formulario')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Evitamos que el formulario se envíe y recargue la página

    const formulario = this;
    let formularioValido = true;

    // Seleccionamos todos los campos relevantes del formulario
    const campos = {
        nombre: formulario.querySelector('#nombre'),
        apellidos: formulario.querySelector('#apellidos'),
        institucion: formulario.querySelector('#institucion'),
        correo: formulario.querySelector('#correo'),
        tipo: formulario.querySelector('#tipo'),
        telefono: formulario.querySelector('#telefono'),
        contrasena: formulario.querySelector('#contrasena'),
        repetir: formulario.querySelector('#repetir'),
    };

    // Expresiones regulares para validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación de email básico
    const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/; // Mínimo 6 caracteres con número o símbolo
    const telRegex = /^\d+$/; // Solo dígitos para el teléfono

    // Limpiamos mensajes de error anteriores
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo del label correspondiente
    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        formularioValido = false; // Marcamos el formulario como inválido
    }

    // Validaciones campo por campo
    if (campos.nombre.value.trim() === '') {
        mostrarError(campos.nombre, 'Campo obligatorio');
    }

    if (campos.apellidos.value.trim() === '') {
        mostrarError(campos.apellidos, 'Campo obligatorio');
    }

    if (campos.institucion.value.trim() === '') {
        mostrarError(campos.institucion, 'Campo obligatorio');
    }

    const correoValor = campos.correo.value.trim();
    if (correoValor === '') {
        mostrarError(campos.correo, 'Campo obligatorio');
    } else if (!emailRegex.test(correoValor)) {
        mostrarError(campos.correo, 'Correo inválido');
    }

    if (campos.tipo.selectedIndex === 0 || campos.tipo.value === '') {
        mostrarError(campos.tipo, 'Campo obligatorio');
    }

    const telefonoValor = campos.telefono.value.trim();
    if (!telRegex.test(telefonoValor)) {
        mostrarError(campos.telefono, 'Teléfono inválido (solo números)');
    } else if (telefonoValor.length < 9) {
        mostrarError(campos.telefono, 'El teléfono debe tener al menos 9 cifras');
    }

    if (!passRegex.test(campos.contrasena.value)) {
        mostrarError(campos.contrasena, 'Mínimo 6 caracteres con un número o símbolo');
    }

    if (campos.contrasena.value !== campos.repetir.value) {
        mostrarError(campos.repetir, 'Las contraseñas no coinciden');
    }

    // Si el formulario no pasa las validaciones, no continuamos
    if (!formularioValido) return;

    // Simulación de registro exitoso

    // Creamos y mostramos un mensaje tipo "toast" de éxito
    const toast = document.createElement('div');
    toast.textContent = 'Registro exitoso. Redirigiendo...';
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
        window.location.href = 'login.html';
    }, 2000);
});
