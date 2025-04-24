// Elementos del menú hamburguesa
const btnHamburguesa = document.getElementById("hamburguesa");
const menuMovil = document.querySelector("nav.menu-movil");
const btnCerrar = document.getElementById("cerrar-menu");

// Abrir el menú móvil
btnHamburguesa?.addEventListener("click", () => {
    menuMovil?.classList.remove("oculto"); // muestra el menú
    document.body.classList.add("menu-abierto"); // bloquea el scroll del fondo
});

// Cerrar el menú móvil
btnCerrar?.addEventListener("click", () => {
    menuMovil?.classList.add("oculto"); // oculta el menú
    document.body.classList.remove("menu-abierto"); // restaura el scroll del fondo
});

// Popup de confirmación de cierre de sesión
const botonesCerrarSesion = document.querySelectorAll(".btn-cerrar-sesion");
const popupCerrarSesion = document.getElementById("popup-cerrar-sesion");
const btnCancelar = document.getElementById("cancelar-cierre");
const btnConfirmar = document.getElementById("confirmar-cierre");

botonesCerrarSesion.forEach(boton => {
    boton.addEventListener("click", e => {
        e.preventDefault();
        popupCerrarSesion?.classList.add("activo"); // muestra el popup
        document.body.classList.add("menu-abierto"); // bloquea scroll
    });
});

btnCancelar?.addEventListener("click", () => {
    popupCerrarSesion?.classList.remove("activo"); // oculta el popup
    document.body.classList.remove("menu-abierto");
});

btnConfirmar?.addEventListener("click", () => {
    window.location.href = "logout.php";
});
