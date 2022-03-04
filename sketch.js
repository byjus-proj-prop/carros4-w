var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database,wallX,wallY,wall = [], wallGroup;

var form, player,player2,player3,player4, gameState = 2;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img,bgmsc,fail,bateu;

function preload(){
  track = loadImage("./images/track.png");
  car1_img = loadImage("./images/car1.png");
  car2_img = loadImage("./images/car2.png");
  car3_img = loadImage("./images/car3.png");
  car4_img = loadImage("./images/car4.png");
  ground = loadImage("./images/ground.png");
  bgmsc = loadSound("audio/bgmsc.mp4");
  fail = loadSound("audio/fail.mp4");
  bateu = loadSound("audio/carroBate.mp4");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  wallX = width/2;
  wallY = height-135;
  for(let i = 0; i< 9;i++){
    wall.push(createSprite(wallX,wallY,50,30));
    wallX+=50;
    console.log("wall")
  }
  wall.push(createSprite(wallX+5,wallY-10,50,30));
  wall[wall.length-1].rotation = -45;
  wallX+=25;
  wallY-=50;
  for(let i = 0; i < 8; i++) {
    wall.push(createSprite(wallX-20,wallY,50,50));
    wallY-=50;
  }
  wall.push(createSprite(wallX,wallY,30,50));
  wall[wall.length-1].rotation = -45;
  let temp = wallX;
  wallX -= 50;
  wallY-=30;
  for(let i = 0; i < 8; i++){
    wall.push(createSprite(wallX,wallY+50,50,100));
    wallX-=50;
  }
  
  wall.push(createSprite(wallX+10, wallY+30,30,70));
  wall.push(createSprite(wallX+350,wallY+130,160,70));
  wall[wall.length-1].rotation = 45;
  wall.push(createSprite(wallX+350,wallY+430,160,70));
  wall[wall.length-1].rotation = -45;
  wall.push(createSprite(wallX-125,wallY+150,160,70));
  wall[wall.length-1].rotation = 45;
  wall.push(createSprite(wallX+40,wallY+270,430,160));
  wall.push(createSprite(wallX-175,wallY+100,10,350));
  wallY = 150;
  wallX = temp;
  for(let i = 0; i < 8; i++) {
    wall.push(createSprite(260,wallY,200,50));
    wallY+=50;
  }
  wallX=300;
  wall.push(createSprite(wallX-100,wallY,50,30));
  wall[wall.length-1].rotation = 45;
  for(let i = 0; i < 8; i++){
    wall.push(createSprite(wallX,wallY+50,200,50));
    wallX+=50;
  }
 
  
}


function draw(){
  background(track);
  var edges = createEdgeSprites();
  
  if(gameState==1) {
    player2.velocityX = Math.round(random(1,3));
    player2.velocityY = Math.round(random(1,3));
    player2.rotation =  Math.round(random(90,120))
    player2.collide(edges);
    player3.velocityX = Math.round(random(1,3));
    player3.velocityY = Math.round(random(1,3));
    player3.rotation =  Math.round(random(90,120))
    player3.collide(edges);
    player4.velocityX = Math.round(random(1,3));
    player2.velocityY = Math.round(random(1,3));
    player4.rotation =  Math.round(random(90,120))
    player4.collide(edges);
    if(frameCount % 60 == 0){
      bgmsc.play();
    }
    console.log(player.x+" "+player.y)
    if(keyDown(RIGHT_ARROW)) {
      player.velocityX+=0.25;
    } else if(player.velocityX>0){
      player.velocityX-=0.25;
    }
    if(keyDown(UP_ARROW)) {
      player.velocityY-=0.25;
      player.rotation-=1.5;
    }else if(player.velocityY<0){
      player.velocityY+=0.25;
    }
    if(keyDown(LEFT_ARROW)) {
      player.velocityX-=0.25;
    } else if(player.velocityX<0){
      player.velocityX+=0.25;
    }
    if(keyDown(DOWN_ARROW)) {
      player.velocityY+=0.25;
      player.rotation+=1.5;
    }else if(player.velocityY>0){
      player.velocityY-=0.25;
    }
    if(player.collide(edges)) {
      player.velocityX=0;
      player.velocityY=0;
    }
    player.collide(player2);
    player.collide(player3);
    player.collide(player4);
    player2.collide(player3);
    player2.collide(player4);
    player4.collide(player3);
    if(549<player.x && player.x<555 && 619<player.y && player.y<height && player.velocityX>0){
      gameState = 3;
      player.velocityX=0;
        player.velocityY=0;
    }
    for(let i = 0; i < wall.length; i++) {
      if(player.isTouching(wall[i])) {
        gameState = 0;
        player.velocityX=0;
        player.velocityY=0;
        destroicarro();
        bgmsc.stop();
      }
    }
  }
  drawSprites()
  if(gameState==2){
    fill("blue")
    textSize(30);
    text("aperte enter para começar",width/2-150,height/2);
  } 
  if(gameState == 0) {
    fill("red")
    textSize(30);
    text("game over",width/2-150,height/2);
  }
  if(gameState == 3) {
    fill("yellow")
    textSize(30);
    text("você venceu",width/2-150,height/2);
  }
}

function keyPressed() {
  if(keyCode == ENTER && gameState == 2) {
    gameState = 1;
    criacarros();
  }
}
function criacarros(){
  player = createSprite(width/2,height-90,30,30);
  player.addImage(car1_img);
  player.rotation = 90;
  player.scale = 0.75;
  player2 = createSprite(width/2,height-30,30,30);
  player2.addImage(car2_img);
  player2.rotation = 90;
  player2.scale = 0.75;
  player3 = createSprite((width/2)-100,height-90,30,30);
  player3.addImage(car3_img);
  player3.rotation = 90;
  player3.scale = 0.75;
  player4 = createSprite((width/2)-100,height-30,30,30);
  player4.addImage(car4_img);
  player4.rotation = 90;
  player4.scale = 0.75;
}
function destroicarro(x) {
  switch (x) {
    case 2:
      player2.destroy();
      break;
      case 3:
        player3.destroy();
        break;
        case 4:
          player4.destroy;
          break;
    default:
      player.destroy();
      break;
  }
}
