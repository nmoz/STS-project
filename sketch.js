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


var rocks = [];
var platforms = [];
var enemies = [];
var cannonBalls = [];



function preload() {
	//PRELOADING FRONT PAGE ICONS//
	homePageBackground = loadImage("images/backgrounds/homeBackground.png");
	playIconImg = loadImage("images/icons/PLAY_ICON.png");
	menuIconImg = loadImage("images/icons/MENU_ICON.png");
	backIconImg = loadImage("images/icons/BACK_ICON.png");
	instructionsImg = loadImage("images/icons/INSTRUCTIONS_ICON.png");
	closeIconImg = loadImage("images/icons/CLOSE_ICON.png");

	//PRELOADING END STATE ICONS//
	gameOverIcon = loadImage("images/icons/GAMEOVER_ICON.png");
	crossIcon = loadImage("images/icons/CROSS_ICON.png");
	tickIcon = loadImage("images/icons/TICK_ICON.png");

	//PRELOADING SOUND//
	clickSound = loadSound("sounds/click.mp3");
	backgroundMusic = loadSound("sounds/music.mp3")
	explosionSound = loadSound("sounds/explosionSound.mp3");
	airplaneSound = loadSound("sounds/airplane1.mp3");
	failSound = loadSound("sounds/failSound.mp3");

	//PRELOADING GAME OBJECTS//
	gameBackground = loadImage("images/backgrounds/gameBackground.jpg");
	endBackground = loadImage("images/backgrounds/endBackground.jpg")
	planeImg = loadImage("images/characters/plane.png")
	plane2Img = loadImage("images/characters/plane.png")
	princeImg = loadImage("images/characters/prince.png");
	castleImg = loadImage("images/characters/castle.png");
	hillImg = loadImage("images/characters/hill.png");
	slingShotImg = loadImage("images/characters/slingShotSprite.png")
	bombImg = loadImage("images/bomb/bomb.png");
	bombExplosion = loadAnimation("images/bomb/bomb1.png", "images/bomb/bomb2.png", "images/bomb/bomb3.png",
		"images/bomb/bomb4.png", "images/bomb/bomb5.png", "images/bomb/bomb6.png", "images/bomb/bomb7.png", "images/bomb/bomb8.png");

}


function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	//var canvas = createCanvas(1100, 550);
	engine = Engine.create();
	world = engine.world;

	backgroundMusic.play();

	rocks[0] = new Rock(windowWidth/2, windowHeight - 445);
	platforms[0] = new Platform(random(500, windowWidth - 50), (150, windowHeight - 200));
	enemies[0] = new Enemy(platforms[0].body.position.x + 30, platforms[0].body.position.y - 50);
	cannonBalls[0] = new CannonBall(enemies[0].body.position.x - 68, enemies[0].body.position.y + 7);

	slingshot = new SlingShot(rocks[0].body, { x: 158, y: windowHeight - 450 });

	PLAY_ICON = createSprite(windowWidth / 2 + 160, windowHeight / 2 + 80, 10, 10);
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
	INSTRUCTIONS_PAGE.scale = 0.8;
	INSTRUCTIONS_PAGE.visible = false;

	CLOSE_ICON = createSprite(INSTRUCTIONS_PAGE.x + 245, INSTRUCTIONS_PAGE.y - 190, 10, 10);
	CLOSE_ICON.addImage("close", closeIconImg);
	CLOSE_ICON.scale = 0.065;
	CLOSE_ICON.visible = false;

	GAMEOVER_ICON = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
	GAMEOVER_ICON.addImage(gameOverIcon);
	GAMEOVER_ICON.scale = 0.65;
	GAMEOVER_ICON.visible = false;

	CROSS_ICON = createSprite(windowWidth / 2 + 130, windowHeight / 2 + 235, 10, 10);
	CROSS_ICON.addImage(crossIcon);
	CROSS_ICON.scale = 1;
	CROSS_ICON.visible = false;

	TICK_ICON = createSprite(windowWidth / 2 - 85, windowHeight / 2 + 230, 10, 10);
	TICK_ICON.addImage(tickIcon);
	TICK_ICON.scale = 1;
	TICK_ICON.visible = false;

	hill = createSprite(150, windowHeight - 95)
	hill.addImage(hillImg);
	hill.scale = 0.45;
	hill.visible = false;

	castle = createSprite(150, windowHeight - 310)
	castle.addImage(castleImg);
	castle.scale = 0.34;
	castle.visible = false;

	slingShotSprite = createSprite(155, windowHeight - 420, 25, 45);
	slingShotSprite.addAnimation("slingshot", slingShotImg);
	slingShotSprite.addAnimation("explosion", bombExplosion);
	slingShotSprite.visible = false;

	hillBody = Bodies.rectangle(170, windowHeight - 75, 200, 150, { isStatic: true }, { restitution: 0 });
	World.add(world, hillBody);

	castle1 = Bodies.rectangle(160, windowHeight - 225, 150, 120, { isStatic: true });
	World.add(world, castle1);

	castle3 = Bodies.rectangle(150, windowHeight - 350, 60, 60, { isStatic: true });
	World.add(world, castle3);

	//CREATING THE GROUPS//
	bombGroup = new Group();

}

