document.addEventListener('DOMContentLoaded', () => {
    const contenedorHeader = document.getElementById('contenedor-header');

    // Obtenemos al usuario desde el almacenamiento local
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // rutaBase importante para cargar los iconos tanto en index.html como los html dentro de app-gti
    const rutaBase = location.pathname.includes('/app-gti/') ? '' : 'app-gti/';

    if (!contenedorHeader) return;

    // CÓDIGO HTML DEL HEADER
    contenedorHeader.innerHTML = `
        <header>
            <!-- Sección izquierda del header con el logo -->
            <div class="header-izquierda">
                <a href="${rutaBase}../index.html">
                    <img src="${rutaBase}img/logoGTI.svg" alt="Logo GTI" class="logo">
                </a>
            </div>

            <!-- Sección derecha con navegación y perfil o login -->
            <div class="header-derecha">
                <nav class="activo">
                    <a href="${rutaBase}catalogo.html">Catálogo</a>
                    <a href="${rutaBase}preguntasFrecuentes.html">Preguntas Frecuentes</a>
                    <a href="${rutaBase}contacto.html">Contacto</a>
                </nav>
                ${usuario ? `
                    <!-- Si el usuario está logueado, mostramos el icono de cerrar sesión -->
                    <div class="perfil-logeado">
                        <a href="#" class="btn-cerrar-sesion">
                            <img src="${rutaBase}icons/cerrarSesion.svg" alt="Cerrar sesión" class="icono-perfil">
                        </a>
                    </div>
                ` : `
                    <!-- Si no está logueado, mostramos el icono de perfil que lleva al login -->
                    <a href="${rutaBase}login.html">
                        <img src="${rutaBase}icons/perfilGTI.svg" alt="Perfil GTI" class="icono-perfil">
                    </a>
                `}
            </div>

            <!-- Botón hamburguesa para menú móvil -->
            <button id="hamburguesa">
                <div></div><div></div><div></div>
            </button>
        </header>

        <!-- Menú desplegable móvil -->
        <nav class="menu-movil oculto">
            <div class="menu-superior">
                <a href="${rutaBase}../index.html">
                    <img src="${rutaBase}img/logoGTI.svg" alt="Logo GTI" class="logo-menu">
                </a>
                <button id="cerrar-menu">✕</button>
            </div>
            <ul class="menu-enlaces">
                <li><a href="${rutaBase}catalogo.html">Catálogo</a></li>
                <li><a href="${rutaBase}preguntasFrecuentes.html">Preguntas Frecuentes</a></li>
                <li><a href="${rutaBase}contacto.html">Contacto</a></li>
            </ul>
            <div class="menu-acciones">
                ${usuario ? `
                    <!-- Botón de cerrar sesión en menú móvil -->
                    <button class="btn btn-secundario btn-cerrar-sesion">Cerrar sesión</button>
                ` : `
                    <!-- Botones para iniciar sesión o registrarse -->
                    <button class="btn btn-secundario" onclick="location.href='${rutaBase}login.html'">Iniciar sesión</button>
                    <button class="btn btn-principal" onclick="location.href='${rutaBase}registro.html'">Regístrate</button>
                `}
            </div>
        </nav>

        <!-- Popup de confirmación (cerrar sesión) -->
        <div class="popup" role="dialog" aria-modal="true">
            <div class="popup-contenido">
                <p class="parrafo-secundario">¿Estás seguro de que deseas continuar?</p>
                <div class="popup-botones">
                    <button class="btn btn-principal popup-cancelar">Cancelar</button>
                    <button class="btn btn-secundario popup-confirmar">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    `;  // FIN DE LA SECCIÓN CÓDIGO HTML DEL HEADER

    // Interacciones del menú

    const btnHamburguesa = document.getElementById("hamburguesa");
    const menuMovil = document.querySelector("nav.menu-movil");
    const btnCerrar = document.getElementById("cerrar-menu");

    // Abrir el menú móvil al hacer clic en el botón hamburguesa
    btnHamburguesa?.addEventListener("click", () => {
        menuMovil?.classList.remove("oculto");
        document.body.classList.add("menu-abierto"); // bloquea scroll
    });

    // Cerrar el menú móvil al hacer clic en la X
    btnCerrar?.addEventListener("click", () => {
        menuMovil?.classList.add("oculto");
        document.body.classList.remove("menu-abierto");
    });

    // Lógica del popup

    const mostrarPopup = (mensajeTexto, onConfirmar, onCancelar) => {
        const popup = document.querySelector(".popup");
        if (!popup) return;

        const mensaje = popup.querySelector("p");
        const btnConfirmar = popup.querySelector(".popup-confirmar");
        const btnCancelar = popup.querySelector(".popup-cancelar");

        // Insertamos el mensaje dinámico en el popup
        mensaje.textContent = mensajeTexto;

        // Mostramos el popup y bloqueamos scroll
        popup.classList.add("activo");
        document.body.classList.add("menu-abierto");

        // Función para cerrar el popup y limpiar eventos
        const cerrarPopup = () => {
            popup.classList.remove("activo");
            document.body.classList.remove("menu-abierto");
            btnConfirmar.onclick = null;
            btnCancelar.onclick = null;
        };

        // Si se confirma, cerramos popup y ejecutamos la función confirmación
        btnConfirmar.onclick = () => {
            cerrarPopup();
            if (typeof onConfirmar === 'function') onConfirmar();
        };

        // Si se cancela, cerramos popup y ejecutamos la función cancelación
        btnCancelar.onclick = () => {
            cerrarPopup();
            if (typeof onCancelar === 'function') onCancelar();
        };
    };

    // Cierre de sesión

    // Seleccionamos todos los botones con clase btn-cerrar-sesion
    const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");

    // A cada botón le añadimos la funcionalidad de mostrar el popup y cerrar sesión
    botonesCerrarSesion.forEach(boton => {
        boton.addEventListener("click", e => {
            e.preventDefault();
            mostrarPopup("¿Estás seguro de que deseas cerrar sesión?", () => {
                // Si el usuario confirma, borramos los datos y recargamos la página
                localStorage.removeItem("usuario");
                window.location.reload();
            });
        });
    });
});

// Forzamos actualización del header si el usuario ha cerrado sesión y pulsa "Atrás"
window.addEventListener('pageshow', (event) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Solo recargar si la página viene de la caché (navegador restaurando desde historial)
    if (event.persisted && !usuario) {
        window.location.reload();
    }
});


