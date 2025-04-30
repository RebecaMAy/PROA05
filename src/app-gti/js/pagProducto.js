document.addEventListener('DOMContentLoaded', () => {
    let ctaLink = 'login.html';
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        ctaLink = '../app-proa/index.html';
    }

    // Asignar enlace correcto al botón "Probar DEMO"
    const botonDemo = document.getElementById("ctaDemo");
    if (botonDemo) {
        botonDemo.setAttribute("href", ctaLink);
    }
});
