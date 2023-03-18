var forestImg, witchStandingImg, witchFallingImg;
var witch;
var obstacle1, obstacle2, obstacle3;
var rand, resetButton, resetButtonImg;
var dog, cat, frog;
var dogImg, catImg, frogImg;
var score = 0;
var edges;
var obstaclesGroup;
var animalsGroup;
var lives, lifebar;
var animalScore = 0;
var backgroundMusic, backgroundSound;

function preload() {
  forestImg = loadImage("forest.png");
  witchStandingImg = loadImage("witch_standing.png");
  witchFallingImg = loadImage("witch_falling.png");
  obstacle1 = loadImage("obstacle 1.jpg");
  obstacle2 = loadImage("obstacle 2.jpg");
  obstacle3 = loadImage("obstacle 3.jpg");
  catImg = loadAnimation(
    "c1.png",
    "c2.png",
    "c3.png",
    "c4.png",
    "c5.png",
    "c6.png",
    "c7.png",
    "c8.png"
  );
  dogImg = loadAnimation("d1.png", "d3.png");
  frogImg = loadAnimation(
    "f1.png",
    "f2.png",
    "f3.png",
    "f4.png",
    "f5.png",
    "f6.png"
  );
  resetButtonImg = loadImage("reset.png");

  backgroundMusic = loadSound("Background music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  witch = createSprite(width / 5, height / 2 + 300, 20, 20);
  witch.addImage("witchStandingImg", witchStandingImg);
  witch.scale = 4;

  resetButton = createSprite(width / 4 - 80, height / 3 - 200, 20, 20);
  resetButton.addImage("resetButtonImg", resetButtonImg);
  resetButton.scale = 0.15;

  obstaclesGroup = new Group();
  animalsGroup = new Group();
}

function draw() {
  background(forestImg);

  //backgroundMusic.play()

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(1);
  }

  // console.log("sara")

  edges = createEdgeSprites();
  witch.bounceOff(edges);

  if (keyDown("LEFT_ARROW")) {
    witch.x = witch.x - 10;
  }

  if (keyDown("RIGHT_ARROW")) {
    witch.x = witch.x + 10;
  }

  if (keyDown("UP_ARROW")) {
    witch.y = witch.y - 10;
  }

  if (keyDown("DOWN_ARROW")) {
    witch.y = witch.y + 10;
  }

  // if(keyDown("SPACE")){
  //   witch.velocityY = -10
  // }

  //witch.velocityY = witch.velocityY + 0.8

  fill("black");
  textSize(150);
  textFont("bold");
  text("Chasing Pets", 500, 120);

  fill("yellow");
  textSize(50);
  text("Score:" + score, 100, 80);

  fill("yellow");
  textSize(50);
  text("AnimalScore:" + animalScore, width - 400, 80);

  lives = new Group();

  //witchTouches();

  obstacles();

  spawnAnimals();

  showLifeBar();

  // handleFuel();

  drawSprites();

  for (var i = 0; i < obstaclesGroup.length; i += 1) {
    if (obstaclesGroup.get(i).isTouching(witch)) {
      obstaclesGroup.get(i).destroy();
      score += 1;
      console.log(score);
    }
  }

  for (var g = 0; g < animalsGroup.length; g += 1) {
    if (animalsGroup.get(g).isTouching(witch)) {
      animalsGroup.get(g).destroy();
      animalScore += 1;
    }
  }

//   if (score === 3) {
//     mousePressed();
//   }
 }

function obstacles() {
  if (frameCount % 100 === 0) {
    var obstacle = createSprite(width / 4 - 500, height / 2 + 300, 20, 20);
    // obstacle.velocityX = 5

    obstacle.y = Math.round(random(150, 800));

    var rand = Math.round(random(1, 3));

    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        obstacle.scale = 0.3;
        obstacle.velocityX = 6;
        obstacle.life = 275;
        break;
      case 2:
        obstacle.addImage(obstacle2);
        obstacle.scale = 0.35;
        obstacle.velocityX = 9;
        obstacle.life = 200;
        break;
      case 3:
        obstacle.addImage(obstacle3);
        obstacle.scale = 0.5;
        obstacle.velocityX = 12;
        obstacle.life = 150;
        break;
      default:
        break;
    }

    witch.depth = obstacle.depth;
    witch.depth = witch.depth + 1;

    obstaclesGroup.add(obstacle);
  }
}

function spawnAnimals() {
  if (frameCount % 120 === 0) {
    var animals = createSprite(width / 4 - 500, height - 200);
    animals.y = Math.round(random(150, 800));
    var rand = Math.round(random(1, 3));

    animalsGroup.add(animals);

    switch (rand) {
      case 1:
        animals.addAnimation("dog", dogImg);
        animals.scale = 1.5;
        animals.velocityX = 4;
        animals.life = 275;
        break;
      case 2:
        animals.addAnimation("cat", catImg);
        animals.scale = 1.5;
        animals.velocityX = 9;
        animals.life = 200;
        break;
      case 3:
        animals.addAnimation("frog", frogImg);
        animals.scale = 1.5;
        animals.velocityX = 12;
        animals.life = 150;
        break;
      default:
        break;
    }

    witch.depth = animals.depth;
    witch.depth = witch.depth + 1;
  }
}

function witchTouches() {
  if (witch.isTouching(cat)) {
    score = score + 1;
    cat.destroy();
  }

  if (witch.isTouching(dog)) {
    score = score + 1;
    dog.destroy();
  }

  if (witch.isTouching(frog)) {
    score = score + 1;
    frog.destroy();
  }
}

function showLifeBar() {
  push();

//  image(lifeImage, width / 2 - 150, height - player.positionY - 300, 20, 20);

  fill("white");
  rect(width / 2 - 150, 200, 300, 40);

  fill("orange");
  rect(width / 2 - 150, 200, 300, 40);

  pop();

  //Whenever witch touches the obstacle , reduce the life bar slowly and do the same method for the animals but in reverse order
  //Add sounds
  //When the life bar becomes 0, display GAME OVER
  //Restart the entire game
}

function handleFuel() {
  witch.overlap(lives, function (collector, collected) {
    witch.lifebar = 180;
    collected.remove();
  });

  if (witch.lifebar > 0) {
    witch.lifebar -= 3;
  }
}

 function mousePressed() {
  if(mousePressed(resetButton)){
    window.location.reload();
  }
};
