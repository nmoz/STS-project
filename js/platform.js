class Platform {
    constructor(x, y){
        var options = {
            'restitution': 0,
            'friction': 0.1,
            'density': 5,
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, 85, 40, options);
        this.width = 85;
        this.height = 40;
        this.image = loadImage("images/characters/ground.png");
        World.add(world, this.body);
    }

    display(){
        imageMode(CENTER);
        image(this.image, this.body.position.x, this.body.position.y, 125, 50);
    }
}