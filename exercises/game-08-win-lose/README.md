# Game Stage 8: Winning and Losing — Exercises

This is your working copy of `src/game/08-win-lose`. Edit the files here
as much as you like: nothing carries over to the next stage.

This stage completes the "must have" features from the plan: it's the
smallest playable game. Play it properly at least once before you start.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** in the game for the debug overlay, which now
shows the game state.

## 1. Predict, change, observe

Write down what you expect *before* each change. Undo each change before
the next one.

1. Without firing, how long do the aliens take to reach the ship? Time
   it. Now set `ALIEN_DROP` to `40` and predict the new time before you
   check.
2. In `updateGame()`, change `ship.getBounds().top` to `height`. What
   changes about when you lose? Which version is fairer?
3. Win a game, then hold the arrow keys. Why doesn't the ship move?

## 2. The console: set up the situation you want to test

Waiting 40 seconds to test losing, or shooting 32 aliens to test
winning, is slow. Use the console to jump straight to the situation you
want:

1. Leave only one alien: `aliens.splice(1)`. Now shoot it. Did you win?
   Press Enter.
2. Press Enter to start again, then move one alien down past the ship:
   `aliens[0].moveBy(0, 400)`. What happens on the next frame?
3. Type `gameState = STATE_LOST`. What appears? Press Enter.

This is a powerful debugging technique: put the program into the state
you need, rather than playing until you get there.

## 3. Break it

1. In `keyPressed()`, change `key === " " && gameState === STATE_PLAYING`
   to just `key === " "`. Win or lose, then press space a few times. What
   do you see? Why don't the bullets move? Press Enter: are they still
   there?
2. Undo that. In `draw()`, remove the `if` around `updateGame();` (keep
   the call). What happens when you lose now?
3. Undo that. In `checkGameState()`, change `return STATE_WON;` to
   `return STATE_WONN;`. Run it and read the console. Now change it back,
   and instead change `STATE_WON` in `draw()` to the string `"Won"`.
   Run it and win the game. Which mistake was easier to find, and why?

Use `git restore sketch.js` to undo your changes.

## 4. Debugger

1. Set a breakpoint on the line `return STATE_LOST;`. Then use the console
   trick from exercise 2 to move an alien down to the ship.
2. When it pauses, which alien is it (`i`)? What is its bottom
   (`alienList[i].getBounds().bottom`), and what is `shipTop`?
3. Remove the breakpoint. Put a **logpoint** on `gameState = STATE_PLAYING;`
   in `resetGame()` that prints `"new game"`. How many times does it print
   when the page loads? Why that many? (Hint: look at `testResetGame()`.)

## 5. Write a test

1. Write a check that an alien **below** the ship (its bottom well past
   `shipTop`) also counts as lost.
2. Should `resetGame()` turn off the debug overlay? Decide, and write a
   test that checks your decision. If your test fails, change
   `resetGame()` to match.
3. Look at `testResetGame()`. Why does it deliberately put the game into
   a bad state first, instead of just calling `resetGame()` and checking
   the results?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it. Watch the very start closely. What happens to the aliens? Can
   you win?
2. Which tests fail? They're all about one function.
3. Set a breakpoint on the first line of that function, and watch
   `alienList.length` in the **Scope** panel as you step over that line.
4. The bug is a single missing character. Read the line one character at
   a time. What does that line actually do?
5. Why doesn't JavaScript report this as an error?

## 7. Git: tag a milestone

The game is now playable from start to finish: a milestone worth
marking. A **tag** is a permanent name for one commit.

1. Commit your work, then run:
   ```
   git tag smallest-playable-game
   git tag
   ```
2. Run `git log --oneline --decorate`. Which commit has the tag?
3. Make another commit, then run `git log --oneline --decorate` again.
   Did the tag move? (It shouldn't: tags stay on the commit they were
   made on. That's what makes them different from branches.)
4. Run `git show smallest-playable-game` to see that commit.

You'll be able to find this version again, whatever happens to the code
later.

## 8. Challenge (optional)

Add a fourth state, `STATE_PAUSED`. Pressing **P** while playing pauses
the game (everything freezes, with a "PAUSED" message); pressing P again
carries on. What do you need to change in `draw()`, `keyPressed()` and
`displayMessage()`? Which tests should you add?

## 9. Your project

1. What states does your project have (a start screen, playing, a
   results screen, …)? Write them down, and for each one, what moves it
   into the next.
2. Does your project have a way to start again? Could one `reset`
   function set up everything, so `setup()` and "play again" share it?
3. Is there a point in your project that's worth tagging as a milestone?

Commit when you're done:

```
git commit -am "Game stage 8 exercises: done"
```
