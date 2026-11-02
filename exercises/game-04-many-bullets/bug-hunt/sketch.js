// BUG HUNT: this sketch has one bug planted in it. See the README in the
// folder above for how to track it down.
//
// What changed: the player can now have many bullets on screen at once,
// stored in an array. Bullets are added to the array when fired and
// removed once they leave the top of the canvas. Pressing D shows a
// debug overlay with the number of bullets in the array.

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

    display() {
        push();
        rectMode(CENTER);
        noStroke();
        fill(this.col);
        rect(this.x, this.y, this.bulletWidth, this.bulletHeight);
        pop();
    }
}

let ship;
let bullets = [];         // every bullet currently on screen
let showDebug = false;    // D key turns the debug overlay on and off

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    ship = new Ship(width / 2, height - SHIP_MARGIN, SHIP_WIDTH, SHIP_HEIGHT, SHIP_SPEED, color(0, 220, 120));

    runTests();
}

function draw() {
    background(BACKGROUND_COLOUR);

    ship.move(readDirection());
    ship.display();

    updateBullets();

    if (showDebug) {
        displayDebugInfo();
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
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].isOffScreen()) {
            bulletList.splice(i, 1);
        }
    }
}

// Information for the developer, not the player.
function displayDebugInfo() {
    push();
    fill(255, 255, 0);
    noStroke();
    textSize(14);
    text("bullets in array: " + bullets.length, 10, 20);
    text("frame rate: " + round(frameRate()), 10, 40);
    pop();
}
