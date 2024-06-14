// Posisi awal ular
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let currentFruit = {}; // Variabel untuk menyimpan buah saat ini
let score = 0; // Variabel untuk menyimpan skor

let food = { x: 0, y: 0 }; // Inisialisasi posisi buah

// Ukuran kotak
const box = 10;

// Area permainan
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Buah-buahan dengan skor yang berbeda
const fruits = [
  { type: "apple", score: 10 },
  { type: "orange", score: 20 },
  { type: "banana", score: 30 },
  { type: "grape", score: 40 },
  { type: "watermelon", score: 50 },
];

// Penentuan arah default
let dx = box;
let dy = 0;

// Fungsi utama
function drawSnake() {
  // Menggambar setiap bagian ular
  snake.forEach(drawSnakePart);
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.fillRect(snakePart.x, snakePart.y, box, box);
  ctx.strokeStyle = "darkgreen";
  ctx.strokeRect(snakePart.x, snakePart.y, box, box);
}

function moveSnake() {
  // Menghapus ekor ular (pindah)
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function main() {
  if (isGameOver()) return;

  setTimeout(function onTick() {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    drawScore(); // Menampilkan skor
    // Memeriksa apakah ular memakan buah
    if (snake[0].x === food.x && snake[0].y === food.y) {
      snake.push({ ...snake[snake.length - 1] });
      generateFood();
      updateScore(); // Mengupdate skor
    }
    main();
  }, 100);
}

function updateScore() {
  score += currentFruit.score; // Menambah skor berdasarkan jenis buah yang dimakan
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function drawFood() {
  ctx.fillStyle = "red"; // Warna default
  switch (currentFruit.type) {
    case "apple":
      ctx.fillStyle = "red";
      break;
    case "orange":
      ctx.fillStyle = "orange";
      break;
    case "banana":
      ctx.fillStyle = "yellow";
      break;
    case "grape":
      ctx.fillStyle = "purple";
      break;
    case "watermelon":
      ctx.fillStyle = "green";
      break;
    default:
      ctx.fillStyle = "red";
      break;
  }
  ctx.fillRect(food.x, food.y, box, box);
}

function clearCanvas() {
  ctx.fillStyle = "lightgrey";
  ctx.strokeStyle = "darkgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
function isGameOver() {
  // Ular bertabrakan dengan dinding
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    return true;
  }

  // Ular bertabrakan dengan tubuhnya sendiri
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // Kondisi kemenangan jika skor mencapai nilai tertentu
  if (score >= 200) {
    alert("Selamat! Anda telah memenangkan permainan dengan skor " + score + "!");
    return true;
  }

  return false;
}

function generateFood() {
  // Memilih buah secara acak dari array fruits
  const randomIndex = Math.floor(Math.random() * fruits.length);
  currentFruit = fruits[randomIndex];

  // Menghasilkan posisi baru untuk buah
  food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
  food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}
generateFood(); // Pertama kali menghasilkan buah

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -box;
  const goingDown = dy === box;
  const goingRight = dx === box;
  const goingLeft = dx === -box;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -box;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -box;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = box;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = box;
  }
}

main();
