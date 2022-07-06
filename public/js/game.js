import{ update as updateSnake , draw as drawSnake,SNAKE_SPEED,getSnakeHead,snakeIntersection}  from "./snake.js";
import{ update as updateFood , draw as drawFood}  from "./food.js";
import { OutsideGrid } from './grid.js';

let lastRenderTime = 0 ;
let gameOver = false ;
sessionStorage.setItem('score',0);
const gameboard = document.getElementById('game-board');
function main(currentTime){
  const secondSinceLastRender =(currentTime - lastRenderTime)/1000;
  if(gameOver){
    if(confirm("You lossed press Ok to restart")){
      let score = sessionStorage.getItem('score');
      let HighScore = localStorage.getItem('Highscore');
    if(HighScore === null || score >=HighScore){
       alert(score);
      localStorage.setItem('HighScore',score);
      sessionStorage.setItem('score',0);
      window.location.reload();
    }else{
      sessionStorage.setItem('score',0);
      window.location.reload();
    }
    
  }
    return
  }
  window.requestAnimationFrame(main);
    if(secondSinceLastRender < 1/ SNAKE_SPEED) return   
    lastRenderTime = currentTime;
  update()
  draw()
}
window.requestAnimationFrame(main)
function update(){
updateSnake()
updateFood()
checkDeath()
}

function draw(){
gameboard.innerHTML=''
drawSnake(gameboard)
drawFood(gameboard)
}
function checkDeath(){
  gameOver = OutsideGrid(getSnakeHead()) || snakeIntersection()
}
