# Game Stage 9: Score — Exercises

This is your working copy of `src/game/09-score`. Edit the files here as
much as you like: nothing carries over to the next stage.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. What's the highest possible score? Work it out from `ALIEN_ROWS`,
   `ALIEN_COLUMNS` and `ALIEN_ROW_POINTS`. Then win a game and check.
2. Set `ALIEN_ROW_POINTS` to `[50, 10]`. There are four rows but only two
   values. Which rows get which points? Which line decides?
3. Shoot one alien from each row and watch the score. Does each row give
   what you expected?

## 2. The console

1. Type `aliens[0].points` and `aliens[aliens.length - 1].points`. Which
   aliens are these?
2. Type `score = 9999`. What happens on screen?
3. Write a `for` loop in the console that adds up the points of every
   alien still alive:
   ```javascript
   let total = 0;
   for (let i = 0; i < aliens.length; i++) { total += aliens[i].points; }
   total
   ```
   Shoot a few aliens, then run it again. Does `score + total` stay the
   same? Why should it?

## 3. Break it

1. In `handleCollisions()`, delete the line `return pointsScored;`. Shoot
   an alien. What does the score show? Which tests fail? (`NaN` means
   "Not a Number": what do you get when you add a number to `undefined`?)
2. Undo that. In `resetGame()`, remove `, ALIEN_ROW_POINTS` from the
   `createAlienGrid()` call. Read the red error in the console. Which
   line does it point to? Why there, and not in `resetGame()`?

Use `git restore sketch.js` to undo your changes.

## 4. Debugger: step out

1. Set a breakpoint on the line `pointsScored += alienList[alienIndex].points;`.
   Shoot an alien.
2. When it pauses, add `score` and `pointsScored` to the **Watch** panel.
3. Press **Step out** (Shift+F11). This runs the rest of the current
   function and pauses as soon as it returns. Where are you now? Press
   Step over (F10) once and watch `score` change.
4. When would Step out be quicker than pressing Step over many times?

## 5. Write a test

1. Write `testRealGridPoints()`: using the game's real `aliens` array,
   check that the first alien is worth `30` and the last is worth `10`.
2. The score is drawn on screen by `displayScore()`. Can you write a
   `check()` for that? What makes it hard? How else would you check it?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug. This time **every test
passes**.

1. Play it. What's wrong with the score? Shoot several aliens slowly,
   then several quickly.
2. Every test passes, so the bug isn't in a function that's tested.
   Which functions do the tests call? Which function do they never call?
3. Add `score` to the **Watch** panel and set a breakpoint in
   `updateGame()`. Step through a frame where an alien is hit. Find the
   bug and fix it.
4. A test couldn't catch this because the line is inside `updateGame()`,
   which is hard to test. Move the scoring line into its own function,
   `addPoints(currentScore, pointsScored)`, that returns the new score,
   and write a test for it. Would your test have caught the bug?

## 7. Git: a feature branch

Professional developers rarely work directly on `main`. Each new feature
gets its own **branch**, which is merged in when it's finished and
working.

1. Commit your work, so you're starting clean.
2. Create and switch to a branch for a small feature:
   ```
   git switch -c yellow-score
   ```
3. Make the score yellow (change the `fill()` in `displayScore()`), test
   it, and commit:
   ```
   git commit -am "Make score yellow"
   ```
4. Switch back to `main`. Check the game: the score is white again.
   ```
   git switch main
   ```
5. Merge the feature in, then delete the branch, which is no longer
   needed:
   ```
   git merge yellow-score
   git branch -d yellow-score
   ```
6. Run `git log --oneline`. Your "Make score yellow" commit is now on
   `main`.

Git calls this a **fast-forward** merge: nothing had changed on `main`
since the branch was made, so Git just moved `main` forward to include
the new commit.

## 8. Your project

1. Does your project keep a score, a count or a total? Is the code that
   updates it tested? Could you move it into a function that returns the
   new value, like `handleCollisions()` does?
2. Pick the next feature for your project and build it on a branch.
   Merge it when it works.

Commit when you're done:

```
git commit -am "Game stage 9 exercises: done"
```
