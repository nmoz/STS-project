const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var gameState = 0;
var HOME = 0;
var PLAY = 1;
var INSTRUCTIONS = 2;
var END = 3;
var WIN = 4;

var enemyPoints = 4;
var playerPoints = 4;

var rocks = [];
var cannonBalls = [];

function preload() {
  //PRELOADING FRONT PAGE ICONS//
  homePageBackground = loadImage("images/backgrounds/homeBackground.png");
  bgBackground = loadImage("images/backgrounds/bg.jpg");
  playIconImg = loadImage("images/icons/PLAY_ICON.png");
  menuIconImg = loadImage("images/icons/MENU_ICON.png");
  backIconImg = loadImage("images/icons/BACK_ICON.png");
  instructionsImg = loadImage("images/icons/INSTRUCTIONS_ICON.png");
  closeIconImg = loadImage("images/icons/CLOSE_ICON.png");

  //PRELOADING END STATE ICONS//
  gameOverIcon = loadImage("images/icons/GAMEOVER_ICON.png");
  winIcon = loadImage("images/icons/WIN_ICON.png");
  crossIcon = loadImage("images/icons/CROSS_ICON.png");
  tickIcon = loadImage("images/icons/TICK_ICON.png");

  //PRELOADING SOUND//
  clickSound = loadSound("sounds/click.mp3");
  backgroundMusic = loadSound("sounds/music.mp3");
  explosionSound = loadSound("sounds/explosionSound.mp3");
  airplaneSound = loadSound("sounds/airplane1.mp3");
  failSound = loadSound("sounds/failSound.mp3");
  bombDroppingSound = loadSound("sounds/bombDropping.wav");
  planeCrashing = loadSound("sounds/planeCrash.mp3");
  cannonImpactSound = loadSound("sounds/cannonImpact.mp3");
  slingshotImpactSound = loadSound("sounds/slingshotImpact.mp3");
  winSound = loadSound("sounds/winSound.mp3");

  //PRELOADING GAME OBJECTS//
  gameBackground = loadImage("images/backgrounds/gameBackground.jpg");
  endBackground = loadImage("images/backgrounds/endBackground.jpg");
  planeImg = loadImage("images/characters/plane.png");
  planeFalling = loadImage("images/characters/planeFallingImg.png");
  princeImg = loadImage("images/characters/prince.png");
  castleImg = loadImage("images/characters/castle.png");
  hillImg = loadImage("images/characters/hill.png");
  slingShotImg = loadImage("images/characters/slingShotSprite.png");
  bombImg = loadImage("images/bomb/bomb.png");
  platformImg = loadImage("images/characters/platform.jpg");
  cannonImg = loadImage("images/characters/cannon1.png");
  bombExplosion = loadAnimation(
    "images/bomb/bomb1.png",
    "images/bomb/bomb2.png",
    "images/bomb/bomb3.png",
    "images/bomb/bomb4.png",
    "images/bomb/bomb5.png",
    "images/bomb/bomb6.png",
    "images/bomb/bomb7.png",
    "images/bomb/bomb8.png"
  );
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  //var canvas = createCanvas(1100, 550);
  engine = Engine.create();
  world = engine.world;

  backgroundMusic.play();

  cannon = createSprite(windowWidth - 165, windowHeight / 2, 100, 110);
  cannon.addImage(cannonImg);
  cannon.scale = 0.16;

  rocks[0] = new Rock(145, windowHeight / 2 + 70);
  cannonBalls[0] = new CannonBall(cannon.x - 35, cannon.y - 25);

  slingshot = new SlingShot(rocks[0].body, {
    x: 152,
    y: windowHeight / 2 + 65,
  });

  PLAY_ICON = createSprite(
    windowWidth / 2 + 160,
    windowHeight / 2 + 80,
    10,
    10
  );
  PLAY_ICON.addImage("play", playIconImg);
  PLAY_ICON.scale = 0.18;

  MENU_ICON = createSprite(windowWidth - 200, windowHeight - 50, 10, 10);
  MENU_ICON.addImage("menu", menuIconImg);
  MENU_ICON.scale = 0.12;

  BACK_ICON = createSprite(50, 30, 10, 10);
  BACK_ICON.addImage("back", backIconImg);
  BACK_ICON.scale = 0.1;
  BACK_ICON.visible = false;

  INSTRUCTIONS_PAGE = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  INSTRUCTIONS_PAGE.addImage("instructions", instructionsImg);
  INSTRUCTIONS_PAGE.scale = 0.24;
  INSTRUCTIONS_PAGE.visible = false;

  CLOSE_ICON = createSprite(
    INSTRUCTIONS_PAGE.x + 245,
    INSTRUCTIONS_PAGE.y - 190,
    10,
    10
  );
  CLOSE_ICON.addImage("close", closeIconImg);
  CLOSE_ICON.scale = 0.065;
  CLOSE_ICON.visible = false;

  GAMEOVER_ICON = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  GAMEOVER_ICON.addImage(gameOverIcon);
  GAMEOVER_ICON.scale = 0.65;
  GAMEOVER_ICON.visible = false;

  WIN_ICON = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  WIN_ICON.addImage(winIcon);
  WIN_ICON.scale = 0.32;
  WIN_ICON.visible = false;

  CROSS_ICON = createSprite(
    windowWidth / 2 + 130,
    windowHeight / 2 + 235,
    10,
    10
  );
  CROSS_ICON.addImage(crossIcon);
  CROSS_ICON.scale = 1;
  CROSS_ICON.visible = false;

  TICK_ICON = createSprite(
    windowWidth / 2 - 85,
    windowHeight / 2 + 230,
    10,
    10
  );
  TICK_ICON.addImage(tickIcon);
  TICK_ICON.scale = 1;
  TICK_ICON.visible = false;

  slingShotSprite = createSprite(149, windowHeight / 2 + 110, 30, 130);
  slingShotSprite.addAnimation("slingshot", slingShotImg);
  slingShotSprite.addAnimation("explosion", bombExplosion);
  slingShotSprite.visible = false;

  //CREATING THE GROUPS//
  bombGroup = new Group();
}

