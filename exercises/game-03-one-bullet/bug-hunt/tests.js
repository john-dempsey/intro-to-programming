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
        testCannonTop();
        testBulletMoves();
        testBulletOffScreen();
        testOnlyOneBullet();
    } catch (error) {
        console.error("A test crashed: " + error.message);
    }

    console.log("--- Tests finished ---");
}

// --- Ship tests (unchanged from stage 2) ---

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

function testShipStaysOnCanvas() {
    let testShip = makeTestShip(27);
    testShip.move(-1);
    check("stops at the left edge", testShip.x, 25);

    testShip = makeTestShip(width - 27);
    testShip.move(1);
    check("stops at the right edge", testShip.x, width - 25);

    testShip = makeTestShip(width / 2);
    for (let i = 0; i < 1000; i++) {
        testShip.move(1);
    }
    check("still at the right edge after 1000 moves", testShip.x, width - 25);
}

// --- New in stage 3 ---

// The test ship's centre is at y = 200, its body is 20 high and its
// cannon is 10 high, so the cannon's top is 200 - 10 - 10 = 180.
function testCannonTop() {
    let testShip = makeTestShip(100);
    check("cannon top is above the body", testShip.cannonTopY(), 180);
}

function makeTestBullet(startY) {
    return new Bullet(100, startY, 4, 12, 8, color(255));
}

function testBulletMoves() {
    let testBullet = makeTestBullet(300);
    testBullet.move();
    check("bullet moves up by its speed", testBullet.y, 292);
    check("bullet doesn't move sideways", testBullet.x, 100);
}

// The test bullet is 12 high, so its bottom edge is 6 below its centre.
function testBulletOffScreen() {
    check("bullet in the middle is on screen", makeTestBullet(300).isOffScreen(), false);
    check("bullet just touching the top is on screen", makeTestBullet(-6).isOffScreen(), false);
    check("bullet just past the top is off screen", makeTestBullet(-7).isOffScreen(), true);
}

// This test changes the game's real bullet variable, so it puts it back
// to null at the end, leaving the game as it found it.
function testOnlyOneBullet() {
    bullet = null;
    fireBullet();
    check("firing creates a bullet", bullet !== null, true);

    let firstBullet = bullet;
    fireBullet();
    check("firing again while a bullet is on screen does nothing", bullet, firstBullet);

    bullet = null;
}
