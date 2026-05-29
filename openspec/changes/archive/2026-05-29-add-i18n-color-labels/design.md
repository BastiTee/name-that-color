## Context

The app is a static single-page CSS color quiz. Color data lives in `src/colors.js` as a flat array of objects with `name` (raw CSS identifier), `hex`, `r`, `g`, `b`. The game in `src/game.js` reads `color.name` directly for button labels and the info panel. There is currently no abstraction for UI strings — all text is hardcoded in JS or HTML.

The change adds:
1. A `label` field (formatted English display name) to each color entry.
2. A new `src/i18n.js` module that owns locale state, a translations registry, and a helper to look up any string in the active locale.
3. German translations for all color names and UI strings.
4. A language-switcher `<select>` in `index.html` that swaps the active locale at runtime.

## Goals / Non-Goals

**Goals:**
- Human-readable color names in the UI (e.g., "Alice Blue" instead of "aliceblue").
- German translations for all 148 color names and all static UI strings.
- A locale-aware rendering path in `game.js` so adding a new language requires only a new entry in the translations registry.
- Language switcher that persists selection in `localStorage` and re-renders the current round without restarting.

**Non-Goals:**
- Server-side or lazy-loaded translations (all locales bundled at startup).
- RTL language support.
- Translation of CSS technical values (hex, RGB) — those remain locale-neutral.
- Auto-detecting browser locale (always default to `en`).

## Decisions

### 1. Translation registry shape

**Decision**: A plain JS object keyed by locale code (`"en"`, `"de"`) with a nested `colors` map (keyed by `color.name`) and a `ui` map for static strings.

```js
const translations = {
  en: { ui: { next: "Next", …}, colors: { aliceblue: "Alice Blue", … } },
  de: { ui: { next: "Weiter", …}, colors: { aliceblue: "Alice-Blau", … } },
};
```

**Why over alternatives**:
- A flat merged namespace would collide if a color name matched a UI key.
- External JSON files would add an async fetch step to a static app.
- The `colors` sub-map is keyed by the CSS `name` (stable identifier), not by `label`, so lookups are O(1) and survive label changes.

### 2. `label` field in `colors.js` for English display names

**Decision**: Add a `label` field to each color entry holding the title-cased English name (e.g., `"Corn Silk"`). The `en` locale's `colors` map in `i18n.js` mirrors these values rather than duplicating them — `i18n.js` imports `COLORS` and builds the `en.colors` map from `label` fields at module load time.

**Why**: Keeps the canonical English name co-located with the color data; avoids maintaining two separate sources of truth for English names.

### 3. Locale state in `i18n.js`, not `game.js`

**Decision**: `i18n.js` exports `getLocale()`, `setLocale(code)`, and `t(key, colorName?)` helpers. `game.js` calls `t()` for every render and listens for a custom `localechange` DOM event dispatched by `i18n.js` to trigger a re-render.

**Why**: Keeps locale concern out of game logic; the event approach avoids tight coupling between the switcher UI and `game.js`.

### 4. Language switcher as a `<select>` element

**Decision**: A `<select>` populated from the `translations` keys renders above the game board. It sets `i18n.setLocale()` on `change` and dispatches `localechange`.

**Why over flag buttons**: `<select>` scales naturally to many languages without layout changes; flags have accessibility and political concerns.

## Risks / Trade-offs

- **148 color translations**: German names must be accurate. Mistranslations are user-visible. Mitigation: Use established CSS/color-name references and note any uncertain translations with a comment for future review.
- **Re-render on locale switch**: Switching language mid-round re-renders choice buttons. The correct answer is preserved (stored by `color.name`, not display label), so game state remains valid.
- **Bundle size**: All locales are loaded upfront. With ~148 colors × 2 locales this is negligible (<10 KB).

## Migration Plan

1. Add `label` to all entries in `src/colors.js`.
2. Create `src/i18n.js` with translations registry and helpers.
3. Update `src/game.js` to use `t()` for all user-visible strings.
4. Add language-switcher markup to `index.html`.
5. Add switcher styles to `src/style.css`.
6. No rollback concerns — purely additive; removing `i18n.js` and reverting `game.js` restores the original behavior.
