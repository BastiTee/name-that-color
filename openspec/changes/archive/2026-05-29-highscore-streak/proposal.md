## Why

The game currently gives no feedback on long-term performance, which reduces replay motivation. Adding a persistent high score based on the longest consecutive correct streak gives players a personal target to beat across sessions.

## What Changes

- Track the current correct-answer streak during play; reset it on a wrong answer
- Persist the all-time best streak to `localStorage` under a dedicated key
- Display the high score in the header, near the title, so it is always visible
- Show a dash ("—") or equivalent when no high score has been set yet (first visit / cleared storage)
- Update the displayed high score immediately whenever the current streak exceeds it

## Capabilities

### New Capabilities
- `highscore-streak`: Tracks the current consecutive-correct streak, persists the all-time best to localStorage, and renders it in the header

### Modified Capabilities

## Impact

- `index.html`: add high score display element in `<header>`
- `src/game.js`: add streak counter, high score read/write logic, update display on each answer
- `src/style.css`: style the high score element in the header
