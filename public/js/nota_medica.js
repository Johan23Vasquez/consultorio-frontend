// ===============================
// CONFIG API (RENDER)
// ===============================
const API_URL = "https://consultorio-backend-5y6e.onrender.com";

// ===============================
// OBTENER PACIENTE ID
// ===============================
const pacienteId = localStorage.getItem("paciente_id");

if (!pacienteId) {
    alert("No se seleccionó paciente");
    window.location.href = "pacientes.html";
}

// ===============================
// REFERENCIAS A INPUTS
// ===============================
const form = document.getElementById("formNota");

const fecha = document.getElementById("fecha");
const edad  = document.getElementById("edad");

const rc   = document.getElementById("rc");
const rr   = document.getElementById("rr");
const temp = document.getElementById("temp");
const ta   = document.getElementById("ta");
const sat  = document.getElementById("sat");

const vacunas       = document.getElementById("vacunas");
const alimentacion  = document.getElementById("alimentacion");
const edi           = document.getElementById("edi");
const padecimiento  = document.getElementById("padecimiento");
const diagnostico   = document.getElementById("diagnostico");
const tratamiento   = document.getElementById("tratamiento");

// ===============================
// GUARDAR NOTA MÉDICA
// ===============================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nota = {
        paciente_id: pacienteId,
        fecha: fecha.value,
        edad: edad.value || null,

        rc: rc.value || null,
        rr: rr.value || null,
        temperatura: temp.value || null,
        ta: ta.value || null,
        sat_o2: sat.value || null,

        vacunas: vacunas.value || null,
        alimentacion: alimentacion.value || null,
        edi: edi.value || null,

        padecimiento: padecimiento.value,
        diagnostico: diagnostico.value,
        tratamiento: tratamiento.value
    };

    try {
        const res = await fetch(`${API_URL}/api/notas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nota)
        });

        if (!res.ok) {
            throw new Error("Error en el servidor");
        }

        alert("Nota médica guardada correctamente");
        window.location.href = "notas_paciente.html";

    } catch (err) {
        console.error("❌ Error guardar nota médica:", err);
        alert("No se pudo guardar la nota médica");
    }
});
