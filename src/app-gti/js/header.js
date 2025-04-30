document.addEventListener('DOMContentLoaded', () => {
    const contenedorHeader = document.getElementById('contenedor-header');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const rutaBase = location.pathname.includes('/app-gti/') ? '' : 'app-gti/';

    if (!contenedorHeader) return;

    contenedorHeader.innerHTML = `
        <header>
            <div class="header-izquierda">
                <a href="${rutaBase}../index.html">
                    <img src="${rutaBase}img/logoGTI.svg" alt="Logo GTI" class="logo">
                </a>
            </div>

            <div class="header-derecha">
                <nav class="activo">
                    <a href="${rutaBase}catalogo.html">Catálogo</a>
                    <a href="${rutaBase}preguntasFrecuentes.html">Preguntas Frecuentes</a>
                    <a href="${rutaBase}contacto.html">Contacto</a>
                </nav>
                ${usuario ? `
                    <div class="perfil-logeado">
                        <a href="#" class="btn-cerrar-sesion">
                            <img src="${rutaBase}icons/cerrarSesion.svg" alt="Cerrar sesión" class="icono-perfil">
                        </a>
                    </div>
                ` : `
                    <a href="${rutaBase}login.html">
                        <img src="${rutaBase}icons/perfilGTI.svg" alt="Perfil GTI" class="icono-perfil">
                    </a>
                `}
            </div>

            <button id="hamburguesa">
                <div></div><div></div><div></div>
            </button>
        </header>

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
                    <button class="btn btn-secundario btn-cerrar-sesion">Cerrar sesión</button>
                ` : `
                    <button class="btn btn-secundario" onclick="location.href='${rutaBase}login.html'">Iniciar sesión</button>
                    <button class="btn btn-principal" onclick="location.href='${rutaBase}registro.html'">Regístrate</button>
                `}
            </div>
        </nav>

        <div class="popup" role="dialog" aria-modal="true">
            <div class="popup-contenido">
                <p class="parrafo-secundario">¿Estás seguro de que deseas continuar?</p>
                <div class="popup-botones">
                    <button class="btn btn-principal popup-cancelar">Cancelar</button>
                    <button class="btn btn-secundario popup-confirmar">Cerrar Sesión</button>
                </div>
            </div>
        </div>
    `;

    // Menú hamburguesa
    const btnHamburguesa = document.getElementById("hamburguesa");
    const menuMovil = document.querySelector("nav.menu-movil");
    const btnCerrar = document.getElementById("cerrar-menu");

    btnHamburguesa?.addEventListener("click", () => {
        menuMovil?.classList.remove("oculto");
        document.body.classList.add("menu-abierto");
    });

    btnCerrar?.addEventListener("click", () => {
        menuMovil?.classList.add("oculto");
        document.body.classList.remove("menu-abierto");
    });

    // Popup de cerrar sesión
    const mostrarPopup = (mensajeTexto, onConfirmar, onCancelar) => {
        const popup = document.querySelector(".popup");
        if (!popup) return;

        const mensaje = popup.querySelector("p");
        const btnConfirmar = popup.querySelector(".popup-confirmar");
        const btnCancelar = popup.querySelector(".popup-cancelar");

        mensaje.textContent = mensajeTexto;
        popup.classList.add("activo");
        document.body.classList.add("menu-abierto");

        const cerrarPopup = () => {
            popup.classList.remove("activo");
            document.body.classList.remove("menu-abierto");
            btnConfirmar.onclick = null;
            btnCancelar.onclick = null;
        };

        btnConfirmar.onclick = () => {
            cerrarPopup();
            if (typeof onConfirmar === 'function') onConfirmar();
        };

        btnCancelar.onclick = () => {
            cerrarPopup();
            if (typeof onCancelar === 'function') onCancelar();
        };
    };

    // Botones de cerrar sesión
    const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");
    botonesCerrarSesion.forEach(boton => {
        boton.addEventListener("click", e => {
            e.preventDefault();
            mostrarPopup("¿Estás seguro de que deseas cerrar sesión?", () => {
                localStorage.removeItem("usuario");
                window.location.reload();
            });
        });
    });
});
