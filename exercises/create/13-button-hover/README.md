# Explore & create: Hoverable Buttons

This is a brand-new sketch, not a copy of an existing one — `index.html`,
`sketch.js` and `style.css` are already here, set up the same way as the
numbered sketches. Edit `sketch.js` directly.

Create a `Button` class, where each button has `x`, `y`, `width`, `height`,
`color` and `label` properties, and a `display()` method. Use the class to
create three non-overlapping buttons with different labels, all starting
out coloured `rgb(31, 144, 187)`. Every frame, check whether the mouse is
currently over a given button — comparing `mouseX`/`mouseY` against its
`x`/`y`/`width`/`height`, the same rectangle-overlap test the Frogger
capstone below needs for player/car collision — and while it is, that
button should display in `rgb(35, 161, 209)` instead of its usual colour.

Commit when you're done:

```
git commit -m "13-button-hover explore & create: done"
```
