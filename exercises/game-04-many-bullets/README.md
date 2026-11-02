# Game Stage 4: Many Bullets — Exercises

This is your working copy of `src/game/04-many-bullets`. Edit the files
here as much as you like: nothing carries over to stage 5, which starts
again from fresh code.

Keep the browser console open (F12, **Console** tab) so you can see the
test results. Press **D** while the game runs to show the debug overlay.

## 1. Predict, change, observe

1. Turn on the debug overlay (D). Before you fire, predict the highest
   number of bullets you can get on screen at once by pressing space as
   fast as you can. Try it. Were you close?
2. Set `BULLET_SPEED` to `2`. Predict the highest number now, then try it.
3. Fire one bullet and watch the counter. Does it drop back to 0 the
   moment the bullet disappears from view, or a little later? Look at
   `isOffScreen()` to explain why.

## 2. Break it

1. In `updateBullets()`, comment out the call to
   `removeOffScreenBullets(bullets);`. Turn on the debug overlay and fire
   twenty bullets. What happens to the counter? Can you see any problem
   when you play?
2. Without removal, the bullets are still in the array, still moving,
   every frame. Type `bullets[0].y` in the console a few times. Where is
   that bullet now? Why would this be a problem in a game played for an
   hour? Put the line back.
3. Change `bullets.push(newBullet);` to `bullets = [newBullet];`. What
   happens when you fire twice quickly? What does that line do instead?

Use `git restore sketch.js` to undo your changes.

## 3. Debugger: watch an item being removed

1. In DevTools **Sources**, set a breakpoint on the line
   `bulletList.splice(i, 1);`. This line only runs when a bullet is
   being removed, so the sketch carries on normally until then.
2. Fire one bullet and wait. When it pauses, look in the **Scope** panel:
   what are `i` and `bulletList.length`? Expand `bulletList` to see the
   bullets.
3. Step over (F10). What's `bulletList.length` now?
4. Remove the breakpoint and resume. Fire five bullets quickly, then type
   `console.table(bullets)` in the console. What do the columns show?

## 4. Write a test

1. In `testRemoveOffScreenBullets()`, add a test case where the **last**
   bullet in the array is the only one off screen. Check the length *and*
   that the right bullets survived.
2. Add a test case where only the **first** bullet is off screen.
3. Make each new check fail once on purpose, then put it back.
4. Look at `testFireAddsBullets()`. What would go wrong in the game if it
   didn't set `bullets = []` at the end?

## 5. Bug hunt

The folder `bug-hunt/` has one planted bug.

1. Run it and play for a minute with the debug overlay on. Can you see
   anything wrong? (You probably can't.)
2. Now look at the console. Which tests fail?
3. Trace the bug **on paper**. Write down an array of three bullets, all
   off screen: `[A, B, C]`. Then go through the loop in
   `removeOffScreenBullets()` one step at a time. Write down `i`, the
   array, and what happens at each step. Which bullet is never checked?
4. Fix it. (Compare with the original in `src/game/04-many-bullets`, or
   with the comment above `removeOffScreenBullets()`, if you're stuck.)
5. Why doesn't this bug show up when you play? When *would* it start to
   matter? (Think about a later stage where bullets hit aliens and are
   removed together in the same frame.)

To check your fix against the original exactly, you can compare two files
with Git even if they're not committed. Run this from the
`exercises/game-04-many-bullets` folder:

```
git diff --no-index bug-hunt/sketch.js ../../src/game/04-many-bullets/sketch.js
```

## 6. Git: put work aside with stash

You're halfway through a change and want to quickly check how the game
behaved before you started. `git stash` puts your uncommitted changes
aside, and `git stash pop` brings them back.

1. Commit your work, so you're starting clean.
2. Change `BULLET_SPEED` to `20` and the bullet colour to red. Run it.
3. Run:
   ```
   git stash
   ```
   Reload the game. It's back to how it was at your last commit.
4. Run:
   ```
   git stash pop
   ```
   Reload. Your changes are back.
5. Use `git restore sketch.js` to throw the changes away for good.

## 7. Challenge (optional)

JavaScript arrays have a `filter()` method that builds a new array
containing only the items that pass a test. Look it up on MDN, then write
a second version of `removeOffScreenBullets()` using `filter()`. Do the
existing tests still work? (Hint: `filter()` returns a **new** array
rather than changing the one it's given. How does that affect the way
the function has to be called and tested?)

## 8. Your project

1. Does your project have things that are added and removed while it
   runs? How do you remove them? Are you looping forwards?
2. Add a debug overlay to your project, toggled with a key, that shows
   one or two values you'd find useful while developing. Leave it in: it
   will help you in later stages.

Commit when you're done:

```
git commit -am "Game stage 4 exercises: done"
```
