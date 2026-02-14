console.log("nota_mostrar.js CARGADO");

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
// OBTENER PACIENTE ID (LOCALSTORAGE)
// ===============================
const pacienteId = localStorage.getItem("paciente_id");
console.log("🟡 paciente_id:", pacienteId);

if (!pacienteId) {
  alert("No se seleccionó paciente");
  location.href = "pacientes.html";
}

// ===============================
// OBTENER NOTA ID (URL PARAM)
// ===============================
const params = new URLSearchParams(window.location.search);
const notaId = params.get("nota_id");

console.log("🟡 nota_id URL:", notaId);

if (!notaId) {
  alert("No se seleccionó nota");
  location.href = "pacientes.html";
}

// ===============================
// VARIABLES GLOBALES
// ===============================
window._notaActual = null;
window._pacienteNombre = "Paciente";

// ===============================
// CARGAR PACIENTE (NOMBRE REAL)
// ===============================
fetch(`${API_URL}/api/pacientes/${pacienteId}`)
  .then(res => {
    if (!res.ok) throw new Error("Paciente no encontrado");
    return res.json();
  })
  .then(paciente => {
    window._pacienteNombre =
      paciente.nombre + (paciente.apellidos ? " " + paciente.apellidos : "");

    document.getElementById("paciente_nombre").innerText =
      window._pacienteNombre;

    console.log("🟢 PACIENTE CARGADO:", window._pacienteNombre);
  })
  .catch(err => {
    console.error("🔴 Error cargar paciente:", err);
    document.getElementById("paciente_nombre").innerText = "Paciente";
  });

// ===============================
// CARGAR NOTA POR ID (CORREGIDO)
// ===============================
fetch(`${API_URL}/api/notas/id/${notaId}`)
  .then(res => {
    console.log("🟡 STATUS FETCH:", res.status);
    if (!res.ok) throw new Error("Nota no encontrada");
    return res.json();
  })
  .then(nota => {

    console.log("🟢 NOTA RECIBIDA:", nota);

    if (!nota) {
      alert("No existe la nota médica");
      location.href = "pacientes.html";
      return;
    }

    window._notaActual = nota;

    console.log("🟢 NOTA SELECCIONADA:", nota);

    // ===============================
    // PINTAR EN PANTALLA
    // ===============================
    document.getElementById("fecha").innerText =
      formatearFecha(nota.fecha);

    document.getElementById("edad").innerText =
      (nota.edad ?? "--") + " años";

    document.getElementById("peso").innerText =
      nota.peso ? nota.peso + " kg" : "--";

    document.getElementById("exploracion_fisica").innerText =
      nota.exploracion_fisica ?? "--";

    document.getElementById("rc").innerText =
      (nota.rc ?? "--") + " lpm";

    document.getElementById("rr").innerText =
      (nota.rr ?? "--") + " rpm";

    document.getElementById("temp").innerText =
      (nota.temperatura ?? "--") + " °C";

    document.getElementById("ta").innerText =
      nota.ta ?? "--";

    document.getElementById("sat").innerText =
      (nota.sat_o2 ?? "--") + " %";

    document.getElementById("padecimiento").innerText =
      nota.padecimiento ?? "--";

    document.getElementById("diagnostico").innerText =
      nota.diagnostico ?? "--";

    document.getElementById("tratamiento").innerText =
      nota.tratamiento ?? "--";
  })
  .catch(err => {
    console.error("🔴 ERROR FETCH NOTA:", err);
    alert("No se pudo cargar la nota médica");
    location.href = "pacientes.html";
  });

// ===============================
// MODAL RECETA
// ===============================
function abrirModalReceta() {
  if (!window._notaActual) {
    alert("No hay nota cargada");
    return;
  }

  document.getElementById("modalReceta").style.display = "flex";

  const nota = window._notaActual;

  document.getElementById("r_temp").value = nota.temperatura ?? "";
  document.getElementById("r_fc").value   = nota.rc ?? "";
  document.getElementById("r_fr").value   = nota.rr ?? "";
}

// ===============================
// GENERAR RECETA
// ===============================
function generarReceta() {
  if (!window._notaActual) {
    alert("No hay nota cargada");
    return;
  }

  const nota = window._notaActual;

  const receta = {
    nombre: window._pacienteNombre,
    fecha: formatearFecha(nota.fecha),
    edad: (nota.edad ?? "--") + " años",
    peso: document.getElementById("r_peso").value || "--",
    talla: document.getElementById("r_talla").value || "--",
    temp: document.getElementById("r_temp").value || "--",
    fc: document.getElementById("r_fc").value || "--",
    fr: document.getElementById("r_fr").value || "--",
    tratamiento: nota.tratamiento || "No especificado"
  };

  console.log("🟢 RECETA GENERADA:", receta);

  localStorage.setItem("receta_print", JSON.stringify(receta));
  window.open("receta.html", "_blank");
}

// ===============================
// CERRAR MODAL RECETA
// ===============================
function cerrarModal() {
  const modal = document.getElementById("modalReceta");
  if (modal) {
    modal.style.display = "none";
  }
}
