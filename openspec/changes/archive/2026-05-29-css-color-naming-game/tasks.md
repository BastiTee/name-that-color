## 1. Project scaffold

- [x] 1.1 Create `index.html` with semantic structure: header, main game area (swatch + choices), info panel, next button
- [x] 1.2 Create `style.css` with base layout, swatch sizing, button styles, correct/incorrect highlight classes, hidden/visible panel states
- [x] 1.3 Create `colors.js` containing the full CSS named color dataset as an exported array of `{ name, hex, r, g, b }` objects (all 140+ W3C CSS Color Level 4 colors)

## 2. Game logic

- [x] 2.1 Create `game.js` with `startRound()` — picks a random color, selects two random distractors, shuffles all three, renders swatch and choices
- [x] 2.2 Implement answer selection handler — on choice click, mark choice as correct/incorrect, reveal metadata panel with name + hex + RGB
- [x] 2.3 Implement `nextRound()` — clears state, hides metadata panel, calls `startRound()` ensuring the new color differs from the previous one
- [x] 2.4 Wire up the "Next" button to `nextRound()` and ensure it is hidden until an answer is selected

## 3. Styling and feedback

- [x] 3.1 Style the color swatch (min 200×200 px, centered, rounded corners)
- [x] 3.2 Style the three choice buttons (equal width, clear hover state, disabled cursor after selection)
- [x] 3.3 Add correct (green) and incorrect (red) highlight styles applied after answer selection
- [x] 3.4 Style the metadata reveal panel (hidden by default, smooth reveal, shows name/hex/RGB clearly)

## 4. Verification

- [x] 4.1 Open `index.html` in a browser and play through 5 rounds — verify swatch color matches the correct answer name
- [x] 4.2 Verify wrong answer flow: selecting incorrect choice marks it red and highlights the correct choice green
- [x] 4.3 Verify the metadata panel shows correct hex and RGB values for a known color (e.g., `tomato` → `#FF6347`, `rgb(255, 99, 71)`)
- [x] 4.4 Verify the "Next" button is hidden before answering and visible after
- [x] 4.5 Verify the same color does not appear in two consecutive rounds
