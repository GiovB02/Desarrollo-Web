// Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];

// Función para limpiar el formulario
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombre.focus();
};

// Funciones de validación con expresiones regulares
const validarCarnet = (carnet) => /^[A-Z]{1}[0-9]{3}$/.test(carnet);
const validarNombre = (nombre) => /^[a-zA-Z\s]+$/.test(nombre);
const validarDUI = (dui) => /^\d{8}-\d$/.test(dui);
const validarNIT = (nit) => /^\d{4}-\d{6}-\d{3}-\d$/.test(nit);
const validarFechaNacimiento = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);
const validarCorreo = (correo) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo);
const validarEdad = (edad) => /^\d+$/.test(edad);

// Validación completa del formulario
const validarFormulario = () => {
    let carnet = document.getElementById("idTxtCarnet").value;
    let nombre = inputNombre.value;
    let dui = document.getElementById("idTxtDUI").value;
    let nit = document.getElementById("idTxtNIT").value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let correo = document.getElementById("idTxtCorreo").value;
    let edad = document.getElementById("idTxtEdad").value;

    if (!validarCarnet(carnet)) {
        alert("Carnet inválido. Debe ser una letra seguida de tres números (Ejemplo: A001).");
        return false;
    }
    if (!validarNombre(nombre)) {
        alert("Nombre inválido. Solo debe contener letras y espacios.");
        return false;
    }
    if (!validarDUI(dui)) {
        alert("DUI inválido. Debe seguir el formato ########-#.");
        return false;
    }
    if (!validarNIT(nit)) {
        alert("NIT inválido. Debe seguir el formato ####-######-###-#.");
        return false;
    }
    if (!validarFechaNacimiento(fechaNacimiento)) {
        alert("Fecha de nacimiento inválida. Debe seguir el formato AAAA-MM-DD.");
        return false;
    }
    if (!validarCorreo(correo)) {
        alert("Correo electrónico inválido.");
        return false;
    }
    if (!validarEdad(edad)) {
        alert("Edad inválida. Solo debe contener números.");
        return false;
    }
    return true;
};

// Función para agregar un paciente con validación
const addPaciente = () => {
    if (validarFormulario()) {
        let nombre = inputNombre.value;
        let apellido = inputApellido.value;
        let fechaNacimiento = inputFechaNacimiento.value;
        let sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
        let pais = cmbPais.value;
        let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
        let direccion = inputDireccion.value;

        arrayPaciente.push([nombre, apellido, fechaNacimiento, sexo, labelPais, direccion]);
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();
        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Función para editar un paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    paciente[3] === "Hombre" ? inputRdMasculino.checked = true : inputRdFemenino.checked = true;
    cmbPais.value = [...cmbPais.options].find(option => option.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    // Remover el paciente actual para que se pueda actualizar
    arrayPaciente.splice(index, 1);
    imprimirPacientes();
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1); // Eliminar el paciente del arreglo
    imprimirPacientes(); // Actualizar la tabla de pacientes
};

// Función que imprime la ficha de los pacientes registrados
const imprimirFilas = () => {
    let fila = "";
    let contador = 1;
    arrayPaciente.forEach((element, index) => {
        fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${contador}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>`;
        contador++;
    });
    return fila;
};

const imprimirPacientes = () => {
    let tabla = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center" style="width:5%">#</th>
                                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                                <th scope="col" class="text-center" style="width:10%">País</th>
                                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                                <th scope="col" class="text-center" style="width:10%">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>${imprimirFilas()}</tbody>
                    </table>
                </div>`;
    document.getElementById("idTablaPacientes").innerHTML = tabla;
};

// Contador global de los option correspondiente al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;
    if (paisNew) {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;
        cmbPais.appendChild(option);
        mensaje.innerHTML = "País agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Agregar eventos a los botones
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

// Enfocar campo al abrir modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al cargar la página HTML
limpiarForm();
