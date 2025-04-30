document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Eliminar errores previos
    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    if (!emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    if (!valido) return;

    // Solo permitir a los últimos 3 usuarios (usuarios GTI)
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const ultimosUsuarios = usuarios.slice(-3); // Solo los últimos 3
            const usuario = ultimosUsuarios.find(u =>
                u.correo === correo && u.clave === contrasena
            );

            if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));

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

                setTimeout(() => {
                    toast.remove();
                    window.location.href = '../index.html';
                }, 2000);
            } else {
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
            alert('Error al iniciar sesión. Intenta de nuevo más tarde.');
            console.error('Error:', error);
        });
});
