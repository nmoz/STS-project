class SlingShot {
    constructor(bodyA, pointB) {
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10   
        }

        this.sling = Constraint.create(options);
        this.sling1 = loadImage("images/slingshot/sling1.png");
        this.sling2 = loadImage("images/slingshot/sling2.png");
        this.sling3 = loadImage("images/slingshot/sling3.png");
        this.pointB = pointB;
        World.add(world, this.sling);
    }

    attach(body){
        this.sling.bodyA = body;
    }

    fly() {
       this.sling.bodyA = null;
    }

    display() {
        image(this.sling2, 136, windowHeight - 465);
        image(this.sling1, 148, windowHeight - 465);
        

        if (this.sling.bodyA) {
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            push();

            stroke("black");
            if (pointA.x < 150) {
                strokeWeight(2);
                line(pointA.x, pointA.y, pointB.x - 15, pointB.y);
                line(pointA.x, pointA.y, pointB.x + 8, pointB.y);
                image(this.sling3, pointA.x - 18, pointA.y - 8, 8, 17);
            }
            else {
                strokeWeight(2);
                line(pointA.x, pointA.y, pointB.x - 15, pointB.y);
                line(pointA.x, pointA.y, pointB.x + 8, pointB.y );
                image(this.sling3, pointA.x + 10, pointA.y - 8, 8, 17);
            }

            pop();
        }
    }
}