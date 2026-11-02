# Game Stage 7: Collisions — Exercises

This is your working copy of `src/game/07-collisions`. Edit the files here
as much as you like: nothing carries over to stage 8, which starts again
from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
draws a yellow box (a "hitbox") around everything that can collide.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Shoot every alien in the **right-hand column**, then watch the
   formation reach the right edge. Does it turn round at the same place as
   before? Why? Which function decides, and does it know about the
   missing column?
2. Set `BULLET_WIDTH` to `40`. Turn on the hitboxes. Can you now hit an
   alien without being directly under it? Is that fair to the player?
3. Set `ALIEN_WIDTH` to `60`. The aliens are 50 apart, so they overlap.
   Does anything go wrong? Do any tests fail?

## 2. The console: call functions directly

While the game is running, you can call any of the sketch's functions
from the console. Try:

```javascript
boundsOverlap({ left: 0, right: 10, top: 0, bottom: 10 }, { left: 5, right: 15, top: 5, bottom: 15 })
aliens[0].getBounds()
ship.getBounds()
```

Draw the first two rectangles on squared paper, and check that the answer
is right. Then try a pair of your own that you think *won't* overlap.

## 3. Break it

1. In `handleCollisions()`, delete the line `break;`. Which test fails?
   Read that test's comment. Can you make this bug happen by playing the
   game? Why not? Is it still worth fixing?
2. Put it back. In `boundsOverlap()`, change both `<` to `<=` and both
   `>` to `>=`. Which test fails now? Should two rectangles that only
   touch along an edge count as a hit? There's no single right answer:
   decide, and write a comment explaining your decision.

Use `git restore sketch.js` to undo your changes.

## 4. Debugger: check a hit by hand

1. In DevTools **Sources**, set a breakpoint on the line
   `bulletList.splice(bulletIndex, 1);`. It only runs when there's a hit.
2. Fire at an alien. When it pauses, look in the **Scope** panel at
   `bulletBounds`. In the console, type `alienList[alienIndex].getBounds()`.
3. Write both rectangles down and work through the four comparisons in
   `boundsOverlap()` on paper. Do you agree that they overlap?
4. Which alien was it? Use `alienIndex` and the stage 5 notes to work out
   its row and column.

## 5. Write a test

1. Write `testCornerOverlap()`: two rectangles that overlap only at one
   corner (by 1 pixel in each direction). Should that count? Check it.
2. Write a test for `ship.getBounds()`: a test ship at `(100, 200)` is
   `50` wide and `20` high. What should each of `left`, `right`, `top`
   and `bottom` be?
3. Write a test where two bullets are both aimed at the **same** alien.
   How many bullets should be left afterwards? Run it. Is the answer what
   you expected?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it and fire a single bullet. What happens, and where?
2. Turn on the hitboxes (D) and fire again. Is the destroyed alien
   anywhere near the bullet?
3. Which tests fail? Several fail, but they all point at one function.
   Which one?
4. Read that function line by line, and say each line out loud in
   English ("they overlap if they overlap left-to-right and..."). Find the
   bug and fix it.

## 7. Git: fix your last commit

If you've just committed and spot a typo in the message, or forgot one
small change, `--amend` replaces the last commit instead of adding a new
one.

1. Make a small change and commit it with a deliberate typo:
   ```
   git commit -am "Chnage bullet colour"
   ```
2. Fix the message:
   ```
   git commit --amend -m "Change bullet colour"
   ```
3. Run `git log --oneline`. There's one commit, with the right message.

Only amend commits you **haven't pushed** yet. Once a commit has been
shared (on GitHub, for example), other people may already have it, and
changing it causes problems for them.

## 8. Your project

1. Does your project need collisions? Are your objects better described
   as rectangles or circles? (Sketch 13's exercises used `dist()` for
   circles.)
2. Add a `getBounds()` method to one of your classes, and draw its hitbox
   in a debug overlay. Does the box fit what's drawn?

Commit when you're done:

```
git commit -am "Game stage 7 exercises: done"
```
