const pista = document.querySelector('.carrusel-pista');
const imagenes = document.querySelectorAll('.slide');
const btnAnterior = document.querySelector('.anterior');
const btnSiguiente = document.querySelector('.siguiente');
const descripcionElemento = document.getElementById('carrusel-descripcion');

let contador = 0;
const totalImagenes = imagenes.length;

// Lista de descripciones para cada imagen
const descripciones = [
    "Estructuras metálicas",
    "Puertas y rejas",
    "Herramientas",
    "Superficies expuestas a humedad constante"
];

// Función para mover el carrusel y cambiar descripción
function moverCarrusel() {
    if (contador >= totalImagenes) {
        contador = 0;
    } else if (contador < 0) {
        contador = totalImagenes - 1;
    }

    const desplazamiento = contador * -100;
    pista.style.transition = "transform 0.4s ease-out";
    pista.style.transform = `translateX(${desplazamiento}%)`;

    // Cambiar el texto de la descripción
    if (descripcionElemento) {
        descripcionElemento.style.opacity = '0';
        setTimeout(() => {
            descripcionElemento.textContent = descripciones[contador];
            descripcionElemento.style.opacity = '1';
        }, 200);
    }
}

// Eventos de botones
btnSiguiente.addEventListener('click', () => {
    contador++;
    moverCarrusel();
    resetearIntervalo();
});

btnAnterior.addEventListener('click', () => {
    contador--;
    moverCarrusel();
    resetearIntervalo();
});

// Movimiento Automático
let intervalo = setInterval(() => {
    contador++;
    moverCarrusel();
}, 4000);

function resetearIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        contador++;
        moverCarrusel();
    }, 4000);
}

/* SOPORTE TÁCTIL */
let inicioX = 0;
let diferenciaX = 0;
let moviendo = false;

pista.addEventListener('touchstart', (e) => {
    inicioX = e.touches[0].clientX;
    moviendo = true;
    clearInterval(intervalo);
    pista.style.transition = "none";
}, { passive: true });

pista.addEventListener('touchmove', (e) => {
    if (!moviendo) return;
    const actualX = e.touches[0].clientX;
    diferenciaX = actualX - inicioX;
    const desplazamientoBase = contador * -pista.offsetWidth;
    pista.style.transform = `translateX(${desplazamientoBase + diferenciaX}px)`;
}, { passive: true });

pista.addEventListener('touchend', () => {
    if (!moviendo) return;
    moviendo = false;
    if (Math.abs(diferenciaX) > 50) {
        if (diferenciaX > 0) contador--;
        else contador++;
    }
    moverCarrusel();
    resetearIntervalo();
    diferenciaX = 0;
});