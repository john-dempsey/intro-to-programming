// What changed: drawing a ball is now done by a displayBall() function
// instead of being written out in mousePressed().
function createBall(x, y, d, c) {
    let b = {
        x: x,
        y: y,
        diameter: d,
        col: c
    };
    return b;
}

function displayBall(b) {
    noStroke();
    fill(b.col);
    circle(b.x, b.y, b.diameter);
}

let ball;

const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    let col = color(255, 0, 100, 150);
    ball = createBall(320, 180, 150, col);
}

function draw() {
}

function mousePressed() {
    ball.x = mouseX;
    ball.y = mouseY;

    displayBall(ball);
}

function keyPressed() {
    background(bg);
}
