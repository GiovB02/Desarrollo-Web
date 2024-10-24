// Generamos un número aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3; // Máximo de intentos permitidos
let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt(`¿Qué número se ha generado (Intento ${intentos} de ${numeroIntentos})?`);

        // Verificamos si el número ingresado es igual al generado
        if (numero == numeroAleatorio) {
            mensaje = `¡Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio})! Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su número de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {
            if (numero < numeroAleatorio) {
                mensaje = `El número oculto es más alto que ${numero}. Quedan ${numeroIntentos - intentos} intentos.`;
            } else {
                mensaje = `El número oculto es más bajo que ${numero}. Quedan ${numeroIntentos - intentos} intentos.`;
            }
            intentos++;
        }
    } else {
        mensaje = `Su número de intentos ha terminado. El número oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
    }

    parrafo.innerHTML = mensaje;
}
