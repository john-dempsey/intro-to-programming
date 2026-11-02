# Build: Cars → Frogger

A Car, built up from scratch across 12 stages, mirroring the Ball sketches
in `src/` — including velocity (11) and screen-wrap (12), which the House
track skips. From stage 12 the same sketch continues, without a break, into
a small Frogger-style capstone game.

There are no separate folders per stage or between Cars and Frogger: it's
all the same three files, edited in place throughout. **Commit after
finishing each stage**, with a message naming the track and stage number,
e.g.:

```
git commit -m "Cars stage 9/12: Car class"
git commit -m "Frogger stage 2: lay out the lanes"
```

Do each Car stage only after you've covered the matching sketch (shown as
"mirrors") in `src/`.

## Stage 1 of 12 — mirrors 01-drawing-a-circle

A car: a rectangle body plus two circles for wheels, drawn once in
`setup()` with hard-coded numbers.

## Stage 2 of 12 — mirrors 02-circle-follows-mouse

Move the car-drawing code into `draw()`, and make the whole car — body and
wheels — follow the mouse as one unit. (This by-hand offsetting is the
problem `translate()` solves — that comes at stage 8.)

## Stage 3 of 12 — mirrors 03-click-to-draw

Move the car-drawing code out of `draw()` and into `mousePressed()`, so a
car is stamped at the click position and cars accumulate on screen. Add
`keyPressed()` to clear.

## Stage 4 of 12 — mirrors 04-global-variables

Extract every magic number in your Car sketch into named global `const`
variables above `setup()`, and use them throughout.

## Stage 5 of 12 — mirrors 05-color-object

Replace the car body's separate colour numbers with a `color()` object,
created once and used in `fill()`.

## Stage 6 of 12 — mirrors 06-ball-object-literal

Bundle the car's position, size and colour into a single `car` object
literal, built in `setup()`; `mousePressed()` updates `car.x`/`car.y` and
reads the rest via dot notation.

## Stage 7 of 12 — mirrors 07-create-ball-function

Extract your object-literal construction into a `createCar(...)` function
that builds and returns the object; `setup()` calls it.

## Stage 8 of 12 — mirrors 08-display-ball-function

Extract the drawing statements into a `displayCar(c)` function that takes a
car object and draws it; `mousePressed()` just updates position and calls
`displayCar(car)`.

Now that every part of the car is drawn from inside one function, replace
the `c.x + ...`/`c.y + ...` arithmetic on the body and wheels with
`translate(c.x, c.y)` once at the top of `displayCar()`, then draw each
shape at its plain, fixed offset from `(0, 0)` instead. Wrap the whole
function body in `push()`/`pop()` so the translation doesn't affect
anything drawn after `displayCar()` returns. Look up `translate()`,
`push()` and `pop()` in the p5 reference before starting — and see
`src/extras/08-traffic-light/` for a worked example of the same technique
(grouping several shapes around one point with
`translate()`/`push()`/`pop()`).

## Stage 9 of 12 — mirrors 09-ball-class

Replace `createCar()`/`displayCar()` with a `Car` class: the constructor
takes over construction, a `display()` method takes over drawing.

## Stage 10 of 12 — mirrors 10-array-of-balls

Replace the single car with an array of `Car` instances at different
positions ("lanes") and colours, displayed and labelled once in `setup()`.

## Stage 11 of 12 — mirrors 11-ball-velocity

Add `vx`/`vy` to the `Car` constructor and a `move()` method; move the
display loop into `draw()`, calling `.move()` then `.display()` on every
car each frame. Give each car (lane) a different speed, and set `vy = 0`
for every car — for Frogger, cars only need to travel horizontally along
their lane, so only `vx` varies between them.

## Stage 12 of 12 (final Car stage) — mirrors 12-ball-wrap

Change `move()` to wrap the car horizontally with modulo —
`this.x = (this.x + this.vx + width) % width` — so a car leaving one edge
of its lane reappears at the other. This is the last Car stage before the
Frogger capstone below; cars never bounce, unlike the Ball sketches'
sketch 13.

---

## Capstone — Build Frogger

Continue directly from your Car sketch at stage 12 (cars moving in
wrapping horizontal lanes). Build the following in sequence; each stage
starts from your own solution to the previous one.

### Frogger stage 1 — add a player

Add a player character (a simple circle or small square is enough — call
it the "frog") starting at the bottom-centre of the canvas. Give it a
position (a plain object or a class, your choice) and move it with the
arrow keys: each key press moves it one fixed step up, down, left or
right. p5 gives you two ways to read arrow keys — `keyPressed()` together
with the `LEFT_ARROW`/`RIGHT_ARROW`/`UP_ARROW`/`DOWN_ARROW` constants, or
`keyIsDown()` checked every frame inside `draw()` for continuous movement.
Look up both in the p5 reference and pick one. Clamp the player's position
so it can't leave the canvas (reuse the clamping idea from sketch 13).

### Frogger stage 2 — lay out the lanes

Arrange your `cars` array into several horizontal lanes (a handful of
shared `y` values), giving each lane's cars a consistent speed and
direction — some lanes moving left (`vx` negative), others right. This is
mostly choosing good numbers in `setup()`, not new code.

### Frogger stage 3 — collision

Detect when the player overlaps a car. Balls used `dist()` because they're
circles; the player and cars here are rectangles, so use a
rectangle-overlap ("AABB") test instead: two rectangles overlap only if
they overlap on both the x-axis and the y-axis at the same time —

```
px < cx + cw && px + pw > cx && py < cy + ch && py + ph > cy
```

(`p`/`c` standing for the player's and the car's `x`/`y`/width/height).
Look up why this test works if it isn't obvious from the formula. On a
collision, reset the player to the start position.

### Frogger stage 4 — winning

Add a "safe zone" at the top of the canvas. When the player reaches it,
display a message with `text()` (e.g. "You win!") and stop responding to
further key presses until the game is reset (a key press, or automatically
after a pause).
