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
        testFireAddsBullets();
        testRemoveOffScreenBullets();
        testAlienGridSize();
        testAlienGridPositions();
        testAlienGridColours();
        testAliensFitOnCanvas();
        testAlienMoveBy();
        testFormationAtEdge();
        testMarchSideways();
        testMarchAtEdge();
        testWholeFormationTurns();
        testGetBounds();
        testBoundsOverlap();
        testHitRemovesBoth();
        testMissRemovesNothing();
        testRightAlienRemoved();
        testOneBulletDestroysOneAlien();
        testTwoBulletsTwoAliens();
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

// --- Bullet tests (unchanged from stage 4) ---

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

function testBulletOffScreen() {
    check("bullet in the middle is on screen", makeTestBullet(300).isOffScreen(), false);
    check("bullet just touching the top is on screen", makeTestBullet(-6).isOffScreen(), false);
    check("bullet just past the top is off screen", makeTestBullet(-7).isOffScreen(), true);
}

function testFireAddsBullets() {
    bullets = [];
    fireBullet();
    fireBullet();
    check("firing twice gives two bullets", bullets.length, 2);

    bullets = [];
}

function testRemoveOffScreenBullets() {
    let onScreen = [makeTestBullet(100), makeTestBullet(200), makeTestBullet(300)];
    removeOffScreenBullets(onScreen);
    check("keeps bullets that are on screen", onScreen.length, 3);

    let offScreen = [makeTestBullet(-50), makeTestBullet(-60), makeTestBullet(-70)];
    removeOffScreenBullets(offScreen);
    check("removes every bullet that is off screen", offScreen.length, 0);

    let mixed = [makeTestBullet(100), makeTestBullet(-50), makeTestBullet(-60), makeTestBullet(200)];
    removeOffScreenBullets(mixed);
    check("removes only the off-screen bullets", mixed.length, 2);
    check("first survivor is the right bullet", mixed[0].y, 100);
    check("second survivor is the right bullet", mixed[1].y, 200);

    let empty = [];
    removeOffScreenBullets(empty);
    check("an empty array stays empty", empty.length, 0);
}

// --- Alien grid tests (unchanged from stage 5) ---

function testAlienGridSize() {
    let grid = createAlienGrid(2, 3, [color(255)]);
    check("2 rows of 3 gives 6 aliens", grid.length, 6);

    let emptyGrid = createAlienGrid(0, 3, [color(255)]);
    check("0 rows gives no aliens", emptyGrid.length, 0);
}

// A 2 x 3 grid is stored row by row:
//   index 0, 1, 2  = top row, left to right
//   index 3, 4, 5  = second row, left to right
function testAlienGridPositions() {
    let grid = createAlienGrid(2, 3, [color(255)]);

    check("first alien x", grid[0].x, ALIEN_GRID_LEFT);
    check("first alien y", grid[0].y, ALIEN_GRID_TOP);

    check("second alien is one column right", grid[1].x, ALIEN_GRID_LEFT + ALIEN_SPACING_X);
    check("second alien is in the same row", grid[1].y, ALIEN_GRID_TOP);

    check("fourth alien starts the second row (x)", grid[3].x, ALIEN_GRID_LEFT);
    check("fourth alien starts the second row (y)", grid[3].y, ALIEN_GRID_TOP + ALIEN_SPACING_Y);

    check("last alien x", grid[5].x, ALIEN_GRID_LEFT + 2 * ALIEN_SPACING_X);
    check("last alien y", grid[5].y, ALIEN_GRID_TOP + ALIEN_SPACING_Y);
}

// With 3 rows and only 2 colours, the third row should reuse the first
// colour. === on objects is true only if they're the very same object.
function testAlienGridColours() {
    let firstColour = color(255, 0, 0);
    let secondColour = color(0, 0, 255);
    let grid = createAlienGrid(3, 1, [firstColour, secondColour]);

    check("row 0 uses the first colour", grid[0].col, firstColour);
    check("row 1 uses the second colour", grid[1].col, secondColour);
    check("row 2 repeats the first colour", grid[2].col, firstColour);
}

