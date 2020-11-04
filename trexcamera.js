class TrexCamera {

constructor(){
    this.index = null;
    this.distance = 0;

}

trexSetup(){
    trex = createSprite(50,180,20,50);
  
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);
    trex.scale = 0.5;

    camera.position.x = trex.x;
    camera.position.y = trex.y
  
  ground = createSprite(200,180,2377,20);
    ground.addImage("ground",groundImage);
    //ground.x = ground.width /2;
   // ground.velocityX = -(6 + 3*score/100);
  
    gameOver = createSprite(displayWidth/2,displayHeight - 800);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(displayWidth/2,displayHeight - 750);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;
    
    invisibleGround = createSprite(200,190,2377,10);
    invisibleGround.visible = false;
    
    cloudsGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;

    
    //allObjects[ground,invisibleGround];
    //Trex[trex];
}

trexDraw(){

//trex.debug = true;


background(255);

text("Score: "+ score, trex.x + 100,trex.y-50);

if (gameState===PLAY){
  //score = score + Math.round(getFrameRate()/60);
  //ground.velocityX = -(6 + 3*score/100);

  score = trex.x - 50;

  if(keyDown("space") && trex.y >= 140) {
    trex.velocityY = -12;
  }

  trex.velocityY = trex.velocityY + 0.8


      if(ground.x < camera.position.x){
   ground.x = camera.position.x + displayWidth/2;
   invisibleGround.x = camera.position.x + displayWidth/2;
      }

  spawnClouds();
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      trex.velocityY = 0;
  }

}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;

  gameOver.x = trex.x;
  restart.x = trex.x;


  
  //change the trex animation
  trex.changeAnimation("collided",trex_collided);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
}


trex.collide(invisibleGround);

}


TrexMoving(){

           camera.position.x = trex.x;
           //camera.position.y = trex.y;
          
        }

        TrexControl(){
          if(keyIsDown(RIGHT_ARROW) && gameState === PLAY)
          {
            trex.x += 10;
          }
          if(keyIsDown(LEFT_ARROW) && gameState === PLAY && trex.x > 0)
          {
            trex.x -= 10;
          }
      }
}