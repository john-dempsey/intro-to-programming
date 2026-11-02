# Game Stage 0: The Plan — Exercises

Read `PLAN.md` (in this folder) first. These exercises are about planning,
not code. Nothing here carries over to the next stage, but exercises 3–5
are a start on planning your own project.

The `sketch.js` here is just an empty canvas. Run it once to check it
works.

## 1. Spot the features

Play a version of Space Invaders online for five minutes. Write down every
feature you notice that isn't in `PLAN.md`. For each one, decide whether
it's "must have", "should have" or "could have", and give a reason.

## 2. Break a feature down

"The aliens march sideways, then drop down and reverse at the edge" is one
line in the plan, but it's several steps of code. Break it into at least
four smaller steps, each one something you could run and see working.

Hint: what's the simplest version you could see on screen? One alien
moving sideways is a good start.

## 3. Your project: one sentence

Write one sentence that describes your own project, in the same style as
the one at the top of `PLAN.md`. If you can't fit it in one sentence, your
idea may be too big for the time left. What could you cut?

## 4. Your project: the plan

Copy `PLAN-TEMPLATE.md` (in this folder) into your own project's folder as
`PLAN.md` and fill it in. Be strict about "must have": what's the smallest
version of your project that someone could actually use or play?

## 5. Your project: questions

Write down three things you don't yet know how to do for your project.
For each one, write where you'd look first (the p5 reference, the module
notes, an example sketch, …).

## 6. Git: read the history

Run this in the terminal, in your repository:

```
git log --oneline
```

Each line is one commit: a short ID, then the message. Find one message
you've written that would be hard to understand in six months' time.
Write a better version. A good message says *what* changed, briefly:
`Add arrow-key movement to ship` is better than `stuff` or `fixed it`.

Commit your plan when you're done:

```
git add .
git commit -m "Game stage 0 exercises: project plan"
```
