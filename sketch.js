var torre, torrePNG
var ghost, ghostPNG
var gamestate
var doorPNG
var climberPNG
var grupo_fake
var grupo_fake_malo
var grupo_puertas
var grupo_balcon

function preload(){
  torrePNG = 
    loadImage("tower.png")
  
  ghostPNG = 
    loadImage("ghost-standing.png")
  
  doorPNG =
    loadImage("door.png")
  
  climberPNG = 
    loadImage("climber.png")
}

function setup(){
  createCanvas(400, 600)
  torre = createSprite(200, 300,20,20)
  torre.addImage(torrePNG)
  torre.scale = 0.7
  
  ghost = createSprite (200, 450, 20,20)
  ghost.addImage(ghostPNG)
  ghost.scale = 0.4
  
  gamestate = "start";
  grupo_fake = new Group();
  grupo_fake_malo = new Group();
  grupo_puertas = new Group();
  grupo_balcon = new Group();
}

function draw(){
  background(0);
  drawSprites();
  
  if(gamestate === "start" && keyDown("space")){
    gamestate = "play"
  }
  
  if(gamestate === "play"){
    torre.velocityY = 3;
    if(torre.y > 400){
      torre.y = torre.height/4
      //console.log(torre.height)
    }
    
  if(keyDown("space")){
    ghost.velocityY = -3;
  
    }
    ghost.velocityY = ghost.velocityY + 0.5
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -5;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 5;
    }
    puertas();
    if(ghost.isTouching(grupo_fake)){
      ghost.velocityY = 0;
    }
    
    if(ghost.isTouching(grupo_fake_malo)){
      gamestate = "end"
    }
  }
  
  if(gamestate === "end"){
    torre.velocityY = 0;
    ghost.velocityY = 3;
    grupo_puertas.setVelocityYEach(0);
    grupo_balcon.setVelocityYEach(0);
  }
}

function puertas(){
  if(frameCount % 70 === 0){
    door = createSprite (random(50,350),0,20,20)
    door.addImage(doorPNG);
    door.scale = 0.7;
    door.velocityY = 3;
    grupo_puertas.add(door)
    door.depth = ghost.depth
    
    
    climber = createSprite(door.x,50,20,20)
    climber.addImage(climberPNG);
    climber.scale = 0.7;
    climber.velocityY = 3;
    grupo_balcon.add(climber)
    climber.depth = ghost.depth
    ghost.depth = ghost.depth + 1;
    
    falso = createSprite(door.x,40,50,10)
    falso.velocityY = 3;
    falso.visible = false
    grupo_fake.add(falso)
    
                            
    falso_malo = createSprite(door.x,55,50,10)
    falso_malo.velocityY = 3;
    falso_malo.visible = false
    grupo_fake_malo.add(falso_malo);
  }
}

