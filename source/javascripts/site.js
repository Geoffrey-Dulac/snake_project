let canvas;
let snakeboard_ctx;
let snakeboard;
let snake = [{x: 40, y: 50}, {x: 30, y: 50}, {x: 20, y: 50}, {x: 10, y: 50}, {x: 0, y: 50}];
let apple = {x: 50, y: 300};
let interval = 200;
let setIntervale;
let direction = "r";
const snake_col = '#7dd40d';
const snake_border = '#599705';
const apple_color = '#f91100';
let startButton;
let scoreNumber = 0;
let score;
let bonus = {x: "", y: ""};

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function generateNewApple() {
  let randomX = Math.floor(Math.random() * Math.floor(390));
  let randomY = Math.floor(Math.random() * Math.floor(390));
  randomX -= parseInt(randomX.toString().split('').pop());
  randomY -= parseInt(randomY.toString().split('').pop());
  apple = {x: randomX, y: randomY};
}

function drawApple() {
  snakeboard_ctx.fillStyle = apple_color;
  snakeboard_ctx.fillRect(apple.x, apple.y, 10, 10);
}

function enlargeSnake() {
  if (direction === "r") {
    snake.push({x: (snake[snake.length - 1].x - 10) ,y: (snake[snake.length - 1].y)});
  } else if (direction === "b") {
    snake.push({x: (snake[snake.length - 1].x) ,y: (snake[snake.length - 1].y - 10)});
  } else if (direction === "l") {
    snake.push({x: (snake[snake.length - 1].x + 10) ,y: (snake[snake.length - 1].y)});
  } else if (direction === "u") {
    snake.push({x: (snake[snake.length - 1].x) ,y: (snake[snake.length - 1].y + 10)});
  }
}

function generateAlert() {
  if(!alert('LLOOOOSSSEEERRRR !')){window.location.reload();};
}

function moveSnake() {
  snakeboard_ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.pop();
  if (direction === "r") {
    snake.splice(0, 0, {x: (snake[0].x + 10) ,y: (snake[0].y)});
  } else if (direction === "b") {
    snake.splice(0, 0, {x: (snake[0].x) ,y: (snake[0].y + 10)});
  } else if (direction === "l") {
    snake.splice(0, 0, {x: (snake[0].x - 10) ,y: (snake[0].y)});
  } else if (direction === "u") {
    snake.splice(0, 0, {x: (snake[0].x) ,y: (snake[0].y - 10)});
  }
  Object.values(snake[0]).forEach(element => {
    if (element >= 400 || element < 0) {
      generateAlert();
    }
  })
  drawSnake();
  drawApple();
  if (bonus.x !== "") {
    drawBonus();
  }
}

function appleEated() {
  return snake[0].x == apple.x && snake[0].y == apple.y
}

function bonusEated() {
  return snake[0].x == bonus.x && snake[0].y == bonus.y
}

function accelerateSnake() {
  interval -= 4;
  clearInterval(setIntervale);
  setIntervale = setInterval(mainFunction, interval);
}

function handleButtonPressed(event) {
  if (event.key === "ArrowRight") {
    direction = "r";
  } else if (event.key === "ArrowDown") {
    direction = "b";
  } else if (event.key === "ArrowLeft") {
    direction = "l";
  } else if (event.key === "ArrowUp") {
    direction = "u";
  }
}

function eatHimself() {
  let snakeHead = [...snake][0];
  let snakeBody = [...snake];
  snakeBody.splice(0, 1);
  let repetition = 0;
  snakeBody.forEach(element => {
    if ((snakeHead.x === element.x) && (snakeHead.y === element.y)) {
      repetition++;
    }
  })
  if (repetition > 0) {
    return true;
  }
}

function scorePlusTwenty() {
  scoreNumber += 20;
  updateScreenScore();
}

function scorePlusThirtyFive() {
  scoreNumber += 35;
  updateScreenScore();
}

function mainFunction() {
  moveSnake();
  if (appleEated()) {
    enlargeSnake();
    enlargeSnake();
    generateNewApple();
    accelerateSnake();
    scorePlusTwenty();
  }
  if (bonusEated()) {
    scorePlusThirtyFive();
    bonus = {x: "", y: ""};
    window.requestAnimationFrame;
  }
  if (eatHimself()) {
    generateAlert();
  }
}

function updateScreenScore() {
  score.innerText = scoreNumber;
}

function bonusAppear() {
  let randomX = Math.floor(Math.random() * Math.floor(390));
  let randomY = Math.floor(Math.random() * Math.floor(390));
  randomX -= parseInt(randomX.toString().split('').pop());
  randomY -= parseInt(randomY.toString().split('').pop());
  bonus = {x: randomX, y: randomY};
  setTimeout(function() {
    bonus = {x: "", y: ""};
  }, 7000)
}

function drawBonus() {
  snakeboard_ctx.fillStyle = "#FFD700";
  snakeboard_ctx.fillRect(bonus.x, bonus.y, 10, 10);
}

document.addEventListener("DOMContentLoaded", function () {
    snakeboard = document.getElementById("snakeboard");
    snakeboard_ctx = snakeboard.getContext("2d");
    canvas = document.querySelector("#snakeboard");
    startButton = document.getElementById("start-btn");
    score = document.getElementById("score");

    function start() {
      document.querySelector(".scoreZone").classList.add("text-white");
      drawSnake();
      drawApple();
      startButton.disabled = true;
      setIntervale = setInterval(mainFunction, interval);
      setInterval(() => {
        bonusAppear();
      }, 20000);
    }

    updateScreenScore();
    document.addEventListener('keydown', handleButtonPressed);
    startButton.addEventListener("click", start);
})