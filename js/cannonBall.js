class CannonBall {
    constructor(x, y, angle){
        var options = {
            'restitution': 0.5,
            'friction': 0.5,
            'density': 1.0,
            isStatic: true
        }

        this.body = Bodies.circle(x, y, 10, options);
        this.radius = 10;
        this.image = loadImage("images/characters/cannonball.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        rotate(angle);
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, 20, 20);
        pop();
    }
};