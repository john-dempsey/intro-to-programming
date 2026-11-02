# Exercises

Your working copies for the module's exercises, in five groups. Each
folder below has its own README.md with the full task text — nothing here
depends on anything outside this `exercises/` folder.

## 1. Explore & modify — `01-drawing-a-circle/` … `13-ball-bounce/`

One folder per `src/` sketch, each a working copy of that sketch
(`index.html`, `sketch.js`, `style.css`) for you to change directly. Work
through a sketch in `src/`, then do its folder here, then commit.

## 2. `house/` — Build: House

One House, built from scratch across 10 stages, all in the same three files
— you edit `sketch.js` in place, stage by stage. See
[`house/README.md`](house/README.md).

## 3. `cars-frogger/` — Build: Cars → Frogger

One Car, built from scratch across 12 stages, continuing straight into a
Frogger capstone — again all in the same three files. See
[`cars-frogger/README.md`](cars-frogger/README.md).

## 4. `create/` — Explore & create

Not every sketch has one of these. Where a sketch's tutorial page has an
"Explore & create" section (alongside its "Explore & modify" one), each
exercise in it gets its own folder here, named `NN-slug/` — `NN` is the
sketch it follows, `slug` names the exercise. Unlike group 1, there's no
existing sketch to copy: each folder starts as a brand-new, blank sketch
(`index.html`, `sketch.js`, `style.css`) for you to build from scratch. See
that folder's own README.md for the task.

## 5. `game-NN-…/` — Developing a game

One folder per stage of the Space Invaders worked example in
`src/game/`. Each is a working copy of that stage's code, with a README of
standalone exercises on planning, testing, debugging and Git. Nothing
carries over between stages: each one starts again from fresh code.
Stages 1 onwards also have a `bug-hunt/` folder with one planted bug to
find and fix.

## Commit convention

`house/` and `cars-frogger/` don't get a new folder per stage — the only
record of your progress through them is your commit history. Commit after
finishing each stage, with a message naming the track and stage number:

```
git commit -m "House stage 4/10: extract globals"
git commit -m "Cars stage 9/12: Car class"
git commit -m "Frogger stage 2: lay out the lanes"
```

For the explore & modify and `create/` folders, one commit per folder when
its tasks are done is enough, e.g.
`git commit -m "04-global-variables explore & modify: done"` or
`git commit -m "05-color-swatches explore & create: done"`.
