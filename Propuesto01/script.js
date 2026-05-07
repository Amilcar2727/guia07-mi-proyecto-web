document.addEventListener("DOMContentLoaded", () => {
    // Dropdown Logic
    const socialBtn = document.getElementById("socialBtn");
    const socialDropdown = document.getElementById("socialDropdown");

    socialBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const expanded = socialBtn.getAttribute("aria-expanded") === "true";
        socialBtn.setAttribute("aria-expanded", !expanded);
        socialDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
        if (!socialDropdown.contains(e.target) && e.target !== socialBtn) {
            socialDropdown.classList.remove("show");
            socialBtn.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            socialDropdown.classList.remove("show");
            socialBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Stepper Logic
    const btnMinus = document.getElementById("btnMinus");
    const btnPlus = document.getElementById("btnPlus");
    const personasInput = document.getElementById("personas");

    btnMinus.addEventListener("click", () => {
        let val = parseInt(personasInput.value) || 1;
        if (val > 1) personasInput.value = val - 1;
    });

    btnPlus.addEventListener("click", () => {
        let val = parseInt(personasInput.value) || 1;
        if (val < 12) personasInput.value = val + 1;
    });

    // Date Input - Set Min to Today
    const fechaInput = document.getElementById("fecha");
    const today = new Date();
    const tzOffset = today.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = (new Date(today - tzOffset)).toISOString().split('T')[0];
    fechaInput.setAttribute("min", localISOTime);

    // Form Validation Logic
    const form = document.getElementById("reservationForm");
    
    const showError = (fieldId, message) => {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`error-${fieldId}`);
        input.classList.add("is-invalid");
        errorSpan.textContent = message;
    };

    const clearErrors = () => {
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(input => input.classList.remove("is-invalid"));
        const errors = form.querySelectorAll(".error");
        errors.forEach(error => error.textContent = "");
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        
        // Validation data
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        const personas = parseInt(document.getElementById("personas").value, 10);
        const comentarios = document.getElementById("comentarios").value.trim();

        // Validate Nombre
        if (!nombre) {
            showError("nombre", "El nombre es requerido.");
            isValid = false;
        } else if (nombre.length < 2 || nombre.length > 80) {
            showError("nombre", "El nombre debe tener entre 2 y 80 caracteres.");
            isValid = false;
        }

        // Validate Correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo) {
            showError("correo", "El correo es requerido.");
            isValid = false;
        } else if (!emailRegex.test(correo) || correo.length > 255) {
            showError("correo", "Ingrese un correo válido.");
            isValid = false;
        }

        // Validate Fecha
        if (!fecha) {
            showError("fecha", "La fecha es requerida.");
            isValid = false;
        } else if (fecha < localISOTime) {
            showError("fecha", "La fecha no puede ser en el pasado.");
            isValid = false;
        }

        // Validate Hora (12:00 to 22:30)
        if (!hora) {
            showError("hora", "La hora es requerida.");
            isValid = false;
        } else {
            const timeParts = hora.split(":");
            const hours = parseInt(timeParts[0], 10);
            const mins = parseInt(timeParts[1], 10);
            const totalMins = hours * 60 + mins;
            const minTime = 12 * 60; // 12:00
            const maxTime = 22 * 60 + 30; // 22:30

            if (totalMins < minTime || totalMins > maxTime) {
                showError("hora", "El horario es de 12:00 a 22:30.");
                isValid = false;
            }
        }

        // Validate Personas
        if (isNaN(personas) || personas < 1 || personas > 12) {
            showError("personas", "Mínimo 1 y máximo 12 personas.");
            isValid = false;
        }

        // Validate Comentarios
        if (comentarios.length > 500) {
            showError("comentarios", "Máximo 500 caracteres.");
            isValid = false;
        }

        if (isValid) {
            // Show Success
            document.getElementById("formSection").classList.add("hidden");
            const successSection = document.getElementById("successSection");
            successSection.classList.remove("hidden");
            
            // Format summary
            const [year, month, day] = fecha.split("-");
            const formattedDate = `${day}/${month}/${year}`;
            
            const summaryDetails = document.getElementById("summaryDetails");
            summaryDetails.innerHTML = `
                <strong>Nombre:</strong> ${nombre}<br>
                <strong>Fecha:</strong> ${formattedDate}<br>
                <strong>Hora:</strong> ${hora}<br>
                <strong>Personas:</strong> ${personas}<br>
                ${comentarios ? `<strong>Comentarios:</strong> ${comentarios}` : ''}
            `;
        }
    });

    // Reset Form
    document.getElementById("btnReset").addEventListener("click", () => {
        form.reset();
        document.getElementById("personas").value = 2; // Reset stepper to default
        clearErrors();
        document.getElementById("successSection").classList.add("hidden");
        document.getElementById("formSection").classList.remove("hidden");
    });
});