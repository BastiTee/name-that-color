## Context

Currently `src/colors.js` is a one-liner re-export from `css-named-colors.js`, and `src/i18n.js` hardcodes the same import for `tColor`. There is no concept of a "selected" color set — it's baked in at module load time. The new `basics` colorset (58 everyday colors from `farbnamen_hexwerte.csv`) needs to be selectable at runtime alongside the existing CSS set.

## Goals / Non-Goals

**Goals:**
- Convert `farbnamen_hexwerte.csv` into a self-contained `src/colorsets/basics.js` module (same shape as `css-named-colors.js`)
- Turn `src/colors.js` into a colorset registry with `getActiveColorset()`, `setActiveColorset(id)`, and `COLORSETS` map
- Make `tColor()` in `i18n.js` delegate to the active colorset's translations
- Add a `<select>` in the footer for colorset switching, persisted to `localStorage` under `ntc-colorset`; default is `basics`
- Localise colorset display names (EN: "Basics" / "CSS Colors"; DE: "Grundlagen" / "CSS-Farben")

**Non-Goals:**
- Dynamically loading colorset modules (all are statically imported)
- Per-round colorset mixing
- Adding more than two colorsets

## Decisions

### Registry in `colors.js`, not `game.js`

**Decision**: `colors.js` owns the active-colorset state and exposes `getActiveColorset()` / `setActiveColorset()`. `game.js` calls `getActiveColorset().colors` each round.

**Rationale**: Keeps colorset concerns out of game logic. `i18n.js` and `game.js` both need the active colorset; a shared registry avoids circular imports.

**Alternative**: Pass colorset as a parameter everywhere — rejected, too much churn.

### `tColor` delegates to registry

**Decision**: `i18n.js` imports `getActiveColorset` from `colors.js` (instead of a hardcoded colorset import) so `tColor()` always uses the currently active set.

**Rationale**: Single source of truth for the active colorset.

### Colorset display names in `i18n.js` `ui` map

**Decision**: Add `ui.colorsets` as a locale-keyed object `{ 'basics': 'Basics', 'css-named-colors': 'CSS Colors' }` etc., rather than putting labels inside each colorset module.

**Rationale**: Colorset modules are data; UI labels belong in the UI translation layer. Keeps colorset modules free of UI concerns.

### Persist with `ntc-colorset` key, default `basics`

**Decision**: Read on init; if absent, default to `basics`. Write on every change.

**Rationale**: Consistent with `ntc-locale` convention already in use.

### Colorset switch triggers new round

**Decision**: Switching colorset calls `startRound()` immediately so the active color pool and labels are always consistent.

**Rationale**: Avoids showing a swatch from one set with choice labels from another.

## Risks / Trade-offs

- [Name key collisions] `basics.js` uses slugified German names as keys (e.g. `rot`, `hellblau`). These won't collide with CSS color names which are always single English words. → No mitigation needed.
- [localStorage unavailable] Same pattern as high score — wrap in try/catch, fall back to in-memory default.
