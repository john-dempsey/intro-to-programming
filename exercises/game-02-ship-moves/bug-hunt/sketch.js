// BUG HUNT: this sketch has one bug planted in it. See the README in the
// folder above for how to track it down.
//
// What changed: the ship moves left and right while an arrow key is held
// down, and stops at the edges of the canvas. Reading the keyboard
// (readDirection) is kept separate from moving the ship (move), so that
// move() can be tested without anyone pressing a key.

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BACKGROUND_COLOUR = 20;

const SHIP_WIDTH = 50;
const SHIP_HEIGHT = 20;
const SHIP_MARGIN = 30;   // gap between the ship's centre and the bottom edge
const SHIP_SPEED = 5;     // pixels per frame

class Ship {
    // x and y are the centre of the ship's body.
    constructor(x, y, bodyWidth, bodyHeight, speed, shipColour) {
        this.x = x;
        this.y = y;
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.speed = speed;
        this.col = shipColour;
    }

    // direction is -1 (left), 0 (stay still) or 1 (right).
    move(direction) {
        this.x += direction * this.speed;

        // Clamp, as in sketch 13: compare the ship's edges, not its
        // centre, so no part of it can go off the canvas.
        let halfWidth = this.bodyWidth / 2;
        if (this.x - halfWidth < 0) {
            this.x = halfWidth;
        } else if (this.x + halfWidth > height) {
            this.x = height - halfWidth;
        }
    }

    display() {
        let cannonWidth = this.bodyWidth / 5;
        let cannonHeight = this.bodyHeight / 2;

        push();
        translate(this.x, this.y);
        rectMode(CENTER);
        noStroke();
        fill(this.col);
        rect(0, 0, this.bodyWidth, this.bodyHeight);
        rect(0, -(this.bodyHeight + cannonHeight) / 2, cannonWidth, cannonHeight);
        pop();
    }
}

let ship;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    ship = new Ship(width / 2, height - SHIP_MARGIN, SHIP_WIDTH, SHIP_HEIGHT, SHIP_SPEED, color(0, 220, 120));

    runTests();
}

function draw() {
    background(BACKGROUND_COLOUR);

    ship.move(readDirection());
    ship.display();
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
