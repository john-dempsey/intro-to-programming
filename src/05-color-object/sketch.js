// What changed: the four separate colour numbers (red, green, blue,
// opacity) are replaced by a single color() object, col.
const diameter = 150;
let col;
const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    col = color(255, 0, 100, 150);
}

function draw() {
}

function mousePressed() {
    noStroke();
    fill(col);
    circle(mouseX, mouseY, diameter);
}

function keyPressed() {
    background(bg);
}
