# Explore & create: Quadrant Hover

This is a brand-new sketch, not a copy of an existing one — `index.html`,
`sketch.js` and `style.css` are already here, set up the same way as the
numbered sketches. Edit `sketch.js` directly.

Create a 400×400 canvas, and draw a horizontal line and a vertical line
dividing it into four equally sized quadrants. Every frame, check which
quadrant (if any) the mouse is currently over, and draw a black rectangle
that exactly fills that quadrant; every quadrant the mouse isn't over
should stay clear (just the background colour). The four checks are
boolean comparisons against `mouseX`/`mouseY` and half the canvas's
`width`/`height`, combined with `&&` the same way sketch 13 combines two
edge checks into a corner check — an `if`/`else if` chain (or similar)
covering all four quadrants works well here.

Commit when you're done:

```
git commit -m "13-quadrant-hover explore & create: done"
```
