# Exercise 01: Drawing a Circle — Explore & modify

This is your working copy of `src/01-drawing-a-circle` — edit `sketch.js` directly.

1. Change the circle's `x`, `y`, `d` and colour arguments; predict the result
   before running, then check. Add a second `fill()`/`circle()` pair to draw
   a second circle elsewhere on the canvas.
2. Move the `background(230)` call to *after* the `circle()` call (still
   inside `setup()`) and run it. Explain in a comment why the circle
   disappears.
3. Add `console.log("draw ran")` inside the empty `draw()`. Open the browser
   console and confirm p5 really does call `draw()` continuously, even
   though `setup()` already drew everything and nothing changes on screen.
4. Give the circle a black border: add `stroke(0)` before the `circle()` call and remove (or
   comment out) `noStroke()`.

Commit when you're done:

```
git commit -m "01 explore & modify: done"
```
