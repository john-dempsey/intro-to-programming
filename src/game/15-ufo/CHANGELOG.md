# Changelog

All the versions of the game, newest first. Each stage was one or more
commits; `git log --oneline` shows them all.

## 1.0: complete game (stages 12–15)

Every feature in the plan.

- Aliens speed up as their numbers fall (stage 12).
- Four shields that wear away when hit, from either side (stage 13).
- Pixel-art sprites for the ship and three kinds of alien; sound effects
  for shooting, explosions and being hit; M turns sound on and off. The
  game still works if the files can't be loaded (stage 14).
- A mystery UFO crosses the top of the screen every 15 to 25 seconds,
  worth 50, 100, 150 or 300 points (stage 15).

## 0.3: should-have features (stages 9–11)

Tagged `should-haves-done`.

- Score, with points by row: 30, 20, 20 and 10 (stage 9).
- Aliens fire back at random; three lives (stage 10).
- Title screen showing each alien's points; final score at the end of
  each game; high score saved in the browser (stage 11).

## 0.2: smallest playable game (stages 5–8)

Tagged `smallest-playable-game`.

- A grid of 32 aliens in four coloured rows (stage 5).
- The formation marches, drops and reverses at the edges (stage 6).
- Bullets destroy aliens; hitboxes in the debug overlay (stage 7).
- Win by destroying every alien; lose if they reach the ship; Enter to
  play again (stage 8).

## 0.1: the player (stages 0–4)

- The plan, and an empty canvas (stage 0).
- The ship, and the first automatic tests (stage 1).
- Arrow keys move the ship, which stops at the edges (stage 2).
- Space fires a bullet (stage 3), then many bullets; the debug overlay,
  turned on and off with D (stage 4).
