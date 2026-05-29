## Why

There is no application in this repository yet. This change builds the initial browser game "Name That Color" — a fun, educational tool that helps users learn the 140+ CSS named colors through a multiple-choice quiz format.

## What Changes

- Introduces the entire application from scratch (new project, no existing code)
- Adds a single-page browser game with no build step required (plain HTML/CSS/JS)
- Embeds all 140+ CSS named colors as game data
- Implements a quiz loop: show color → pick name → reveal answer with color details

## Capabilities

### New Capabilities

- `color-quiz`: Core quiz mechanic — display a random CSS named color as a colored swatch, present three name choices (one correct, two distractors drawn from the named color list), accept the player's guess, reveal correctness, and show color metadata (hex value, RGB, any fun facts or related names).

### Modified Capabilities

_(none — this is a greenfield project)_

## Impact

- Creates `index.html`, `style.css`, and `game.js` (or equivalent) as the sole deliverables
- No server, no build pipeline, no npm dependencies — runs directly in a browser by opening `index.html`
- No existing code is modified or broken
