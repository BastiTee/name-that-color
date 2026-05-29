## Why

Color data (name, hex, RGB, label) and color translations are currently split across two files: `colors.js` holds the canonical entries with an English `label`, while `i18n.js` holds the German translations in a separate flat map — and also imports `COLORS` just to build the English map. This coupling means adding a second color set (e.g., RAL colors, Pantone names) would require touching `i18n.js` in addition to creating the new data file, and the two can get out of sync silently.

The user's instinct is right: translations *belong with their data*. However, putting an entire translations object inside `colors.js` would bloat that file with locale data. The better boundary is a **dedicated file per color set** (`css-named-colors.js`) that exports both the color array and its own translations map, leaving `i18n.js` to hold only app-UI strings and locale infrastructure.

## What Changes

- Introduce a **color set module** pattern: each color set is a single JS file (e.g., `src/colorsets/css-named-colors.js`) that exports:
  - `colors`: the array of color objects (`name`, `hex`, `r`, `g`, `b`, `label`)
  - `translations`: a locale-keyed map of color-name → display label (`{ en: { aliceblue: 'Alice Blue', … }, de: { … } }`)
  - `id`: a string key (e.g., `"css-named-colors"`)
- `src/colors.js` becomes a thin re-export that imports from the active color set, preserving the existing `COLORS` export for backward compatibility within this change.
- `src/i18n.js` **removes** the `colors` sub-maps and the `import { COLORS }` dependency. The `t('colors.*')` lookup path is kept but is now delegated to the active color set's own translations.
- `game.js` is updated to call a new `tColor(name)` helper (or extend `t()`) that resolves a color name through the active color set's translations rather than `i18n.js`.

## Capabilities

### New Capabilities

- `colorset-module`: Standardised color-set file format — each set is self-contained with colors + translations bundled together. Consumed by `game.js`; `i18n.js` no longer owns color translations.

### Modified Capabilities

- `color-quiz`: Game now resolves color display names via the color set's own translations rather than `i18n.js`.

## Impact

- New file `src/colorsets/css-named-colors.js` — contains all 148 colors with their English labels and the German translation map.
- `src/colors.js` — refactored to re-export from `css-named-colors.js`; `label` field stays on each entry.
- `src/i18n.js` — remove `import { COLORS }`, remove `colors` sub-maps from `en` and `de`; expose a `tColor(name)` function that delegates to the active color set.
- `src/game.js` — replace `t('colors.' + name)` calls with `tColor(name)`.
- No changes to `index.html`, `style.css`, or any spec/test files.
