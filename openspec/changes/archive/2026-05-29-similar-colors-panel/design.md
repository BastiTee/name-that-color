## Context

The app has a static color palette of 148 CSS named colors, each with `r`, `g`, `b` values. After an answer is revealed, an info panel shows the color's name, hex, and RGB. The player currently has no way to see how the correct color relates to the rest of the palette.

## Goals / Non-Goals

**Goals:**
- Compute the two most perceptually similar colors to the current round's color from the full `COLORS` array.
- Display them flanking the current color in a new panel below the info box.
- Use CIE Lab Euclidean distance as the perceptual similarity metric.
- Assign left/right by hue angle: the neighbor with the lower hue angle (H in LCH) goes left; higher goes right. If both neighbors are on the same side, the second-closest-by-Lab-distance fills the opposite side.
- Color names are i18n-aware and update on locale change.

**Non-Goals:**
- Clicking a neighbor color to jump to a new round for that color.
- Showing more than two neighbors.
- Persisting neighbor data between rounds.

## Decisions

### 1. CIE Lab distance for perceptual similarity

**Decision**: Convert each color's sRGB to CIE Lab (D65 illuminant, standard matrix), then rank all 147 other colors by Euclidean ΔE distance. Pick the two smallest.

**Why over alternatives**:
- **RGB Euclidean**: fast but perceptually non-uniform — large ΔR in dark colors ≠ same visual jump as in bright ones.
- **HSL hue-only**: ignores lightness/saturation, so `navy` and `skyblue` would be "close" despite looking nothing alike.
- **Lab ΔE**: industry standard for "looks similar to a human eye". The conversion is ~10 lines of pure JS, no dependency needed.

### 2. Left/right assignment by LCH hue angle

**Decision**: Compute the LCH hue angle H = atan2(b*, a*) for each neighbor. The neighbor whose H is ≤ the current color's H goes left; the one with H > goes right. If both are on the same side, use the second-closest by Lab distance for whichever side is empty.

**Why**: Pure alphabetical or insertion-order would be arbitrary. Hue order gives a consistent "color wheel" left-to-right reading that feels intuitive.

### 3. Panel as a separate `#similar-panel` div, not merged into `#info-panel`

**Decision**: Add a new `<div id="similar-panel">` directly below `#info-panel` in the DOM, styled to the same width, hidden by default, shown after answer reveal.

**Why**: Keeps the existing info panel structure untouched; the two panels can be independently hidden/shown without CSS ordering hacks.

### 4. Neighbor computation in `game.js`, not a separate module

**Decision**: Add a `findNeighbors(color)` pure function directly in `game.js`.

**Why**: The function is ~25 lines, used in exactly one place, and depends only on `COLORS` which is already imported. Extracting it would add a file for minimal benefit.

## Risks / Trade-offs

- **Duplicate colors in palette**: Some CSS colors are aliases (e.g., `gray`/`grey`, `aqua`/`cyan`). Their Lab distance is 0 — they will always be each other's closest neighbor. Mitigation: filter out colors with identical `hex` values before computing neighbors, keeping only the first occurrence.
- **Panel height change on answer**: The new panel adds vertical space. On mobile this may push the "Next" button off-screen. Mitigation: the panel is compact (fixed ~80px height) and the page is already scrollable.
