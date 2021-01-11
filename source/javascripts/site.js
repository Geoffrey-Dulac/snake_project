// This is where it all goes :)
let canvas;
let snakeboard_ctx;
let snakeboard;
let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];
let dx = 10;
let dy = 0;
const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

function drawSnakePart(snakePart) {
  snakeboard_ctx.fillStyle = snake_col;
  snakeboard_ctx.strokestyle = snake_border;
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart)
}

function clearCanvas() {
  snakeboard_ctx.fillStyle = board_background;
  snakeboard_ctx.strokestyle = board_border;
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function move_snake() {  
  const head = {x: snake[0].x + dx, y: snake[0].y};
  snake.unshift(head);
  snake.pop();
}

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("snakeboard");
    snakeboard = document.getElementById("snakeboard");
    snakeboard_ctx = snakeboard.getContext("2d");


    snake.forEach(drawSnakePart);
    
    function start() {
        setTimeout(function onTick() {
            clearCanvas();
            move_snake();
            drawSnake();
            // Call main again
            start();
        }, 100)
    }

    start();

    setInterval(function() {
        move_snake();
    },1000)
})