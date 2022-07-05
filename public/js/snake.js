import { getInputdirection } from "./input.js";
import Score from './score.js';

export const SNAKE_SPEED = 5;
let newSegments = 0;
let score = sessionStorage.getItem('score');
score = Number(score);
const snakebody = [{ x: 10, y: 11 }];

export function update() {
  const Inputdirection = getInputdirection();
  addSegments();

  for (let i = snakebody.length - 2; i >= 0; i--) {
    snakebody[i + 1] = { ...snakebody[i] };
  }

  snakebody[0].x += Inputdirection.x;

  snakebody[0].y += Inputdirection.y;
}

export function snakeIntersection() {
  return onSnake(snakebody[0], { ignoreHead: true });
}

export function draw(gameBoard) {
  snakebody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakebody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
   
    return equalPositions(segment, position);
  });
}


function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}


export function getSnakeHead() {
  return snakebody[0];
}


function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    score= score+1;
    snakebody.push({ ...snakebody[snakebody.length - 1] });
  }
  Score(score);
  sessionStorage.setItem('score',score)
  newSegments = 0;
}