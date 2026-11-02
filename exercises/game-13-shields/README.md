# Game Stage 13: Shields — Exercises

This is your working copy of `src/game/13-shields`. Edit the files here
as much as you like: nothing carries over to the next stage.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
draws the hitbox of every shield block.

## 1. Predict, change, observe

1. How many shots does it take to make a hole right through a shield?
   Predict from the constants, then try it.
2. Set `SHIELD_COUNT` to `3`, then `8`. Do the shields still fit? Is
   there a test that would tell you if they overlapped each other?
3. Set `SHIELD_BLOCK_SIZE` to `4` (and `SHIELD_COLUMNS` to `12`,
   `SHIELD_ROWS` to `8`, so the shields stay the same size). How does the
   game feel? Look at the frame rate in the overlay.

## 2. The console

1. Type `shieldBlocks.length`. Shoot a shield, then check again.
2. Type `collideBulletsWith`. The console shows the function's code.
   Which other functions call it? (Search `sketch.js` with Ctrl+F.)
3. Type `shieldBlocks = []`. What happens?

## 3. Break it

1. In `updateGame()`, swap the order so `handleCollisions(bullets, aliens)`
   comes *before* the two shield lines. Does anything change in the game?
   When could the order matter? (Hint: a bullet that hits a shield block
   and an alien in the same frame.)
2. Undo that. In `createShields()`, change `(shieldCount + 1)` to
   `shieldCount`. What happens to the shields? Do any tests catch it?
   Write one that would: check that every block is on the canvas.

Use `git restore sketch.js` to undo your changes.

## 4. Debugger: one function, three jobs

1. Set a breakpoint on the first line of `collideBulletsWith()`.
2. It pauses straight away. Look at the **Call Stack**: which line called
   it? Look at `targetList` in the **Scope** panel: is it aliens or
   shield blocks?
3. Resume (F8) twice more. Each time, what's `targetList` this time?
4. The same function does three different jobs every frame. What would
   the code look like if it had been written three times instead?

## 5. Write a test

1. Write a test that shields stop alien bullets *and* player bullets in
   the same frame: put one of each on the same block. What should happen
   to the block? To each bullet? Run it.
2. Look at `handleCollisions()`. It's now only two lines. The stage 9
   tests for it didn't change at all, and they still pass. What does
   that tell you about the refactor?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Shoot at a shield, several times, from different places. Do the
   holes appear where the bullets hit?
2. Shoot at the aliens. Is the right alien destroyed?
3. Which test fails? Read its name.
4. The bug is in `collideBulletsWith()`. There are two arrays and two
   index variables. Check every place each index is used. Is each one
   used with the right array?

## 7. Git: commit part of a file

Sometimes you change a file in two unrelated ways and want two commits.
You can commit just part of a file.

1. Commit your work, so you're starting clean.
2. Make two unrelated changes in `sketch.js`: change the shield colour in
   `resetGame()`, and change `SHIELD_TOP` to `360`.
3. In VS Code, open the **Source Control** panel (Ctrl+Shift+G) and click
   `sketch.js` to see the changes side by side.
4. In the right-hand side, select just the lines with the colour change.
   Right-click and choose **Stage Selected Ranges**.
5. Commit with a message about the colour. Then stage and commit the other
   change with its own message.
6. Run `git log --oneline -2` to see both commits.

(On the command line, `git add -p sketch.js` does the same: it shows each
change in turn and asks whether to include it. Type `y` or `n` for each.)

## 8. Challenge (optional)

In the original game, aliens destroy the shields as they march down
through them. Make aliens remove any shield blocks they overlap. Which
existing function can you reuse? (Hint: it doesn't have to be bullets
that hit things.)

## 9. Your project

1. Is there code in your project that does almost the same thing in two
   or three places? Could one function, with parameters, replace them?
2. If you change a function like that, how will you know you haven't
   broken anything?

Commit when you're done:

```
git commit -am "Game stage 13 exercises: done"
```
