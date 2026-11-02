// What changed: draws a single circle once, using hard-coded numbers.
function setup() {
    createCanvas(640, 360);

    background(230);

    // noStroke();
    stroke(0);
    fill(255, 200, 100, 150);
    circle(260, 190, 50);

    stroke(192);
    fill(255, 100, 0, 150);
    circle(160, 90, 100);

    // frameRate(3);
}

function draw() {
    console.log("draw ran");
}
