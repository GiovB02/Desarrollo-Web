// Cambiar el color de fondo
const primerColorFondo = (event) => {
    document.body.style.backgroundColor = event.target.value;
};
const cambiarColorFondo = (color) => {
    document.body.style.backgroundColor = color;
};

// Cambiar el color de los títulos
const primerColorTitulos = (event) => {
    const colorSeleccionado = event.target.value;
    const titulos = document.querySelectorAll("h1");
    titulos.forEach((titulo) => {
        titulo.style.color = colorSeleccionado;
    });
};
const cambiarColorTitulos = (colorSeleccionado) => {
    const titulos = document.querySelectorAll("h1");
    titulos.forEach((titulo) => {
        titulo.style.color = colorSeleccionado;
    });
};

// Cambiar el color de los párrafos
const primerColorParrafos = (event) => {
    const colorSeleccionado = event.target.value;
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach((parrafo) => {
        parrafo.style.color = colorSeleccionado;
    });
};
const cambiarColorParrafos = (colorSeleccionado) => {
    const parrafos = document.querySelectorAll("p");
    parrafos.forEach((parrafo) => {
        parrafo.style.color = colorSeleccionado;
    });
};

// Funciones para aumentar o disminuir el tamaño de letra
let contadorAumentar = 1;
const aumentarLetra = () => {
    contadorAumentar += 0.05;
    document.body.style.fontSize = `${contadorAumentar}em`;
    document.querySelectorAll("h1, p").forEach((element) => {
        element.style.fontSize = `${contadorAumentar}em`;
    });
};

let contadorDisminuir = 1;
const disminuirLetra = () => {
    contadorDisminuir -= 0.05;
    if (contadorDisminuir > 0) { // Evita que el tamaño sea cero o negativo
        document.body.style.fontSize = `${contadorDisminuir}em`;
        document.querySelectorAll("h1, p").forEach((element) => {
            element.style.fontSize = `${contadorDisminuir}em`;
        });
    }
};

// Inicializar eventos y elementos HTML
const startDOM = () => {
    // Fondo
    const buttonFondo = document.getElementById("idFondo");
    buttonFondo.addEventListener("input", primerColorFondo);
    buttonFondo.addEventListener("change", () => cambiarColorFondo(buttonFondo.value));

    // Títulos
    const buttonTitulos = document.getElementById("idTitulos");
    buttonTitulos.addEventListener("input", primerColorTitulos);
    buttonTitulos.addEventListener("change", () => cambiarColorTitulos(buttonTitulos.value));

    // Párrafos
    const buttonParrafos = document.getElementById("idParrafos");
    buttonParrafos.addEventListener("input", primerColorParrafos);
    buttonParrafos.addEventListener("change", () => cambiarColorParrafos(buttonParrafos.value));

    // Botones de tamaño de letra
    document.getElementById("idBtnAumentar").addEventListener("click", aumentarLetra);
    document.getElementById("idBtnDisminuir").addEventListener("click", disminuirLetra);
};

// Ejecuta la función de inicialización cuando la página carga
document.addEventListener("DOMContentLoaded", startDOM);
