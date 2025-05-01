document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenimos el envío del formulario (recarga de la página)

    // Obtenemos los campos del formulario
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    // Obtenemos y limpiamos los valores ingresados por el usuario
    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Expresión regular para validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Eliminamos mensajes de error previos (si los hay)
    document.querySelectorAll('label small').forEach(el => el.remove());

    // Función para mostrar errores debajo de un label
    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    // Validamos formato del correo electrónico
    if (!emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    // Si hay errores, no continuamos con la petición
    if (!valido) return;

    // Autenticación (login simulado)

    // Cargamos los usuarios desde el archivo JSON
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            // Tomamos solo los últimos 3 usuarios del archivo (los de GTI)
            const ultimosUsuarios = usuarios.slice(-3);

            // Buscamos un usuario que coincida con correo y contraseña
            const usuario = ultimosUsuarios.find(u =>
                u.correo === correo && u.clave === contrasena
            );

            if (usuario) {
                // Si se encuentra el usuario, lo guardamos en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuario));

                // Mostramos mensaje de éxito tipo "toast"
                const toast = document.createElement('div');
                toast.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
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

                // Esperamos 2 segundos, quitamos el toast y redirigimos al inicio
                setTimeout(() => {
                    toast.remove();
                    window.location.href = '../index.html';
                }, 2000);

            } else {
                // Si no se encuentra el usuario, mostramos error tipo toast
                const toastError = document.createElement('div');
                toastError.textContent = 'Usuario o contraseña incorrectos';
                toastError.style.position = 'fixed';
                toastError.style.bottom = '20px';
                toastError.style.right = '20px';
                toastError.style.padding = '1em 2em';
                toastError.style.backgroundColor = 'red';
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
            // Si ocurre un error en la petición, mostramos alerta genérica
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
});
