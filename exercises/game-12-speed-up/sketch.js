// What changed: the aliens speed up as their numbers fall, from
// ALIEN_START_SPEED with a full grid to ALIEN_TOP_SPEED with one alien
// left. alienSpeedFor() works out the speed, and marchAliens() and
// formationAtEdge() are now given the speed instead of using a constant.

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BACKGROUND_COLOUR = 20;

const SHIP_WIDTH = 50;
const SHIP_HEIGHT = 20;
const SHIP_MARGIN = 30;   // gap between the ship's centre and the bottom edge
const SHIP_SPEED = 5;     // pixels per frame

const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 12;
const BULLET_SPEED = 8;   // pixels per frame
const ALIEN_BULLET_SPEED = 4;
const ALIEN_FIRE_CHANCE = 0.02;   // chance, each frame, that an alien fires (2%)
const STARTING_LIVES = 3;

const ALIEN_ROWS = 4;
const ALIEN_COLUMNS = 8;
const ALIEN_WIDTH = 30;
const ALIEN_HEIGHT = 20;
const ALIEN_SPACING_X = 50;   // distance between the centres of neighbouring aliens
const ALIEN_SPACING_Y = 40;
const ALIEN_GRID_LEFT = 80;   // centre of the top-left alien
const ALIEN_GRID_TOP = 110;
const ALIEN_START_SPEED = 1;  // pixels per frame, sideways, with every alien alive
const ALIEN_TOP_SPEED = 4;    // pixels per frame, sideways, with one alien left
const ALIEN_DROP = 20;        // pixels down each time the formation reverses
const ALIEN_ROW_POINTS = [30, 20, 20, 10];   // points for each row, top row first

// The three game states. Using constants rather than typing the strings
// each time means a typo is an error you'll see, not a silent bug.
const STATE_TITLE = "title";
const STATE_PLAYING = "playing";
const STATE_WON = "won";
const STATE_LOST = "lost";

// The name the high score is saved under in localStorage.
const HIGH_SCORE_KEY = "spaceInvadersHighScore";

class Ship {
    // x and y are the centre of the ship's body.
    constructor(x, y, bodyWidth, bodyHeight, speed, shipColour) {
        this.x = x;
        this.y = y;
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.speed = speed;
        this.col = shipColour;
        this.cannonWidth = bodyWidth / 5;
        this.cannonHeight = bodyHeight / 2;
    }

    // direction is -1 (left), 0 (stay still) or 1 (right).
    move(direction) {
        this.x += direction * this.speed;

        let halfWidth = this.bodyWidth / 2;
        if (this.x - halfWidth < 0) {
            this.x = halfWidth;
        } else if (this.x + halfWidth > width) {
            this.x = width - halfWidth;
        }
    }

    // The y position of the top of the cannon, where bullets come from.
    cannonTopY() {
        return this.y - this.bodyHeight / 2 - this.cannonHeight;
    }

    // The rectangle around the ship's body, for collisions. (The cannon
    // is left out: it's small, and being hit there would feel unfair.)
    getBounds() {
        return {
            left: this.x - this.bodyWidth / 2,
            right: this.x + this.bodyWidth / 2,
            top: this.y - this.bodyHeight / 2,
            bottom: this.y + this.bodyHeight / 2
        };
    }

    display() {
        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        noStroke();
        fill(this.col);
        rect(0, 0, this.bodyWidth, this.bodyHeight);
        rect(0, -(this.bodyHeight + this.cannonHeight) / 2, this.cannonWidth, this.cannonHeight);
        pop();
    }
}

class Bullet {
    // x and y are the centre of the bullet.
    // vy is the vertical velocity: negative moves up the screen (the
    // player's bullets), positive moves down (the aliens' bullets).
    constructor(x, y, bulletWidth, bulletHeight, vy, bulletColour) {
        this.x = x;
        this.y = y;
        this.bulletWidth = bulletWidth;
        this.bulletHeight = bulletHeight;
        this.vy = vy;
        this.col = bulletColour;
    }

    move() {
        this.y += this.vy;
    }

    // True once the whole bullet has gone past the top or the bottom of
    // the canvas.
    isOffScreen() {
        let pastTop = this.y + this.bulletHeight / 2 < 0;
        let pastBottom = this.y - this.bulletHeight / 2 > height;
        return pastTop || pastBottom;
    }

