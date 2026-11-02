// What changed: instead of one ball, setup() creates an array of several
// Ball instances and a loop displays each one.
class Ball {
    constructor(x, y, d, c) {
        this.x = x;
        this.y = y;
        this.diameter = d;
        this.col = c;
    }

    display() {
        noStroke();
        fill(this.col);
        circle(this.x, this.y, this.diameter);
    }
}

let balls;

const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    balls = [
        new Ball(100, 100, 60,  color(255, 0, 100, 200)),
        new Ball(300, 150, 100, color(0, 200, 100, 180)),
        new Ball(500, 80,  40,  color(0, 100, 255, 160)),
        new Ball(200, 280, 80,  color(255, 200, 0, 200)),
        new Ball(450, 270, 100, color(200, 0, 255, 150))
    ];

    textAlign(CENTER, CENTER);

    for (let i = 0; i < balls.length; i++) {
        balls[i].display();
        fill(0);
        text("Ball " + i, balls[i].x, balls[i].y);
    }
}

function draw() {
}