function setup1() {
  var canvas = createCanvas(windowWidth, windowHeight);
  //var canvas = createCanvas(1100, 550);
  engine = Engine.create();
  world = engine.world;

  cannon = createSprite(windowWidth - 165, windowHeight / 2, 100, 110);
  cannon.addImage(cannonImg);
  cannon.scale = 0.16;

  rocks[0] = new Rock(145, windowHeight / 2 + 70);
  cannonBalls[0] = new CannonBall(cannon.x - 35, cannon.y - 25);

  slingshot = new SlingShot(rocks[0].body, {
    x: 152,
    y: windowHeight / 2 + 65,
  });

  BACK_ICON = createSprite(50, 30, 10, 10);
  BACK_ICON.addImage("back", backIconImg);
  BACK_ICON.scale = 0.1;
  BACK_ICON.visible = false;

  slingShotSprite = createSprite(149, windowHeight / 2 + 110, 30, 130);
  slingShotSprite.addAnimation("slingshot", slingShotImg);
  slingShotSprite.addAnimation("explosion", bombExplosion);
  slingShotSprite.visible = false;

  //CREATING THE GROUPS//
  bombGroup = new Group();
}

function draw() {
  //GAMESTATE HOME//
  if (gameState === HOME) {
    background(homePageBackground);
    drawSprites();

    PLAY_ICON.visible = true;
    MENU_ICON.visible = true;
    plane.visible = false;
    cannon.visible = false;

    //MOUSE OVER PLAY BUTTON//
    if (mouseIsOver(PLAY_ICON)) {
      PLAY_ICON.scale = 0.19;
    } else {
      PLAY_ICON.scale = 0.18;
    }
    enemyPoints = 4;
    playerPoints = 4;

    //MOUSE OVER MENU BUTTON//
    if (mouseIsOver(MENU_ICON)) {
      MENU_ICON.scale = 0.13;
    } else {
      MENU_ICON.scale = 0.12;
    }

    if (gameState === HOME && mousePressedOver(PLAY_ICON)) {
      reset();
      gameState = PLAY;
      clickSound.play();
      PLAY_ICON.visible = false;
      MENU_ICON.visible = false;
    }

    if (mousePressedOver(MENU_ICON)) {
      gameState = INSTRUCTIONS;
      clickSound.play();
    }
  }

  //GAMESTATE INSTRUCTIONS//
  if (gameState === INSTRUCTIONS) {
    INSTRUCTIONS_PAGE.visible = true;
    CLOSE_ICON.visible = true;
    MENU_ICON.scale = 0.12;

    //MOUSE OVER CLOSE BUTTON//
    if (mouseIsOver(CLOSE_ICON)) {
      CLOSE_ICON.scale = 0.075;
    } else {
      CLOSE_ICON.scale = 0.065;
    }

    if (mousePressedOver(CLOSE_ICON)) {
      gameState = HOME;
      clickSound.play();
      INSTRUCTIONS_PAGE.visible = false;
      CLOSE_ICON.visible = false;
    }

    stroke("black");
    fill("black");
    textSize(20);
    text(
      "If the game stops, please refresh the page :)",
      windowWidth / 2 - 50,
      windowHeight / 2 + 80
    );
    drawSprites();
  }

  if (gameState === END) {
    background(endBackground);

    BACK_ICON.visible = false;
    GAMEOVER_ICON.visible = true;
    CROSS_ICON.visible = true;
    TICK_ICON.visible = true;
    PLAY_ICON.visible = false;
    MENU_ICON.visible = false;

    bombGroup.destroyEach();
    plane.visible = false;
    cannon.visible = false;
    slingShotSprite.visible = false;
    enemyPoints = 4;
    playerPoints = 4;
    planeCrashing.stop();

    //MOUSE OVER TICK BUTTON//
    if (mouseIsOver(TICK_ICON)) {
      TICK_ICON.scale = 1.1;
    } else {
      TICK_ICON.scale = 1;
    }

    //MOUSE OVER CROSS BUTTON//
    if (mouseIsOver(CROSS_ICON)) {
      CROSS_ICON.scale = 1.08;
    } else {
      CROSS_ICON.scale = 1;
    }

    if (mousePressedOver(TICK_ICON)) {
      reset();
      gameState = PLAY;
      clickSound.play();
      GAMEOVER_ICON.visible = false;
      CROSS_ICON.visible = false;
      TICK_ICON.visible = false;
    }

    if (mousePressedOver(CROSS_ICON)) {
      gameState = HOME;
      clickSound.play();
      GAMEOVER_ICON.visible = false;
      CROSS_ICON.visible = false;
      TICK_ICON.visible = false;
    }

    drawSprites();
  }

  if (gameState === WIN) {
    background(endBackground);

    BACK_ICON.visible = false;
    GAMEOVER_ICON.visible = false;
    WIN_ICON.visible = true;
    CROSS_ICON.visible = true;
    TICK_ICON.visible = true;
    PLAY_ICON.visible = false;
    MENU_ICON.visible = false;

    bombGroup.destroyEach();
    plane.visible = false;
    cannon.visible = false;
    slingShotSprite.visible = false;
    enemyPoints = 4;
    playerPoints = 4;

    //MOUSE OVER TICK BUTTON//
    if (mouseIsOver(TICK_ICON)) {
      TICK_ICON.scale = 1.1;
    } else {
      TICK_ICON.scale = 1;
    }

    //MOUSE OVER CROSS BUTTON//
    if (mouseIsOver(CROSS_ICON)) {
      CROSS_ICON.scale = 1.08;
    } else {
      CROSS_ICON.scale = 1;
    }

    if (mousePressedOver(TICK_ICON)) {
      reset();
      gameState = PLAY;
      clickSound.play();
      GAMEOVER_ICON.visible = false;
      CROSS_ICON.visible = false;
      TICK_ICON.visible = false;
    }

    if (mousePressedOver(CROSS_ICON)) {
      gameState = HOME;
      clickSound.play();
      GAMEOVER_ICON.visible = false;
      CROSS_ICON.visible = false;
      TICK_ICON.visible = false;
    }
  }

  //GAMESTATE PLAY//
  if (gameState === PLAY) {
    rectMode(CENTER);
    background(bgBackground);
    Engine.update(engine);

    BACK_ICON.visible = true;
    PLAY_ICON.visible = false;
    MENU_ICON.visible = false;
    WIN_ICON.visible = false;
    GAMEOVER_ICON.visible = false;
    plane.visible = true;
    slingshot.display();

    rocks[0].display();
    cannonBalls[0].display();

    if (frameCount === 200) {
      Plane();
    }

    if (plane.y > windowHeight + 500) {
      delete Plane();
    }

    scores();

    //rock hitting enemy
    if (
      rocks[0].body.position.x > windowWidth - 160 &&
      rocks[0].body.position.y > windowHeight / 2 - 50 &&
      rocks[0].body.position.x < windowWidth - 120 &&
      rocks[0].body.position.y < windowHeight / 2 + 55
    ) {
      cannonImpactSound.play();
      rocks.splice(1, rocks.length);
      rocks.unshift(new Rock(145, windowHeight / 2 + 70));
      slingshot = new SlingShot(rocks[0].body, {
        x: 152,
        y: windowHeight / 2 + 65,
      });
      rocks[0].trajectory = [];
      enemyPoints = enemyPoints - 1;
    }

    //if cannon ball collides with the slingshot, it will explode & gamestate will be equal to end
    if (
      cannonBalls[0].body.position.x < 170 &&
      cannonBalls[0].body.position.y > windowHeight / 2 + 40 &&
      cannonBalls[0].body.position.y < windowHeight / 2 + 160 &&
      cannonBalls[0].body.position.x > 100
    ) {
      slingshotImpactSound.play();
      cannonBalls.splice(1, cannonBalls.length);
      cannonBalls.unshift(new CannonBall(cannon.x - 35, cannon.y - 25));
      playerPoints = playerPoints - 1;
    }

    if (enemyPoints === 0) {
      gameState = WIN;
      winSound.play();
    }

    if (playerPoints === 0) {
      gameState = END;
      failSound.play();
    }

    //spawning the cannon balls when it goes out of screen
    if (
      cannonBalls[0].body.position.y > windowHeight - 75 ||
      cannonBalls[0].body.position.x > windowWidth ||
      cannonBalls[0].body.position.x < 0 ||
      cannonBalls[0].body.position.y < 0
    ) {
      cannonBalls.splice(1, cannonBalls.length);
      cannonBalls.unshift(new CannonBall(cannon.x - 35, cannon.y - 25));
    }

    //computer shooting the cannon balls
    if (frameCount % 170 === 0) {
      Matter.Body.setStatic(cannonBalls[0].body, false);
      Matter.Body.applyForce(
        cannonBalls[0].body,
        cannonBalls[0].body.position,
        { x: random(-17, -18), y: random(-6, -9) }
      );
    }

    if (mouseIsOver(BACK_ICON)) {
      //MOUSE OVER BACK BUTTON//
      BACK_ICON.scale = 0.11;
    } else {
      BACK_ICON.scale = 0.1;
    }

    if (mousePressedOver(BACK_ICON)) {
      gameState = HOME;
      clickSound.play();
      PLAY_ICON.visible = true;
      MENU_ICON.visible = true;
      //MUSICON_ICON.visible = true;
      //MUSICOFF_ICON.visible = true;
      BACK_ICON.visible = false;
      bombGroup.destroyEach();
    }

    //spawning new rock when it goes out of screen
    if (
      rocks[0].body.position.y > windowHeight - 40 ||
      rocks[0].body.position.x > windowWidth ||
      rocks[0].body.position.x < 0 ||
      rocks[0].body.position.y < 0
    ) {
      rocks.splice(1, rocks.length);
      rocks.unshift(new Rock(145, windowHeight / 2 + 70));
      slingshot = new SlingShot(rocks[0].body, {
        x: 152,
        y: windowHeight / 2 + 65,
      });
      rocks[0].trajectory = [];
    }

    //spawning bomb
    if (
      plane.x < random(windowWidth / 2 - 491, windowWidth / 2 - 410) &&
      plane.x > random(windowWidth / 2 - 494, windowWidth / 2 - 415) &&
      plane.y < 200
    ) {
      bombDroppingSound.play();
      bomb = new Bomb();
    }

    //bomb exploding after it has collided with the slingshot
    for (var c = 0; c < bombGroup.length; c++) {
      if (bombGroup[c].isTouching(slingShotSprite)) {
        bombGroup[c].destroy();
        explosionSound.play();
        slingShotSprite.visible = true;
        slingShotSprite.changeAnimation("explosion", bombExplosion);
        setTimeout(function () {
          gameState = END;
        }, 1000);
        failSound.play();
      }
    }

    //rock colliding with plane
    if (
      rocks[0].body.position.x > plane.x - 65 &&
      rocks[0].body.position.x < plane.x + 60 &&
      rocks[0].body.position.y < plane.y + 20 &&
      rocks[0].body.position.y > plane.y - 18
    ) {
      rocks.splice(1, rocks.length);
      rocks.unshift(new Rock(145, windowHeight / 2 + 70));
      slingshot = new SlingShot(rocks[0].body, {
        x: 152,
        y: windowHeight / 2 + 65,
      });
      rocks[0].trajectory = [];
      PlaneCrashingDown();
      planeCrashing.play();
    }
  }

  drawSprites();
}

