// BUG HUNT: this sketch has one bug planted in it. See the README in the
// folder above for how to track it down.
//
// What changed: a bullet that hits an alien destroys both. Ship, Bullet
// and Alien each have a getBounds() method giving the rectangle around
// them, and boundsOverlap() checks whether two rectangles overlap. The
// debug overlay (D) now also draws these rectangles ("hitboxes").
// The aliens still march off the bottom of the screen: winning and
// losing come at stage 8.

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

const ALIEN_ROWS = 4;
const ALIEN_COLUMNS = 8;
const ALIEN_WIDTH = 30;
const ALIEN_HEIGHT = 20;
const ALIEN_SPACING_X = 50;   // distance between the centres of neighbouring aliens
const ALIEN_SPACING_Y = 40;
const ALIEN_GRID_LEFT = 80;   // centre of the top-left alien
const ALIEN_GRID_TOP = 110;
const ALIEN_SPEED = 1;        // pixels per frame, sideways
const ALIEN_DROP = 20;        // pixels down each time the formation reverses

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
    constructor(x, y, bulletWidth, bulletHeight, speed, bulletColour) {
        this.x = x;
        this.y = y;
        this.bulletWidth = bulletWidth;
        this.bulletHeight = bulletHeight;
        this.speed = speed;
        this.col = bulletColour;
    }

    // Bullets only travel up the screen, so y gets smaller.
    move() {
        this.y -= this.speed;
    }

    // True once the whole bullet (including its bottom edge) has gone
    // past the top of the canvas.
    isOffScreen() {
        return this.y + this.bulletHeight / 2 < 0;
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
    constructor(x, y, alienWidth, alienHeight, alienColour) {
        this.x = x;
        this.y = y;
        this.alienWidth = alienWidth;
        this.alienHeight = alienHeight;
        this.col = alienColour;
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

let ship;
let bullets = [];         // every bullet currently on screen
let aliens = [];          // every alien still alive
let alienDirection = 1;   // 1 = formation moving right, -1 = moving left
let showDebug = false;    // D key turns the debug overlay on and off

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    ship = new Ship(width / 2, height - SHIP_MARGIN, SHIP_WIDTH, SHIP_HEIGHT, SHIP_SPEED, color(0, 220, 120));

    let rowColours = [color(255, 80, 80), color(255, 180, 0), color(80, 200, 255), color(200, 120, 255)];
    aliens = createAlienGrid(ALIEN_ROWS, ALIEN_COLUMNS, rowColours);

    runTests();
}

function draw() {
    background(BACKGROUND_COLOUR);

    ship.move(readDirection());
    ship.display();

    alienDirection = marchAliens(aliens, alienDirection);
    displayAliens();
    updateBullets();
    handleCollisions(bullets, aliens);

    if (showDebug) {
        displayDebugInfo();
    }
}

// Builds a grid of aliens and returns them in one array, row by row:
// the first row from left to right, then the second row, and so on.
// If there are more rows than colours, the colours repeat.
function createAlienGrid(rowCount, columnCount, colourList) {
    let grid = [];

    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            let x = ALIEN_GRID_LEFT + column * ALIEN_SPACING_X;
            let y = ALIEN_GRID_TOP + row * ALIEN_SPACING_Y;
            let alienColour = colourList[row % colourList.length];
            grid.push(new Alien(x, y, ALIEN_WIDTH, ALIEN_HEIGHT, alienColour));
        }
    }

    return grid;
}

// Moves the whole formation one step. If any alien would go past an
// edge, every alien drops down instead of moving sideways. Returns the
// direction for the next frame: reversed after a drop, unchanged otherwise.
function marchAliens(alienList, direction) {
    if (formationAtEdge(alienList, direction)) {
        for (let i = 0; i < alienList.length; i++) {
            alienList[i].moveBy(0, ALIEN_DROP);
        }
        return -direction;
    }

    for (let i = 0; i < alienList.length; i++) {
        alienList[i].moveBy(direction * ALIEN_SPEED, 0);
    }
    return direction;
}

// True if one more step in this direction would take any alien past the
// edge of the canvas. It checks where each alien is about to be, not
// where it is now, so the aliens never actually cross the edge.
function formationAtEdge(alienList, direction) {
    for (let i = 0; i < alienList.length; i++) {
        let nextX = alienList[i].x + direction * ALIEN_SPEED;
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
function keyPressed() {
    if (key === " ") {
        fireBullet();
    } else if (key === "d" || key === "D") {
        showDebug = !showDebug;
    }
}

function fireBullet() {
    let startY = ship.cannonTopY() - BULLET_HEIGHT / 2;
    let newBullet = new Bullet(ship.x, startY, BULLET_WIDTH, BULLET_HEIGHT, BULLET_SPEED, color(255));
    bullets.push(newBullet);
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].move();
        bullets[i].display();
    }

    removeOffScreenBullets(bullets);
}

// Removes every bullet that has gone off the top of the screen from the
// array it's given. It loops backwards: removing an item moves every
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
    return overlapX || overlapY;
}

// Removes every bullet that hits an alien, along with the alien it hit.
// The outer loop goes backwards, because bullets are removed from the
// array it's looping over (see stage 4).
function handleCollisions(bulletList, alienList) {
    for (let bulletIndex = bulletList.length - 1; bulletIndex >= 0; bulletIndex--) {
        let bulletBounds = bulletList[bulletIndex].getBounds();

        for (let alienIndex = 0; alienIndex < alienList.length; alienIndex++) {
            if (boundsOverlap(bulletBounds, alienList[alienIndex].getBounds())) {
                bulletList.splice(bulletIndex, 1);
                alienList.splice(alienIndex, 1);
                break;   // this bullet is gone: stop checking it against other aliens
            }
        }
    }
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

    push();
    fill(255, 255, 0);
    noStroke();
    textSize(14);
    text("bullets in array: " + bullets.length, 10, 20);
    text("aliens in array: " + aliens.length, 10, 40);
    text("alien direction: " + alienDirection, 10, 60);
    text("frame rate: " + round(frameRate()), 10, 80);
    pop();
}
