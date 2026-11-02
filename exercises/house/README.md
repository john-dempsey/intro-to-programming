# Build: House

A single House, built up from scratch across 10 stages, all in this one
`sketch.js` — mirroring exactly how the Ball sketches in `src/` themselves
develop (magic numbers → globals → colour object → object literal → factory
function → display function → class → array). Houses never move, so this
track stops at stage 10.

There are no separate folders per stage: each stage is the same three files,
edited in place. **Commit after finishing each stage**, with a message
naming the track and stage number, e.g.:

```
git commit -m "House stage 4/10: extract globals"
```

Do each stage only after you've covered the matching sketch (shown as
"mirrors") in `src/`.

## Stage 1 of 10 — mirrors 01-drawing-a-circle

In a new sketch, draw a single house once in `setup()`, using only shapes
and calls you already know (`rect()` for the body, `triangle()` for the
roof, maybe `line()` for a door) and hard-coded numbers for position, size
and colours. Leave `draw()` empty.

## Stage 2 of 10 — mirrors 02-circle-follows-mouse

Move your house-drawing code into `draw()` (remembering `background()` at
the top), and make the whole house move together by offsetting every
shape's coordinates from `mouseX`/`mouseY` instead of from fixed numbers.
(This by-hand offsetting is the problem `translate()` solves — that comes
at stage 8.)

## Stage 3 of 10 — mirrors 03-click-to-draw

Move the house-drawing code out of `draw()` (leave it empty) and into
`mousePressed()`, so a house is stamped at the click position and houses
accumulate on screen. Add `keyPressed()` to clear.

## Stage 4 of 10 — mirrors 04-global-variables

Extract every magic number in your House sketch (width, height, roof
height, colours, background) into named global `const` variables above
`setup()`, and use them throughout.

## Stage 5 of 10 — mirrors 05-color-object

Replace the separate wall-colour numbers (and roof-colour numbers) with
`color()` objects — e.g. `wallCol`, `roofCol` — created once and used in
`fill()`.

## Stage 6 of 10 — mirrors 06-ball-object-literal

Bundle the house's position, size and colours into a single `house` object
literal, built in `setup()`; `mousePressed()` updates `house.x`/`house.y`
and reads the rest via dot notation.

## Stage 7 of 10 — mirrors 07-create-ball-function

Extract your object-literal construction into a
`createHouse(x, y, w, h, wallCol, roofCol)` function that builds and
returns the object; `setup()` calls it.

## Stage 8 of 10 — mirrors 08-display-ball-function

Extract the drawing statements into a `displayHouse(h)` function that takes
a house object and draws it; `mousePressed()` just updates position and
calls `displayHouse(house)`.

Now that every part of the house is drawn from inside one function, replace
the `h.x + ...`/`h.y + ...` arithmetic on each shape with `translate(h.x,
h.y)` once at the top of `displayHouse()`, then draw each shape at its
plain, fixed offset from `(0, 0)` instead. Wrap the whole function body in
`push()`/`pop()` so the translation doesn't affect anything drawn after
`displayHouse()` returns. Look up `translate()`, `push()` and `pop()` in
the p5 reference before starting — and see `src/extras/08-traffic-light/`
for a worked example of the same technique (grouping several shapes around
one point with `translate()`/`push()`/`pop()`).

## Stage 9 of 10 — mirrors 09-ball-class

Replace `createHouse()`/`displayHouse()` with a `House` class: the
constructor takes over construction, a `display()` method takes over
drawing.

## Stage 10 of 10 (final stage) — mirrors 10-array-of-balls

Replace the single house with a `houses` array of several `new House(...)`
instances at different positions, sizes and colours; a `for` loop in
`setup()` displays each and labels it with `text("House " + i, ...)`.
Remove `mousePressed()`/`keyPressed()` — like sketch 10, this stage is
fully `setup()`-driven. Houses stay static from here — this is the last
House stage.
