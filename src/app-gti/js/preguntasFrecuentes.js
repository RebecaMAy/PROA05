// Código para que no se queden las preguntas abiertas al volver a la página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-respuesta').forEach(respuesta => {
        respuesta.classList.remove('activa');
    });
    document.querySelectorAll('.faq-icono').forEach(icono => {
        icono.style.transform = 'rotate(0deg)';
    });
});

// Lógica FAQ
document.querySelectorAll('.faq-pregunta').forEach(button => {
    button.addEventListener('click', () => {
        const respuesta = button.nextElementSibling;
        const icono = button.querySelector('.faq-icono');

        // Verifica si la respuesta ya está abierta
        const isActive = respuesta.classList.contains('activa');

        // Si está abierta, la cierra
        if (isActive) {
            respuesta.classList.remove('activa');
            icono.style.transform = 'rotate(0deg)';
        } else {
            respuesta.classList.add('activa');
            icono.style.transform = 'rotate(180deg)';
        }
    });
});