function setup1() {
	var canvas = createCanvas(windowWidth, windowHeight);
	//var canvas = createCanvas(1100, 550);
	engine = Engine.create();
	world = engine.world;

	//backgroundMusic.play();
	rocks[0] = new Rock(150, windowHeight - 445);
	slingshot = new SlingShot(rocks[0].body, { x: 158, y: windowHeight - 450 });
	platforms[0] = new Platform(random(500, windowWidth - 50), (150, windowHeight - 200));
	enemies[0] = new Enemy(platforms[0].body.position.x + 30, platforms[0].body.position.y - 50);
	cannonBalls[0] = new CannonBall(enemies[0].body.position.x - 68, enemies[0].body.position.y + 7);

	BACK_ICON = createSprite(50, 30, 10, 10);
	BACK_ICON.addImage("back", backIconImg);
	BACK_ICON.scale = 0.1;
	BACK_ICON.visible = false;

	hill = createSprite(150, windowHeight - 95)
	hill.addImage(hillImg);
	hill.scale = 0.45;

	castle = createSprite(150, windowHeight - 310)
	castle.addImage(castleImg);
	castle.scale = 0.34;

	slingShotSprite = createSprite(155, windowHeight - 420, 25, 45);
	slingShotSprite.addAnimation("slingshot", slingShotImg);
	slingShotSprite.addAnimation("explosion", bombExplosion);
	slingShotSprite.visible = false;

	hillBody = Bodies.rectangle(170, windowHeight - 75, 200, 150, { isStatic: true }, { restitution: 0 });
	World.add(world, hillBody);

	castle1 = Bodies.rectangle(160, windowHeight - 225, 150, 120, { isStatic: true });
	World.add(world, castle1);

	castle3 = Bodies.rectangle(150, windowHeight - 350, 60, 60, { isStatic: true });
	World.add(world, castle3);

	//spawning plane after 20 seconds
	//setTimeout(function() {Plane()}, 1000);
	//setTimeout(function() {Plane()}, 2000);

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
		hill.visible = false;
		castle.visible = false;


		//MOUSE OVER PLAY BUTTON//
		if (mouseIsOver(PLAY_ICON)) {
			PLAY_ICON.scale = 0.19;
		} else {
			PLAY_ICON.scale = 0.18;
		}

		//MOUSE OVER MENU BUTTON//
		if (mouseIsOver(MENU_ICON)) {
			MENU_ICON.scale = 0.13;
		} else {
			MENU_ICON.scale = 0.12;
		}

		if (gameState === HOME && mousePressedOver(PLAY_ICON)) {
			setup1();
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
		drawSprites();
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
		hill.visible = false;
		castle.visible = false;
		plane.visible = false;
		slingShotSprite.visible = false;

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

	//GAMESTATE PLAY//
	if (gameState === PLAY) {
		rectMode(CENTER);
		background(gameBackground);

		BACK_ICON.visible = true;
		PLAY_ICON.visible = false;
		MENU_ICON.visible = false;

		hill.visible = true;
		plane.visible = true;
		castle.visible = true;
		slingshot.display();

		rocks[0].display();
		platforms[0].display();
		cannonBalls[0].display();
		enemies[0].display();
		
		if(frameCount === 200){
			Plane();
		}

		//creating new enemies and platforms
		if (enemies[0].body.position.y > platforms[0].body.position.y + 15 || enemies[0].body.position.y > windowHeight - 100) {
			platforms.push(new Platform(random(500, windowWidth - 100), (150, windowHeight - 150)));
			platforms.splice(0, 1);
			enemies.splice(0, 1);
			enemies.push(new Enemy(platforms[0].body.position.x + 30, platforms[0].body.position.y - 50));

		}		


		//spawning the cannon balls when released
		if (cannonBalls[0].body.position.y > windowHeight - 75 || cannonBalls[0].body.position.x > windowWidth || cannonBalls[0].body.position.x < 0 || cannonBalls[0].body.position.y < 0) {
			cannonBalls.push(new CannonBall(enemies[0].body.position.x - 68, enemies[0].body.position.y + 7));
			cannonBalls.splice(0, 1);
		}


		//computer shooting the cannon balls
		if (frameCount % 200 === 0 && cannonBalls[0].body.position.x > windowWidth / 2 - 200) {
			if (enemies[0].body.position.x > windowWidth / 2 + 50) {
				Matter.Body.setStatic(cannonBalls[0].body, false);
				Matter.Body.applyForce(cannonBalls[0].body, cannonBalls[0].body.position, { x: random(-10, -24), y: random(-5, -22) });
			} else {
				Matter.Body.setStatic(cannonBalls[0].body, false);
				Matter.Body.applyForce(cannonBalls[0].body, cannonBalls[0].body.position, { x: random(-7, -11), y: random(-3, -8) });
			}
		}


		//MOUSE OVER BACK BUTTON//
		if (mouseIsOver(BACK_ICON)) {
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

		//spawning new rock
		if (rocks[0].body.position.y > windowHeight - 40 || rocks[0].body.position.x > windowWidth || rocks[0].body.position.x < 0 || rocks[0].body.position.y < 0) {
			spawnRock();
		}

		//to bring the rock back to the slingshot when it is released at the start
		if(rocks[0].body.position.x < 165 && rocks[0].body.position.x > 135 && rocks[0].body.position.y < windowHeight - 380 && rocks[0].body.position.y > windowHeight - 410){
			spawnRock()
		}

		//spawning bomb 
		if (plane.x < random(windowWidth / 2 - 490, windowWidth / 2 - 410) && plane.x > random(windowWidth / 2 - 495, windowWidth / 2 - 415) ) {
			bomb = new Bomb();
		}


		//bomb exploding after it has collided with the slingshot
		for (var c = 0; c < bombGroup.length; c++) {
			if (bombGroup[c].isTouching(slingShotSprite)) {
				bombGroup[c].destroy();
				explosionSound.play();
				slingShotSprite.visible = true;
				slingShotSprite.changeAnimation("explosion", bombExplosion);
				setTimeout(function () { gameState = END; }, 1000);
				failSound.play();
			}
		}

		//if cannon ball collides with the slingshot, gamestate will be equal to end
		if (cannonBalls[0].body.position.x < 160 && cannonBalls[0].body.position.y > 240 && cannonBalls[0].body.position.y < 360) {
			gameState = END;
		}

		//rock colliding with plane
		if (rocks[0].body.position.x > plane.x - 65 && rocks[0].body.position.x < plane.x + 60 && rocks[0].body.position.y < plane.y + 20 && rocks[0].body.position.y > plane.y - 18) {
			rocks.push(new Rock(150, windowHeight - 445));
			rocks.splice(0, 1);
			slingshot = new SlingShot(rocks[0].body, { x: 158, y: windowHeight - 450 });
			rocks[0].trajectory = [];
			plane.destroy();
		}
	}

	drawSprites();
	Engine.update(engine);
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
}

function Plane() {
	plane = createSprite(windowWidth + 100, 50, 100, 50);
	plane.addImage(planeImg);
	plane.y = Math.round(random(50, 120));
	plane.velocityX = -3.5;
	plane.scale = 0.27;
	plane.lifetime = 500;
}


function spawnRock() {
	rocks.push(new Rock(150, windowHeight - 445));
	rocks.splice(0, 1);
	slingshot = new SlingShot(rocks[0].body, { x: 158, y: windowHeight - 450 });
	rocks[0].trajectory = [];
}