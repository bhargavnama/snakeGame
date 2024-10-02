let playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
document.querySelector(".high-score").innerText = `High Score : ${highScore}`;

const controls = document.querySelectorAll(".controls i");

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    alert("Game Over!Press Ok to replay...");
    highScore = score > highScore?score:highScore;
    localStorage.setItem("high-score", highScore);
    location.reload();
}

const incrementScore = () => {
    score++;
    document.querySelector(".score").innerText = `Score : ${score}`;
}

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30);
    foodY = Math.floor(Math.random() * 30);
    if(foodX === 1 || foodY === 1 || foodX === 0 || foodY === 0){
        changeFoodPosition();
    }
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){ 
        velocityX = -1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => {changeDirection({key : key.dataset.key})});
})

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if(foodX === snakeX && foodY === snakeY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        incrementScore();
    }
    
    for(let i=snakeBody.length - 1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY >30){
        gameOver = true;
    }


    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
setIntervalId = setInterval(initGame, 125);

changeFoodPosition();


document.addEventListener("keydown", changeDirection);