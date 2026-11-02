// Automatic tests. runTests() is called once, at the end of setup().
// Open the browser console (F12, then the Console tab) to see the results.

// Compares the value we got with the value we expected, and prints
// PASS or FAIL. FAIL uses console.error so it shows up in red.
function check(description, actual, expected) {
    if (actual === expected) {
        console.log("PASS: " + description);
    } else {
        console.error("FAIL: " + description + " (expected " + expected + ", got " + actual + ")");
    }
}

function runTests() {
    console.log("--- Running tests ---");

    // If a test crashes (for example, it calls a method that doesn't
    // exist yet), report it instead of stopping the whole game.
    try {
        testShipConstructor();
        testShipStartPosition();
        testShipMoves();
        testShipStaysOnCanvas();
    } catch (error) {
        console.error("A test crashed: " + error.message);
    }

    console.log("--- Tests finished ---");
}

// Builds a ship for testing, separate from the game's real ship, so the
// tests can move it around without affecting the game.
function makeTestShip(startX) {
    return new Ship(startX, 200, 50, 20, 5, color(255));
}

function testShipConstructor() {
    let testShip = makeTestShip(100);

    check("constructor stores x", testShip.x, 100);
    check("constructor stores y", testShip.y, 200);
    check("constructor stores bodyWidth", testShip.bodyWidth, 50);
    check("constructor stores speed", testShip.speed, 5);
}

function testShipStartPosition() {
    check("ship starts in the middle", ship.x, width / 2);
    check("ship starts near the bottom", ship.y, height - SHIP_MARGIN);
}

// One call to move() should change x by exactly one step of speed.
function testShipMoves() {
    let testShip = makeTestShip(100);
    testShip.move(1);
    check("moving right adds speed to x", testShip.x, 105);

    testShip = makeTestShip(100);
    testShip.move(-1);
    check("moving left subtracts speed from x", testShip.x, 95);

    testShip = makeTestShip(100);
    testShip.move(0);
    check("direction 0 leaves x unchanged", testShip.x, 100);
}

// The ship's edges (not just its centre) must stay on the canvas.
// The test ship is 50 wide, so its centre must stay between 25 and width - 25.
function testShipStaysOnCanvas() {
    let testShip = makeTestShip(27);
    testShip.move(-1);
    check("stops at the left edge", testShip.x, 25);

    testShip = makeTestShip(width - 27);
    testShip.move(1);
    check("stops at the right edge", testShip.x, width - 25);

    // Edge case: lots of moves in a row should still stop at the edge.
    testShip = makeTestShip(width / 2);
    for (let i = 0; i < 1000; i++) {
        testShip.move(1);
    }
    check("still at the right edge after 1000 moves", testShip.x, width - 25);
}
