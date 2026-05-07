const engranaje = document.getElementById('engranaje');
const pasoDiv = document.getElementById('paso');

let pasoActual = 1; 
const pasos = [
    "1. Recolección del aceite usado",
    "2. Filtrado y eliminación de impurezas",
    "3. Deshidratación del aceite",
    "4. Formulación del recubrimiento",
    "5. Envasado y etiquetado",
    "6. Distribución"
];

engranaje.addEventListener('click', () => {
    engranaje.classList.add('rotado');

    pasoActual = (pasoActual % pasos.length) + 1;
    pasoDiv.textContent = pasos[pasoActual - 1];

    setTimeout(() => {
        engranaje.classList.remove('rotado');
    }, 500);

});