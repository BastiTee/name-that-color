## Context

Brand-new project with no existing code. The game runs entirely in the browser with no server, no build pipeline, and no npm dependencies. All 140+ CSS named colors are embedded as a static dataset in a single JavaScript file.

## Goals / Non-Goals

**Goals:**
- Deliver a fully playable quiz game opening `index.html` directly in a browser
- Show a colored swatch and ask the player to identify its CSS name from three choices
- Reveal the correct answer with additional color metadata after the player picks
- Keep the codebase simple: plain HTML + CSS + vanilla JS, no frameworks

**Non-Goals:**
- Persistent score tracking across sessions (no localStorage, no backend)
- Mobile-first responsive design (desktop layout is fine; basic responsiveness is a nice-to-have)
- Sound effects or animations beyond simple CSS transitions
- Accessibility compliance beyond sensible semantic HTML

## Decisions

### Static color dataset embedded in JS

**Decision**: Hardcode all CSS named colors as a JS array/object in `colors.js`.

**Rationale**: Zero build step, zero fetch latency, no CORS issues. The full list is ~140 entries and fits in a few KB. Generating it at runtime from the browser's CSS engine is fragile and environment-dependent.

**Alternative considered**: Fetch a JSON file at runtime — rejected because it forces a server or CORS headers even for local development.

### Plain HTML/CSS/JS, no framework

**Decision**: Vanilla JS with ES modules if needed, or a single `<script>` block.

**Rationale**: The game logic is simple enough (pick random item, shuffle distractors, compare answer) that a framework adds more boilerplate than value. Keeps the project approachable and zero-dependency.

**Alternative considered**: React/Svelte — overkill for ~200 lines of logic.

### Distractor selection strategy

**Decision**: Pick two random colors from the full list, excluding the correct answer. No attempt to pick "similar" colors.

**Rationale**: Keeps the implementation simple. Similar-color distractors would require perceptual color distance calculations (e.g., ΔE in Lab space), adding significant complexity for marginal gameplay improvement in v1.

### Answer reveal panel

**Decision**: After the player picks, expand an info panel below the swatch showing: hex value, RGB triplet, and any well-known aliases or trivia sourced from the static dataset.

**Rationale**: This fulfills the "more information about the color" requirement with zero additional data fetching.

## Risks / Trade-offs

- **Risk**: Two distractor names could coincidentally look very similar to the correct answer, making the game frustratingly hard.  
  → **Mitigation**: Acceptable for v1; a future iteration could apply a simple name-similarity filter.

- **Risk**: CSS named color list varies slightly by spec version.  
  → **Mitigation**: Use the W3C CSS Color Level 4 list as the canonical source; document the source in a comment.

- **Risk**: "Fun facts" data is manual effort to compile.  
  → **Mitigation**: Ship with hex + RGB only; add trivia as stretch goal. The spec requires only hex and RGB post-reveal.
