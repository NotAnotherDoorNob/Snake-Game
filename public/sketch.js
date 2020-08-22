let snake;
let resolution = 20;
let food;
let w;
let h;
let isPaused = false;
let highScore;
let audio = new Audio('sound/background.mp3');
let eatSound = new Audio('sound/boop.wav');


getData();
async function getData() {
  const response = await fetch('/api');
  const data = await response.json();
  highScore = data;
}


document.getElementById('playButton').onclick = function playMusic() {
  audio.play();
}

document.getElementById('pauseButton').onclick = function pauseMusic() {
  audio.pause();
}


function setup () {
let canvas = createCanvas(560, 560);
canvas.parent('canvasContainer');



w = floor(width / resolution);
h = floor(height / resolution);
frameRate(9);
snake = new Snake();
foodLocation();

}




function foodLocation(){
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function keyPressed() {
  let setX = snake.xdir;
  let setY = snake.ydir;

  if (keyCode === LEFT_ARROW) {
    if (snake.xdir === 1 && snake.ydir === 0) {
      return null;
    } else {
      snake.setDir(-1, 0);
    } 
  } else if (keyCode === RIGHT_ARROW){
    if (snake.xdir === -1 && snake.ydir === 0) {
      return null;
    } else {
      snake.setDir(1, 0);
    }
  } else if (keyCode === UP_ARROW){
    if (snake.xdir === 0 && snake.ydir === 1) {
      return null;
    } else {
      snake.setDir(0, -1);
    }
  } else if (keyCode === DOWN_ARROW){
    if (snake.xdir === 0 && snake.ydir === -1) {
      return null;
    } else {
      snake.setDir(0, 1);
    } 
  } else if (keyCode === SHIFT) {
    if (isPaused === false) {
      isPaused = true;
    } else if (isPaused === true) {
      isPaused = false;
    }
  }
}

function addHighScore() {
  if (snake.len > highScore){
    highScore = snake.len;
    console.log(highScore);

    //Adding highscore to database
    const data = { highScore }
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(data)
    }
    fetch('/api', options).then(response => {
      console.log(response);
    });
  } else {
    highScore = highScore;
  }
}





function draw() {
  scale(resolution);
  background(0);
  if (snake.eat(food)) {
    foodLocation();
  };




  if (isPaused) {
    snake.stopUpdate();
  } else {
    snake.update();
  }


  
  snake.show();
  addHighScore();



  if (snake.endGame()) {
    console.log('End Game')
    background(22, 255, 138);
    snake.newGame();
  }

  noStroke();
  fill(255);
  rect(food.x, food.y, 1, 1);




  document.getElementById('currScore').textContent = snake.len;
  document.getElementById('highScore').textContent = highScore;


}




