# Space Invaders — the plan

## The game in one sentence

The player moves a ship left and right along the bottom of the screen and
shoots at rows of aliens marching down towards them; shoot every alien to
win, but lose if the aliens reach the bottom.

## Features

I wrote down everything I could think of, then sorted each feature into
one of three groups.

**Must have** — without these it isn't the game at all:

1. A ship at the bottom of the screen
2. The ship moves left and right with the arrow keys
3. The ship fires bullets with the space bar, several at a time (changed at stage 4)
4. A grid of aliens
5. The aliens march sideways, then drop down and reverse at the edge
6. A bullet that hits an alien destroys both
7. Win when every alien is gone; lose if an alien reaches the ship's row

**Should have** — make it feel like a proper game:

8. Score shown on screen
9. Aliens fire back; the player has three lives
10. Start screen and game-over screen

**Could have** — only if there's time:

11. Aliens speed up as there are fewer of them
12. Shields that wear away
13. Sound effects and images (sprites)
14. A mystery UFO that crosses the top of the screen

## The smallest playable game

Features 1–7. That's the first target. Everything after it is an
improvement to a game that already works.

## Stages

Each stage adds one small feature, and the game must run at the end of
every stage.

| Stage | Feature                                   |
|-------|-------------------------------------------|
| 0     | Plan, empty canvas                        |
| 1     | Draw the ship                             |
| 2     | Move the ship with the arrow keys         |
| 3     | Fire one bullet                           |
| 4     | Fire many bullets                         |
| 5     | Draw a grid of aliens                     |
| 6     | Make the aliens march                     |
| 7     | Bullets destroy aliens                    |
| 8     | Win and lose                              |
| 9     | Score                                     |
| 10    | Aliens fire back; three lives             |
| 11    | Title screen, final score, high score     |
| 12+   | "Could have" features                     |

## Done means done

A stage is finished only when all of these are true:

- The sketch runs with no errors in the browser console.
- Every automatic test prints PASS.
- I've tried the manual checks for that stage (written in its notes).
- The work is committed to Git with a message naming the stage.

## Questions I don't know the answer to yet

- How do I remove a bullet from an array once it leaves the screen?
- How do all the aliens know to turn around when only one touches the edge?
- How do I check whether a bullet (a small rectangle) hits an alien
  (another rectangle)? Frogger's rectangle-overlap test may help.

Writing these down now means I know where the hard parts are before I
reach them.

## Changes to the plan

- **Stage 4:** the original game allows only one bullet on screen at a
  time, and so did stage 3. After playing it, one bullet felt too slow, so
  the player can now have many bullets on screen at once.

## Progress

- **Stages 0–8 (done):** every "must have" feature. Stage 8 was the
  smallest playable game, tagged `smallest-playable-game` in Git.
- **Stages 9–11 (done):** every "should have" feature.
  - Stage 9: score, with points by row (30, 20, 20, 10).
  - Stage 10: aliens fire back at random; three lives.
  - Stage 11: title screen, final score, and a high score saved in the
    browser. The plan said "start screen and game-over screen"; the
    game-over screen already existed from stage 8, so stage 11 added the
    final score and high score to it.
- **Next:** the "could have" features, in any order. Each one is
  independent of the others, so each can be built on its own Git branch.
