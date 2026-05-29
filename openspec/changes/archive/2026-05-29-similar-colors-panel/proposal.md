## Why

After revealing the answer the player only sees abstract metadata (name, hex, RGB). Adding a "neighbor colors" panel showing the two most perceptually similar colors in the palette gives the player immediate visual context — they can see how close the distractors could have been and develop a better color intuition over time.

## What Changes

- A new panel appears below the existing name/hex/rgb info box whenever an answer is revealed.
- The panel contains three equal-width color cells side-by-side: the left neighbor, the current color (center), and the right neighbor.
- Each cell shows a color swatch and the localized color name beneath it.
- The current color cell is visually distinguished (e.g., slightly larger or bordered) so the player's eye goes there first.
- The two neighbors are the closest colors by **perceptual distance in CIE Lab space**, computed from the RGB values already in `COLORS`. The left neighbor is the one with the lower hue angle (cooler/darker), the right is the higher hue angle (warmer/brighter) — if both neighbors fall on the same side of hue, the second-closest by Euclidean Lab distance is used as the other neighbor.
- Color names in the panel are translated through the active i18n locale and update on language switch.

## Capabilities

### New Capabilities

- `similar-colors`: Panel that finds and displays the two most perceptually similar colors from the palette using CIE Lab distance, shown flanking the current color.

### Modified Capabilities

- `color-quiz`: Post-answer state gains the similar-colors panel below the metadata box.

## Impact

- `src/game.js` — compute neighbors after answer reveal; populate and show the panel; clear on next round; re-render names on locale change.
- `index.html` — add `#similar-panel` markup below `#info-panel`.
- `src/style.css` — style the three-cell neighbor panel to match the existing info panel dimensions.
- No new dependencies; Lab conversion is a small pure function from the existing r/g/b fields.
