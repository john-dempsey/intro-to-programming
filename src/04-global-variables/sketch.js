// What changed: the numbers used for position, size and colour are now
// named global variables instead of magic numbers repeated inline.
const diameter = 150;

const r = 255;
const g = 0;
const b = 100;
const opacity = 150;

const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);
}

function draw() {
}

function mousePressed() {
    noStroke();
    fill(r, g, b, opacity);
    circle(mouseX, mouseY, diameter);
}

function keyPressed() {
    background(bg);
}
