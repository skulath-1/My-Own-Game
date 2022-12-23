var forestImg, witchStandingImg, witchFallingImg;
var witch;
var obstacle1, obstacle2, obstacle3;
var rand;
var dog, cat, frog ;
var dogImg , catImg , frogImg ;
var score = 0;

function preload() {
  forestImg = loadImage("forest.png");
  witchStandingImg = loadImage("witch_standing.png");
  witchFallingImg = loadImage("witch_falling.png");
  obstacle1 = loadImage("obstacle 1.jpg");
  obstacle2 = loadImage("obstacle 2.jpg");
  obstacle3 = loadImage("obstacle 3.jpg");
  catImg = loadAnimation("c1.png","c2.png","c3.png","c4.png","c5.png","c6.png","c7.png","c8.png")
  dogImg = loadAnimation("d1.png", "d3.png")
  frogImg = loadAnimation("f1.png","f2.png","f3.png","f4.png","f5.png","f6.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  witch = createSprite(width / 5, height / 2 + 300, 20, 20);
  witch.addImage("witchStandingImg", witchStandingImg);
  witch.scale = 7;
}

function draw() {
  background(forestImg);
  // console.log("sara")

  if(keyDown("LEFT_ARROW")){
    witch.x = witch.x - 10
  }

  if(keyDown("RIGHT_ARROW")){
    witch.x = witch.x + 10
  }

  if(keyDown("UP_ARROW")){
    witch.y = witch.y - 10
  }

  if(keyDown("DOWN_ARROW")){
    witch.y = witch.y + 10
  }


  fill("black");
  textSize(150);
  textFont("bold");
  text("Chasing Pets", 500, 120);

  fill("yellow")
  textSize(50)
  text("Score:", 100,80)

  witchTouches();

  obstacles();

  spawnAnimals();

  drawSprites();
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
   
  witch.depth = obstacle.depth
  witch.depth = witch.depth + 1

  }
}

function spawnAnimals(){

  if (frameCount % 120 === 0){
  var animals = createSprite(width/4-500, height-200)
  animals.y = Math.round(random(150, 800))
  var rand = Math.round(random(1, 3));

  switch (rand) {
    case 1:
      animals.addAnimation("dog",dogImg);
      animals.scale = 1.5;
      animals.velocityX = 4;
      animals.life = 275;
      break;
    case 2:
      animals.addAnimation("cat",catImg);
      animals.scale = 1.5;
      animals.velocityX = 9;
      animals.life = 200;
      break;
    case 3:
      animals.addAnimation("frog",frogImg);
      animals.scale = 1.5;
      animals.velocityX = 12;
      animals.life = 150;
      break;
    default:
      break;
  }

  witch.depth = animals.depth
  witch.depth = witch.depth + 1

  }

}

function witchTouches(){

  if(witch.isTouching(cat)){
    score = score + 1
    cat.destroy();
   }

   if(witch.isTouching(dog)){
    score = score + 1
    dog.destroy();
   }

   if(witch.isTouching(frog)){
    score = score + 1
    frog.destroy();
   }

}
