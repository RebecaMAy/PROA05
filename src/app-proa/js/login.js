// Redirección inmediata si el usuario ya está logueado
const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'));

if (usuarioLogueado) {
    fetch('api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const usuarioValido = usuarios.find(u =>
                u.correo === usuarioLogueado.correo &&
                (u.rol === "alumno" || u.rol === "profesor" || u.rol === "pas")
            );

            if (usuarioValido) {
                if (usuarioValido.rol === "pas") {
                    window.location.replace('../app-proa/pas/index.html');
                } else {
                    window.location.replace('../app-proa/menu-asignaturas.html');
                }
            }
        });
}

// Lógica de login
document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenimos el envío del formulario

    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    const correo = correoInput.value.trim();
    const contrasena = contrasenaInput.value;

    // Limpiar errores previos
    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    let valido = true;

    // Validaciones
    if (!correo) {
        mostrarError(correoInput, 'Campo obligatorio');
        valido = false;
    }
    if (!contrasena) {
        mostrarError(contrasenaInput, 'Campo obligatorio');
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        valido = false;
    }

    if (!valido) return;

    // Login simulado
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const usuariosPermitidos = usuarios.filter(u =>
                u.rol === "alumno" || u.rol === "profesor" || u.rol === "pas"
            );

            const usuario = usuariosPermitidos.find(u =>
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
                toast.style.backgroundColor = 'var(--color-primario)';
                toast.style.color = '#fff';
                toast.style.borderRadius = '8px';
                toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                toast.style.fontFamily = 'var(--fuente-principal)';
                document.body.appendChild(toast);

                setTimeout(() => {
                    toast.remove();
                    if (usuario.rol === "pas") {
                        window.location.href = '../app-proa/pas/index.html';
                    } else {
                        window.location.href = '../app-proa/menu-asignaturas.html';
                    }
                }, 2000);

            } else {
                const toastError = document.createElement('div');
                toastError.textContent = 'Usuario o contraseña incorrectos';
                toastError.style.position = 'fixed';
                toastError.style.bottom = '20px';
                toastError.style.right = '20px';
                toastError.style.padding = '1em 2em';
                toastError.style.backgroundColor = '#FF6666';
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

// Forzar recarga si se accede desde caché después de cerrar sesión
window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});


