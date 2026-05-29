## 1. HTML

- [x] 1.1 Remove the `#reveal-btn` button element from `index.html`
- [x] 1.2 Add a `#reveal-bar` progress bar element (a container `div` with an inner `div` for the animated fill) in its place

## 2. CSS

- [x] 2.1 Add styles for the `#reveal-bar` container (full width, fixed height, background track color)
- [x] 2.2 Add the drain animation: inner fill starts at 100% width and transitions to 0% over 2 seconds using a CSS `animation`
- [x] 2.3 Add a `.hidden` or equivalent rule so the bar can be hidden after reveal (reuse existing `.hidden` class)

## 3. JavaScript

- [x] 3.1 Replace `const revealBtn = document.getElementById("reveal-btn")` with `const revealBar = document.getElementById("reveal-bar")`
- [x] 3.2 Remove the `revealBtn.addEventListener('click', ...)` handler
- [x] 3.3 Add a module-level `let revealTimer = null` variable to hold the pending `setTimeout` handle
- [x] 3.4 In `nextRound()`: call `clearTimeout(revealTimer)`, show the bar, restart its animation (remove/reflow/re-add animation class), then set `revealTimer = setTimeout(showChoices, 2000)`
- [x] 3.5 Extract choice-reveal logic into a `showChoices()` function that hides the bar and un-hides the choice buttons
- [x] 3.6 Remove any remaining references to `revealBtn` (including locale-update calls like `revealBtn.textContent = t('ui.reveal')`)
