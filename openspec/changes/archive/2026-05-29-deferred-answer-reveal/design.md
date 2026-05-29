## Context

Currently `game.js` has two phases: `unanswered` (swatch + 3 buttons visible) and `answered` (feedback + info panel + next button). The choice buttons are visible immediately, so the player can read all three options before even looking at the swatch. This trivialises the challenge.

The change inserts a new `pre-reveal` phase and adds color swatches to buttons in the `answered` phase.

## Goals / Non-Goals

**Goals:**
- Hide choice buttons at round start; show a single "Reveal Answers" button instead.
- Transition to the existing `unanswered` phase when the player clicks "Reveal Answers".
- After answer selection, render a small inline color square inside each choice button showing the color it represents.
- "Reveal Answers" label is i18n-aware.

**Non-Goals:**
- Timer or auto-reveal after a delay.
- Hiding the swatch during the pre-reveal phase.
- Animating the reveal transition beyond what CSS already provides.

## Decisions

### 1. Three-phase state machine: `pre-reveal` → `unanswered` → `answered`

**Decision**: Introduce a `pre-reveal` state. At round start the choices div and all buttons are hidden; only the swatch and a `#reveal-btn` are shown. Clicking "Reveal Answers" switches to `unanswered` (choices visible, reveal button hidden) — from there the existing flow is unchanged.

**Why**: Minimal diff to existing logic. The new state is a prefix, not an interleaved change, so `revealAnswer` and `startRound` need no structural changes.

### 2. Color swatch as a CSS `::before` pseudo-element driven by a CSS variable

**Decision**: After answering, set `--swatch-color: <cssName>` as an inline CSS variable on each button. A `::before` pseudo-element on `.choice-btn.answered` uses `background: var(--swatch-color)` to render the square.

**Why over an injected `<span>`**: No DOM manipulation per button beyond setting one attribute; keeps button content as plain text. CSS handles layout.

### 3. `#reveal-btn` as a sibling of `#choices` in HTML, not inside it

**Decision**: `#reveal-btn` sits between the swatch and the choices `<div>` in the DOM, matching the visual stacking order.

**Why**: Simpler to show/hide independently; avoids changing the choices container's layout when toggling visibility.

## Risks / Trade-offs

- **Button height change on answer**: Adding the swatch square inside buttons may shift the layout slightly. Mitigation: size the square with fixed dimensions and `flex-shrink: 0` so it doesn't reflow the text.
- **CSS variable color rendering**: `background: var(--swatch-color)` works because the value is a valid CSS color name. No extra lookup needed.

## Migration Plan

1. Add `#reveal-btn` to `index.html`.
2. Add `ui.reveal` to `en` and `de` in `i18n.js`.
3. Update `game.js`: add pre-reveal state, wire `#reveal-btn` click, set `--swatch-color` on buttons after answering.
4. Add CSS for `#reveal-btn` and `.choice-btn` swatch square.
5. No rollback concerns — additive changes only.
