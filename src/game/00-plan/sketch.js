// Stage 0: the plan. There is no game code yet. This sketch is just an
// empty canvas of the right size, so we know the project runs before we
// add anything to it. The plan itself is in PLAN.md in this folder.

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 480;
const BACKGROUND_COLOUR = 20;   // near-black, like the original arcade game

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
    background(BACKGROUND_COLOUR);
}
