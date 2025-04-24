const btnHamburguesa = document.getElementById("hamburguesa");
const menuMovil = document.querySelector("nav.menu-movil");
const btnCerrar = document.getElementById("cerrar-menu");

btnHamburguesa.addEventListener("click", () => {
    menuMovil.classList.remove("oculto");
    document.body.classList.add("menu-abierto"); // bloquear scroll
});

btnCerrar.addEventListener("click", () => {
    menuMovil.classList.add("oculto");
    document.body.classList.remove("menu-abierto"); // restaurar scroll
});
