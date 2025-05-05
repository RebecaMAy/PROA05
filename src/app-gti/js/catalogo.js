document.querySelector('.formulario-sugerencia')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formulario = this;
    let valido = true;

    // Limpiar errores anteriores
    formulario.querySelectorAll('label small').forEach(el => el.remove());

    const campos = formulario.querySelectorAll('input, textarea');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarError(campo, mensaje) {
        const label = formulario.querySelector(`label[for="${campo.id}"]`);
        if (label) {
            const small = document.createElement('small');
            small.textContent = mensaje;
            small.classList.add('error-texto');
            label.appendChild(small);
        }
        valido = false;
    }

    campos.forEach(campo => {
        const valor = campo.value.trim();
        if (valor === '') {
            mostrarError(campo, 'Campo obligatorio');
        } else if (campo.id === 'email' && !emailRegex.test(valor)) {
            mostrarError(campo, 'Correo inválido');
        } else if (campo.id === 'sugerencia' && valor.length < 10) {
            mostrarError(campo, 'Mínimo 10 caracteres');
        }
    });

    if (!valido) return;

    // Mostrar mensaje de éxito
    const toast = document.createElement('div');
    toast.textContent = '¡Gracias por tu sugerencia!';
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
    }, 1500);
});

//botones redirigen dependiendo de si está logueado o no el usuario
document.addEventListener('DOMContentLoaded', () => {
    const btnDemo = document.getElementById('btnProbarDemo');
    const btnProd = document.getElementById('btnVisualizarProd');

    // Simulación de login: revisa si hay un usuario guardado en localStorage/sessionStorage
    const usuarioGTI = JSON.parse(localStorage.getItem('usuario'));

    btnDemo?.addEventListener('click', () => {
        if (usuarioGTI) {
            window.location.href = '../app-proa/index.html'; // login de PROA
        } else {
            window.location.href = 'login.html'; // login de GTI
        }
    });

    btnProd?.addEventListener('click', () => {
        window.location.href = 'pagProducto.html';
    });
});
