// JS actualizado para submenu con colapso en móvil

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const submenu = document.getElementById("submenu-asignatura");

    let opciones = [];
    let claseSubmenu = "menu-lateral";

    if (usuario.rol === "pas") {
        opciones = [
            { texto: "Asignaturas", icono: "book.svg", href: "#" },
            { texto: "Asignaciones Profesores", icono: "menuPAS.svg", href: "#" },
            { texto: "Asignaciones Alumnos", icono: "menuPAS.svg", href: "#" }
        ];
        claseSubmenu = "menu-pas colapsable";
    } else {
        const asignatura = JSON.parse(localStorage.getItem('asignaturaSeleccionada'));
        if (!asignatura) {
            window.location.href = "inicio-asignaturas.html";
            return;
        }
        document.getElementById('titulo-asignatura').textContent = asignatura.nombre;
        document.getElementById('codigo-asignatura').textContent = `Código: ${asignatura.codigo}`;

        opciones = [
            { texto: "Horario", icono: "horario.svg", href: "#" },
            { texto: "Guía Docente", icono: "guiaDocente.svg", href: "#" },
            { texto: "Recursos", icono: "recursos.svg", href: "#" },
            { texto: "Tareas", icono: "tareas.svg", href: "#" },
            { texto: "Exámenes", icono: "examenes.svg", href: "#" },
            { texto: "Calificaciones", icono: "calificaciones.svg", href: "#" },
            { texto: "Ranking", icono: "ranking.svg", href: "#" },
            { texto: "Foros", icono: "foro.svg", href: "#" },
            { texto: "Clases en vivo", icono: "clasesEnVivo.svg", href: "#" }
        ];
    }

    const rutaIconos = "/src/app-proa/icons/";

    let htmlSubmenu = "";

    if (usuario.rol === "pas") {
        htmlSubmenu += `
            <div class="titulo-submenu-pas">
                <img src="${rutaIconos}administracionPAS.svg" alt="Administración" class="icono-inicio" />
                <h2>Administración</h2>
            </div>
        `;
    }

    htmlSubmenu += `
        <nav class="${claseSubmenu}" id="submenu-toggle">
            <button class="submenu-toggle-btn">
                ${usuario.rol === 'pas' ? 'Administración' : 'Asignatura'} <span class="flecha">&#9662;</span>
            </button>
            <div class="submenu-items">
                ${opciones.map(op => `
                    <a href="${op.href}" class="submenu-item">
                        <img src="${rutaIconos}${op.icono}" alt="${op.texto}" />
                        <span>${op.texto}</span>
                    </a>
                `).join('')}
            </div>
        </nav>
    `;

    submenu.innerHTML = htmlSubmenu;

    const toggleBtn = document.querySelector(".submenu-toggle-btn");
    const items = document.querySelector(".submenu-items");

    toggleBtn?.addEventListener("click", () => {
        items.classList.toggle("visible");
    });
});
