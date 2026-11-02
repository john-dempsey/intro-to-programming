// BUG HUNT: this sketch has one bug planted in it. See the README in the
// folder above for how to track it down.
//
// What changed: a Ship class, and one ship drawn near the bottom of the
// canvas. The ship doesn't move yet. Automatic tests are in tests.js.

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BACKGROUND_COLOUR = 20;

const SHIP_WIDTH = 50;
const SHIP_HEIGHT = 20;
const SHIP_MARGIN = 30;   // gap between the ship's centre and the bottom edge

class Ship {
    // x and y are the centre of the ship's body.
    constructor(x, y, bodyWidth, bodyHeight, shipColour) {
        this.x = x;
        this.y = y;
        this.bodyWidth = bodyWidth;
        this.bodyHeight = bodyHeight;
        this.col = shipColour;
    }

    display() {
        // The cannon's size depends on the body's size, so the whole ship
        // scales together if SHIP_WIDTH or SHIP_HEIGHT change.
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

    ship = new Ship(width / 2, height + SHIP_MARGIN, SHIP_WIDTH, SHIP_HEIGHT, color(0, 220, 120));

    runTests();
}

function draw() {
    background(BACKGROUND_COLOUR);
    ship.display();
}
