// What changed: position, size and colour are no longer separate
// variables - they are bundled into one ball object literal.
let ball;

const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    let col = color(255, 0, 100, 150);

    ball = {
        x: 320,
        y: 180,
        diameter: 150,
        col: col
    };
}

function draw() {
}

function mousePressed() {
    ball.x = mouseX;
    ball.y = mouseY;

    noStroke();
    fill(ball.col);
    circle(ball.x, ball.y, ball.diameter);
}

function keyPressed() {
    background(bg);
}
