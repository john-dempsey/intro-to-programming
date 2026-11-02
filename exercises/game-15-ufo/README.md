# Game Stage 15: The Mystery UFO — Exercises

This is your working copy of `src/game/15-ufo`, the finished game. Run it
with Live Server, as in stage 14.

This folder also has the final `PLAN.md`, with a **Retrospective** section
looking back over the whole project, and a `CHANGELOG.md` listing every
version. Read both before you start.

Keep the browser console open (F12, **Console** tab). Press **D** for the
debug overlay, which counts down to the next UFO.

## 1. Predict, change, observe

1. How often should a UFO appear? Watch the overlay and time a few.
2. Set `UFO_MIN_WAIT` and `UFO_MAX_WAIT` both to `3000`. What happens?
3. Set `UFO_SPEED` to `6`. Can you still hit it?

## 2. The console: control time

1. Make the next UFO arrive now: `nextUfoTime = millis()`.
2. While a UFO is on screen, type `ufo.points`. Now shoot it. Did you get
   that many points?
3. Type `ufo = null` while a UFO is on screen. When will the next one
   come? (Look at `nextUfoTime` and `millis()`.) Is that a bug?

## 3. Break it

1. In `updateGame()`, change `updateUfo(now);` to
   `updateUfo(millis() + 30000);`. What happens, and why?
2. Undo that. In `handleUfoHit()`, move the line
   `let points = ufo.points;` so it comes *after* `removeUfo(now);`. Shoot
   a UFO. Read the error in the console. Why does the order of those two
   lines matter? Which test crashes, and does its message help?

Use `git restore sketch.js` to undo your changes.

## 4. Debugger

1. Set a breakpoint inside `updateUfo()` on the line `ufo = spawnUfo();`.
   Summon a UFO from the console. When it pauses, compare `now` and
   `nextUfoTime`.
2. Step into `spawnUfo()` (F11). Which side will this UFO come from?
   Step through to find out before it appears.

## 5. Write a test

1. The tests pass the time into `updateUfo()`. Write a test that a UFO
   sent at time `0` from the left reaches the middle of the screen: call
   `updateUfo()` repeatedly, with any times, and count the calls. How
   many frames does it take? Check your answer against `UFO_SPEED`.
2. Why do `testScheduleNextUfo()`'s checks use `>=` and `<=` rather than
   checking for one exact value?

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Play for a minute with the overlay on. How often do UFOs come?
2. Which tests fail?
3. Follow what happens after a UFO leaves the screen. Which function
   runs? What should it do that it doesn't?
4. The comment above `removeUfo()` explains why removing the UFO is in
   one function used in two places. How does that help when fixing this
   bug?

## 7. Git: release version 1.0

The game is finished. Time to release it.

1. Make sure everything is committed. Then tag the release with an
   **annotated** tag, which stores a message, the date and your name:
   ```
   git tag -a v1.0 -m "Version 1.0: every feature in the plan"
   git show v1.0
   ```
2. List everything since the smallest playable game (if you made that tag
   in stage 8; otherwise use any older commit's ID):
   ```
   git log --oneline smallest-playable-game..v1.0
   ```
3. Read `CHANGELOG.md`. Write a changelog entry of your own for the
   commits in step 2, in plain language a player would understand.
4. Compare the commit messages from step 2 with the changelog. Which is
   for developers, and which is for players?

## 8. Retrospective

Read the "Retrospective" section of `PLAN.md`. Then write your own for
the game stages you've worked through:

1. What helped you most: the tests, the debugger, the console, the debug
   overlay, or Git?
2. Which bug hunt took you longest? Why?
3. What would you do differently on your own project, having seen this
   one?

## 9. Your project

1. Write a "Progress" and a "Retrospective" section for your project's
   `PLAN.md`.
2. Write a `CHANGELOG.md` for your project from your `git log`.
3. When your project is finished, tag it `v1.0`.

Commit when you're done:

```
git commit -am "Game stage 15 exercises: done"
```
