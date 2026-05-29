## Context

The game currently hides the three answer-choice buttons behind a "Reveal Options" button. The player must click it to see the choices. We're replacing this manual step with a 2-second animated progress bar that auto-reveals choices when it expires.

The codebase is a Vite-bundled SPA. The reveal logic lives in `src/game.js` (around `revealBtn` references and the `'click'` listener on `revealBtn`). The corresponding DOM element is in `index.html` and styled in `src/style.css`.

## Goals / Non-Goals

**Goals:**
- Show an animated progress bar (draining left-to-right or right-to-left) for 2 seconds at round start
- Auto-reveal choices when the bar empties
- Remove the reveal button entirely

**Non-Goals:**
- Allow early reveal by clicking the bar
- Configurable timer duration
- Pausing the timer on tab-blur or other focus events

## Decisions

### CSS animation vs. JS-driven timer

**Decision**: Use a CSS `animation` on a bar `::before` or inner `<div>` element for the visual, paired with a single `setTimeout(reveal, 2000)` in JS for the logic trigger.

**Rationale**: Keeps JS minimal (one `setTimeout`), lets the browser handle the smooth fill animation natively. A `requestAnimationFrame` loop would add complexity with no benefit.

**Alternative considered**: Drive both visuals and logic with `requestAnimationFrame` — rejected because it's more code for no UX improvement.

### Timer restart on new round

Each call to `nextRound()` must cancel any in-flight timer (`clearTimeout`) and restart the CSS animation. The cleanest way is to remove and re-add the element (or remove/re-add a class that triggers `animation: none` for one frame, then re-apply the animation class). We'll use the "remove class, force reflow, re-add class" pattern since no DOM nodes need to be recreated.

### No early-reveal interaction

The bar is purely decorative/informational. Clicking it does nothing. This keeps the mechanic simple.

## Risks / Trade-offs

- [Timing drift] `setTimeout` is not frame-accurate; the bar CSS animation and the JS reveal could be off by one frame. → Mitigation: Use the same 2000 ms value for both; a single-frame drift is imperceptible.
- [Round skip edge case] If the player clicks "Next" before the timer fires, `clearTimeout` must be called to prevent the old timer from revealing choices mid-next-round. → Already handled by cancelling in `nextRound()`.
