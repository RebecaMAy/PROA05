document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Si no hay usuario logueado, redirige directamente al login de PROA
    if (!usuario) {
        window.location.replace('index.html');  // Usamos replace para que no quede en el historial
        return;
    }

    // Agregar clase al body según rol
    document.body.classList.add(`rol-${usuario.rol}`);

    // Añadir CSS del header dinámicamente
    const linkHeaderCSS = document.createElement('link');
    linkHeaderCSS.rel = 'stylesheet';
    linkHeaderCSS.href = '/src/app-proa/css/header-proa.css'; // Ajusta si cambia tu estructura
    document.head.appendChild(linkHeaderCSS);

    fetch('header-proa.html')
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            // Esperar a que se inserte el DOM del header
            requestAnimationFrame(() => {
                const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
                let etiquetaRol = '';

                if (usuario.rol === 'alumno') {
                    etiquetaRol = ' (Alumno)';
                } else if (usuario.rol === 'profesor') {
                    etiquetaRol = ' (Profesor)';
                } else if (usuario.rol === 'pas') {
                    etiquetaRol = ' (PAS)';
                }

                document.getElementById('nombre-usuario-header').textContent = nombreCompleto + etiquetaRol;
                document.getElementById('nombre-usuario-popover').textContent = nombreCompleto + etiquetaRol;

                const cerrarSesion = document.getElementById('cerrar-sesion');
                const popup = document.querySelector('.popup');
                const confirmar = popup.querySelector('.popup-confirmar');
                const cancelar = popup.querySelector('.popup-cancelar');

                // Acción de cerrar sesión
                cerrarSesion.addEventListener('click', (e) => {
                    e.preventDefault();
                    popup.classList.add('activo');
                    document.body.classList.add('menu-abierto');
                });

                confirmar.addEventListener('click', () => {
                    // Elimina el usuario del localStorage
                    localStorage.removeItem('usuario');

                    // Redirige al login de PROA y reemplaza la página en el historial para evitar el retroceso
                    window.location.replace('index.html');

                    // Prevenir retroceso en el historial (esto evita que al presionar "Atrás", el usuario regrese a la página anterior)
                    if (window.history && window.history.pushState) {
                        // Elimina la última entrada en el historial
                        window.history.pushState(null, null, window.location.href);
                        window.onpopstate = function () {
                            window.history.pushState(null, null, window.location.href);
                        };
                    }
                });

                cancelar.addEventListener('click', () => {
                    popup.classList.remove('activo');
                    document.body.classList.remove('menu-abierto');
                });
            });
        });
});
