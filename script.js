const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');
const startButton = document.querySelector('.btn.start');
const stopButton = document.querySelector('.btn.stop');
const scoreDisplay = document.getElementById('score');
const music = document.getElementById('music');
// const music = document.getElementById('music'); // à activer si besoin

let score = 0;
let gameRunning = false;

// Arrow class
class Arrow {
  constructor(x, speed, size = 50) {
    this.x = x;
    this.y = -size;
    this.speed = speed;
    this.size = size;
    this.color = 'cyan';
  }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
    update(canvasHeight) {
        this.y += this.speed;
        if (this.y > canvasHeight) {
            this.y = -this.size; // reset position
            this.x = Math.random() * (canvas.width - 50); // new random x position
        }
    }
}

// ----------------------
// Générer des flèches
// ----------------------

let arrows = [];

function spawnArrow(count = 5) {
    arrows = [];
    for (let i = 0; i < count; i++) {
        let x = Math.random() * (canvas.width - 50);
        let speed = 2 + Math.random() * 3; // vitesse entre 2 et 5
        arrows.push(new Arrow(x, speed));
    }
}

// Draw all arrows (used after resizing)
function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arrows.forEach(arrow => arrow.draw(ctx));
}


// ----------------------
// Boucle principale
// ----------------------
function updateGame() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    arrows.forEach(arrow => {
        arrow.update(canvas.height);
        arrow.draw(ctx);
    });

    requestAnimationFrame(updateGame);
}

// ----------------------
// Start / Stop
// ----------------------

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        spawnArrow();
        gameRunning = true;
        updateGame();
        music.play();
    }
});

stopButton.addEventListener('click', () => {
    gameRunning = false;
    arrows = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    music.pause();
})


// RESPONSIVE CANVAS
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


