//Monkey
var monkey,monkeyanim,monkeydead,monkeydeadanim 
//ground
var ground,groundanim,ground2
//GameState
var gameState = "play";
//Count
var count=0
//edges
var edges
//banana
var banana,bananaanim,goodbananaanim,banana1
//clouds
var cloud,cloud1,cloud2,cloud3,cl,ccl
//groups
var obsGroup,cloudsGroup,foodGroup
//count
var count = 0
//gameOver
var game,gameanim
// Load  Anything
function preload() {
monkeyanim = loadAnimation("monkey1.png","monkey2.png","monkey3.png")
groundanim = loadAnimation("Ground.png")
bananaanim = loadAnimation("Banana.png")
goodbananaanim = loadAnimation("Good Banana.png")
monkeydeadanim = loadAnimation("monkey dead.png")
cloud1 = loadAnimation("Cloud 1.png")
cloud2 = loadAnimation("Cloud 2.png")
cloud3 = loadAnimation("Cloud 3.png")
gameanim = loadAnimation("Game over.png")
bg = loadImage("Background2.png")
}
// Implementing The Added "Anything"
function setup() {
//Canvas
  createCanvas(800,400);
//Monkey
monkey = createSprite(400,10,10,10);
monkey.addAnimation("t1",monkeyanim);
monkey.scale = 0.7;
monkey.x=30;
monkey.y=395;
//Ground
ground = createSprite(400,430,10,10);
ground.addAnimation("t2",groundanim);
ground.scale = 1; 
//ground2
ground2 = createSprite(100,400,800,5);
//Invisible ground is not visible
ground2.visible=false;
//Invisible ground positions
ground2.x=400;
ground2.y=395;
obsGroup = createGroup();
cloudsGroup = createGroup();
foodGroup = createGroup();
}
  //DRAW!!!!
function draw() {
  background  (bg)
  
  stroke("white");
  fill ("white");
  text("Score:"+count,700,50);

  monkey.velocityY = monkey.velocityY + 1.5 ;
if(gameState==="play"){

  game = createSprite(400,200,10,10);
  game.addAnimation("gameover",gameanim);
  game.visible=false;
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  ground.velocityX= -(9+0.6*count/100);

  if(monkey.isTouching(foodGroup)){

    foodGroup.setLifetimeEach(0);
  count=count+10;
  //monkey.scale=monkey.scale+0.1;
  
  
  }
  
  
if (keyDown("space") && monkey.y>345||keyDown("up") && monkey.y>345) {
  monkey.velocityY=-16;

}



Obstacles();
spawnClouds();
Food();
if (monkey.isTouching(obsGroup)){
gameState = ("end");

}
}

edges = createEdgeSprites()
monkey.collide (edges[3]);
monkey.collide (ground2);


if (gameState === "end") {
//game over
game.visible=true;
  //Ground Stop
  ground.velocityX=0;
//Monkey Stop
  monkey.velocityY = 0;
//Group Stop
  obsGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
//Deleting Sprites Stop
  obsGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  foodGroup.setLifetimeEach(-1);
//monkey dead animation
monkey.addAnimation("t1",monkeydeadanim);
// Game Over
if(keyWentDown("space")||keyWentDown("up")){
//calling reset function
count=0;
reset();
}


}




drawSprites();

}
function Obstacles(){
if(frameCount%40-1===0){
banana = createSprite (900,400,10,10);
banana.velocityX=-(9+0.6*count/150);
banana.scale=0.3;
banana.y=360;
banana.setCollider("circle",0,0,70);
banana.addAnimation("bana",bananaanim);

obsGroup.add(banana);

}
}


function Food(){
if(frameCount%70-1===0){
  banana1 = createSprite (900,400,10,10);
  banana1.velocityX=-(9+0.6*count/150);
  banana1.scale=0.3;
  banana1.y=360;
  banana1.setCollider("circle",0,0,70);
  banana1.addAnimation("bana2",goodbananaanim);
  
  foodGroup.add(banana1);

  if(banana.isTouching(banana1)){

    banana1.lifetime=0;
    
    }

}

}
function reset (){

  obsGroup.setLifetimeEach(0);
  cloudsGroup.setLifetimeEach(0);
  foodGroup.setLifetimeEach(0);
  gameState="play";
  game.visible=false;
  count=0;

monkey.addAnimation("t1",monkeyanim);

}

function spawnClouds () {

  //every now and then a wild cloud will appear
  if (frameCount%50===0){
    //cloud sprite
    cloud = createSprite (200,200,10,10);
    //clouds scale
    cloud.scale=0.6;
    //cloud positions
    cloud.y= random(100,200);
    cloud.x=900;
    //clouds velocity
    cloud.velocityX = -(6+0.6*count/100);
    //clouds lifetime
    cloud.lifetime = 180;
    //cloud animation
    cloud.addAnimation ("clouds",cloud1);
  //adding clouds to clouds group
  cloudsGroup.add(cloud)
  
  
  }

//every now and then a wild cloud will appear
if (frameCount%60===0){
  //cloud sprite
  cl = createSprite (200,200,10,10);
  //clouds scale
  cl.scale=0.6;
  //cloud positions
  cl.y= random(90,200);
  cl.x=900;
  //clouds velocity
  cl.velocityX = -(6+0.6*count/100);
  //clouds lifetime
  cl.lifetime = 180;
  //cloud animation
  cl.addAnimation ("cloud",cloud2);
//adding clouds to clouds group
cloudsGroup.add(cl)


}


//every now and then a wild cloud will appear
if (frameCount%30===0){
  //cloud sprite
  ccl = createSprite (200,200,10,10);
  //clouds scale
  ccl.scale=0.6;
  //cloud positions
  ccl.y= random(80,200);
  ccl.x=900;
  //clouds velocity
  ccl.velocityX = -(6+0.6*count/100);
  //clouds lifetime
  ccl.lifetime = 180;
  //cloud animation
  ccl.addAnimation ("cl",cloud3);
//adding clouds to clouds group
cloudsGroup.add(ccl)


}






  }
