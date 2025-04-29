document.querySelector('.registro-formulario')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formulario = this;
    let formularioValido = true;

    const campos = {
        nombre: formulario.querySelector('#nombre'),
        institucion: formulario.querySelector('#institucion'),
        correo: formulario.querySelector('#correo'),
        tipo: formulario.querySelector('#tipo'),
        telefono: formulario.querySelector('#telefono'),
        contrasena: formulario.querySelector('#contrasena'),
        repetir: formulario.querySelector('#repetir'),
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/;
    const telRegex = /^\d+$/;

    // Eliminar mensajes de error anteriores
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

    // Validaciones individuales
    const nombreValor = campos.nombre.value.trim();
    if (nombreValor === '') {
        mostrarError(campos.nombre, 'Campo obligatorio');
    } else if (!nombreValor.includes(' ') || nombreValor.split(' ').filter(p => p).length < 2) {
        mostrarError(campos.nombre, 'Debe incluir nombre y apellidos');
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

    if (!formularioValido) return;

    // Enviar datos al backend PHP para guardar el usuario en el json
    const [nombre, ...apellidosArr] = campos.nombre.value.trim().split(' ');
    const apellidos = apellidosArr.join(' ') || '';

    const nuevoUsuario = {
        nombre,
        apellidos,
        correo: campos.correo.value.trim(),
        clave: campos.contrasena.value
    };

    fetch('../api/guardarUsuario.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoUsuario)
    })
        .then(res => res.json())
        .then(respuesta => {
            if (respuesta.ok) {
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
                    window.location.href = 'login.php';
                }, 2000);
            } else {
                const toastError = document.createElement('div');
                toastError.textContent = respuesta.mensaje;
                toastError.style.position = 'fixed';
                toastError.style.bottom = '20px';
                toastError.style.right = '20px';
                toastError.style.padding = '1em 2em';
                toastError.style.backgroundColor = 'var(--color-rojoError)';
                toastError.style.color = '#fff';
                toastError.style.borderRadius = '8px';
                toastError.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                toastError.style.fontFamily = 'var(--fuente-lato)';
                document.body.appendChild(toastError);

                setTimeout(() => {
                    toastError.remove();
                }, 2000);
            }
        })
        .catch(error => {
            alert('Error al registrar. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
});
