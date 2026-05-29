## 1. Color similarity algorithm

- [x] 1.1 Add a `rgbToLab(r, g, b)` pure function in `src/game.js` that converts sRGB to CIE Lab (D65 illuminant via the standard linearisation + XYZ matrix + Lab cube-root transform)
- [x] 1.2 Add a `labToHue(a, b)` helper that returns the LCH hue angle in degrees: `Math.atan2(b, a) * 180 / Math.PI` (0–360)
- [x] 1.3 Add a `findNeighbors(color)` function that: (a) deduplicates the palette by hex, (b) computes Lab ΔE from `color` to every other entry, (c) picks the two with smallest ΔE, (d) assigns left = lower hue angle, right = higher hue angle, with second-closest fallback if both are on the same side

## 2. HTML — similar colors panel

- [x] 2.1 Move `#next-btn` in `index.html` to appear directly above `#info-panel` (between the choice buttons and the info panel)
- [x] 2.2 Add `<div id="similar-panel" class="similar-panel hidden">` directly below `#info-panel` in `index.html`
- [x] 2.3 Inside `#similar-panel`, add three child divs with classes `similar-cell similar-left`, `similar-cell similar-center`, `similar-cell similar-right` — each containing a `<div class="similar-swatch">` and a `<span class="similar-name">`

## 3. CSS — similar panel styles

- [x] 3.1 Style `.similar-panel` in `src/style.css` to match the width and border/background of `.info-panel`; use `display: flex; gap: 0.5rem` for the three-cell layout
- [x] 3.2 Style `.similar-cell` as `flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.35rem`
- [x] 3.3 Style `.similar-swatch` as a fixed-size square (~48×48 px) with `border-radius: 6px`
- [x] 3.4 Style `.similar-name` as small muted text (match `.info-label` sizing)
- [x] 3.5 Style `.similar-center .similar-swatch` larger (~60×60 px) and add a `2px solid rgba(255,255,255,0.4)` border to distinguish the current color
- [x] 3.6 Add `.similar-panel.hidden { display: none }`

## 4. Game logic — wire up the panel

- [x] 4.1 Add DOM references for `#similar-panel` and the six inner elements (three swatches + three name spans) in `src/game.js`
- [x] 4.2 In `revealAnswer()`, call `findNeighbors(currentColor)`, set each swatch's `background` to the CSS color name, and set each name span's `textContent` via `t('colors.' + color.name)`; then remove `hidden` from `#similar-panel`
- [x] 4.3 In `startRound()`, add `hidden` back to `#similar-panel`
- [x] 4.4 In `onLocaleChange()`, if `answered`, re-render the three name spans in the new locale (store the current neighbors in a module-level variable `currentNeighbors`)

## 5. Verification

- [x] 5.1 Run the app, reveal options, answer, and confirm the similar colors panel appears below the info box with three colored cells
- [x] 5.2 Confirm the center swatch matches the current round's color and is visually larger/bordered
- [x] 5.3 Confirm the left and right swatches are visually similar colors to the center (spot-check: e.g., "Red" should show "Dark Red" and "Crimson" or similar neighbors)
- [x] 5.4 Switch locale and confirm all three color names update
- [x] 5.5 Click "Next Color" and confirm the similar panel is hidden again
