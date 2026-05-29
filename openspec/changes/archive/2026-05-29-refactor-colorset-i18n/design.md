## Context

Currently `src/colors.js` exports a flat `COLORS` array with an English `label` per entry. `src/i18n.js` imports `COLORS` to auto-build the `en.colors` map, and also holds a hand-written `de.colors` map. This means:
- Adding a second color set requires editing `i18n.js` (coupling).
- The German translations and the color data live in different files and can drift apart silently.
- `i18n.js` has two unrelated responsibilities: app-UI strings and color-name translations.

## Goals / Non-Goals

**Goals:**
- Each color set is a single self-contained module: colors + translations co-located.
- `i18n.js` owns only app-UI strings and locale infrastructure; it has zero knowledge of specific color sets.
- Color name lookup from `game.js` is a single clean call, identical in shape to the current `t('colors.*')` call.
- The refactor is purely internal — zero visual or behavioural change for the user.

**Non-Goals:**
- Switching between multiple color sets at runtime (future feature).
- Lazy-loading color sets.
- Changing any game logic, CSS, or HTML.

## Decisions

### 1. Color set as `{ id, colors, translations }` exported from a dedicated file

**Structure:**
```js
// src/colorsets/css-named-colors.js
export const id = 'css-named-colors';
export const colors = [
  { name: 'aliceblue', label: 'Alice Blue', hex: '#F0F8FF', r: 240, g: 248, b: 255 },
  …
];
export const translations = {
  en: { aliceblue: 'Alice Blue', … },
  de: { aliceblue: 'Alice-Blau', … },
};
```

**Why**: All data for a color set travels together. `en` translations are derived directly from `label` fields — no duplication needed (see Decision 2). `de` translations are co-located with the colors they describe.

### 2. `en` translations auto-derived from `label` at module load; not duplicated

**Decision**: `translations.en` is built at module initialisation time: `Object.fromEntries(colors.map(c => [c.name, c.label]))` — exactly what `i18n.js` currently does. The `label` field stays on each color entry as the canonical English name.

**Why over a hand-written `en` map**: Single source of truth; a maintainer editing `label` doesn't also have to update `translations.en`.

### 3. `tColor(name)` exported from `i18n.js`, delegating to the active color set

**Decision**: `i18n.js` exports a `tColor(colorName)` function. It looks up `colorName` in the active color set's `translations[locale]`, with English fallback. `game.js` replaces all `t('colors.' + name)` calls with `tColor(name)`.

```js
// i18n.js (simplified)
import { translations as colorTranslations } from './colorsets/css-named-colors.js';

export function tColor(name) {
  const locale = getLocale();
  return colorTranslations[locale]?.[name] ?? colorTranslations['en']?.[name] ?? name;
}
```

**Why not keep `t('colors.*')`**: The dot-notation key `'colors.aliceblue'` implies `i18n.js` owns the color map, which is the coupling we're removing. A separate `tColor()` function makes the boundary explicit.

### 4. `src/colors.js` becomes a thin re-export

**Decision**: `colors.js` re-exports `colors as COLORS` from `css-named-colors.js`. This preserves the `COLORS` name used by `game.js` and avoids a wider rename.

**Why**: Zero disruption to `game.js`'s data access; only the translation lookup path changes.

## Risks / Trade-offs

- **`t('colors.*')` still works in `i18n.js`'s `t()` function**: After removing the `colors` sub-maps, calling `t('colors.aliceblue')` would return the key string rather than throw. This is acceptable because `game.js` will be updated to call `tColor()` instead — but any future code accidentally using `t('colors.*')` would silently return the key. Mitigation: the `t()` function can be left as-is; the split is enforced by convention and code review.
- **`label` field duplication**: Each color entry has `label: 'Alice Blue'` AND `translations.en.aliceblue = 'Alice Blue'` (auto-derived). They're logically the same value but stored in two places. Mitigation: `en` is always derived from `label` at module load — editing `label` automatically updates `en`.
