// Extra: a traffic light, built from three balls.
//
// createBall() and displayBall() are exactly the functions from sketches
// 07 and 08 — unchanged. createTrafficLight() calls createBall() three
// times to build one light; displayTrafficLight() calls displayBall()
// three times to draw it, after moving the drawing origin to the light's
// position with translate(). Once translated, every ball's position is
// just a small, fixed offset from (0, 0) — push()/pop() keep that
// temporary move from affecting anything drawn afterwards.

// --- unchanged from sketches 07/08 ---
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

// --- new: a traffic light, built from three balls ---
function createTrafficLight(x, y) {
    let t = { x: x, y: y };

    // Each ball's position is a small, fixed offset from the traffic
    // light's own (0, 0) — not from its actual on-canvas position. That's
    // only true because displayTrafficLight() translates to (x, y) before
    // drawing any of them.
    t.red = createBall(0, -70, 50, color(255, 0, 0));
    t.amber = createBall(0, 0, 50, color(255, 180, 0));
    t.green = createBall(0, 70, 50, color(0, 200, 0));

    return t;
}

function displayTrafficLight(t) {
    push();                       // remember the current origin
    translate(t.x, t.y);          // move the origin to this light's position

    noStroke();
    fill(40);
    rect(-40, -110, 80, 220, 10); // the housing, drawn relative to (0, 0)

    displayBall(t.red);           // each ball still just draws itself —
    displayBall(t.amber);         // it has no idea the origin has moved
    displayBall(t.green);

    pop();                        // restore the origin for whatever's next
}

let light1, light2;
const bg = 230;

function setup() {
    createCanvas(640, 360);
    background(bg);

    light1 = createTrafficLight(160, 180);
    light2 = createTrafficLight(480, 180);

    displayTrafficLight(light1);
    displayTrafficLight(light2);
}

function draw() {
}
