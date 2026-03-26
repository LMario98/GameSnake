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

