// What changed: building the ball object literal is now done inside a
// createBall() function instead of being written out in setup().
function createBall(x, y, d, c) {
    let b = {
        x: x,
        y: y,
        diameter: d,
        col: c
    };
    return b;
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

    noStroke();
    fill(ball.col);
    circle(ball.x, ball.y, ball.diameter);
}

function keyPressed() {
    background(bg);
}
