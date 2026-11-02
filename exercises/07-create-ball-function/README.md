# Exercise 07: A createBall() Function — Explore & modify

This is your working copy of `src/07-create-ball-function` — edit `sketch.js` directly.

1. Add a fifth parameter to `createBall()` (e.g. a `label` string), store it
   as a property, and pass a label when you call it in `setup()`. Display
   the label near the ball with `text()` every time the ball itself is
   displayed.
2. Call `createBall()` a second time in `setup()`, storing the result in a
   second variable (e.g. `ball2`), giving it a different random `color()`
   object from the first ball's. You'll need a second display step to show
   it — add one, and confirm both balls appear when you click. Note in a
   comment what's awkward about having two separate ball variables as more
   get added.
3. Look up `random()` in the p5 reference. Instead of picking a random
   colour once in `setup()`, modify `keyPressed()` so that every time a key
   is pressed, each ball's `col` property is replaced with a new random
   `color()` object — random red, green and blue values, with alpha (150)
   kept fixed. `keyPressed()` should still clear the background as before;
   click again afterwards and confirm each ball reappears in its new
   colour.

Commit when you're done:

```
git commit -m "07 explore & modify: done"
```