// Checks every alien in the real game, but prints one result rather
// than 32. Counting the problems keeps the console readable.
function testAliensFitOnCanvas() {
    let outsideCount = 0;

    for (let i = 0; i < aliens.length; i++) {
        let alien = aliens[i];
        let halfWidth = alien.alienWidth / 2;
        let halfHeight = alien.alienHeight / 2;

        if (alien.x - halfWidth < 0 || alien.x + halfWidth > width ||
            alien.y - halfHeight < 0 || alien.y + halfHeight > height) {
            outsideCount++;
            console.log("Alien " + i + " is outside the canvas at (" + alien.x + ", " + alien.y + ")");
        }
    }

    check("every alien starts on the canvas", outsideCount, 0);
    check("the game has the right number of aliens", aliens.length, ALIEN_ROWS * ALIEN_COLUMNS);
}

// --- Alien march tests (unchanged from stage 6) ---

// Test aliens are 30 wide, the same as the game's, so half their width is
// 15. An alien is at the right edge when its centre is at width - 15.
function makeTestAlien(x, y) {
    return new Alien(x, y, 30, 20, color(255));
}

function testAlienMoveBy() {
    let testAlien = makeTestAlien(100, 100);
    testAlien.moveBy(5, -3);
    check("moveBy changes x", testAlien.x, 105);
    check("moveBy changes y", testAlien.y, 97);
}

function testFormationAtEdge() {
    let middle = [makeTestAlien(300, 100)];
    check("alien in the middle is not at an edge (right)", formationAtEdge(middle, 1), false);
    check("alien in the middle is not at an edge (left)", formationAtEdge(middle, -1), false);

    // Exactly on the boundary: one more step right would put the
    // alien's edge just past the canvas edge.
    let atRight = [makeTestAlien(width - 15, 100)];
    check("one step from the right edge, moving right", formationAtEdge(atRight, 1), true);
    check("one step from the right edge, moving left", formationAtEdge(atRight, -1), false);

    let nearlyAtRight = [makeTestAlien(width - 16, 100)];
    check("can take one more step right before the edge", formationAtEdge(nearlyAtRight, 1), false);

    let atLeft = [makeTestAlien(15, 100)];
    check("one step from the left edge, moving left", formationAtEdge(atLeft, -1), true);

    // The alien at the edge is NOT the first one in the array. Every
    // alien must be checked, not just the first.
    let mixed = [makeTestAlien(300, 100), makeTestAlien(width - 15, 100)];
    check("finds the edge alien even when it isn't first", formationAtEdge(mixed, 1), true);
}

function testMarchSideways() {
    let formation = [makeTestAlien(100, 100), makeTestAlien(150, 100)];
    let newDirection = marchAliens(formation, 1);

    check("direction is unchanged in the middle", newDirection, 1);
    check("first alien moved right", formation[0].x, 100 + ALIEN_SPEED);
    check("second alien moved right", formation[1].x, 150 + ALIEN_SPEED);
    check("aliens didn't drop", formation[0].y, 100);
}

function testMarchAtEdge() {
    let formation = [makeTestAlien(width - 15, 100)];

    let newDirection = marchAliens(formation, 1);
    check("direction reverses at the edge", newDirection, -1);
    check("alien drops at the edge", formation[0].y, 100 + ALIEN_DROP);
    check("alien doesn't move sideways while dropping", formation[0].x, width - 15);

    // The next step, in the new direction, should move left and NOT drop
    // again. (If it drops again, the aliens slide down the edge.)
    newDirection = marchAliens(formation, newDirection);
    check("next step keeps the new direction", newDirection, -1);
    check("next step moves left", formation[0].x, width - 15 - ALIEN_SPEED);
    check("next step doesn't drop again", formation[0].y, 100 + ALIEN_DROP);
}

// When one alien reaches the edge, every alien drops, including the
// ones nowhere near the edge.
function testWholeFormationTurns() {
    let formation = [makeTestAlien(100, 100), makeTestAlien(width - 15, 100)];
    marchAliens(formation, 1);

    check("alien far from the edge drops too", formation[0].y, 100 + ALIEN_DROP);
    check("alien far from the edge doesn't move sideways", formation[0].x, 100);
}

// --- New in stage 7 ---

