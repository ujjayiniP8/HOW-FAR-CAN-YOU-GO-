var boy,boy_running,boy_collided;
var desert, invisibleGround;

var coinGroup, coinImage;
var obstaclesGroup;

var backgroundImg;

var score=0;
var life =3;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

localStorage[" HighestScore"] = 0;

function preload()
{
  coinImage = loadImage("coin.png");
  boy_running=loadAnimation("trex_2.png","trex_1.png","trex_3.png")
  boy_collided=loadAnimation("trex_collided.png");
 backgroundImg =loadImage("backgroundImg.png")
}

function setup()
    {
      //creating canvas
      createCanvas(600, 200);

      //creating boy
      boy = createSprite(50,180,20,50);
      boy.shapeColor="pink";
      
      boy.addAnimation("running", boy_running);
      boy.addAnimation("collided", boy_collided);
      boy.setCollider('circle',0,0,350)
      boy.scale = 0.08
      
      //creating desert
      desert = createSprite(0,195,1200,10);
      desert.shapeColor="brown"
      
      desert.x = desert.width /2;
      desert.velocityX = -(6 + 3*score/100);

      coinGroup = new Group();
      obstaclesGroup = new Group();

      score = 0;
      
}

function draw()
{
      //background
      background(backgroundImg);

      textSize(20);
      fill(255);
      text("Score: "+ score, 500,40);
      text("life: "+ life , 500,60);

 

        //gamestate play
        if (gameState===PLAY)
        {
      
        // score = score + Math.round(getFrameRate()/60);
        desert.velocityX = -(6 + 3*score/100);

        if(keyDown("space") && boy.y >= 139)
        {
          boy.velocityY = -12;
        }

        boy.velocityY = boy.velocityY + 0.8

        if(desert.x < 0)
        {
          desert.x = desert.width/2;
        }

        boy.collide(desert);

        spawnCoin();
        spawnObstacles();

        if(obstaclesGroup.isTouching(boy))
        {
          gameState = END;
        }
        if(coinGroup.isTouching(boy))
        {
          score=score +1;
          coinGroup.destroyEach();
        }
      }

      //gamestate end
      else if (gameState === END ) 
      {
       text ("Game Over!!",200,100);
        text("Press R to restart",200,80);
        //set velcity 
        desert.velocityX = 0;
        boy.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);

        boy.destroy();
        obstaclesGroup.destroyEach();
        coinGroup.destroyEach();

        if(keyDown("r"))
        {
          reset();
        }
      }

    drawSprites()
    }

    function spawnCoin() 
    {
      //spawning coins
      if (frameCount % 60 === 0) 
      {
        var coin = createSprite(600,120,10,10);
        coin.shapeColor='seagreen';

        coin.addImage("coins",coinImage);
        coin.scale=0.2;
        
        coin.y = Math.round(random(80,120));

        
        coin.velocityX = -3;

        //lifetime
        coin.lifetime = 200;

        //depth
        coin.depth = boy.depth;
        boy.depth = boy.depth + 1

        coinGroup.add(coin);
      }
  
}

function spawnObstacles()
{
  if(frameCount % 60 === 0) 
  {
    var obstacle = createSprite(600,165,10,10);

     //random obstacles
    var rand = Math.round(random(1,7));
    switch(rand)
    {
      case 1: obstacle.shapeColor="violet";
              break;
      case 2: obstacle.shapeColor="indigo";
              break;
      case 3: obstacle.shapeColor="blue";
              break;
      case 4: obstacle.shapeColor="green";
              break;
      case 5: obstacle.shapeColor="yellow";
              break;
      case 6: obstacle.shapeColor="orange";
              break;
      case 7: obstacle.shapeColor="red";
              break;
     default : break;
    }
        
    obstacle.velocityX = -(6 + 3*score/100);
    
    obstacle.lifetime = 300;
    
   obstaclesGroup.add(obstacle);
  
  }
}

function reset()
{
  gameState = PLAY;
  
  boy = createSprite(50,180,20,50);
  boy.addAnimation("running",boy_running);
      
  boy.scale = 0.08;
  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  
  if(localStorage[" HighestScore"]<score){
    localStorage[" HighestScore"] = score;
  }
  
  score = 0;
  life=1;
  console.log(life);
  
}

