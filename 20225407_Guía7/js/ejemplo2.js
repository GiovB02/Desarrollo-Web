// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se está utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = formulario.elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Funciones de validación

// Validar que los campos no estén vacíos
function camposNoVacios(inputs) {
    return [...inputs].every(input => input.value.trim() !== "");
}

// Validar que la fecha de nacimiento no supere la fecha actual
function fechaValida(fecha) {
    const fechaNacimiento = new Date(fecha);
    return fechaNacimiento <= new Date();
}

// Expresión regular para validar el correo electrónico
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validar que las contraseñas coincidan
function validarContrasena(pass1, pass2) {
    return pass1 === pass2 && pass1.length >= 8;
}

// Verificar que al menos una opción esté seleccionada en un grupo de checkboxes
function opcionSeleccionada(opciones) {
    return [...opciones].some(opcion => opcion.checked);
}

// Validar que una opción esté seleccionada en un select
function seleccionValida(select) {
    return select.selectedIndex > 0;
}

// Recorrer el formulario y aplicar las validaciones
const recorrerFormulario = function () {
    const inputs = formulario.elements;
    let valid = true;
    let errores = [];

    // Validar que los campos no estén vacíos
    if (!camposNoVacios(inputs)) {
        valid = false;
        errores.push("Todos los campos deben estar llenos.");
    }

    // Validar fecha de nacimiento
    const fechaNacimiento = formulario.elements["fechaNacimiento"];
    if (fechaNacimiento && !fechaValida(fechaNacimiento.value)) {
        valid = false;
        errores.push("La fecha de nacimiento no debe ser mayor a la fecha actual.");
    }

    // Validar correo electrónico
    const email = formulario.elements["email"];
    if (email && !validarEmail(email.value)) {
        valid = false;
        errores.push("El correo electrónico no es válido.");
    }

    // Validar contraseñas
    const pass1 = formulario.elements["password"];
    const pass2 = formulario.elements["passwordRepeat"];
    if (pass1 && pass2 && !validarContrasena(pass1.value, pass2.value)) {
        valid = false;
        errores.push("Las contraseñas no coinciden o no cumplen con el mínimo de 8 caracteres.");
    }

    // Validar selección de intereses (checkboxes)
    const intereses = formulario.elements["intereses"];
    if (intereses && !opcionSeleccionada(intereses)) {
        valid = false;
        errores.push("Debe seleccionar al menos una opción en 'intereses'.");
    }

    // Validar selección de carrera
    const carrera = formulario.elements["carrera"];
    if (carrera && !seleccionValida(carrera)) {
        valid = false;
        errores.push("Debe seleccionar una carrera.");
    }

    // Validar selección de país
    const pais = formulario.elements["pais"];
    if (pais && !seleccionValida(pais)) {
        valid = false;
        errores.push("Debe seleccionar un país de origen.");
    }

    // Mostrar resultados
    if (valid) {
        mostrarResultados(inputs);
    } else {
        mostrarErrores(errores);
    }
};

// Función para mostrar los resultados en el modal
function mostrarResultados(inputs) {
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");

    for (const input of inputs) {
        if (input.type !== "submit") {
            const fila = document.createElement("tr");
            const celdaNombre = document.createElement("td");
            const celdaValor = document.createElement("td");

            celdaNombre.textContent = input.name;
            celdaValor.textContent = input.value;

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaValor);
            tabla.appendChild(fila);
        }
    }

    bodyModal.innerHTML = ""; // Limpia contenido previo
    bodyModal.appendChild(tabla);
    modal.show();
}

// Función para mostrar los errores en el modal
function mostrarErrores(errores) {
    const listaErrores = document.createElement("ul");
    listaErrores.setAttribute("class", "text-danger");

    errores.forEach(error => {
        const itemError = document.createElement("li");
        itemError.textContent = error;
        listaErrores.appendChild(itemError);
    });

    bodyModal.innerHTML = ""; // Limpia contenido previo
    bodyModal.appendChild(listaErrores);
    modal.show();
}

// Agregando evento al botón
button.onclick = () => {
    recorrerFormulario();
};
