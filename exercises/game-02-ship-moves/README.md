# Game Stage 2: Moving the Ship — Exercises

This is your working copy of `src/game/02-ship-moves`. Edit the files here
as much as you like: nothing carries over to stage 3, which starts again
from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Set `SHIP_SPEED` to `20`. How does the ship feel to control? Do any
   tests fail? Explain why or why not. (Hint: look at `makeTestShip()`.
   Do the tests use `SHIP_SPEED`?)
2. Set `SHIP_SPEED` to `0.5`. Does the ship still reach the edge exactly?
3. Hold down both arrow keys at once. What happens, and which lines in
   `readDirection()` cause it?

## 2. Break it

1. Delete the whole `if`/`else if` clamp from `move()`. Hold the right
   arrow key for a few seconds, then let go and hold the left one. How
   long does the ship take to come back? Why?
2. Put the clamp back, but compare the centre instead of the edges:
   `if (this.x < 0)` / `this.x = 0`, and the same on the right. What does
   the ship look like at the edge? Which tests catch this?

Use `git restore sketch.js` to undo your changes.

## 3. Debugger: watch the ship move

1. In DevTools **Sources**, set a breakpoint on the line
   `this.x += direction * this.speed;`.
2. The sketch pauses at once, even though you're not pressing a key. Why?
   What's the value of `direction`?
3. Remove that breakpoint. Now **right-click** the same line number and
   choose **Add conditional breakpoint**. Type `direction !== 0` and press
   Enter. Now it only pauses while you're pressing a key. Try it.
4. While paused, press **Step over** (F10) a few times and watch `this.x`
   change in the **Scope** panel.
5. Right-click the breakpoint, choose **Edit breakpoint**, and change the
   condition to `this.x > 600`. Drive the ship to the right edge. Each
   time it pauses, step through `move()` with F10, then resume with F8.
   After a few frames you'll see the clamp pull `this.x` back to `615`.
   Why doesn't the clamp do anything on the first few pauses?

Conditional breakpoints are very useful in games, where `draw()` runs 60
times a second and you only care about one moment.

## 4. Write a test

1. Add a check to `testShipStaysOnCanvas()`: after 1000 moves to the
   **left**, the ship should be at the left edge.
2. Add a new test function, `testDifferentSpeed()`, that makes a ship with
   speed `10` (you'll need to call `new Ship(...)` directly, not
   `makeTestShip()`) and checks that one move right adds `10` to `x`.
3. Make each check fail on purpose once, to prove it can fail, then put it
   back.

## 5. Bug hunt

The folder `bug-hunt/` contains this stage's code with one bug planted in
it.

1. Run it and drive the ship to each edge. What's wrong?
2. Which tests fail? What are the expected and actual values?
3. Set a conditional breakpoint in `move()` (see exercise 3) to pause
   only when the ship is near the bad edge, then step through the clamp.
4. Find the bug and fix it. All tests should pass.
5. This is a one-word mistake that's easy to make by copying and pasting.
   Look back at sketch 13 (`src/13-ball-bounce`): where does the same kind
   of code appear twice, once for `width` and once for `height`?

## 6. Git: try an experiment on a branch

`keyPressed()` is another way to read keys: it runs once per press
instead of every frame. Try it out on a **branch**, a separate line of
history you can throw away.

1. Commit your work first, so you have a clean starting point.
2. Make and switch to a new branch:
   ```
   git switch -c try-keypressed
   ```
3. In `sketch.js`, remove `ship.move(readDirection());` from `draw()` and
   add:
   ```javascript
   function keyPressed() {
       if (keyCode === LEFT_ARROW) {
           ship.move(-1);
       } else if (keyCode === RIGHT_ARROW) {
           ship.move(1);
       }
   }
   ```
   Run it. How is it different to play? Which version suits this game
   better?
4. Commit on the branch, then compare it with `main`:
   ```
   git commit -am "Try keyPressed for ship movement"
   git diff main
   ```
5. Go back to `main` and delete the experiment:
   ```
   git switch main
   git branch -D try-keypressed
   ```
   Check `sketch.js`: it's back to how it was before the branch.

(If your main branch is called `master` rather than `main`, use that name
instead. `git branch` lists your branches.)

Branches make experiments safe. If the experiment had been better, you
would have merged it into `main` with `git merge try-keypressed` instead
of deleting it.

## 7. Your project

1. Find one piece of logic in your own project that you could test
   without anyone touching the mouse or keyboard (a calculation, or
   something that changes an object's position). Write one `check()` for
   it. You can copy `check()` from this stage's `tests.js`.
2. Does your project read the keyboard or mouse in the same function that
   does the work? If so, could you split it the way `readDirection()` and
   `move()` are split here?

Commit when you're done:

```
git commit -am "Game stage 2 exercises: done"
```
