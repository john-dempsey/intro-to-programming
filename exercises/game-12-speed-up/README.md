# Game Stage 12: The Aliens Speed Up — Exercises

This is your working copy of `src/game/12-speed-up`. Edit the files here
as much as you like: nothing carries over to the next stage.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
shows the aliens' speed.

## 1. Predict, change, observe

1. With half the aliens destroyed (16 left), roughly how fast will the
   formation march? Make a guess, then shoot 16 aliens and check the
   overlay.
2. Set `ALIEN_TOP_SPEED` to `8`. Can you still hit the last alien?
3. Set `ALIEN_TOP_SPEED` to the same value as `ALIEN_START_SPEED`. Which
   stage's game is this now?

## 2. The console: decimals aren't exact

Type each of these into the console and press Enter:

```javascript
0.1 + 0.2
0.1 + 0.2 === 0.3
alienSpeedFor(31)
aliens[0].x
```

Computers store most decimal numbers as very close approximations, not
exactly. Usually you'd never notice, but `===` notices. That's why the
tests now have `checkClose()` as well as `check()`.

## 3. Break it

1. In `testAlienSpeed()`, change the last line from `checkClose(...)` to
   `check(...)` (and remove the `0.0001` at the end). Run it. Read the
   FAIL message closely: how different are the two numbers?
2. Undo that. In `updateGame()`, replace
   `alienSpeedFor(aliens.length)` with `alienSpeedFor(32)`. What happens
   to the game? Do any tests fail? Why not?

Use `git restore sketch.js tests.js` to undo your changes.

## 4. Debugger

1. Set a **conditional breakpoint** on the first line of
   `marchAliens()` with the condition `speed > 3`. Play until it pauses.
   How many aliens are left (`alienList.length`)? Can you work that out
   from the numbers in `alienSpeedFor()` instead?
2. Add `alienSpeedFor(aliens.length)` to the **Watch** panel. Step through
   a few frames.

## 5. Write a test

1. Write a test that loops over every possible number of aliens, from
   `0` to `32`, and counts how many times `alienSpeedFor()` gives a speed
   above `ALIEN_TOP_SPEED`. Check the count is `0`. Run it.
2. It fails: with `0` aliens left, the speed is above the top speed.
   Does that matter in the game? Decide. If you think it does, look up
   p5's `constrain()` and use it in `alienSpeedFor()`.

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it and watch the aliens for a while, then shoot a few. How is the
   speed behaving?
2. Which tests fail?
3. Look up p5's `map()` function in the reference. What does each of its
   five values mean? Find the mistake.

## 7. Git: who changed this, and when?

1. In the terminal, run:
   ```
   git blame sketch.js
   ```
   Each line of the file is shown with the commit that last changed it,
   who made that commit, and when. Press `q` to quit.
2. Find out which commit first added `ALIEN_TOP_SPEED`:
   ```
   git log -S "ALIEN_TOP_SPEED" --oneline
   ```
   `-S` finds every commit that added or removed that text.
3. When would these be useful in a team project?

## 8. Playtest

Ask someone else to play three games while you watch, without helping.
Write down how far they get each time, and anything they say. Then
change **one** constant to make the game better, and ask them to play
again. Did it help?

Professional game developers do this constantly. The numbers in a game
are rarely right first time.

## 9. Your project

1. Does your project get harder (or easier) as it goes on? Could one
   function work out the difficulty from what's happening, like
   `alienSpeedFor()`?
2. Does any test in your project compare decimal numbers with `===`?

Commit when you're done:

```
git commit -am "Game stage 12 exercises: done"
```
