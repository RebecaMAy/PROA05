document.querySelector('.formulario-login')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const correoInput = document.getElementById('correo');
    const correo = correoInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.querySelectorAll('label small').forEach(el => el.remove());

    function mostrarError(campo, mensaje) {
        const label = document.querySelector(`label[for="${campo.id}"]`);
        const small = document.createElement('small');
        small.textContent = mensaje;
        small.classList.add('error-texto');
        label.appendChild(small);
    }

    if (!emailRegex.test(correo)) {
        mostrarError(correoInput, 'Correo inválido');
        return;
    }

    // Buscar si existe el correo en el JSON
    fetch('../api/data/usuarios.json')
        .then(res => res.json())
        .then(usuarios => {
            const ultimosUsuarios = usuarios.slice(-3); // Últimos 3 usuarios: Dani, Jose Luís y Alan.
            const existe = ultimosUsuarios.some(u => u.correo === correo);

            if (existe) {
                // Simulación envío de correo
                const toast = document.createElement('div');
                toast.textContent = 'Enlace de recuperación enviado al correo';
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
                    window.location.href = `nuevaContrasenya.html?email=${encodeURIComponent(correo)}`;
                }, 1500);
            } else {
                mostrarError(correoInput, 'Correo no encontrado');
            }
        })
        .catch(error => {
            alert('Error al procesar la solicitud. Intenta más tarde.');
            console.error(error);
        });
});
