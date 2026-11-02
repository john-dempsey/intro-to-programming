// What changed: move() now bounces the ball off the edges of the canvas
// by reversing its velocity, instead of wrapping it to the other side.
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

        let radius = this.diameter / 2;

        if (this.diameter > width) {
            this.x = width / 2;
            this.vx = 0;
        } else if (this.x + radius > width) {
            this.x = width - radius;
            this.vx *= -1;
        } else if (this.x - radius < 0) {
            this.x = radius;
            this.vx *= -1;
        }

        if (this.diameter > height) {
            this.y = height / 2;
            this.vy = 0;
        } else if (this.y + radius > height) {
            this.y = height - radius;
            this.vy *= -1;
        } else if (this.y - radius < 0) {
            this.y = radius;
            this.vy *= -1;
        }
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
