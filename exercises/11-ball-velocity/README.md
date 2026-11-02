# Exercise 11: Ball Velocity — Explore & modify

This is your working copy of `src/11-ball-velocity` — edit `sketch.js` directly.

1. Set one ball's `vx`/`vy` to `(0, 0)` in `setup()` and run the sketch —
   confirm that ball alone stays still while the others move.
2. Split the single loop in `draw()` into two separate loops — one calling
   `.move()` on every ball, then a second calling `.display()` on every
   ball. Confirm the animation looks identical, and explain why the order
   between separate balls' move/display doesn't matter here (contrast
   with sketch 01/03, where order of statements mattered).

Commit when you're done:

```
git commit -m "11 explore & modify: done"
```
