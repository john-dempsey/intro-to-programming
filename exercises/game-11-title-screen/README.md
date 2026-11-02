# Game Stage 11: Title Screen and High Score — Exercises

This is your working copy of `src/game/11-title-screen`. Edit the files
here as much as you like.

This stage completes every "should have" feature in the plan. Read the
updated `PLAN.md` in this folder to see the progress so
far.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. One test deliberately prints a yellow warning: read the
comment in `testHighScoreStorage()` to see why.

## 1. Predict, change, observe

1. Play two games. Does the high score update? Does the message say when
   you've set a new one?
2. Reload the page. Is the high score still there? Close the browser
   completely, open it again and check. Where is it being kept?
3. Open the game in a **private** (incognito) window. What's the high
   score there? Why?

## 2. DevTools: look inside localStorage

1. In DevTools, open the **Application** tab (in Firefox, **Storage**).
   On the left, open **Local Storage** and click the address of the game.
2. Find `spaceInvadersHighScore`. Is its value the high score you saw?
3. Double-click the value and change it to `5000`. Reload the game. What
   does the title screen show?
4. Change it to `hello`. Reload. What does the title screen show? What
   appears in the console? Which lines in `loadHighScore()` handled this?
5. Right-click the entry and delete it. Reload. What's the high score
   now?

## 3. Break it: why try/catch?

1. In `saveHighScore()`, add this as the first line *inside* the `try`
   block:
   ```javascript
   throw new Error("Storage is switched off");
   ```
   `throw` causes an error on purpose, to imitate a browser that won't
   allow saving. Finish a game. What appears in the console? Does the
   game keep working?
2. Now also remove the `try {`, the `}` before `catch`, and the whole
   `catch` block, so the `throw` isn't caught. Finish a game. What
   happens now?
3. In one sentence: what does `try`/`catch` give you here?

Use `git restore sketch.js` to undo your changes.

## 4. Debugger: follow the states

1. Put a **logpoint** on the first line of `handleEnter()` that prints
   `"Enter pressed in state", gameState`. Go from the title screen to a
   game, lose, and back to the title. Does the console match what you
   saw on screen?
2. Set a breakpoint inside `endGame()`. Play a game to the end. Does it
   pause exactly once? Read the comment in `updateGame()` that explains
   why.

## 5. Write a test

1. Write `testScoreSummary()`: set `score` to `250` and `newHighScore`
   to `true`, and check what `scoreSummary()` returns. Then try it with
   `newHighScore` set to `false`. Call `resetGame()` at the end to tidy
   up.
2. What should `loadHighScore()` return if the saved value is `"-50"`?
   Decide, write a check, and change `loadHighScore()` if your test
   fails.
3. `endGame()` isn't tested, because it saves to the player's real high
   score. How could you change `endGame()` so it could be tested safely?
   (Hint: look at how `loadHighScore()` and `saveHighScore()` take the
   storage key as a parameter.)

## 6. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it. Play a game to the end and press Enter. What's missing?
2. Which tests fail?
3. Find the bug in `handleEnter()`. Trace what happens, line by line,
   when Enter is pressed in `STATE_LOST`.
4. In stage 2, `readDirection()` deliberately uses **two separate**
   `if`s. Here, the bug is caused by two separate `if`s. When do you want
   each one, and when do you want `if` / `else if`?

## 7. Git: look at the past

1. See the whole history as a picture:
   ```
   git log --oneline --graph --all
   ```
2. If you tagged `smallest-playable-game` in stage 8, go back and play
   that version:
   ```
   git switch --detach smallest-playable-game
   ```
   Git says you're in "detached HEAD" state: you're looking at an old
   commit, not at a branch. Open the game and play it. What's missing?
3. Come back to the present:
   ```
   git switch main
   ```
   (If you didn't make the tag, use any old commit ID from `git log`
   instead of the tag name.)

## 8. Challenge (optional): find a bug with `git bisect`

`git bisect` finds the commit that introduced a bug by checking out
commits halfway between a "good" one and a "bad" one, again and again.
This works best in pairs.

1. Commit your work. Write down its commit ID: this version is **good**.
2. Your partner makes six small commits (changing colours, text, sizes).
   In **one** of them, without telling you which, they also change
   `score += handleCollisions(bullets, aliens);` to
   `score = handleCollisions(bullets, aliens);`.
3. Now you find it:
   ```
   git bisect start
   git bisect bad
   git bisect good <the commit ID you wrote down>
   ```
4. Git checks out a commit in the middle. Play the game and shoot a few
   aliens. Then tell Git what you found:
   ```
   git bisect good
   ```
   or
   ```
   git bisect bad
   ```
5. Repeat until Git names the first bad commit. Then finish:
   ```
   git bisect reset
   ```

How many commits did you have to check, out of six? How many would you
need for 100 commits?

## 9. Your project

1. Draw your project's states and the arrows between them, as in the
   stage 8 notes. Does every arrow have code that makes it happen?
2. Is there something in your project worth remembering between visits
   (a high score, a setting, a level reached)? If you save it with
   `localStorage`, wrap it in `try`/`catch`.
3. Update your project's `PLAN.md` with a "Progress" section, like the one
   in this folder's `PLAN.md`.

Commit when you're done:

```
git commit -am "Game stage 11 exercises: done"
```
