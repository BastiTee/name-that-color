## Context

The app already uses a hardcoded dark theme through CSS custom properties set on `:root`. However, the page never declares its color scheme to the browser. On iOS Safari, when the user has system dark mode enabled, the browser applies an automatic forced-dark filter to the page. This overrides the explicit background and text colors on certain elements — most damagingly, the color swatches whose background is set via inline `style` attributes to precise CSS color values. The filter desaturates or shifts those colors, making the game unplayable.

The fix is a single, low-risk CSS declaration (`color-scheme: dark`) combined with its meta-tag equivalent. Both tell the browser: "I manage my own dark/light appearance — do not apply forced color adjustments."

## Goals / Non-Goals

**Goals:**
- Prevent iOS Safari from applying automatic dark mode overrides to the page
- Ensure native form controls (`select`, `button`) render with a dark-compatible style

**Non-Goals:**
- Adding a light-mode theme or user-facing theme toggle
- Changing any visual design or color values
- Supporting forced-colors / Windows High Contrast Mode

## Decisions

**1. Use `color-scheme: dark` on `:root` (CSS) + `<meta name="color-scheme">` (HTML)**

Both declarations are needed: the meta tag prevents a flash of the wrong background during initial paint (before CSS loads), and the CSS property applies continuously. Using only one leaves a gap.

Alternative considered: `prefers-color-scheme` media query — rejected because the app has no light theme to switch to.

**2. No changes to existing CSS color values**

The current palette is already a dark theme. The fix is purely declarative — we tell the browser what we are, not what to render.

## Risks / Trade-offs

- [Risk] A future light-mode feature would need to revisit these declarations → Mitigation: clearly document in `color-scheme` comments if added.
- [Risk] Very old iOS versions (pre-13) ignore `color-scheme` → Mitigation: those versions also don't apply forced-dark, so they are unaffected.

## Migration Plan

1. Add `<meta name="color-scheme" content="dark">` in `<head>` of `index.html`
2. Add `color-scheme: dark` to `:root` block in `src/style.css`
3. Manually verify on iOS Safari with system dark mode enabled
4. No rollback needed — the declarations are purely additive and have no side-effects on other browsers
