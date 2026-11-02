# Game Stage 6: The Alien March — Exercises

This is your working copy of `src/game/06-alien-march`. Edit the files
here as much as you like: nothing carries over to stage 7, which starts
again from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
shows the aliens' direction.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Set `ALIEN_DROP` to `60`. Roughly how long until the aliens reach the
   ship? Time it.
2. Set `ALIEN_SPEED` to `3`. The game looks fine, but one test fails.
   Which one? Look at the numbers in that test: is the **code** wrong, or
   is the **test** wrong? How could you rewrite the test so it works for
   any speed?
3. With the debug overlay on, watch "alien direction" as the formation
   reaches each edge. Which line of code changes it?

## 2. Break it

1. In `formationAtEdge()`, change
   `let nextX = alienList[i].x + direction * ALIEN_SPEED;` to
   `let nextX = alienList[i].x;`. Run it and watch the right edge. What
   happens, and why? (This is the bug described on the "How I developed
   this" page.)
2. Undo that. Now, in `marchAliens()`, change `return -direction;` to
   `return direction;`. What happens? Why does it look similar to the
   first change?
3. Undo that. Delete the `for` loop that drops the aliens (keep the
   `return -direction;`). What kind of movement do you get?

Use `git restore sketch.js` to undo your changes.

## 3. Debugger: which alien hit the edge?

1. In DevTools **Sources**, set a breakpoint on the line
   `return true;` inside `formationAtEdge()`. It only runs when an alien
   is at an edge, so the game keeps going until then.
2. When it pauses at the right edge, look at `i` in the **Scope** panel.
   Which alien is it? Type `alienList[i]` in the console to check its `x`.
   Is it the one you'd expect?
3. Resume (F8) and wait for the left edge. Which alien is it this time?
4. Remove the breakpoint. Now **right-click** the line number of
   `return -direction;` and choose **Add logpoint**. Type
   `"reversing, direction was", direction` and press Enter. A logpoint
   prints a message every time that line runs, *without pausing*. Watch
   the console as the aliens march. This is a `console.log()` you don't
   have to add to your code, or remember to remove.

## 4. Write a test

1. What should `formationAtEdge([], 1)` return for an empty formation
   (all aliens destroyed)? Decide, then write a check for it.
2. `testMarchAtEdge()` only tests the right edge. Write
   `testMarchAtLeftEdge()`: an alien at `x = 15`, marching with direction
   `-1`. Check the new direction, that it dropped, and that the next step
   moves it right without dropping again.
3. Make each new check fail once on purpose, then put it back.

## 5. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it and watch the formation reach the right edge. Then the left
   edge. Describe exactly what's different at each edge.
2. Which tests fail? Read the names of the failing tests carefully: they
   tell you a lot about what's wrong.
3. Add a logpoint inside `formationAtEdge()` that prints `i`. How many
   aliens does the loop actually check?
4. Find and fix the bug. Why does it only affect the right edge? (Hint:
   which alien is first in the array?)
5. `return` inside a loop ends the whole **function**, not just the
   loop. When is that useful, and when is it a bug?

## 6. Git: undo a commit safely

Sometimes you commit something and then realise it was a mistake.
`git revert` makes a **new** commit that undoes an old one, so the
history still shows what happened.

1. Commit your work, so you're starting clean.
2. Set `ALIEN_SPEED` to `10` and commit it:
   ```
   git commit -am "Make aliens much faster"
   ```
3. Run the game. Too fast! Undo the commit:
   ```
   git revert --no-edit HEAD
   ```
   (`--no-edit` accepts Git's default message, "Revert ...", instead of
   opening an editor.)
4. Run `git log --oneline`. You should see both commits: the change and
   its revert. `ALIEN_SPEED` is back to `1`.

`HEAD` means "the most recent commit". You can revert any older commit by
using its ID instead.

## 7. Challenge (optional)

In the original arcade game, the aliens don't glide: they jump a few
pixels at a time, about twice a second. Change the game so the formation
only moves every 30 frames, by a bigger step. (Hint: p5's `frameCount`
and the `%` operator from sketch 12.) Which tests still pass? Which
should you change, and why?

## 8. Your project

1. Does anything in your project move as a group? Is the group's
   behaviour decided in one place, or does each item decide for itself?
2. Look for any check in your project that tests where something **is**
   when it should test where it's **about to be**, like
   `formationAtEdge()` does.

Commit when you're done:

```
git commit -am "Game stage 6 exercises: done"
```
