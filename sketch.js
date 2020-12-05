//to create objects
var bow , arrow,  playground;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var wooshsound;
     
function preload(){
  //to load images 
  playgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  //to load sound
  wooshsound = loadSound("Arrow+Swoosh+1.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating playground
  playground = createSprite(0,0,800,800);
  playground.addImage ("playground",playgroundImage);
  playground.scale=3;
  playground.velocityX=-10;
  playground.X = playground.width/2;
  
  // creating bow to shoot arrow
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  //to display
  score = 0;
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowgroup = new Group();
}

function draw() {
  // moving ground
    playground.velocityX = -3 
    
  //to reset background if it croses half its width
    if (playground.x < 0){
      playground.x = playground.width/2;
    }
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    var temp_arrow = createArrow();
    temp_arrow.addImage(arrowImage);
     temp_arrow.y = bow.y;
  }
  
  var select_balloon = Math.round(random(1,4));
  console.log(select_balloon)
   
  if (World.frameCount % 80 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  //to destroy balloon if arrow touches it
  if (arrowgroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowgroup.destroyEach();
    score = score+1;
  }
  if (arrowgroup.isTouching(redB)) {
    redB.destroyEach();
    arrowgroup.destroyEach();
    score = score+3;
  }
  if (arrowgroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowgroup.destroyEach();
    score = score+2;
  }
  if (arrowgroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowgroup.destroyEach();
    score = score+4;
  } 
  drawSprites();
  //to display score
  fill("red");
  textSize(20);
  strokeWeight(4);
  stroke("black");
  text("Score : "+ score, 500,50);
}

//creating redballoon 
function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 4;
  red.lifetime = 150;
  red.scale = 0.1
  redB.add(red);
}
//creating blueballoon 
function blueBalloon() {
  var blue = createSprite(0,Math.round(random(40, 140)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 4;
  blue.lifetime = 150;
  blue.scale = 0.1
  blueB.add(blue);
}
//creating greenballoon 
function greenBalloon() {
  var green = createSprite(0,Math.round(random(95, 450)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 4;
  green.lifetime = 150;
  green.scale = 0.1
  greenB.add(green);
}
//creating pinkballoon 
function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(45, 270)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 4  ;
  pink.lifetime = 150;
  pink.scale = 1;
  pinkB.add(pink);
}
// Creating  arrows for bow
function createArrow() {
  arrow= createSprite(480, 100, 5, 10);
  arrow.velocityX = -20;
  arrow.scale = 0.3;
  arrow.lifetime = 50;
  wooshsound.play();
  arrowgroup.add(arrow);
  return arrow;
}