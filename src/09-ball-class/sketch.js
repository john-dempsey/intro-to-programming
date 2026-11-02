// What changed: createBall() and displayBall() are replaced by a Ball
// class - the constructor replaces createBall(), and the display()
// method replaces displayBall().
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

let ball;

const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    let col = color(255, 0, 100, 150);
    ball = new Ball(320, 180, 150, col);
}

function draw() {
}

function mousePressed() {
    ball.x = mouseX;
    ball.y = mouseY;
    ball.display();
}

function keyPressed() {
    background(bg);
}
