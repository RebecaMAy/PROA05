document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (!usuario) {
        window.location.replace('index.html');
        return;
    }

    document.body.classList.add(`rol-${usuario.rol}`);

    const linkHeaderCSS = document.createElement('link');
    linkHeaderCSS.rel = 'stylesheet';
    linkHeaderCSS.href = '/src/app-proa/css/header-proa.css';
    document.head.appendChild(linkHeaderCSS);

    const rutaBase = location.pathname.includes('/pas/') ? '../' : './';

    fetch(`${rutaBase}header-proa.html`)
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML('afterbegin', html);

            requestAnimationFrame(() => {
                const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
                const etiquetaRol =
                    usuario.rol === 'alumno' ? ' (Alumno)' :
                        usuario.rol === 'profesor' ? ' (Profesor)' :
                            usuario.rol === 'pas' ? ' (PAS)' : '';

                document.getElementById('nombre-usuario-header').textContent = etiquetaRol + " " + nombreCompleto;
                document.getElementById('nombre-usuario-popover').textContent = etiquetaRol + " " + nombreCompleto;

                // Cargar notificaciones
                fetch("../api/data/notificaciones.json")
                    .then(res => res.json())
                    .then(data => {
                        const notificaciones = data[usuario.correo] || [];
                        const contenedorPopover = document.getElementById("menu-avisos");
                        contenedorPopover.innerHTML = "";

                        if (notificaciones.length === 0) {
                            const sinAvisos = document.createElement("div");
                            sinAvisos.classList.add("aviso-item");
                            sinAvisos.innerHTML = `<strong>No tienes notificaciones nuevas</strong>`;
                            contenedorPopover.appendChild(sinAvisos);
                        } else {
                            notificaciones
                                .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
                                .forEach(n => {
                                    const aviso = document.createElement("div");
                                    aviso.classList.add("aviso-item");
                                    aviso.innerHTML = `<strong>${n.texto}</strong><div class="fecha-aviso">${n.fecha}</div>`;
                                    contenedorPopover.appendChild(aviso);
                                });
                        }

                    });

                // Manejar popover notificaciones
                const botonNotificacion = document.querySelector(".boton-notificacion");
                const menuAvisos = document.getElementById("menu-avisos");
                const burbujaNotificacion = document.querySelector(".burbuja-notificacion");

                botonNotificacion?.addEventListener("click", e => {
                    e.preventDefault();
                    if (menuAvisos.matches(":popover-open")) {
                        menuAvisos.hidePopover();
                    } else {
                        menuAvisos.showPopover();
                    }
                    burbujaNotificacion?.remove();
                });

                // Cierre de sesión con popup
                const cerrarSesion = document.getElementById("cerrar-sesion");
                const popup = document.querySelector(".popup");
                const confirmar = popup.querySelector(".popup-confirmar");
                const cancelar = popup.querySelector(".popup-cancelar");

                cerrarSesion.addEventListener("click", e => {
                    e.preventDefault();
                    popup.classList.add("activo");
                    document.body.classList.add("menu-abierto");
                });

                confirmar.addEventListener("click", () => {
                    localStorage.removeItem("usuario");
                    const esPas = location.pathname.includes('/pas/');
                    const rutaLogout = esPas ? '../index.html' : './index.html';
                    window.location.replace(rutaLogout);

                });

                cancelar.addEventListener("click", () => {
                    popup.classList.remove("activo");
                    document.body.classList.remove("menu-abierto");
                });
            });
        });
});

// Recarga si vienes del historial tras cerrar sesión
window.addEventListener("pageshow", event => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});
