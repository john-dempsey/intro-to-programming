# Game Stage 14: Sound and Sprites — Exercises

This is your working copy of `src/game/14-sound-sprites`. Edit the files
here as much as you like: nothing carries over to the next stage.

**Run this stage with a local web server**, such as VS Code's Live Server
extension (right-click `index.html`, then **Open with Live Server**).
Browsers block a page opened straight from a folder from loading other
files, so without a server you'll get shapes and no sound. That's
exercise 3.

Keep the browser console open (F12, **Console** tab). Press **M** in the
game to turn sound on and off.

## 1. Predict, change, observe

1. The sprite files are white. Where do the colours come from? Find the
   line that colours them.
2. Remove `noSmooth();` from `setup()`. Look closely at the aliens. What
   changed?
3. Open `assets/alien-crab.png` in VS Code. How big is it in pixels? How
   big is it drawn in the game? Which line decides?

## 2. Load the page and listen

1. Load the game, and *before pressing anything*, open the console. Is
   there a warning about audio? Press a key. Shoot. Do you hear it?
2. Find `userStartAudio()` in `keyPressed()`. Read the comment. Why do
   browsers do this?

## 3. Missing files

1. Open `index.html` directly from the folder (double-click it in your
   file manager), not with Live Server. What do you see? What's in the
   console?
2. Go back to Live Server. Rename `assets/ship.png` to
   `assets/ship-old.png`. Reload. What happens to the ship? What does the
   console say?
3. Open DevTools' **Network** tab and reload. Find `ship.png` in the list.
   What's its **status**? (200 means found; 404 means not found.) Rename
   the file back.

The game keeps working without its files. That's called **graceful
degradation**: when something goes wrong, do the next best thing rather
than stop.

## 4. Break it

1. In `loadSprite()`, delete the second function (the one that prints
   the warning) and the comma before it. Rename `assets/ship.png` again
   and reload. What happens now? Why? Put everything back.
2. In `playSound()`, remove `&& sound`. Rename `assets/shoot.wav` and
   reload. Fire. What happens? Put everything back.

Use `git restore sketch.js` to undo your changes.

## 5. Debugger and console

1. Type `sprites` in the console and expand it. Which sprites loaded?
   Type `sounds`.
2. Type `playSound(sounds.explosion)`. Then press M and try again.
3. Set a breakpoint inside the first function in `loadSprite()` (on the
   line `sprites[name] = loadedImage;`) and reload. It pauses four times.
   Is it in the same order as the `loadSprite()` calls in `preload()`?
   (It might not be: files arrive when they arrive.)

## 6. Write a test

1. Look at `makeFakeSound()`. Why is a fake sound better for a test than
   a real one?
2. Write `testHitPlaysSound()`: swap `sounds.explosion` for a fake, put a
   bullet on an alien, run the code from `updateGame()` that handles
   alien hits, and check the fake was played once. Put the real sound
   back at the end. (Hint: it may be easier to first move those lines
   from `updateGame()` into their own function.)
3. What should `spriteNameForPoints(300)` return? What about `0`? Decide,
   and write checks.

## 7. Bug hunt

The folder `bug-hunt/` has one planted bug. Run it with Live Server.

1. Look at the aliens. What's wrong? Do the tests pass?
2. Read the console warnings.
3. Check the **Network** tab. Which file couldn't be found?
4. Fix it. Why didn't any test catch this?

## 8. Git: what not to commit

Image and sound files belong in Git: the game needs them. Other files
don't, such as files your operating system makes (`.DS_Store` on a Mac,
`Thumbs.db` on Windows) or files full of passwords or keys.

1. Create a file called `.gitignore` in the root of your repository,
   containing:
   ```
   .DS_Store
   Thumbs.db
   *.log
   ```
2. Create a file called `test.log` anywhere. Run `git status`. Is it
   listed?
3. Run `git check-ignore -v test.log`. Which line of `.gitignore` is
   ignoring it?
4. Commit `.gitignore`, then delete `test.log`.
5. Run `git log --stat -1` on a commit that added the images. How does
   Git show changes to binary files like PNGs?

## 9. Your project

1. Does your project load any files? What happens if one is missing?
   Add a failure callback that warns and carries on.
2. Does your project have a sound setting? Is every sound played through
   one function?
3. Add a `.gitignore` to your project.

Commit when you're done:

```
git commit -am "Game stage 14 exercises: done"
```
