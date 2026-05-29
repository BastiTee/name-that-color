## Why

The current "Reveal Options" button requires an explicit click before the player can answer, adding an unnecessary friction step. Replacing it with an auto-countdown progress bar creates a sense of urgency and removes the extra interaction, making the game feel more dynamic.

## What Changes

- Remove the "Reveal Options" button from the game UI
- Add a 2-second countdown progress bar that starts when a new round begins
- When the timer expires, the three answer choice buttons are revealed automatically
- Players can no longer manually trigger early reveal (timer is the only reveal mechanism)

## Capabilities

### New Capabilities
- `auto-reveal-timer`: A 2-second visual countdown progress bar that automatically reveals answer choices when it runs out

### Modified Capabilities
- `color-quiz`: The "Reveal Options" button requirement changes — instead of a button, choices are revealed automatically after the timer; the spec's reveal mechanism requirement must be updated

## Impact

- `game.js`: remove reveal-button click handler, add timer logic (setTimeout + requestAnimationFrame or CSS animation), trigger reveal on timer completion
- `index.html`: replace reveal button markup with progress bar element
- `style.css`: add progress bar styles (animated fill, height, color)
- `openspec/specs/color-quiz/spec.md`: update reveal mechanism requirement
