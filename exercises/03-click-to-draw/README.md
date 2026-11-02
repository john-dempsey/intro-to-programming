# Exercise 03: Click to Draw — Explore & modify

This is your working copy of `src/03-click-to-draw` — edit `sketch.js` directly.

1. Add a `console.log()` inside both `draw()` and `mousePressed()`, with
   different messages. Move the mouse around without clicking, then click a
   few times, and use the console output to confirm exactly which function
   fires on which event.
2. p5 also provides a `doubleClicked()` event callback function, wired up
   exactly like `mousePressed()` and `keyPressed()`. Look it up, then move
   the circle-stamping code out of `mousePressed()` and into
   `doubleClicked()`, so a circle is only stamped when the mouse is
   double-clicked.
3. p5 also provides `mouseDragged()` and `mouseReleased()` event callback
   functions, wired up the same way. Add both, and a `console.log()` in each
   of `mousePressed()`, `mouseDragged()` and `mouseReleased()` printing
   `"pressed"`, `"dragged"` and `"released"` respectively — then press, drag
   and release the mouse and watch the console to see each event fire
   separately.

Commit when you're done:

```
git commit -m "03 explore & modify: done"
```
