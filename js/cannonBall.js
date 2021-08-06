class CannonBall {
  constructor(x, y, angle) {
    var options = {
      density: 1.0,
      isStatic: true,
    };

    this.body = Bodies.rectangle(x, y, 15, 15, options);
    this.width = 15;
    this.height = 15;
    this.image = loadImage("images/characters/cannonball.png");
    World.add(world, this.body);
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    rotate(angle);
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, 30, 30);
    pop();
  }
}
