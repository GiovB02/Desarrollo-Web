// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// FUNCIONES PARA VALIDAR QUE NO SE REPITAN LOS ID DE LOS CONTROLES
function idUnico(id) {
    return !document.getElementById(id);
}

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    // Validando que se haya seleccionado un elemento
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};

const newSelect = function () {
    let id = `id${nombreElemento.value}`;
    if (!idUnico(id)) {
        alert("Este ID ya existe. No se permiten controles con el mismo ID.");
        return;
    }

    // Creando elementos
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("class", "form-select");

    // Creando option para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo Formulario
    newForm.appendChild(labelId);
    // Creando el Div que será hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let id = `id${nombreElemento.value}`;
    if (!idUnico(id)) {
        alert("Este ID ya existe. No se permiten controles con el mismo ID.");
        return;
    }

    // Creando elementos
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo Formulario
    newForm.appendChild(labelId);
    // Creando el Div que será hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let id = `id${nombreElemento.value}`;
    if (!idUnico(id)) {
        alert("Este ID ya existe. No se permiten controles con el mismo ID.");
        return;
    }

    // Creando elementos de tipo = text, number, date y password
    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", id);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", id);
    labelElemento.textContent = tituloElemento.value;

    // Creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // Insertando el icono al principio del label
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control: ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo Formulario
    newForm.appendChild(labelId);
    // Creando el Div que será hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};
