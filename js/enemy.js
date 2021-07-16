class Enemy {
    constructor(x, y, angle) {
        var options = {
            'restitution': 0.8,
            'friction': 1.0,
            'density': 1.0
        }

        this.body = Bodies.rectangle(x, y, 50, 60, options);
        this.width = 50;
        this.height = 60;
        this.image = loadImage("images/characters/enemy.png");
        this.cannon1 = loadImage("images/characters/cannon1.png");
        World.add(world, this.body);
        this.angle = 0;
    }


    display() {
        var angle = this.body.angle;
        image(this.cannon1, this.body.position.x - 55, this.body.position.y + 18, 50, 50);

        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image, 0, 0, 55, 80);
        pop();

    }
}