    // The rectangle around the bullet, for collisions.
    getBounds() {
        return {
            left: this.x - this.bulletWidth / 2,
            right: this.x + this.bulletWidth / 2,
            top: this.y - this.bulletHeight / 2,
            bottom: this.y + this.bulletHeight / 2
        };
    }

    display() {
        push();
        rectMode(CENTER);
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.bulletWidth, this.bulletHeight);
        pop();
    }
}

class Alien {
    // x and y are the centre of the alien.
    constructor(x, y, alienWidth, alienHeight, alienColour, points) {
        this.x = x;
        this.y = y;
        this.alienWidth = alienWidth;
        this.alienHeight = alienHeight;
        this.col = alienColour;
        this.points = points;   // scored when this alien is destroyed
    }

    // Moves the alien by the given amounts. The formation, not the alien,
    // decides which way to go, so the alien just does as it's told.
    moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // The rectangle around the alien, for collisions.
    getBounds() {
        return {
            left: this.x - this.alienWidth / 2,
            right: this.x + this.alienWidth / 2,
            top: this.y - this.alienHeight / 2,
            bottom: this.y + this.alienHeight / 2
        };
    }

    display() {
        // Eye size and position depend on the alien's size, so the whole
        // alien scales together.
        let eyeSize = this.alienHeight / 4;
        let eyeOffsetX = this.alienWidth / 5;
        let eyeOffsetY = -this.alienHeight / 8;

        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        noStroke();
        fill(this.col);
        rect(0, 0, this.alienWidth, this.alienHeight, 4);   // body, rounded corners
        fill(BACKGROUND_COLOUR);
        rect(-eyeOffsetX, eyeOffsetY, eyeSize, eyeSize);     // left eye
        rect(eyeOffsetX, eyeOffsetY, eyeSize, eyeSize);      // right eye
        pop();
    }
}

// These are all given their starting values in resetGame().
let ship;
let bullets;              // every player bullet currently on screen
let alienBullets;         // every alien bullet currently on screen
let aliens;               // every alien still alive
let alienDirection;       // 1 = formation moving right, -1 = moving left
let gameState;            // STATE_TITLE, STATE_PLAYING, STATE_WON or STATE_LOST
let score;
let lives;
let highScore;            // loaded once in setup(), updated at the end of each game
let newHighScore;         // true if the game just finished set a new high score
let alienColours;         // one colour per row, used in the game and on the title screen
let showDebug = false;    // D key turns the debug overlay on and off

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    alienColours = [color(255, 80, 80), color(255, 180, 0), color(80, 200, 255), color(200, 120, 255)];
    highScore = loadHighScore(HIGH_SCORE_KEY);
    resetGame();

    runTests();

    // Set last, because some tests start a game of their own.
    gameState = STATE_TITLE;
}

function draw() {
    background(BACKGROUND_COLOUR);

    if (gameState === STATE_TITLE) {
        displayTitleScreen();
    } else {
        if (gameState === STATE_PLAYING) {
            updateGame();
        }
        drawGame();
    }

    if (gameState === STATE_WON) {
        displayMessage("YOU WIN!", scoreSummary());
    } else if (gameState === STATE_LOST) {
        displayMessage("GAME OVER", scoreSummary());
    }

    if (showDebug) {
        displayDebugInfo();
    }
}

// Puts everything back to how it is at the start of a game. Called once
// from setup(), and again whenever the player starts a new game from the
// title screen. (The high score is not reset: it lasts between games.)
function resetGame() {
    ship = new Ship(width / 2, height - SHIP_MARGIN, SHIP_WIDTH, SHIP_HEIGHT, SHIP_SPEED, color(0, 220, 120));
    bullets = [];
    alienBullets = [];

    aliens = createAlienGrid(ALIEN_ROWS, ALIEN_COLUMNS, alienColours, ALIEN_ROW_POINTS);
    alienDirection = 1;

    score = 0;
    lives = STARTING_LIVES;
    newHighScore = false;
    gameState = STATE_PLAYING;
}

