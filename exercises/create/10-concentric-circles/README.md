# Explore & create: Concentric Circles

This is a brand-new sketch, not a copy of an existing one — `index.html`,
`sketch.js` and `style.css` are already here, set up the same way as the
numbered sketches. Edit `sketch.js` directly.

Draw a series of circles, all centred on the middle of the canvas, each a
random colour at 75% transparency (an alpha of about 64 — 25% of 255), with
a diminishing radius: start the radius at `height / 2`, and decrease it by
25 each time round the loop, stopping once it would drop below 25 (don't
draw that circle at all). Use a `while` loop for this one, not a `for`
loop — declare a variable holding the radius before the loop starts, check
it against 25 as the loop's condition, and decrease it by 25 as the last
line inside the loop's block. Here the loop's counter *is* the radius
itself — decreasing by 25 each time — rather than an index counting up
`0, 1, 2, ...`.

Commit when you're done:

```
git commit -m "10-concentric-circles explore & create: done"
```
