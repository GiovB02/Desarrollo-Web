// Accedemos al contenedor donde se mostrará los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

// Accedemos a cada botón por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

// Agregamos el evento click a los botones, adicionalmente
// Se le asigna la función que realizará la operación
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    // Utilizamos un arreglo para guardar la información del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector("#inputNumeroEstudiantes").value;
    let contador = 1;

    // Utilizamos un while para recorrer el total de estudiantes
    let estudiante,
        calificacion,
        convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${contador}`);
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        // Asignamos los valores al arreglo
        arrayEstudiante[contador - 1] = new Array(
            estudiante,
            parseFloat(calificacion).toFixed(2)
        );
        contador++;
    }

    // Recorriendo el arreglo con for..of
    // Verificamos cuál es el promedio de las calificaciones
    // y cuál de los estudiantes posee la calificación más alta
    let calificacionAlta = 0,
        promedio = 0,
        posicion = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = indice[1];

        // Imprimiendo listado de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // Verificación de calificación más alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = indice;
        }

        // Calculando el promedio
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);

    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${posicion[0]} - <b>Calificación:</b> ${posicion[1]}</p>`;

    // Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}
