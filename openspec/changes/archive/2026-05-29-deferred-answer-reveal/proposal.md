## Why

The choice buttons currently show color names as soon as a round starts, removing all cognitive challenge — the player can read the answer before deciding. Hiding the choices until the player deliberately requests them restores the "think first" moment the game is meant to create.

## What Changes

- Choice buttons are hidden at round start; a single "Reveal Answers" button is shown instead.
- Clicking "Reveal Answers" shows the three choice buttons (translated, as today) and hides itself.
- After the player selects an answer, each choice button gains a small color swatch square showing the actual color it represents, so the player can see all three colors side-by-side in the feedback state.
- The "Reveal Answers" label is translatable (English + German).

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `color-quiz`: Round flow gains a pre-reveal phase (swatch visible, choices hidden, reveal button shown). Post-answer state gains per-button color swatches.

## Impact

- `src/game.js` — new game state phase (`revealing`), reveal-button element wiring, swatch rendering after answer.
- `index.html` — add `#reveal-btn` element.
- `src/style.css` — styles for the reveal button and inline color swatch squares on choice buttons.
- `src/i18n.js` — add `ui.reveal` key to `en` and `de` locale maps.
