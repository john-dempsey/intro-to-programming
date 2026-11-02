# Explore & create: Light Switch

This is a brand-new sketch, not a copy of an existing one — `index.html`,
`sketch.js`, `style.css` and two images (`13-light-on.png`,
`13-light-off.png`) are already here. Edit `sketch.js` directly.

Declare a global boolean variable `isOn`, starting `false`. Each time the
mouse is pressed, flip it (`isOn = !isOn`). In `draw()`, display
`13-light-on.png` when `isOn` is `true` and `13-light-off.png` when it's
`false`. Unlike sketch 13's `isHovered` exercise, this state isn't
recomputed every frame from a comparison — it's set once by the click and
just held, unchanged, until the next click flips it again.

**Hint:** look up `image()` in the p5 reference, along with `loadImage()`
and `preload()`, which go together with it — an image has to be loaded
once, in `preload()` (which p5 calls *before* `setup()`), before `image()`
can draw it every frame in `draw()`.

Commit when you're done:

```
git commit -m "13-toggle-switch explore & create: done"
```
