# Exercise 13: Bouncing Off the Edges — Explore & modify

This is your working copy of `src/13-ball-bounce` — edit `sketch.js` directly.

1. Comment out the `diameter > width` special-case branch, then run the
   sketch with a ball whose `diameter` is larger than the canvas. Explain
   the bug this branch exists to prevent.
2. Add a `bounces` property to `Ball`, initialised to `0` in the
   constructor, and increment it inside each collision branch. Display each
   ball's bounce count next to it with `text()`.
3. **Click-to-add.** Bring back `mousePressed()` from 03-click-to-draw: add
   a `mousePressed()` function so that clicking adds one new ball (with
   random position/velocity/colour, as in the random() exercise from
   exercise 10) to the `balls` array. The existing balls should keep moving
   and bouncing exactly as before; the new ball should join them and start
   moving too.
4. **Boolean combination — corner detection.** Detect when a ball is
   touching a vertical edge and a horizontal edge in the same frame (i.e.
   it's hit a corner), and give it a brief, visibly different effect when
   that happens (a colour change is enough).
5. **Boolean state on an object — hover highlight.** Add an `isHovered`
   property to the `Ball` class. Each frame, set it to `true` or `false` by
   comparing the distance from the mouse to the ball's centre (`dist()`)
   against the ball's radius. When `isHovered` is `true`, display the ball
   with a different fill colour.
6. **Object-to-object interaction — ball vs. ball (capstone).** For every
   pair of balls in the array, use `dist()` between their centres compared
   to the sum of their radii to detect whether they're overlapping. When two
   balls collide, respond somehow — reversing both their velocities, or
   changing their colour, are both reasonable.

Commit when you're done:

```
git commit -m "13 explore & modify: done"
```
