// Accedemos al contenedor donde se muestra la tabla de multiplicar
const containerResultado = document.querySelector("#containerResultado");

// Accedemos al botón por medio de la API DOM
const btnCalcular = document.querySelector("#btnCalcular");

// Agregamos el evento click al botón calcular
// Se le asigna la función que realizará la operación
btnCalcular.addEventListener("click", calcularTabla);

function calcularTabla() {
    // Capturando el valor del campo
    const inputTabla = document.querySelector("#inputTabla").value;

    // Inicializamos nuestro contador
    let contador = 1;
    let table = "";

    // Verificamos que el dato colocado sea un número entero positivo
    if (inputTabla > 0) {
        table += `<h2>Tabla de multiplicar del ${inputTabla}</h2>`;
        
        // Utilizamos un bucle do while para generar la tabla de multiplicar
        // que el usuario ha indicado
        do {
            let resultado = contador * inputTabla;
            table += `<div class="row text-center">`;
            table += `<div class="col-md-1 column"><h3>${contador}</h3></div>`;
            table += `<div class="col-md-1 column"><h3>x</h3></div>`;
            table += `<div class="col-md-1 column"><h3>${inputTabla}</h3></div>`;
            table += `<div class="col-md-1 column"><h3>=</h3></div>`;
            table += `<div class="col-md-1 column"><h3>${resultado}</h3></div>`;
            table += `</div>`;

            // Incrementamos el valor del contador para que podamos salir del do while
            contador++;
        } while (contador <= 12);

        document.querySelector("#inputTabla").value = 1;
        document.querySelector("#inputTabla").focus();
        containerResultado.innerHTML = table;
    } else {
        alert("No se ha ingresado un número válido");
    }
}
