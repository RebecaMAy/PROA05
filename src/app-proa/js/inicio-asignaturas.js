// Archivo: inicio-asignaturas.js
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

    fetch("../api/data/asignaturas.json")
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

            //redirige a aisgnatura seleccionada
            div.addEventListener("click", () => {
                localStorage.setItem("asignaturaSeleccionada", JSON.stringify({
                    nombre: asig.nombre,
                    codigo: asig.codigo
                }));
                window.location.href = "panel-usuario.html";
            });


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
                event.stopPropagation();
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

    // Simulación de notificaciones personalizadas
    // Simulación de notificaciones personalizadas
    fetch("../api/data/notificaciones.json")
        .then(res => res.json())
        .then(data => {
            const usuarioCorreo = usuario.correo;
            const notificacionesUsuario = data[usuarioCorreo] || [];

            // Ordenar por fecha descendente
            const notificacionesOrdenadas = notificacionesUsuario.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

            const listaNotif = document.getElementById("lista-notificaciones");
            listaNotif.innerHTML = "";

            if (notificacionesOrdenadas.length === 0) {
                // Mostrar mensaje amigable si no hay notificaciones
                const li = document.createElement("li");
                li.classList.add("notificacion-item");
                li.innerHTML = `<p>No tienes notificaciones recientes.</p>`;
                listaNotif.appendChild(li);
            } else {
                // Mostrar cada notificación
                notificacionesOrdenadas.forEach(n => {
                    const li = document.createElement("li");
                    li.classList.add("notificacion-item");
                    li.innerHTML = `<p>${n.texto}</p><small>${n.fecha}</small>`;
                    listaNotif.appendChild(li);
                });
            }

            // Añadir burbuja de notificación solo si hay nuevas
            if (notificacionesOrdenadas.length > 0) {
                const iconoNotif = document.querySelector(".icono-notificacion");
                const burbuja = document.createElement("span");
                burbuja.classList.add("burbuja-notificacion");
                iconoNotif.parentElement.style.position = "relative";
                iconoNotif.parentElement.appendChild(burbuja);
            }
        });


});
