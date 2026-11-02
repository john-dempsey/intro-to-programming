# Exercise 10: An Array of Balls — Explore & modify

This is your working copy of `src/10-array-of-balls` — edit `sketch.js` directly.

1. Add or remove elements from the `balls` array (make it 3 balls, or 8).
   Run it without changing anything else, and confirm the `for` loop and
   `balls.length` handle the new size automatically.
2. **Loop equivalence — while.** Comment out the `for` loop that displays
   the balls (don't delete it) and write a `while` loop directly below it
   that produces identical output.
3. **Loop equivalence — for...of.** Now comment out your `while` loop and
   write a `for...of` loop instead (`for (const b of balls)`). You'll find
   the `"Ball " + i` label needs the index, and `for...of` doesn't hand you
   one directly — decide how you'd still get it, or explain in a comment
   why it's awkward here.
4. **Building an array with random().** You've already used `random()`
   once, in exercise 07, to generate a colour. Replace the five hard-coded
   `new Ball(...)` calls here with a loop that builds an array of N balls
   (you choose N), using `random()` to pick each ball's position, velocity
   and colour, and `array.push()` to add each one to an initially empty
   array.

Commit when you're done:

```
git commit -m "10 explore & modify: done"
```
