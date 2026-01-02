// ===============================
// CONFIG API (RENDER)
// ===============================
const API_URL = "https://consultorio-backend-5y6e.onrender.com";

// ===============================
// OBTENER PACIENTE ID
// ===============================
const pacienteId = localStorage.getItem("paciente_id");

if (!pacienteId) {
    alert("Paciente no seleccionado");
    location.href = "pacientes.html";
}

// ===============================
// REFERENCIAS A CAMPOS
// ===============================
const antecedentes_familiares   = document.getElementById("antecedentes_familiares");
const antecedentes_patologicos  = document.getElementById("antecedentes_patologicos");
const per          = document.getElementById("per");
const ago          = document.getElementById("ago");
const pa           = document.getElementById("pa");
const ef           = document.getElementById("ef");
const fc           = document.getElementById("fc");
const fr           = document.getElementById("fr");
const temperatura  = document.getElementById("temperatura");
const ta           = document.getElementById("ta");
const sat_o2       = document.getElementById("sat_o2");
const diagnostico  = document.getElementById("diagnostico");
const tratamiento  = document.getElementById("tratamiento");

// ===============================
// CARGAR HISTORIA CLÍNICA
// ===============================
fetch(`${API_URL}/api/historia/${pacienteId}`)
    .then(res => {
        if (!res.ok) return null;
        return res.json();
    })
    .then(historia => {
        if (!historia) return;

        antecedentes_familiares.value  = historia.antecedentes_familiares ?? "";
        antecedentes_patologicos.value = historia.antecedentes_patologicos ?? "";
        per.value         = historia.per ?? "";
        ago.value         = historia.ago ?? "";
        pa.value          = historia.pa ?? "";
        ef.value          = historia.ef ?? "";
        fc.value          = historia.fc ?? "";
        fr.value          = historia.fr ?? "";
        temperatura.value = historia.temperatura ?? "";
        ta.value          = historia.ta ?? "";
        sat_o2.value      = historia.sat_o2 ?? "";
        diagnostico.value = historia.diagnostico ?? "";
        tratamiento.value = historia.tratamiento ?? "";
    })
    .catch(err => {
        console.error("❌ Error cargar historia clínica:", err);
    });

// ===============================
// GUARDAR / ACTUALIZAR HISTORIA
// ===============================
document.getElementById("formHistoria").addEventListener("submit", e => {
    e.preventDefault();

    fetch(`${API_URL}/api/historia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            paciente_id: pacienteId,
            antecedentes_familiares: antecedentes_familiares.value,
            antecedentes_patologicos: antecedentes_patologicos.value,
            per: per.value,
            ago: ago.value,
            pa: pa.value,
            ef: ef.value,
            fc: fc.value || null,
            fr: fr.value || null,
            temperatura: temperatura.value || null,
            ta: ta.value,
            sat_o2: sat_o2.value || null,
            diagnostico: diagnostico.value,
            tratamiento: tratamiento.value
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al guardar historia clínica");
        alert("Historia clínica guardada correctamente");
        location.href = "pacientes.html";
    })
    .catch(err => {
        console.error("❌ Error guardar historia clínica:", err);
        alert("No se pudo guardar la historia clínica");
    });
});
