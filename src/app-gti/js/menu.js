// --- MENÚ HAMBURGUESA ---

const btnHamburguesa = document.getElementById("hamburguesa");

const menuMovil = document.querySelector("nav.menu-movil");

const btnCerrar = document.getElementById("cerrar-menu");

// Si el botón de hamburguesa existe, añade un listener para abrir el menú móvil
btnHamburguesa?.addEventListener("click", () => {
    menuMovil?.classList.remove("oculto"); // Muestra el menú quitando la clase 'oculto'
    document.body.classList.add("menu-abierto"); // Evita el scroll en el fondo mientras el menú está abierto
});

// Si el botón de cerrar existe, añade un listener para cerrarlo
btnCerrar?.addEventListener("click", () => {
    menuMovil?.classList.add("oculto");
    document.body.classList.remove("menu-abierto");
});


// --- POPUP ---

/**
 * @param {string} texto - El mensaje que se mostrará en el popup
 * @param {function} onConfirmar - Función que se ejecutará si el usuario hace clic en "Cerrar Sesión"
 * @param {function|null} onCancelar - Función que se ejecutará si el usuario hace clic en "Cancelar"
 */
function mostrarPopup(texto, onConfirmar, onCancelar) {
    // Selecciona el elemento del popup
    const popup = document.querySelector(".popup");
    if (!popup) return; // Si no existe el popup, se cancela la función

    const mensaje = popup.querySelector("p");
    const btnConfirmar = popup.querySelector(".popup-confirmar");
    const btnCancelar = popup.querySelector(".popup-cancelar");

    // Mensaje que se recibió como parámetro
    mensaje.textContent = texto;

    // Muestra el popup y bloquea scroll
    popup.classList.add("activo");
    document.body.classList.add("menu-abierto");

    // Función interna para cerrar el popup y limpiar eventos
    const cerrarPopup = () => {
        popup.classList.remove("activo");
        document.body.classList.remove("menu-abierto");

        btnConfirmar.onclick = null;
        btnCancelar.onclick = null;
    };

    // Asigna la acción del botón "Cerrar sesión"
    btnConfirmar.onclick = () => {
        cerrarPopup(); // Primero cierra el popup
        if (typeof onConfirmar === "function") onConfirmar();
    };

    // Asigna la acción del botón "Cancelar"
    btnCancelar.onclick = () => {
        cerrarPopup(); // Solo cierra el popup
        if (typeof onCancelar === "function") onCancelar();
    };
}


// --- CIERRE DE SESIÓN ---

// Selecciona todos los botones que deberían iniciar el cierre de sesión
const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");

// Recorre cada botón y añade un listener
botonesCerrarSesion.forEach(boton => {
    boton.addEventListener("click", e => {
        e.preventDefault(); // Evita el comportamiento por defecto del enlace o botón

        // Muestra el popup con mensaje de confirmación
        mostrarPopup(
            "¿Estás seguro de que deseas cerrar sesión?",
            () => window.location.href = "logout.php", // Si confirma, redirige al logout
            null // Si cancela, no hace nada
        );
    });
});
