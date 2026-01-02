// ===============================
// CONFIG API (RENDER)
// ===============================
const API_URL = "https://consultorio-backend-5y6e.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tablaPacientes");
    const inputBuscar = document.querySelector(".search-box input");
    let pacientes = []; // vienen de la DB

    // ===============================
    // FUNCIONES DE BOTONES
    // ===============================
    window.verNotas = id => {
        localStorage.setItem("paciente_id", id);
        location.href = "notas_paciente.html";
    };

    window.verHistoria = id => {
        localStorage.setItem("paciente_id", id);
        location.href = "historia_clinica.html";
    };

    window.editarPaciente = id => {
        localStorage.setItem("paciente_id", id);
        location.href = "editar_paciente.html";
    };

    // ===============================
    // RENDERIZAR TABLA
    // ===============================
    function mostrarTabla(pacientesFiltrados) {
        tabla.innerHTML = "";

        if (pacientesFiltrados.length === 0) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">
                        No hay pacientes registrados
                    </td>
                </tr>`;
            return;
        }

        pacientesFiltrados.forEach(p => {
            tabla.innerHTML += `
                <tr>
                    <td>
                        <a href="#" onclick="verNotas(${p.id})">
                            ${p.nombre}
                        </a>
                    </td>
                    <td>${p.tutor || "—"}</td>
                    <td>${p.telefono || "—"}</td>
                    <td class="actions">
                        <button onclick="editarPaciente(${p.id})">
                            <img src="imgs/edit.png">
                        </button>
                        <button onclick="verHistoria(${p.id})">
                            <img src="imgs/history1.png">
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    // ===============================
    // CARGAR PACIENTES
    // ===============================
    fetch(`${API_URL}/api/pacientes`)
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar pacientes");
            return res.json();
        })
        .then(data => {
            pacientes = data;
            mostrarTabla(pacientes);
        })
        .catch(err => {
            console.error("❌ Error al cargar pacientes:", err);
        });

    // ===============================
    // BUSCAR PACIENTES
    // ===============================
    function buscarEnBD(mostrarAlerta = false) {
        const texto = inputBuscar.value.trim();

        if (texto === "") {
            mostrarTabla(pacientes);
            return;
        }

        fetch(`${API_URL}/api/pacientes/buscar/${texto}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    if (mostrarAlerta) {
                        alert("No se encontró ningún paciente");
                    }
                    mostrarTabla([]);
                } else {
                    mostrarTabla(data);
                }
            })
            .catch(err => {
                console.error("❌ Error en búsqueda:", err);
                if (mostrarAlerta) {
                    alert("Error al buscar paciente");
                }
            });
    }

    const btnBuscar = document.querySelector(".search-btn");

    inputBuscar.addEventListener("input", () => buscarEnBD(false));
    btnBuscar.addEventListener("click", () => buscarEnBD(true));
});