// Moves everything and works out what happened. Only runs while playing.
function updateGame() {
    ship.move(readDirection());
    alienDirection = marchAliens(aliens, alienDirection, alienSpeedFor(aliens.length));
    maybeAlienFires();

    moveBullets(bullets);
    moveBullets(alienBullets);

    score += handleCollisions(bullets, aliens);

    if (shipIsHit(alienBullets, ship.getBounds())) {
        lives -= 1;
        alienBullets = [];   // clear the screen, so the player has a moment to recover
    }

    gameState = checkGameState(aliens, ship.getBounds().top, lives);

    // updateGame() only runs while playing, so this happens exactly once,
    // in the frame the game ends.
    if (gameState !== STATE_PLAYING) {
        endGame();
    }
}

// Updates and saves the high score, if this game beat it.
function endGame() {
    newHighScore = score > highScore;
    if (newHighScore) {
        highScore = score;
        saveHighScore(HIGH_SCORE_KEY, highScore);
    }
}

// The line under "YOU WIN!" or "GAME OVER".
function scoreSummary() {
    if (newHighScore) {
        return "New high score: " + score + "! Press Enter to continue";
    }
    return "Score " + score + ". Press Enter to continue";
}

// Reads a saved high score from the browser's localStorage, which keeps
// it even after the page is closed. Returns 0 if nothing has been saved
// yet, if what was saved isn't a number, or if the browser won't allow
// it (some private windows don't).
function loadHighScore(storageKey) {
    try {
        let saved = localStorage.getItem(storageKey);
        if (saved === null) {
            return 0;   // nothing saved yet: this is the first game
        }

        let value = Number(saved);   // localStorage stores text, so turn it back into a number
        if (Number.isNaN(value)) {
            console.warn("The saved high score wasn't a number: " + saved);
            return 0;
        }
        return value;
    } catch (error) {
        console.warn("Couldn't load the high score: " + error.message);
        return 0;
    }
}

// Saves a high score in localStorage. If the browser won't allow it, the
// game carries on: the high score just won't be remembered next time.
function saveHighScore(storageKey, scoreToSave) {
    try {
        localStorage.setItem(storageKey, scoreToSave);
    } catch (error) {
        console.warn("Couldn't save the high score: " + error.message);
    }
}

function displayTitleScreen() {
    push();
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(48);
    text("SPACE INVADERS", width / 2, 80);

    // One alien from each row, with what it's worth.
    textSize(18);
    textAlign(LEFT, CENTER);
    for (let row = 0; row < ALIEN_ROWS; row++) {
        let rowY = 170 + row * 40;
        let sampleAlien = new Alien(width / 2 - 60, rowY, ALIEN_WIDTH, ALIEN_HEIGHT, alienColours[row], ALIEN_ROW_POINTS[row]);
        sampleAlien.display();
        fill(255);
        text("= " + sampleAlien.points + " POINTS", width / 2 - 30, rowY);
    }

    textAlign(CENTER, CENTER);
    textSize(24);
    text("HIGH SCORE " + highScore, width / 2, 360);
    textSize(16);
    text("LEFT and RIGHT to move, SPACE to fire", width / 2, 410);
    text("Press Enter to start", width / 2, 440);
    pop();
}

// Draws everything where it is now. Runs every frame, even after the game
// ends, so the final positions stay on screen behind the message.
function drawGame() {
    ship.display();
    displayAliens();
    displayBullets(bullets);
    displayBullets(alienBullets);
    displayScoreAndLives();
}

function displayScoreAndLives() {
    push();
    fill(255);
    noStroke();
    textSize(20);
    textAlign(RIGHT, TOP);
    text("SCORE " + score, width - 10, 10);
    text("LIVES " + lives, width - 10, 36);
    textAlign(CENTER, TOP);
    text("HIGH SCORE " + highScore, width / 2, 10);
    pop();
}

// Works out whether the game has been won, lost, or is still going.
// Won: no aliens left. Lost: no lives left, or any alien has reached the
// top of the ship. Winning is checked first, so destroying the last alien
// in the same frame as losing the last life counts as a win.
function checkGameState(alienList, shipTop, livesLeft) {
    if (alienList.length === 0) {
        return STATE_WON;
    }

    if (livesLeft <= 0) {
        return STATE_LOST;
    }

    for (let i = 0; i < alienList.length; i++) {
        if (alienList[i].getBounds().bottom >= shipTop) {
            return STATE_LOST;
        }
    }

    return STATE_PLAYING;
}

