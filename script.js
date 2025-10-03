const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('.btn.start');
const stopButton = document.querySelector('.btn.stop');
const scoreDisplay = document.getElementById('score');
const music = document.getElementById('music');

let arrow = [];
let score = 0;
let gameRunning = false;


function resizeCanvas() {
  const h1Height = document.querySelector("h1").offsetHeight;
  const btnHeight = document.querySelector("#btn-section").offsetHeight;
  const margin = 20; // marge de sécurité

  canvas.width = window.innerWidth * 0.7; // correspond au 70vw
  canvas.height = window.innerHeight - h1Height - btnHeight - margin;

  drawAll(); // redessiner après resize
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Exemple simple : rectangle responsive
function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "cyan";
  ctx.fillRect(canvas.width * 0.45, canvas.height * 0.4, 50, 50);
}


