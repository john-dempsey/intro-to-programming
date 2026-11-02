// What changed: the circle is now drawn every frame in draw(), at the
// mouse position, instead of once in setup() at a fixed position.
function setup() {
    createCanvas(640, 360);
}

function draw() {
    background(230);

    console.log(mouseX, mouseY);

    noStroke();
    fill(255, 0, 100, 150);
    circle(mouseX, mouseY, 150);
}