// A big title and a smaller line of instructions, in the middle of the
// screen, over a dark see-through panel so the frozen game shows behind.
function displayMessage(title, instructions) {
    push();
    noStroke();
    fill(0, 0, 0, 160);
    rect(0, 0, width, height);

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text(title, width / 2, height / 2 - 20);
    textSize(18);
    text(instructions, width / 2, height / 2 + 30);
    pop();
}

// Builds a grid of aliens and returns them in one array, row by row:
// the first row from left to right, then the second row, and so on.
// If there are more rows than colours (or points), they repeat.
function createAlienGrid(rowCount, columnCount, colourList, pointsList) {
    let grid = [];

    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            let x = ALIEN_GRID_LEFT + column * ALIEN_SPACING_X;
            let y = ALIEN_GRID_TOP + row * ALIEN_SPACING_Y;
            let alienColour = colourList[row % colourList.length];
            let points = pointsList[row % pointsList.length];
            grid.push(new Alien(x, y, ALIEN_WIDTH, ALIEN_HEIGHT, alienColour, points));
        }
    }

    return grid;
}

// How fast the formation marches sideways, given how many aliens are
// left: ALIEN_START_SPEED with a full grid, rising steadily to
// ALIEN_TOP_SPEED with one alien left.
function alienSpeedFor(aliensLeft) {
    let fullGrid = ALIEN_ROWS * ALIEN_COLUMNS;
    return map(aliensLeft, fullGrid, 1, ALIEN_START_SPEED, ALIEN_TOP_SPEED);
}

// Moves the whole formation one step. If any alien would go past an
// edge, every alien drops down instead of moving sideways. Returns the
// direction for the next frame: reversed after a drop, unchanged otherwise.
function marchAliens(alienList, direction, speed) {
    if (formationAtEdge(alienList, direction, speed)) {
        for (let i = 0; i < alienList.length; i++) {
            alienList[i].moveBy(0, ALIEN_DROP);
        }
        return -direction;
    }

    for (let i = 0; i < alienList.length; i++) {
        alienList[i].moveBy(direction * speed, 0);
    }
    return direction;
}

// True if one more step in this direction would take any alien past the
// edge of the canvas. It checks where each alien is about to be, not
// where it is now, so the aliens never actually cross the edge.
function formationAtEdge(alienList, direction, speed) {
    for (let i = 0; i < alienList.length; i++) {
        let nextX = alienList[i].x + direction * speed;
        let halfWidth = alienList[i].alienWidth / 2;

        if (nextX - halfWidth < 0 || nextX + halfWidth > width) {
            return true;   // one alien is enough: no need to check the rest
        }
    }
    return false;          // only reached if no alien was at an edge
}

function displayAliens() {
    for (let i = 0; i < aliens.length; i++) {
        aliens[i].display();
    }
}

// Turns the arrow keys into a direction: -1 for left, 1 for right,
// 0 for neither. Holding both keys gives 0, so the ship stays still.
function readDirection() {
    let direction = 0;
    if (keyIsDown(LEFT_ARROW)) {
        direction -= 1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        direction += 1;
    }
    return direction;
}

// keyPressed() runs once per key press, so holding space fires once.
// Space only fires during a game.
function keyPressed() {
    if (key === " " && gameState === STATE_PLAYING) {
        fireBullet();
    } else if (keyCode === ENTER) {
        handleEnter();
    } else if (key === "d" || key === "D") {
        showDebug = !showDebug;
    }
}

// What Enter does depends on the state: after a game, go back to the
// title screen; on the title screen, start a new game; while playing,
// nothing. Only one branch may run, so it's if / else if, not two ifs.
function handleEnter() {
    if (gameState === STATE_WON || gameState === STATE_LOST) {
        gameState = STATE_TITLE;
    } else if (gameState === STATE_TITLE) {
        resetGame();
    }
}

function fireBullet() {
    let startY = ship.cannonTopY() - BULLET_HEIGHT / 2;
    let newBullet = new Bullet(ship.x, startY, BULLET_WIDTH, BULLET_HEIGHT, -BULLET_SPEED, color(255));
    bullets.push(newBullet);
}

