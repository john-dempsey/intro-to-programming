// What changed: each Ball now has a velocity (vx, vy) and a move()
// method, called every frame in draw() so the balls animate.
class Ball {
    constructor(x, y, vx, vy, d, c) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.diameter = d;
        this.col = c;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
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

    balls = [
        new Ball(100, 100,  2,  1, 60,  color(255, 0, 100, 200)),
        new Ball(300, 150, -1,  2, 100, color(0, 200, 100, 180)),
        new Ball(500, 80,   1, -1, 40,  color(0, 100, 255, 160)),
        new Ball(200, 280,  3, -2, 80,  color(255, 200, 0, 200)),
        new Ball(450, 270, -2, -1, 100, color(200, 0, 255, 150))
    ];
}

function draw() {
    background(bg);

    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].display();
    }
}
