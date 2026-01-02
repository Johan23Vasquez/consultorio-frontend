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
// REFERENCIAS A INPUTS
// ===============================
const nombre   = document.getElementById("nombre");
const edad     = document.getElementById("edad");
const sexo     = document.getElementById("sexo");
const peso     = document.getElementById("peso");
const altura   = document.getElementById("altura");
const tutor    = document.getElementById("tutor");
const telefono = document.getElementById("telefono");
const info     = document.getElementById("info");

const formPaciente = document.getElementById("formPaciente");

// ===============================
// CARGAR PACIENTE DESDE BACKEND
// ===============================
fetch(`${API_URL}/api/pacientes/${pacienteId}`)
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar el paciente");
    return res.json();
  })
  .then(paciente => {
    nombre.value   = paciente.nombre ?? "";
    edad.value     = paciente.edad ?? "";
    sexo.value     = paciente.sexo ?? "";
    peso.value     = paciente.peso ?? "";
    altura.value   = paciente.altura ?? "";
    tutor.value    = paciente.tutor ?? "";
    telefono.value = paciente.telefono ?? "";
    info.value     = paciente.info ?? "";
  })
  .catch(err => {
    console.error("❌ Error cargar paciente:", err);
    alert("Error al cargar datos del paciente");
  });

// ===============================
// ACTIVAR EDICIÓN
// ===============================
function activarEdicion() {
  // ⚠️ NO usar disabled para submit
  document.querySelectorAll("input, textarea, select").forEach(campo => {
    campo.readOnly = false;
    campo.disabled = false;
  });
}

// ===============================
// GUARDAR CAMBIOS (UPDATE)
// ===============================
formPaciente.addEventListener("submit", async e => {
  e.preventDefault();

  const paciente = {
    nombre: nombre.value,
    edad: edad.value || null,
    sexo: sexo.value,
    peso: peso.value || null,
    altura: altura.value || null,
    tutor: tutor.value,
    telefono: telefono.value,
    info: info.value
  };

  try {
    const res = await fetch(
      `${API_URL}/api/pacientes/${pacienteId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente)
      }
    );

    if (!res.ok) throw new Error("Error al actualizar");

    alert("Paciente actualizado correctamente");
    window.location.href = "pacientes.html";

  } catch (error) {
    console.error("❌ Error actualizar paciente:", error);
    alert("No se pudo actualizar el paciente");
  }
});
