# Game Stage 10: The Aliens Fire Back — Exercises

This is your working copy of `src/game/10-aliens-fire`. Edit the files
here as much as you like: nothing carries over to the next stage.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
counts alien bullets too.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. `ALIEN_FIRE_CHANCE` is `0.02`, and `draw()` runs 60 times a second.
   About how many alien bullets should be fired in 10 seconds? Count them
   (or use the overlay) and compare.
2. Set `ALIEN_FIRE_CHANCE` to `0.1`, then to `0`. Which value makes the
   best game?
3. Set `ALIEN_BULLET_SPEED` to `8`, the same as the player's bullets. Is
   the game still fair?

## 2. Randomness and `randomSeed()`

Random games are hard to debug: if something odd happens, you can't make
it happen again.

1. Reload the page a few times without firing. Do the aliens fire at the
   same moments each time?
2. Add `randomSeed(42);` as the first line of `setup()`. Reload a few
   times, again without firing. What's different now?
3. `randomSeed()` makes `random()` give the same sequence of numbers
   every time. Why would that help you track down a bug that only
   happens "sometimes"?
4. Why does firing your own bullets make the games different again, even
   with the seed? (Hint: `random(aliens)` picks from the aliens that are
   still alive.)

## 3. The console

1. Type `alienFires(aliens[0])` a few times. Where do the bullets come
   from?
2. Type `lives = 1`, then get hit. What happens?
3. Type `alienBullets.length` while aliens are firing.

## 4. Break it

1. In `isOffScreen()`, change `return pastTop || pastBottom;` to
   `return pastTop;`. Turn on the overlay and wait. What happens to the
   alien bullet count? (This is the question from stage 3, exercise 5:
   is a bullet below the canvas "off screen"? Now it matters.)
2. Undo that. In `updateGame()`, delete the line `alienBullets = [];`.
   Get hit by one bullet. How many lives do you lose? Step through it
   with the debugger to see why.

Use `git restore sketch.js` to undo your changes.

## 5. Debugger

1. Set a breakpoint on `lives -= 1;`. Get hit. Look at `alienBullets` in
   the **Scope** panel: which bullet hit you?
2. Change it to a **conditional breakpoint** with the condition
   `lives === 1`, so it only pauses when you're about to lose your last
   life.

## 6. Write a test

1. Write a check that an alien bullet far below the canvas (`y = 1000`)
   is off screen.
2. Write a check that a bullet touching the ship's edge, but not
   overlapping it, doesn't count as a hit.
3. `maybeAlienFires()` is random. How could you test it? Try calling
   `randomSeed(1)` at the start of a test and then calling
   `maybeAlienFires()` 100 times. Is the number of bullets fired the same
   every time you reload? Is it close to what you'd expect?

## 7. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it. What happens straight away? Press Enter. What happens?
2. Which test fails?
3. Look at what `testResetGame()` does to `lives` *before* calling
   `resetGame()`. Then look at `resetGame()`. Find the bug and fix it.
4. Undo your fix. Now comment out the line `runTests();` in `setup()` and
   run the game. What's different? Read the score and lives in the corner.
   Why does the bug look different with and without the tests?

## 8. Git: a merge conflict

When two branches change the **same line** in different ways, Git can't
decide which version to keep. That's a **merge conflict**, and you have
to decide yourself.

1. Commit your work, so you're starting clean.
2. Make a branch and change the number of lives on it:
   ```
   git switch -c five-lives
   ```
   Set `STARTING_LIVES` to `5`, then:
   ```
   git commit -am "Five lives"
   git switch main
   ```
3. On `main`, change the **same line** differently: set `STARTING_LIVES`
   to `4`, then:
   ```
   git commit -am "Four lives"
   ```
4. Now merge:
   ```
   git merge five-lives
   ```
   Git reports a conflict. Open `sketch.js`. You'll see:
   ```
   <<<<<<< HEAD
   const STARTING_LIVES = 4;
   =======
   const STARTING_LIVES = 5;
   >>>>>>> five-lives
   ```
   The top part is `main`'s version; the bottom is the branch's.
5. VS Code shows buttons above the conflict: **Accept Current Change**,
   **Accept Incoming Change** and **Accept Both Changes**. Pick one, or
   edit the lines by hand. Make sure every `<<<<<<<`, `=======` and
   `>>>>>>>` line is gone.
6. Finish the merge:
   ```
   git add sketch.js
   git commit -m "Merge five-lives, keeping 4 lives"
   git branch -d five-lives
   ```
7. Run `git log --oneline --graph`. You can see the two lines of history
   joining.

Conflicts are normal, not a sign that something has gone wrong. They're
much easier to sort out when branches are small and merged often.

## 9. Challenge (optional)

In the original game, only the **lowest** alien in each column can fire:
bullets never pass through other aliens. Change `maybeAlienFires()` so
the shooter is always the lowest alien in its column. (Hint: first pick
a random alien, then look for any alien with the same `x` and a bigger
`y`.)

## 10. Your project

1. Does your project use `random()`? Add `randomSeed()` while you're
   debugging, so you can make the same thing happen again.
2. Does one event in your project (like being hit) need to happen only
   once, but its cause lasts several frames? How do you stop it
   repeating?

Commit when you're done:

```
git commit -am "Game stage 10 exercises: done"
```
