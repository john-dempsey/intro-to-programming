# Game Stage 1: Drawing the Ship — Exercises

This is your working copy of `src/game/01-ship`. Edit the files here as
much as you like: nothing carries over to stage 2, which starts again from
fresh code.

Open the browser console (F12, then the **Console** tab) whenever you run
the sketch, so you can see the test results.

## 1. Predict, change, observe

For each change below, first **write down** what you think will happen.
Then make the change, run the sketch, and compare. Undo each change before
the next one.

1. Set `SHIP_WIDTH` to `150`. Does the cannon change size too? Why?
2. Set `SHIP_MARGIN` to `0`. What happens to the ship, and why?
3. Change `rectMode(CENTER)` to `rectMode(CORNER)`. Where does the ship
   go, and why do the two rectangles no longer line up?

## 2. Break it

1. Delete the line `pop();` in `display()`. The ship still looks fine.
   Explain why it still looks fine *for now*, and describe what would go
   wrong once a second object is drawn after the ship.
2. In `tests.js`, find the check called `"ship starts in the middle"` and
   change its expected value from `width / 2` to `300`. Run it. What does
   the FAIL message tell you? Change it back.

To undo every change you've made to a file since your last commit:

```
git restore sketch.js
```

## 3. Debugger: pause inside display()

1. Open DevTools (F12) and go to the **Sources** tab. Find `sketch.js` in
   the file list on the left and open it.
2. Click the line number next to `translate(this.x, this.y);` to set a
   breakpoint (a blue marker appears).
3. The sketch pauses there straight away. Why straight away? (Hint: how
   often is `draw()` called?)
4. In the **Scope** panel on the right, find `this`. What are `x`, `y`,
   `bodyWidth` and `bodyHeight`? Do they match the constants at the top of
   the file?
5. Press the resume button (or F8). Why does it pause again immediately?
6. Click the blue marker to remove the breakpoint, then resume.

## 4. Write a test

Add a new test function to `tests.js` and call it from `runTests()`:

```javascript
function testShipSize() {
    // your checks here
}
```

1. Check that the game's real `ship` has a `bodyHeight` equal to
   `SHIP_HEIGHT`.
2. Check that `ship.bodyWidth` is bigger than `ship.bodyHeight`. (Hint:
   `check("...", ship.bodyWidth > ship.bodyHeight, true)`.)
3. Run it and confirm both PASS. Then make one fail on purpose, to prove
   your test can actually fail. A test that can never fail tests nothing.

## 5. Bug hunt

The folder `bug-hunt/` contains this stage's code with one bug planted in
it. Run it.

1. What's wrong on screen?
2. What does the console say? Which test fails, and what were the expected
   and actual values?
3. Use the expected and actual values to work out which line is wrong. If
   you're not sure, set a breakpoint on the first line inside `setup()`,
   then reload the page (F5) so `setup()` runs again. Step through it with
   the **Step over** button (F10), watching the values in the **Scope**
   panel.
4. Fix it, and confirm all tests pass.

## 6. Git: see what you changed

Make any small change to `sketch.js` (change the ship's colour, say).
Before committing, run:

```
git status
git diff
```

`git status` lists which files have changed; `git diff` shows the exact
lines, with removed lines marked `-` and added lines marked `+`. Get into
the habit of reading the diff before every commit: it's the last chance
to spot a change you didn't mean to make.

## 7. Your project

Look at stage 1 of your own plan. What's the *least* you could draw to
see it working? Build just that, check it runs with no console errors,
and commit it.

Commit when you're done:

```
git commit -am "Game stage 1 exercises: done"
```
