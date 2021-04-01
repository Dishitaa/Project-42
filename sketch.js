var monkey , monkey_running,monkey_stopped
var banana ,bananaImage, obstacle, obstacleImage,wallpaper, wallpaperI;
var FoodGroup, obstacleGroup
var score = 0;
var survive = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stopped= loadAnimation("sprite_0.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  wallpaperI = loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(500, 400);

  var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(80,325,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stopped", monkey_stopped);
  monkey.scale = 0.12;
  
  wallpaper = createSprite(250,200,500,400)
  wallpaper.addImage(wallpaperI);

  wallpaper.x = wallpaper.width /2;
  
  ground = createSprite(400,370,1000,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x)
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  ground.visible = false;
  
}


function draw() {
  background(255);
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
   if(gameState === PLAY){
     
     wallpaper.velocityX = -4;
     
     if(ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(wallpaper.x < 0){
        wallpaper.x = wallpaper.width/2;
      }

    if(keyWentDown("space")){
      monkey.velocityY = -15;
    }

     survive = survive + Math.round(getFrameRate() / 60.5);

    if(monkey.isTouching(FoodGroup)){
      score = score + 1;
      FoodGroup.destroyEach();  
    }
     
    if(obstacleGroup.isTouching(monkey)){
        monkey.scale = monkey.scale-0.02;
    }
     
    if(monkey.scale <0.1){
        gameState = END;
    }
     
    switch(score){
      case 5: monkey.scale = 0.14;
        break;
      case 10: monkey.scale = 0.16;
        break;
      case 20: monkey.scale = 0.18;
        break;
      case 30: monkey.scale = 0.20;
        break;
      case 40: monkey.scale = 0.20;
        break;
      default:break;
    }
  
     
     Banana();
     Obstacle();
     drawSprites(); 
   }
  
   else if (gameState === END) {
     monkey.changeAnimation("stopped", monkey_stopped);
     monkey.velocityY = 0;
     
     ground.velocityX=0;
     obstacleGroup.setVelocityEach = 0;
     
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
     wallpaper.velocityX = 0;
     
     drawSprites(); 
     
     textSize(24);
     stroke("black");
     text("Game Over", 200,200);
     
   }
  
  wallpaper.depth = monkey.depth-1;  
  
  stroke("black");
  textSize(18);
  text("Score: " + score, 360,70)
  
  stroke("black");
  textSize(16);
  
  text("Surviaval Time: " + survive, 360,50)
}

function Banana()
{
  if(World.frameCount%100===0)
  {
    var banana= createSprite(500,random(150,240),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-4;
    banana.scale=0.12;
    banana.lifetime=400;
    FoodGroup.add(banana);
  }
}

function Obstacle()
{
  if (World.frameCount%100===0)
  {
    var obstacle= createSprite(500,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-4;
    obstacle.scale=0.18;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

