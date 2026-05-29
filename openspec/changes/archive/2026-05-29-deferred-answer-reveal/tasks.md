## 1. i18n — add reveal label

- [x] 1.1 Add `reveal` key to `en.ui` in `src/i18n.js` with value `"Reveal Answers"`
- [x] 1.2 Add `reveal` key to `de.ui` in `src/i18n.js` with value `"Antworten anzeigen"`

## 2. HTML — add reveal button

- [x] 2.1 Add `<button id="reveal-btn" class="reveal-btn">` to `index.html`, between the swatch and the `#choices` div

## 3. CSS — style reveal button and answer swatches

- [x] 3.1 Add styles for `.reveal-btn` in `src/style.css` (match the existing `.next-btn` style; add `.reveal-btn.hidden { display: none }`)
- [x] 3.2 Add styles for the per-button color swatch square: a `::before` pseudo-element on `.choice-btn` that uses `var(--btn-color)` as its background, sized ~18×18 px, only visible when the button has class `answered`

## 4. Game logic — pre-reveal phase and answer swatches

- [x] 4.1 Add `const revealBtn = document.getElementById("reveal-btn")` to the DOM references in `src/game.js`
- [x] 4.2 In `startRound()`, hide `#choices` (add class `hidden`) and show `#reveal-btn` (remove class `hidden`); also set `revealBtn.textContent = t('ui.reveal')` via `renderUI()`
- [x] 4.3 Add a `click` event listener on `revealBtn` that shows `#choices` (remove `hidden`) and hides `revealBtn` (add `hidden`)
- [x] 4.4 In `revealAnswer()`, after marking correct/incorrect classes, set `btn.style.setProperty('--btn-color', btn.dataset.colorName)` and add class `answered` on each choice button
- [x] 4.5 In `renderUI()`, update `revealBtn.textContent = t('ui.reveal')` alongside the existing `nextBtn` update
- [x] 4.6 In `startRound()`, ensure choice buttons have class `hidden` removed from their container and `answered` class stripped, and `--btn-color` inline style cleared

## 5. Verification

- [x] 5.1 Run the app and confirm choice buttons are hidden at round start with only the "Reveal Answers" button visible
- [x] 5.2 Click "Reveal Answers" and confirm the three choice buttons appear and the reveal button disappears
- [x] 5.3 Select an answer and confirm each button shows a small color square with the correct color
- [x] 5.4 Switch to German and confirm the reveal button label says "Antworten anzeigen"
- [x] 5.5 Advance to next round and confirm the choices are hidden again and no color squares remain
