// What changed: draw() no longer runs the drawing code every frame.
// A circle is drawn only when the mouse is pressed, and stays on screen
// (drawing accumulates) until a key press clears the canvas.
function setup() {
    createCanvas(640, 360);
    background(230);
}

function draw() {
}

function mousePressed() {
    noStroke();
    fill(255, 0, 100, 150);
    circle(mouseX, mouseY, 150);
}

function keyPressed() {
    background(230);
}
