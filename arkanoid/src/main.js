const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// context.beginPath();
// context.rect(20, 40, 50, 50);
// context.fillStyle = "black";
// context.fill();
// context.closePath();

// context.beginPath();
// context.arc(240, 160, 20, 0, Math.PI*2, false);
// context.fillStyle = "green";
// context.fill();
// context.closePath();

// context.beginPath();
// context.rect(160, 10, 100, 40);
// context.strokeStyle = "rgba(0, 0, 255, 0.5)";
// context.stroke();

let x = canvas.width/2;
let y = canvas.height - 30 ;

let dx = 2;
let dy = -2;

let ballRadius = 10

let paddleHeight = 7;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth)/2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 3;
let brickColumnCount = 7;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let count = 0;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHendler, false);

let bricks = [];
for(let column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for(let row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
    }
}

function drawScore() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Score: "+ count, 8, 20);
}

function collisionDetection() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            let brick = bricks[column][row];
            if (bricks[column][row].status == 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                    count = count + 1;
                    if (count == brickColumnCount * brickRowCount) {
                        alert('YOU WIN, CONGRATULATIONS!');
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawBricks() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[column][row].status == 1) {
                let brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[column][row].x = brickX;
                bricks[column][row].y = brickY;
                context.beginPath();
                context.rect(brickX, brickY, brickWidth, brickHeight);
                context.fillStyle = "#0095DD";
                context.fill();
                context.closePath();
            }
        }
    }
}

function keyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft"){
        leftPressed = true;
    }
  }

function keyUpHendler(event) {
    if (event.key =="Right" || event.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drwaPaddle() {
    context.beginPath();
    context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drwaPaddle();
    drawBricks();
    collisionDetection();
    drawScore();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("Game Ovder");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX = paddleX + 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX = paddleX - 7;
    }

    x = x + dx;
    y = y + dy;

}

const interval = setInterval(draw, 10);