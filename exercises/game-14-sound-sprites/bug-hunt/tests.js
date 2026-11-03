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

// Like check(), but for decimal numbers, which are often very slightly
// off: 0.1 + 0.2 gives 0.30000000000000004, not 0.3. Passes if actual is
// no further than tolerance from expected.
function checkClose(description, actual, expected, tolerance) {
    if (abs(actual - expected) <= tolerance) {
        console.log("PASS: " + description);
    } else {
        console.error("FAIL: " + description + " (expected " + expected + " +/- " + tolerance + ", got " + actual + ")");
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
        testWinWhenNoAliens();
        testStillPlaying();
        testLoseWhenAlienReachesShip();
        testLoseChecksEveryAlien();
        testResetGame();
        testAlienGridPoints();
        testCollisionPoints();
        testBulletMovesDown();
        testBulletOffScreenBottom();
        testAlienFires();
        testShipIsHit();
        testLoseWhenNoLives();
        testEnterChangesState();
        testHighScoreStorage();
        testAlienSpeed();
        testShieldSize();
        testShieldsFitTheGap();
        testCollideReturnsTargetsHit();
        testBulletsHitShields();
        testTotalPoints();
        testSpriteNames();
        testPlaySound();
        testFiringPlaysSound();
        testDrawingWithoutSprites();
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

// A player bullet: vy is negative, so it moves up the screen.
function makeTestBullet(startY) {
    return new Bullet(100, startY, 4, 12, -8, color(255));
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
    let grid = createAlienGrid(2, 3, [color(255)], [10]);
    check("2 rows of 3 gives 6 aliens", grid.length, 6);

    let emptyGrid = createAlienGrid(0, 3, [color(255)], [10]);
    check("0 rows gives no aliens", emptyGrid.length, 0);
}

// A 2 x 3 grid is stored row by row:
//   index 0, 1, 2  = top row, left to right
//   index 3, 4, 5  = second row, left to right
function testAlienGridPositions() {
    let grid = createAlienGrid(2, 3, [color(255)], [10]);

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
    let grid = createAlienGrid(3, 1, [firstColour, secondColour], [10]);

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

// --- Alien march tests (from stage 6, now passing the speed) ---

// The march tests below use a speed of 1, written out, so they don't
// change when the game's speeds are tuned.

// Test aliens are 30 wide, the same as the game's, so half their width is
// 15. An alien is at the right edge when its centre is at width - 15.
function makeTestAlien(x, y) {
    return new Alien(x, y, 30, 20, color(255), 10);
}

function testAlienMoveBy() {
    let testAlien = makeTestAlien(100, 100);
    testAlien.moveBy(5, -3);
    check("moveBy changes x", testAlien.x, 105);
    check("moveBy changes y", testAlien.y, 97);
}

function testFormationAtEdge() {
    let middle = [makeTestAlien(300, 100)];
    check("alien in the middle is not at an edge (right)", formationAtEdge(middle, 1, 1), false);
    check("alien in the middle is not at an edge (left)", formationAtEdge(middle, -1, 1), false);

    // Exactly on the boundary: one more step right would put the
    // alien's edge just past the canvas edge.
    let atRight = [makeTestAlien(width - 15, 100)];
    check("one step from the right edge, moving right", formationAtEdge(atRight, 1, 1), true);
    check("one step from the right edge, moving left", formationAtEdge(atRight, -1, 1), false);

    let nearlyAtRight = [makeTestAlien(width - 16, 100)];
    check("can take one more step right before the edge", formationAtEdge(nearlyAtRight, 1, 1), false);

    let atLeft = [makeTestAlien(15, 100)];
    check("one step from the left edge, moving left", formationAtEdge(atLeft, -1, 1), true);

    // The alien at the edge is NOT the first one in the array. Every
    // alien must be checked, not just the first.
    let mixed = [makeTestAlien(300, 100), makeTestAlien(width - 15, 100)];
    check("finds the edge alien even when it isn't first", formationAtEdge(mixed, 1, 1), true);
}

function testMarchSideways() {
    let formation = [makeTestAlien(100, 100), makeTestAlien(150, 100)];
    let newDirection = marchAliens(formation, 1, 1);

    check("direction is unchanged in the middle", newDirection, 1);
    check("first alien moved right", formation[0].x, 101);
    check("second alien moved right", formation[1].x, 151);
    check("aliens didn't drop", formation[0].y, 100);
}

function testMarchAtEdge() {
    let formation = [makeTestAlien(width - 15, 100)];

    let newDirection = marchAliens(formation, 1, 1);
    check("direction reverses at the edge", newDirection, -1);
    check("alien drops at the edge", formation[0].y, 100 + ALIEN_DROP);
    check("alien doesn't move sideways while dropping", formation[0].x, width - 15);

    // The next step, in the new direction, should move left and NOT drop
    // again. (If it drops again, the aliens slide down the edge.)
    newDirection = marchAliens(formation, newDirection, 1);
    check("next step keeps the new direction", newDirection, -1);
    check("next step moves left", formation[0].x, width - 16);
    check("next step doesn't drop again", formation[0].y, 100 + ALIEN_DROP);
}

// When one alien reaches the edge, every alien drops, including the
// ones nowhere near the edge.
function testWholeFormationTurns() {
    let formation = [makeTestAlien(100, 100), makeTestAlien(width - 15, 100)];
    marchAliens(formation, 1, 1);

    check("alien far from the edge drops too", formation[0].y, 100 + ALIEN_DROP);
    check("alien far from the edge doesn't move sideways", formation[0].x, 100);
}

// --- Collision tests (unchanged from stage 7) ---

function makeBulletAt(x, y) {
    return new Bullet(x, y, 4, 12, -8, color(255));
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

// --- Win and lose tests (from stage 8, now with lives) ---

function testWinWhenNoAliens() {
    check("no aliens left means the player has won", checkGameState([], 400, 3), STATE_WON);
}

function testStillPlaying() {
    let farAway = [makeTestAlien(100, 100)];
    check("aliens far above the ship: still playing", checkGameState(farAway, 400, 3), STATE_PLAYING);
}

// Test aliens are 20 high, so an alien at y = 390 has its bottom at 400.
function testLoseWhenAlienReachesShip() {
    let touching = [makeTestAlien(100, 390)];
    check("alien's bottom exactly at the ship's top: lost", checkGameState(touching, 400, 3), STATE_LOST);

    let nearlyTouching = [makeTestAlien(100, 389)];
    check("alien one pixel above the ship: still playing", checkGameState(nearlyTouching, 400, 3), STATE_PLAYING);
}

// The lowest alien isn't always the first in the array.
function testLoseChecksEveryAlien() {
    let formation = [makeTestAlien(100, 100), makeTestAlien(200, 100), makeTestAlien(300, 395)];
    check("finds the low alien even when it isn't first", checkGameState(formation, 400, 3), STATE_LOST);
}

// This test messes up the real game on purpose, then checks resetGame()
// puts every part of it back. It finishes with a fresh game, so it's
// safe to run before playing.
function testResetGame() {
    gameState = STATE_LOST;
    aliens = [];
    bullets = [makeBulletAt(100, 100)];
    alienBullets = [makeBulletAt(200, 200)];
    alienDirection = -1;
    ship.x = 50;
    score = 500;
    lives = 0;
    newHighScore = true;
    shieldBlocks = [];

    resetGame();

    check("reset: state is playing", gameState, STATE_PLAYING);
    check("reset: full set of aliens", aliens.length, ALIEN_ROWS * ALIEN_COLUMNS);
    check("reset: no bullets", bullets.length, 0);
    check("reset: aliens move right", alienDirection, 1);
    check("reset: ship back in the middle", ship.x, width / 2);
    check("reset: score back to 0", score, 0);
    check("reset: no alien bullets", alienBullets.length, 0);
    check("reset: lives back to the start", lives, STARTING_LIVES);
    check("reset: no new high score yet", newHighScore, false);
    check("reset: shields rebuilt", shieldBlocks.length, SHIELD_COUNT * SHIELD_ROWS * SHIELD_COLUMNS);
}

// --- Score tests (unchanged from stage 9) ---

// Three rows, two values: the third row repeats the first value.
function testAlienGridPoints() {
    let grid = createAlienGrid(3, 2, [color(255)], [30, 10]);
    check("top row worth 30", grid[0].points, 30);
    check("whole row has the same points", grid[1].points, 30);
    check("second row worth 10", grid[2].points, 10);
    check("third row repeats the first value", grid[4].points, 30);
}

function makeAlienWorth(x, points) {
    return new Alien(x, 100, 30, 20, color(255), points);
}

function testCollisionPoints() {
    let testBullets = [makeBulletAt(300, 100)];
    let testAliens = [makeAlienWorth(100, 30)];
    check("a miss scores nothing", handleCollisions(testBullets, testAliens), 0);

    testBullets = [makeBulletAt(100, 100)];
    testAliens = [makeAlienWorth(100, 30)];
    check("a hit scores the alien's points", handleCollisions(testBullets, testAliens), 30);

    testBullets = [makeBulletAt(100, 100), makeBulletAt(300, 100)];
    testAliens = [makeAlienWorth(100, 30), makeAlienWorth(300, 10)];
    check("two hits in one frame add up", handleCollisions(testBullets, testAliens), 40);
}

// --- Alien fire and lives tests (unchanged from stage 10) ---

function testBulletMovesDown() {
    let alienBullet = new Bullet(100, 300, 4, 12, 4, color(255));
    alienBullet.move();
    check("a bullet with positive vy moves down", alienBullet.y, 304);
}

// The test bullet is 12 high, so its top edge is 6 above its centre.
function testBulletOffScreenBottom() {
    check("bullet just touching the bottom is on screen", makeTestBullet(height + 6).isOffScreen(), false);
    check("bullet just past the bottom is off screen", makeTestBullet(height + 7).isOffScreen(), true);
}

// This test uses the game's real alienBullets array, so it empties it
// again at the end.
function testAlienFires() {
    alienBullets = [];
    alienFires(makeTestAlien(100, 100));

    check("an alien firing adds one alien bullet", alienBullets.length, 1);
    check("the bullet starts under the alien", alienBullets[0].x, 100);
    check("the bullet starts just below the alien", alienBullets[0].y, 116);
    check("the bullet moves down", alienBullets[0].vy > 0, true);

    alienBullets = [];
}

function testShipIsHit() {
    let shipBounds = makeTestShip(100).getBounds();   // centred on (100, 200)

    check("a bullet on the ship hits it", shipIsHit([makeBulletAt(100, 200)], shipBounds), true);
    check("a bullet elsewhere misses", shipIsHit([makeBulletAt(400, 200)], shipBounds), false);
    check("no bullets, no hit", shipIsHit([], shipBounds), false);

    let several = [makeBulletAt(400, 50), makeBulletAt(500, 50), makeBulletAt(100, 200)];
    check("finds the hit even when it isn't the first bullet", shipIsHit(several, shipBounds), true);
}

function testLoseWhenNoLives() {
    let farAway = [makeTestAlien(100, 100)];
    check("no lives left: lost", checkGameState(farAway, 400, 0), STATE_LOST);
    check("one life left: still playing", checkGameState(farAway, 400, 1), STATE_PLAYING);

    // A decision, recorded as a test: destroying the last alien in the
    // same frame as losing the last life counts as a win.
    check("last alien and last life together: won", checkGameState([], 400, 0), STATE_WON);
}

// --- Title screen and high score tests (unchanged from stage 11) ---

// One check for each arrow in the state diagram that Enter controls.
// setup() sets the title screen after the tests, so changing gameState
// here is safe.
function testEnterChangesState() {
    gameState = STATE_TITLE;
    handleEnter();
    check("Enter on the title screen starts a game", gameState, STATE_PLAYING);

    gameState = STATE_LOST;
    handleEnter();
    check("Enter after losing goes to the title screen", gameState, STATE_TITLE);

    gameState = STATE_WON;
    handleEnter();
    check("Enter after winning goes to the title screen", gameState, STATE_TITLE);

    resetGame();
    ship.x = 100;
    handleEnter();
    check("Enter during a game does nothing", ship.x, 100);
    check("Enter during a game keeps playing", gameState, STATE_PLAYING);
}

// Uses its own storage key, so the player's real high score is never
// touched, and removes it again at the end.
function testHighScoreStorage() {
    let testKey = "spaceInvadersTestOnly";
    localStorage.removeItem(testKey);

    check("nothing saved yet loads as 0", loadHighScore(testKey), 0);

    saveHighScore(testKey, 120);
    check("a saved score loads again", loadHighScore(testKey), 120);

    // loadHighScore() prints a warning for this one: that's expected.
    localStorage.setItem(testKey, "not a number");
    check("a saved value that isn't a number loads as 0", loadHighScore(testKey), 0);

    localStorage.removeItem(testKey);
}

// --- Alien speed tests (unchanged from stage 12) ---

function testAlienSpeed() {
    let fullGrid = ALIEN_ROWS * ALIEN_COLUMNS;

    check("full grid marches at the start speed", alienSpeedFor(fullGrid), ALIEN_START_SPEED);
    check("one alien left marches at top speed", alienSpeedFor(1), ALIEN_TOP_SPEED);
    check("fewer aliens march faster", alienSpeedFor(10) > alienSpeedFor(20), true);

    // With 8 aliens left, the formation is (32 - 8) / 31 of the way from a
    // full grid to one alien, so its speed should be that fraction of the
    // way from the start speed to the top speed. Worked out this way, the
    // answer differs from alienSpeedFor()'s in the 16th decimal place, so
    // check() would fail here. Use checkClose() for decimals.
    let expectedSpeed = ALIEN_START_SPEED + (ALIEN_TOP_SPEED - ALIEN_START_SPEED) * (fullGrid - 8) / (fullGrid - 1);
    checkClose("speed rises steadily as aliens are destroyed", alienSpeedFor(8), expectedSpeed, 0.0001);
}

// --- Shield tests (unchanged from stage 13) ---

function testShieldSize() {
    let shield = createShield(100, 300, color(255));
    check("one shield has rows x columns blocks", shield.length, SHIELD_ROWS * SHIELD_COLUMNS);

    // The shield should be centred on x = 100: its left and right edges
    // should be the same distance from 100.
    let leftEdge = shield[0].getBounds().left;
    let rightEdge = shield[SHIELD_COLUMNS - 1].getBounds().right;
    check("shield is centred", 100 - leftEdge, rightEdge - 100);
    check("top row is at topY", shield[0].y, 300);
}

// The shields must sit below where the aliens start and above the ship,
// or they'd be useless (or in the way).
function testShieldsFitTheGap() {
    let blocks = createShields(SHIELD_COUNT, color(255));
    check("all the shields' blocks", blocks.length, SHIELD_COUNT * SHIELD_ROWS * SHIELD_COLUMNS);

    let lowestAlienStart = ALIEN_GRID_TOP + (ALIEN_ROWS - 1) * ALIEN_SPACING_Y + ALIEN_HEIGHT / 2;
    let shieldTop = blocks[0].getBounds().top;
    let shieldBottom = blocks[blocks.length - 1].getBounds().bottom;

    check("shields start below the aliens", shieldTop > lowestAlienStart, true);
    check("shields end above the ship", shieldBottom < ship.getBounds().top, true);
}

function makeBlockAt(x, y) {
    return new ShieldBlock(x, y, 8, color(255));
}

function testCollideReturnsTargetsHit() {
    let missBullets = [makeBulletAt(300, 100)];
    let missBlocks = [makeBlockAt(100, 100)];
    check("a miss returns an empty list", collideBulletsWith(missBullets, missBlocks).length, 0);

    let block = makeBlockAt(100, 100);
    let hitBullets = [makeBulletAt(100, 100)];
    let hitBlocks = [block, makeBlockAt(200, 100)];
    let targetsHit = collideBulletsWith(hitBullets, hitBlocks);
    check("a hit returns one target", targetsHit.length, 1);
    check("it returns the target that was hit", targetsHit[0], block);
    check("the hit block is removed", hitBlocks.length, 1);
}

// Bullets from either side are stopped by a shield.
function testBulletsHitShields() {
    let blocks = [makeBlockAt(100, 300)];
    let playerBullets = [makeBulletAt(100, 300)];
    collideBulletsWith(playerBullets, blocks);
    check("a player bullet destroys a block", blocks.length, 0);
    check("the player bullet is used up", playerBullets.length, 0);

    blocks = [makeBlockAt(100, 300)];
    let fallingBullets = [new Bullet(100, 300, 4, 12, 4, color(255))];
    collideBulletsWith(fallingBullets, blocks);
    check("an alien bullet destroys a block", blocks.length, 0);
    check("the alien bullet is used up", fallingBullets.length, 0);
}

function testTotalPoints() {
    check("no aliens, no points", totalPoints([]), 0);
    check("points add up", totalPoints([makeAlienWorth(100, 30), makeAlienWorth(200, 10)]), 40);
}

// --- New in stage 14 ---

function testSpriteNames() {
    check("30-point aliens are squids", spriteNameForPoints(30), "squid");
    check("20-point aliens are crabs", spriteNameForPoints(20), "crab");
    check("10-point aliens are octopuses", spriteNameForPoints(10), "octopus");
}

// A "fake" sound: an object with a play() method, like a real sound, that
// just counts how many times it was played. Tests can check the count
// without any real sound playing.
function makeFakeSound() {
    return {
        timesPlayed: 0,
        play: function () {
            this.timesPlayed += 1;
        }
    };
}

function testPlaySound() {
    let realSoundOn = soundOn;
    let fake = makeFakeSound();

    soundOn = true;
    playSound(fake);
    check("plays when sound is on", fake.timesPlayed, 1);

    soundOn = false;
    playSound(fake);
    check("doesn't play when sound is off", fake.timesPlayed, 1);

    // A sound that didn't load is undefined. That must not cause an error.
    soundOn = true;
    let crashed = false;
    try {
        playSound(undefined);
    } catch (error) {
        crashed = true;
    }
    check("a sound that didn't load is skipped", crashed, false);

    soundOn = realSoundOn;
}

// Swaps the real shoot sound for a fake one, fires, then swaps it back.
function testFiringPlaysSound() {
    let realShootSound = sounds.shoot;
    let realSoundOn = soundOn;
    let fake = makeFakeSound();
    sounds.shoot = fake;
    soundOn = true;

    bullets = [];
    fireBullet();
    check("firing plays the shoot sound once", fake.timesPlayed, 1);

    bullets = [];
    sounds.shoot = realShootSound;
    soundOn = realSoundOn;
}

// If no sprites load, the ship and aliens must still be drawn (as shapes).
function testDrawingWithoutSprites() {
    let realSprites = sprites;
    sprites = {};

    let crashed = false;
    try {
        makeTestShip(100).display();
        makeTestAlien(100, 100).display();
    } catch (error) {
        crashed = true;
        console.error(error);
    }
    check("ship and aliens can be drawn with no sprites", crashed, false);

    sprites = realSprites;
}
