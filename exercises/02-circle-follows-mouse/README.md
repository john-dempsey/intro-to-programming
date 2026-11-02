# Exercise 02: Circle Follows the Mouse — Explore & modify

This is your working copy of `src/02-circle-follows-mouse` — edit `sketch.js` directly.

1. Change `circle(mouseX, mouseY, 150)` so only the x-position follows the
   mouse and y stays fixed. Then try the reverse.
2. Temporarily delete the `background(230)` call from `draw()`, run the
   sketch, and explain the trail of circles that appears. Restore it
   afterwards.
3. p5 also keeps a `frameCount` system variable, counting how many times
   `draw()` has run. Look it up in the p5 reference, then add it to the
   `console.log()` call — confirm it climbs by roughly 60 every second,
   instead of just eyeballing the console's scroll speed.

Commit when you're done:

```
git commit -m "02 explore & modify: done"
```
