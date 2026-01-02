document.addEventListener("DOMContentLoaded", () => {
    const inputBuscar = document.getElementById("buscarPaciente");
    const btnLupa = document.querySelector(".search-btn");

    btnLupa.addEventListener("click", () => {
        const texto = inputBuscar.value.trim();
        if(texto) {
            // Redirigir a pacientes.html con el query string
            window.location.href = `pacientes.html?buscar=${encodeURIComponent(texto)}`;
        } else {
            // Si no hay texto, ir a pacientes.html mostrando todos
            window.location.href = 'pacientes.html';
        }
    });

    // También permitir Enter en el input
    inputBuscar.addEventListener("keypress", (e) => {
        if(e.key === "Enter") btnLupa.click();
    });
});
