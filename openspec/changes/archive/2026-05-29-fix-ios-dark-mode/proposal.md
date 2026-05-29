## Why

On iOS, Safari applies automatic dark mode color adjustments to web content unless the page explicitly opts in to a specific color scheme. Since the app already uses a hardcoded dark theme without declaring `color-scheme: dark`, iOS Safari's forced color filter distorts swatch colors and UI elements, breaking the core visualization.

## What Changes

- Add `color-scheme: dark` declaration to `:root` in `style.css` to signal that the page already handles dark mode itself
- Add `<meta name="color-scheme" content="dark">` to `index.html` for early paint correctness
- Ensure form controls (`select` elements) render with the correct dark appearance on iOS by using `-webkit-appearance: none` with explicit styling already in place

## Capabilities

### New Capabilities

- `ios-color-scheme`: Declare explicit color-scheme on the page so iOS Safari does not apply its own dark mode overrides to color swatches and UI surfaces

### Modified Capabilities

- `responsive-layout`: The layout meta and root CSS now carry a color-scheme declaration; no requirement change, purely additive

## Impact

- `src/style.css`: Add `color-scheme: dark` to `:root`
- `index.html`: Add `<meta name="color-scheme" content="dark">` in `<head>`
- No JavaScript changes, no dependency changes, no breaking changes
