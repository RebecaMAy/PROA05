// Archivo: menu-asignaturas.js
console.log("Script cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
        window.location.href = "../../index.html";
        return;
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;

    // Función para normalizar nombres (tildes, mayúsculas, espacios)
    function normalizar(str) {
        return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
    }

    const nombreNormalizado = normalizar(nombreCompleto);

    fetch("api/data/asignaturas.json")
        .then(res => res.json())
        .then(asignaturas => {
            const asignaturasUsuario = asignaturas.filter(asig =>
                asig.alumnos?.some(alumno => normalizar(alumno) === nombreNormalizado) ||
                normalizar(asig.titular) === nombreNormalizado ||
                asig.colaboradores?.some(colab => normalizar(colab) === nombreNormalizado)
            );

            renderizarAsignaturas(asignaturasUsuario);

            if (usuario.rol === "alumno") {
                const filtroRol = document.getElementById("filtroRol");
                if (filtroRol) {
                    filtroRol.parentElement.style.display = "none";
                }
            }
        });


    function renderizarAsignaturas(asignaturas) {
        const lista = document.getElementById("lista-asignaturas");
        lista.innerHTML = "";

        asignaturas.forEach(asig => {
            const esResponsable = normalizar(asig.titular) === normalizar(`${usuario.nombre} ${usuario.apellidos}`);

            const div = document.createElement("div");
            div.classList.add("item-asignatura");
            div.dataset.rol = esResponsable ? "responsable" : "colaborador";
            div.dataset.nombre = asig.nombre.toLowerCase();
            div.dataset.codigo = asig.codigo.toLowerCase();
            if (asig.favorita) div.classList.add("favorita");

            div.innerHTML = `
                <div class="asignatura-izquierda">
                    <img src="icons/book.svg" alt="Libro" class="icono-azul" />
                    <div>
                        <h4>${asig.nombre}</h4>
                        <p>${asig.codigo}</p>
                    </div>
                </div>
                <div class="asignatura-derecha">
                    ${usuario.rol === "profesor" ? `
                    <span class="rol-profesor">
                        <img src="icons/gorro-educa.svg" alt="Rol" class="icono-azul"/>
                        ${esResponsable ? "Profesor responsable" : "Profesor colaborador"}
                    </span>
                     ` : ""}
                    <img src="${asig.favorita ? "icons/favoritos-relleno.svg" : "icons/favoritos.svg"}"
                        alt="Favorito"
                        class="icono-azul icono-favorito"
                        data-favorita="${asig.favorita}" />
                </div>

            `;
            lista.appendChild(div);
        });

        activarEventosAsignaturas();
        aplicarFiltros();
    }

    function aplicarFiltros() {
        const mostrarSoloFavoritas = document.getElementById("btnFavoritas").classList.contains("activo");
        const rolSeleccionado = document.getElementById("filtroRol")?.value || "todos";
        const textoBusqueda = document.getElementById("filtroTexto").value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "");

        document.querySelectorAll(".item-asignatura").forEach(asignatura => {
            const esFavorita = asignatura.classList.contains("favorita");
            const rolAsignatura = asignatura.dataset.rol;
            const nombre = asignatura.dataset.nombre.normalize("NFD").replace(/\p{Diacritic}/gu, "");
            const codigo = asignatura.dataset.codigo.normalize("NFD").replace(/\p{Diacritic}/gu, "");

            const coincideTexto = nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
            const pasaFiltroFavorita = !mostrarSoloFavoritas || esFavorita;
            const pasaFiltroRol = rolSeleccionado === "todos" || rolSeleccionado === rolAsignatura;

            asignatura.style.display = (coincideTexto && pasaFiltroFavorita && pasaFiltroRol) ? "flex" : "none";
        });
    }

    function activarEventosAsignaturas() {
        document.querySelectorAll(".icono-favorito").forEach(icono => {
            icono.addEventListener("click", () => {
                const contenedor = icono.closest(".item-asignatura");
                const esFavorita = icono.dataset.favorita === "true";

                icono.src = esFavorita ? "icons/favoritos.svg" : "icons/favoritos-relleno.svg";
                icono.dataset.favorita = esFavorita ? "false" : "true";
                contenedor.classList.toggle("favorita", !esFavorita);

                aplicarFiltros();
            });
        });
    }

    document.getElementById("btnFavoritas").addEventListener("click", e => {
        e.currentTarget.classList.toggle("activo");
        aplicarFiltros();
    });

    document.getElementById("filtroRol")?.addEventListener("change", aplicarFiltros);
    document.getElementById("filtroTexto").addEventListener("input", aplicarFiltros);

    const notificaciones = [
        { texto: "Nuevo examen disponible en Álgebra", fecha: "2024-03-20" },
        { texto: "Calificación publicada en Programación", fecha: "2024-03-19" },
        { texto: "Recordatorio: Entrega práctica Algorítmica", fecha: "2024-03-18" }
    ];

    const listaNotif = document.getElementById("lista-notificaciones");
    notificaciones.forEach(n => {
        const li = document.createElement("li");
        li.classList.add("notificacion-item");
        li.innerHTML = `<p>${n.texto}</p><small>${n.fecha}</small>`;
        listaNotif.appendChild(li);
    });
});
