class Rock {
  constructor(x, y, angle) {
    var options = {
      density: 1,
      friction: 0.5,
    };

    this.body = Bodies.circle(x, y, 20, options);
    this.radius = 20;
    this.image = loadImage("images/characters/rock.png");
    this.smokeImage = loadImage("images/characters/smoke.png");
    this.trajectory = [];
    World.add(world, this.body);
  }

  display() {
    var angle = this.body.angle;

    if (this.body.velocity.x > 8 && this.body.position.x > 150) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.smokeImage, this.trajectory[i][0], this.trajectory[i][1]);
    }

    push();
    rotate(angle);
    imageMode(CENTER);
    image(this.image, this.body.position.x, this.body.position.y, 25, 25);
    pop();
  }
}
