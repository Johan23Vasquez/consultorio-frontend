// ===============================
// CONFIG API (RENDER)
// ===============================
const API_URL = "https://consultorio-backend-5y6e.onrender.com";

// ===============================
// GUARDAR PACIENTE
// ===============================
document.getElementById("formPaciente").addEventListener("submit", async e => {
    e.preventDefault();

    const paciente = {
        nombre: document.getElementById("nombre").value,
        edad: document.getElementById("edad").value || null,
        sexo: document.getElementById("sexo").value,
        peso: document.getElementById("peso").value || null,
        altura: document.getElementById("altura").value || null,
        tutor: document.getElementById("tutor").value,
        telefono: document.getElementById("telefono").value,
        info: document.getElementById("info").value
    };

    try {
        const res = await fetch(`${API_URL}/api/pacientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paciente)
        });

        if (!res.ok) {
            throw new Error("Error al guardar paciente");
        }

        alert("Paciente guardado correctamente");
        window.location.href = "pacientes.html";

    } catch (error) {
        console.error("❌ Error guardar paciente:", error);
        alert("No se pudo guardar el paciente");
    }
});
