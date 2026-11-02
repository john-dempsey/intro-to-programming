# Game Stage 5: A Grid of Aliens — Exercises

This is your working copy of `src/game/05-alien-grid`. Edit the files here
as much as you like: nothing carries over to stage 6, which starts again
from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Set `ALIEN_ROWS` to `6`. Do all the aliens still have a colour? Which
   line decides the colour of rows 5 and 6?
2. Set `ALIEN_COLUMNS` to `12`. Will it fit on the canvas? Work it out on
   paper first: what's the `x` of the last alien in a row, and where is
   its right edge? Then run it and read the console. Which aliens does the
   test report, and why is that more useful than just "FAIL"?
3. Set `ALIEN_SPACING_X` to `30`, the same as `ALIEN_WIDTH`. What do you
   see? What about `20`?

## 2. Break it

1. Swap the two `for` lines in `createAlienGrid()`, so the `column` loop
   is on the outside and the `row` loop on the inside (keep the bodies the
   same). Does anything change on screen? Which tests fail? Is this really
   a bug? (Hint: what order are the aliens in the array now? Read the
   comment above `testAlienGridPositions()`.)
2. Delete the line `return grid;`. Run it and read the **red errors** in
   the console. The first comes from the tests. The second starts
   `Uncaught TypeError`: what does it say? Click the file name and line
   number on the right of that error: which line does it take you to? Why
   does the error appear on that line and not in `createAlienGrid()`,
   where the mistake is?

Use `git restore sketch.js` to undo your changes.

## 3. Debugger: inside a nested loop

1. In DevTools **Sources**, set a breakpoint on the line starting
   `grid.push(`. `setup()` only runs once, so reload the page (F5) to
   make it run again.
2. When it pauses, find `row`, `column`, `x` and `y` in the **Scope**
   panel. **Before** you press resume (F8), predict all four values for
   the next pause. Do this five or six times. When does `row` change?
3. Pressing F8 32 times is slow. Remove the breakpoint, then add a
   **conditional breakpoint** on the same line with the condition
   `row === 2 && column === 0`. Reload. Which alien is this, and is its
   position what you expected?
4. Remove the breakpoint. With the game running, type these into the
   console: `aliens.length`, `aliens[0]`, `aliens[31]`,
   `console.table(aliens)`.

## 4. Write a test

The aliens are stored row by row in one array, so the alien at a given
row and column is at index `row * ALIEN_COLUMNS + column`.

1. Check that formula with a few examples on paper: where is row 0,
   column 0? Row 1, column 0? Row 3, column 7?
2. Write a function `alienAt(row, column)` in `sketch.js` that returns
   that alien from `aliens`.
3. Write `testAlienAt()` in `tests.js`: check that `alienAt(0, 0)` is
   `aliens[0]`, that `alienAt(1, 0).y` is one row below `alienAt(0, 0).y`,
   and that `alienAt(ALIEN_ROWS - 1, ALIEN_COLUMNS - 1)` is the last alien
   in the array.

## 5. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it. How many aliens can you see? Now press D: how many does the
   debug overlay say there are? Where have the rest gone?
2. Which tests fail? Compare the expected and actual values. Which of
   `x` and `y` is wrong?
3. Use the conditional breakpoint from exercise 3 to look at `x` for a few
   different aliens. Find the line that's wrong and fix it.
4. Nested loops make this kind of mistake easy to write and hard to spot
   by reading. How do the names `row` and `column` (instead of `i` and
   `j`) help?

## 6. Git: the history of one file

1. Run `git log --oneline` to see every commit, then
   `git log --oneline -- sketch.js` to see only the commits that changed
   `sketch.js` in this folder.
2. Pick one commit ID from the list and run `git show <id>` (for example
   `git show a1b2c3d`). It shows the message and exactly what that commit
   changed. Press `q` to quit if the output is long.
3. Why might it be useful to see the history of one file rather than the
   whole project?

## 7. Your project

1. Does your project draw anything in rows and columns? If you've used
   separate lines of code for each item, could a nested loop replace them?
2. Write a "fits on the canvas" test for something in your project, like
   `testAliensFitOnCanvas()`: loop over the items, count the ones outside
   the canvas, and check the count is 0.

Commit when you're done:

```
git commit -am "Game stage 5 exercises: done"
```