function makeBulletAt(x, y) {
    return new Bullet(x, y, 4, 12, 8, color(255));
}

// A 30 x 20 alien centred on (100, 100) spans 85 to 115 across and
// 90 to 110 down.
function testGetBounds() {
    let bounds = makeTestAlien(100, 100).getBounds();
    check("alien bounds left", bounds.left, 85);
    check("alien bounds right", bounds.right, 115);
    check("alien bounds top", bounds.top, 90);
    check("alien bounds bottom", bounds.bottom, 110);

    let bulletBounds = makeBulletAt(100, 100).getBounds();
    check("bullet bounds left", bulletBounds.left, 98);
    check("bullet bounds bottom", bulletBounds.bottom, 106);
}

// These use hand-written rectangles, so each case is easy to picture.
// Draw them on squared paper if it helps.
function testBoundsOverlap() {
    let square = { left: 0, right: 10, top: 0, bottom: 10 };

    let overlapping = { left: 5, right: 15, top: 5, bottom: 15 };
    check("overlapping rectangles", boundsOverlap(square, overlapping), true);
    check("overlap works in either order", boundsOverlap(overlapping, square), true);

    let inside = { left: 2, right: 8, top: 2, bottom: 8 };
    check("rectangle inside another", boundsOverlap(square, inside), true);

    let farRight = { left: 20, right: 30, top: 0, bottom: 10 };
    check("side by side, apart", boundsOverlap(square, farRight), false);

    let below = { left: 0, right: 10, top: 20, bottom: 30 };
    check("one above the other, apart", boundsOverlap(square, below), false);

    // Edge cases: touching exactly along an edge is not a hit.
    let touchingRight = { left: 10, right: 20, top: 0, bottom: 10 };
    check("touching along an edge", boundsOverlap(square, touchingRight), false);

    // Overlapping left-to-right but not top-to-bottom is not a hit.
    let sameColumnBelow = { left: 5, right: 15, top: 50, bottom: 60 };
    check("overlap in x only", boundsOverlap(square, sameColumnBelow), false);
}

function testHitRemovesBoth() {
    let testBullets = [makeBulletAt(100, 100)];
    let testAliens = [makeTestAlien(100, 100)];
    handleCollisions(testBullets, testAliens);

    check("a hit removes the bullet", testBullets.length, 0);
    check("a hit removes the alien", testAliens.length, 0);
}

function testMissRemovesNothing() {
    let testBullets = [makeBulletAt(300, 100)];
    let testAliens = [makeTestAlien(100, 100)];
    handleCollisions(testBullets, testAliens);

    check("a miss keeps the bullet", testBullets.length, 1);
    check("a miss keeps the alien", testAliens.length, 1);
}

// The alien that was hit must be the one removed, not just any alien.
function testRightAlienRemoved() {
    let testBullets = [makeBulletAt(300, 100)];
    let testAliens = [makeTestAlien(100, 100), makeTestAlien(300, 100), makeTestAlien(500, 100)];
    handleCollisions(testBullets, testAliens);

    check("only one alien removed", testAliens.length, 2);
    check("first survivor is the left alien", testAliens[0].x, 100);
    check("second survivor is the right alien", testAliens[1].x, 500);
}

// Three aliens in exactly the same place, all touching one bullet. The
// bullet can only destroy one of them. (This never happens in the game,
// but it checks that a bullet stops once it has hit something.)
function testOneBulletDestroysOneAlien() {
    let testBullets = [makeBulletAt(100, 100)];
    let testAliens = [makeTestAlien(100, 100), makeTestAlien(100, 100), makeTestAlien(100, 100)];
    handleCollisions(testBullets, testAliens);

    check("one bullet destroys only one alien", testAliens.length, 2);
    check("the bullet is used up", testBullets.length, 0);
}

function testTwoBulletsTwoAliens() {
    let testBullets = [makeBulletAt(100, 100), makeBulletAt(300, 100)];
    let testAliens = [makeTestAlien(100, 100), makeTestAlien(300, 100)];
    handleCollisions(testBullets, testAliens);

    check("both bullets used up", testBullets.length, 0);
    check("both aliens destroyed", testAliens.length, 0);
}
