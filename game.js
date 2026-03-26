// creare una variabile e selezionare elementi dal DOM

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
console.log(ctx);

// creare una dimensione della griglia per lo snake

const cols = 30;
const rows = 30;
const cell = 30;
// Imposta le dimensioni reali del canvas
canvas.width = cols * cell;
canvas.height = rows * cell;

// creazione delle variabili del gioco

let snake;
let dir;
let nextDir;
let food;
let score;
let best;
let loop;
let running;


// inizializzazione del gioco 
//creando una corporatura 

function init() {
snake = [
    {x: 12, y: 10}, //testa
    {x: 11, y: 10}, //corpo 
    {x: 10, y:10} // coda
];
 // Direzione iniziale: verso destra
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };

  // Azzera il punteggio e carica il record
  score = 0;
  best = parseInt(localStorage.getItem('snakeBest') || '0');

  // Aggiorna i valori mostrati nell'header
  updateUI();

  // Piazza il primo cibo
  placeFood();

  // Avvia il game loop
  running = true;
  clearInterval(loop);
  loop = setInterval(tick, 150); // tick ogni 150ms

  // Aggiorna il messaggio
  document.getElementById('message').textContent = 'Usa le frecce o WASD';
  document.getElementById('btn-start').textContent = 'Restart';
}