function mouseDragged() {
  for (var i = 0; i < rocks.length; i++) {
    Matter.Body.setPosition(rocks[i].body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  slingshot.fly();
}

function Bomb() {
  var bomb = createSprite(plane.x, plane.y, 100, 50);
  bomb.addImage("bomb", bombImg);
  //bomb.addAnimation("exploding", bombExplosion);
  bomb.velocityY = 7;
  bomb.velocityX = -3;
  bomb.depth < plane.depth;
  bomb.scale = 0.05;
  bombGroup.add(bomb);
}

function reset() {
  setup1();
  enemyPoints = 4;
  playerPoints = 4;
}

function Plane() {
  plane = createSprite(windowWidth + 600, 50, 100, 50);
  plane.addImage("flying", planeImg);
  plane.addImage("falling", planeFalling);
  plane.y = Math.round(random(100, 180));
  plane.velocityX = -4;
  plane.scale = 0.27;
  plane.lifetime = 650;
}

function PlaneCrashingDown() {
  plane.x = plane.x;
  plane.y = plane.y;
  plane.velocityY = 6;
  plane.velocityX = -5;
  plane.changeImage("falling", planeFalling);
}

function scores() {
  textSize(25);
  fill("black");
  text("Enemy Life:   " + enemyPoints, windowWidth / 2 + 50, 50);

  textSize(25);
  fill("black");
  text("Your Life:   " + playerPoints, windowWidth / 2 - 250, 50);
}

function musicOn() {
  backgroundMusic.play();
}
