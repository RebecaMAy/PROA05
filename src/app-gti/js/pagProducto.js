document.addEventListener('DOMContentLoaded', () => {
    // Por defecto, el enlace del botón será a la página de login
    let ctaLink = 'login.html';

    // Intentamos recuperar al usuario desde localStorage (si está logueado)
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Si el usuario existe, redirigimos el botón a la demo privada
    if (usuario) {
        ctaLink = '../app-proa/index.html'; // Ruta hacia el login de PROA
    }

    // Seleccionamos el botón con id "ctaDemo"
    const botonDemo = document.getElementById("ctaDemo");

    // Si existe el botón, le asignamos dinámicamente el enlace correspondiente
    if (botonDemo) {
        botonDemo.setAttribute("href", ctaLink);
    }
});
