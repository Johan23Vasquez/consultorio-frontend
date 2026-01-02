// ===============================
// CONFIG API (RENDER)
// ===============================
const API_URL = "https://consultorio-backend-5y6e.onrender.com";

// ===============================
// UTILIDAD: FORMATEAR FECHA
// ===============================
function formatearFecha(fechaISO) {
  if (!fechaISO) return "--";

  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// ===============================
// OBTENER PACIENTE ID
// ===============================
const pacienteId = localStorage.getItem("paciente_id");

if (!pacienteId) {
    alert("No se seleccionó paciente");
    window.location.href = "pacientes.html";
}

/* =========================
   CARGAR NOTAS DESDE BACKEND
========================= */
fetch(`${API_URL}/api/notas/paciente/${pacienteId}`)
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al cargar notas médicas");
        }
        return res.json();
    })
    .then(notas => {
        const tbody = document.getElementById("tablaNotas");
        tbody.innerHTML = "";

        if (!Array.isArray(notas) || notas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align:center">
                        No hay notas médicas registradas
                    </td>
                </tr>
            `;
            return;
        }

        notas.forEach((nota, index) => {
            tbody.innerHTML += `
                <tr onclick="verNota(${nota.id})" style="cursor:pointer">
                    <td>${index + 1}</td>
                    <td>${formatearFecha(nota.fecha)}</td>
                </tr>
            `;
        });
    })
    .catch(err => {
        console.error("❌ Error al cargar notas:", err);
        alert("No se pudieron cargar las notas médicas");
    });

/* =========================
   VER NOTA
========================= */
function verNota(idNota) {
    localStorage.setItem("nota_id", idNota);
    window.location.href = "nota_mostrar.html";
}