// Each frame there's a small chance that one alien, chosen at random,
// fires. random() with no arguments gives a number from 0 up to (but not
// including) 1, so random() < 0.02 is true about 2% of the time.
function maybeAlienFires() {
    if (aliens.length > 0 && random() < ALIEN_FIRE_CHANCE) {
        let shooter = random(aliens);   // random() given an array picks one item
        alienFires(shooter);
    }
}

// Fires a bullet straight down from just below the given alien.
function alienFires(shooter) {
    let startY = shooter.y + shooter.alienHeight / 2 + BULLET_HEIGHT / 2;
    let newBullet = new Bullet(shooter.x, startY, BULLET_WIDTH, BULLET_HEIGHT, ALIEN_BULLET_SPEED, color(255, 80, 80));
    alienBullets.push(newBullet);
}

// True if any bullet in the list overlaps the ship.
function shipIsHit(bulletList, shipBounds) {
    for (let i = 0; i < bulletList.length; i++) {
        if (boundsOverlap(bulletList[i].getBounds(), shipBounds)) {
            return true;
        }
    }
    return false;
}

// Moves every bullet in the list, then removes the ones that have left
// the screen. Works for the player's bullets and the aliens'.
function moveBullets(bulletList) {
    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].move();
    }

    removeOffScreenBullets(bulletList);
}

function displayBullets(bulletList) {
    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].display();
    }
}

// Removes every bullet that has gone off the screen from the array
// it's given. It loops backwards: removing an item moves every
// later item down one place, and going backwards means the items still
// to be checked are never the ones that moved.
function removeOffScreenBullets(bulletList) {
    for (let i = bulletList.length - 1; i >= 0; i--) {
        if (bulletList[i].isOffScreen()) {
            bulletList.splice(i, 1);
        }
    }
}

// True if two rectangles overlap. Each one is an object with left,
// right, top and bottom, as returned by getBounds(). They overlap only if
// they overlap left-to-right AND top-to-bottom at the same time.
// Rectangles that only touch along an edge don't count.
function boundsOverlap(first, second) {
    let overlapX = first.left < second.right && first.right > second.left;
    let overlapY = first.top < second.bottom && first.bottom > second.top;
    return overlapX && overlapY;
}

// Removes every bullet that hits an alien, along with the alien it hit,
// and returns the total points for the aliens destroyed (0 if none).
// The outer loop goes backwards, because bullets are removed from the
// array it's looping over (see stage 4).
function handleCollisions(bulletList, alienList) {
    let pointsScored = 0;

    for (let bulletIndex = bulletList.length - 1; bulletIndex >= 0; bulletIndex--) {
        let bulletBounds = bulletList[bulletIndex].getBounds();

        for (let alienIndex = 0; alienIndex < alienList.length; alienIndex++) {
            if (boundsOverlap(bulletBounds, alienList[alienIndex].getBounds())) {
                pointsScored += alienList[alienIndex].points;
                bulletList.splice(bulletIndex, 1);
                alienList.splice(alienIndex, 1);
                break;   // this bullet is gone: stop checking it against other aliens
            }
        }
    }

    return pointsScored;
}

// Draws a rectangle's outline, for checking hitboxes in the debug overlay.
function displayBounds(bounds) {
    push();
    noFill();
    stroke(255, 255, 0);
    rectMode(CORNERS);   // rect() now takes two corners instead of a corner and a size
    rect(bounds.left, bounds.top, bounds.right, bounds.bottom);
    pop();
}

// Information for the developer, not the player.
function displayDebugInfo() {
    displayBounds(ship.getBounds());
    for (let i = 0; i < aliens.length; i++) {
        displayBounds(aliens[i].getBounds());
    }
    for (let i = 0; i < bullets.length; i++) {
        displayBounds(bullets[i].getBounds());
    }
    for (let i = 0; i < alienBullets.length; i++) {
        displayBounds(alienBullets[i].getBounds());
    }

    push();
    fill(255, 255, 0);
    noStroke();
    textSize(14);
    text("bullets in array: " + bullets.length, 10, 20);
    text("alien bullets in array: " + alienBullets.length, 10, 40);
    text("aliens in array: " + aliens.length, 10, 60);
    text("alien direction: " + alienDirection, 10, 80);
    text("game state: " + gameState, 10, 100);
    text("alien speed: " + alienSpeedFor(aliens.length).toFixed(2), 10, 120);
    text("frame rate: " + round(frameRate()), 10, 140);
    pop();
}
