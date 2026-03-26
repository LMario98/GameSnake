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
    {x: 10, y:10},// coda
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



//  Piazza il cibo in una posizione casuale 
function placeFood() {

  // Variabile temporanea per la posizione
  let pos;

  // Continua a cercare finché non trova una cella libera
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));

  // Assegna la posizione trovata al cibo
  food = pos;
}

//  Aggiorna i valori nell'header 
function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('best').textContent = best;
}


// --- Tick: il cuore del gioco, chiamato ogni 150ms ---
function tick() {

  // Aggiorna la direzione corrente
  dir = nextDir;

  // Calcola la nuova posizione della testa
  const newHead = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y,
  };

  // Controlla se la testa esce dai bordi
  const fuoriDalBordo =
    newHead.x < 0 ||
    newHead.x >= cols ||
    newHead.y < 0 ||
    newHead.y >= rows;

  // Controlla se la testa colpisce il corpo
  const colpisceCorpo = snake.some(seg => seg.x === newHead.x && seg.y === newHead.y);

  // Se c'è una collisione, game over
  if (fuoriDalBordo || colpisceCorpo) {
    gameOver();
    return;
  }

  // Aggiunge la nuova testa all'inizio dell'array
  snake.unshift(newHead);

  // Controlla se il serpente mangia il cibo
  if (newHead.x === food.x && newHead.y === food.y) {
    score++;
    if (score > best) {
      best = score;
      localStorage.setItem('snakeBest', best);
    }
    updateUI();
    placeFood();
  } else {
    // Rimuove la coda solo se non ha mangiato
    snake.pop();
  }

  // Ridisegna tutto
  draw();
}

// Collega il bottone Start alla funzione init 
document.getElementById('btn-start').addEventListener('click', init);


// Disegna tutto sul canvas 
function draw() {

  // Pulisce il canvas con il colore di sfondo
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Disegna la griglia
  ctx.strokeStyle = '#161b22';
  ctx.lineWidth = 0.5;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      ctx.strokeRect(x * cell, y * cell, cell, cell);
    }
  }

  // Disegna il serpente
  snake.forEach((seg, i) => {
    if (i === 0) {
      ctx.fillStyle = '#4ade80'; // testa verde chiaro
    } else {
      ctx.fillStyle = '#16a34a'; // corpo verde scuro
    }
    ctx.fillRect(seg.x * cell + 1, seg.y * cell + 1, cell - 2, cell - 2);
  });

  // Disegna il cibo
  ctx.fillStyle = '#f87171';
  ctx.beginPath();
  ctx.arc(
    food.x * cell + cell / 2,
    food.y * cell + cell / 2,
    cell / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

// Game Over 
function gameOver() {
  clearInterval(loop);
  running = false;
  document.getElementById('message').textContent = `Game over! Punteggio: ${score}`;
  document.getElementById('btn-start').textContent = 'Gioca ancora';
}

//  Ascolta i tasti premuti dalla tastiera 
document.addEventListener('keydown', function(e) {

  // Freccia su o W — vai su
  if (e.key === 'ArrowUp' || e.key === 'w') {
    // Impedisce di andare nella direzione opposta
    if (dir.y !== 1) {
      nextDir = { x: 0, y: -1 };
    }
  }

  // Freccia giù o S — vai giù
  if (e.key === 'ArrowDown' || e.key === 's') {
    if (dir.y !== -1) {
      nextDir = { x: 0, y: 1 };
    }
  }

  // Freccia sinistra o A — vai a sinistra
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    if (dir.x !== 1) {
      nextDir = { x: -1, y: 0 };
    }
  }

  // Freccia destra o D — vai a destra
  if (e.key === 'ArrowRight' || e.key === 'd') {
    if (dir.x !== -1) {
      nextDir = { x: 1, y: 0 };
    }
  }

});
