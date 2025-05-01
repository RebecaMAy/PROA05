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
