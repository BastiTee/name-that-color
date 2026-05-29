## Why

The app currently targets desktop viewport widths and doesn't adapt to smaller screens. Mobile users get a cramped, hard-to-tap interface with oversized color swatches relative to the viewport and text that may overflow. Since color-naming games are a natural fit for casual mobile play, the experience should be polished on phones.

## What Changes

- Viewport meta tag added to `index.html` for proper mobile scaling
- CSS layout switches to a fluid, single-column design on narrow screens
- Color swatch buttons sized for thumb-tap targets (minimum 44px height)
- Typography scales down gracefully on small viewports
- Spacing and padding reduced on mobile to fit content above the fold
- Score/streak display remains legible at smaller sizes

## Capabilities

### New Capabilities
- `responsive-layout`: Fluid layout that adapts from mobile (≥320px) through desktop, with appropriate typography, spacing, and tap targets at each breakpoint

### Modified Capabilities
<!-- None: existing game logic and structure are unchanged; only presentation changes -->

## Impact

- `style.css`: Primary change — add media queries and fluid sizing
- `index.html`: Add `<meta name="viewport">` tag
- `game.js`: No changes needed
- `colors.js`: No changes needed
