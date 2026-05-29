## 1. HTML Setup

- [x] 1.1 Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to `index.html` `<head>`

## 2. Mobile-First CSS Refactor

- [x] 2.1 Rewrite base styles in `style.css` as mobile-first (targeting ~320px–599px viewports): reduce container padding, set fluid widths
- [x] 2.2 Set `.options` (button container) to `flex-direction: column` in base styles
- [x] 2.3 Set `min-height: 44px` and appropriate padding on `.color-btn` for thumb-tap targets
- [x] 2.4 Scale down typography for mobile: reduce heading/prompt font sizes in base styles
- [x] 2.5 Add `word-break: break-word` or `overflow-wrap: break-word` to button labels so long color names (e.g., `lightgoldenrodyellow`) wrap cleanly

## 3. Desktop Override (≥600px)

- [x] 3.1 Add `@media (min-width: 600px)` block restoring original desktop layout: wider container, larger font sizes
- [x] 3.2 Inside the media query, set `.options` back to `flex-direction: row` for horizontal button layout
- [x] 3.3 Restore original button sizing/padding for desktop within the media query

## 4. Visual Polish

- [x] 4.1 Verify the color swatch preview area scales proportionally on mobile (not too tall, not cropped)
- [x] 4.2 Check score/streak display doesn't overflow or overlap other elements at 320px width
- [x] 4.3 Confirm the game fits above the fold on a 375×667px (iPhone SE/8) viewport in portrait mode
