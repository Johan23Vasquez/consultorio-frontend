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

const pacienteId = localStorage.getItem("paciente_id");

if (!pacienteId) {
    alert("No se seleccionó paciente");
    window.location.href = "pacientes.html";
}

/* =========================
   CARGAR NOTAS DESDE BD
========================= */
fetch(`/api/notas/paciente/${pacienteId}`)
    .then(res => res.json())
    .then(notas => {
        const tbody = document.getElementById("tablaNotas");
        tbody.innerHTML = "";

        if (!notas || notas.length === 0) {
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
                <tr onclick="verNota(${nota.id})">
                    <td>${index + 1}</td>
                    <td>${formatearFecha(nota.fecha)}</td>
                </tr>
            `;
        });
    })
    .catch(err => {
        console.error("Error al cargar notas:", err);
    });

/* =========================
   VER NOTA
========================= */
function verNota(idNota) {
    localStorage.setItem("nota_id", idNota);
    window.location.href = "nota_mostrar.html";
}
