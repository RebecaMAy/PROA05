document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const formulario = document.querySelector('.formulario-login');
    const seccion = document.querySelector('.nueva');

    // Si no hay email en la URL, muestra un mensaje de error
    if (!email) {
        seccion.innerHTML = '<p class="parrafo-principal">Acceso no autorizado.</p>';
        return;
    }

    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const ultimosUsuarios = usuarios.slice(-3);
            const usuario = ultimosUsuarios.find(u => u.correo === email);

            if (!usuario) { // Si no se encuentra el usuario en el JSON
                seccion.innerHTML = '<p class="parrafo-principal">Acceso no autorizado.</p>';
                return;
            }

            formulario.addEventListener('submit', function (e) {
                e.preventDefault();
                let valido = true;

                const nueva = document.getElementById('nueva');
                const confirmar = document.getElementById('confirmar');
                const passRegex = /^(?=.*[\d!@#$%^&*(),.?":{}|<>]).{6,}$/;

                document.querySelectorAll('label small').forEach(el => el.remove());

                function mostrarError(campo, mensaje) {
                    const label = document.querySelector(`label[for="${campo.id}"]`);
                    const small = document.createElement('small');
                    small.textContent = mensaje;
                    small.classList.add('error-texto');
                    label.appendChild(small);
                    valido = false;
                }

                if (!passRegex.test(nueva.value)) {
                    mostrarError(nueva, 'Mínimo 6 caracteres con número o símbolo');
                }

                if (nueva.value !== confirmar.value) {
                    mostrarError(confirmar, 'Las contraseñas no coinciden');
                }

                // Verificar si es igual a la actual
                if (nueva.value === usuario.clave) {
                    mostrarError(nueva, 'La nueva contraseña no puede ser igual a la actual');
                }

                if (!valido) return;

                // Simular cambio exitoso
                const toast = document.createElement('div');
                toast.textContent = 'Contraseña cambiada con éxito';
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
                }, 1500);
            });
        })
        .catch(error => {
            alert('Error al cargar los datos');
            console.error(error);
        });
});
