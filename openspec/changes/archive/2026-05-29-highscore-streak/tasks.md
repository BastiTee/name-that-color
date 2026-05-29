## 1. HTML

- [x] 1.1 Add a stats row to `<header>` with two labeled counters: `#stat-streak` (current streak) and `#stat-best` (high score)

## 2. CSS

- [x] 2.1 Style the stats row in the header — small, muted labels above larger numeric values, centered, side by side
- [x] 2.2 Ensure the header layout stacks cleanly on narrow screens (the stats row below the `<h1>`)

## 3. JavaScript

- [x] 3.1 Add module-level state: `let streak = 0` and a `loadHighScore()` helper that reads `ntc-highscore` from `localStorage` (try/catch, returns `null` on failure or absence)
- [x] 3.2 Add a `saveHighScore(value)` helper that writes to `localStorage` (try/catch, silently ignores errors)
- [x] 3.3 Add a `renderStats()` function that writes `streak` to `#stat-streak` and the stored high score (or "—") to `#stat-best`
- [x] 3.4 In `revealAnswer()`: increment `streak` on correct answer, reset to `0` on wrong answer; update high score if streak now exceeds stored value; call `renderStats()`
- [x] 3.5 In `startRound()`: call `renderStats()` so the header reflects the current streak on each new round (streak is not reset on new round — only on wrong answer)
- [x] 3.6 Call `renderStats()` once on page load (initial state: streak 0, best "—" or stored value)
