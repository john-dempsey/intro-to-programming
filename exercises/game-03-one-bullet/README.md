# Game Stage 3: Firing a Bullet — Exercises

This is your working copy of `src/game/03-one-bullet`. Edit the files here
as much as you like: nothing carries over to stage 4, which starts again
from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Fire a bullet, then move the ship. Does the bullet follow the ship?
   Find the line that decides the bullet's `x`, and explain why.
2. Set `BULLET_SPEED` to `1`, then to `40`. At `40`, does the bullet still
   look like it's moving smoothly? Which tests fail, if any?
3. Press space as fast as you can. Why do some presses do nothing? Which
   lines make that happen?

## 2. The console as a calculator

While the sketch is running, you can type JavaScript straight into the
console and press Enter. It runs immediately, using the game's real
variables.

1. Type `ship.x` and press Enter. Move the ship and type it again.
2. Type `bullet`. What do you get when no bullet is on screen? Fire one
   and quickly type `bullet` again. Click the small arrow to expand it.
3. Type `ship.cannonTopY()`. Does the answer match what you'd expect from
   `SHIP_MARGIN`, `SHIP_HEIGHT` and the cannon's height?
4. Type `ship.x = 50`. What happens on screen?

This is one of the fastest ways to answer "what's the value of this right
now?"

## 3. Break it

1. In `updateBullet()`, delete the line `bullet = null;`. Fire once, wait,
   then try to fire again. What happens? Type `bullet` in the console a few
   times: what's happening to its `y`?
2. Put that line back. Now delete `keyPressed()` and instead add this to
   the end of `draw()`:
   ```javascript
   if (keyIsDown(32)) {   // 32 is the key code for space
       fireBullet();
   }
   ```
   Hold space down. Is it different from before? Now delete
   `if (bullet === null)` (and its closing `}`) from `fireBullet()` and
   hold space again. Explain what you see.

Use `git restore sketch.js` to undo your changes.

## 4. Debugger: who called this?

1. In DevTools **Sources**, set a breakpoint on the first line inside
   `fireBullet()`. Press space.
2. Look at the **Call Stack** panel. It lists the functions that were
   running to get here, most recent at the top. Which of your functions
   called `fireBullet()`? (The entries below it are p5's own code, which
   calls your `keyPressed()`.)
3. Step over (F10) once, so you're on the line that starts
   `let startY =`. Now press **Step into** (F11) instead. Where does it
   take you? Keep pressing F10 until you're back in `fireBullet()`. How
   is **Step into** different from **Step over**?
4. In the **Watch** panel, click **+** and add `bullet`. Step through the
   rest of `fireBullet()` and watch it change from `null` to a `Bullet`.

## 5. Write a test

1. In `testBulletOffScreen()`, add a check for a bullet at `y = 1000` (far
   *below* the canvas). Before you run it, decide what `isOffScreen()`
   *should* return. Then run it. Is this a bug, or does it not matter in
   this game? Write a comment in the test explaining your decision.
2. Write `testBulletStartsAtCannon()`: set `bullet = null`, call
   `fireBullet()`, and check that `bullet.x` equals `ship.x`. Set
   `bullet = null` again at the end. Why is that last line important?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it and fire. Describe exactly what happens on screen, and what
   happens when you try to fire a second time.
2. Which test fails? What are the expected and actual values?
3. Explain why this one bug causes *both* problems you saw in step 1.
   (Hint: when does `isOffScreen()` return `true`?)
4. Fix it.

## 7. Git: commit in two parts

Sometimes you change two unrelated things before committing. Each should
be its own commit, so the history makes sense.

1. Change the bullet's colour in `sketch.js`, and add a new check to
   `tests.js`.
2. Run `git status`: both files are listed as modified.
3. Commit only the test:
   ```
   git add tests.js
   git status
   git commit -m "Add check for bullet start position"
   ```
   `git status` shows `tests.js` under "Changes to be committed" and
   `sketch.js` still under "Changes not staged". `git add` chooses what
   goes into the next commit.
4. Then commit the other change:
   ```
   git add sketch.js
   git commit -m "Change bullet colour"
   ```
5. Run `git log --oneline` and check you have two separate commits.

## 8. Your project

1. List the actions in your project that should happen **once per press**
   (like firing) and those that should happen **while a key or button is
   held** (like moving). Check your code uses `keyPressed()` /
   `mousePressed()` for the first group and `keyIsDown()` /
   `mouseIsPressed` for the second.
2. Is there anything in your project that is sometimes there and
   sometimes not? Could `null` represent "not there"?

Commit when you're done:

```
git commit -am "Game stage 3 exercises: done"
```
