## 1. New colorset module

- [x] 1.1 Create `src/colorsets/basics.js`: convert all 58 rows from `farbnamen_hexwerte.csv` to `colors` array entries `{ name, label, hex, r, g, b }` — use slugified German name as `name` (e.g. `rot`, `hellblau`), derive English `label` from the German original, compute `r/g/b` from hex
- [x] 1.2 Add `id = 'basics'` and `label = { en: 'Basics', de: 'Grundlagen' }` exports to `basics.js`
- [x] 1.3 Add `translations` export to `basics.js`: `en` derived from `colors.map`, `de` map of `name → German display name` (original CSV value)

## 2. Colorset registry

- [x] 2.1 Rewrite `src/colors.js` as a registry: import both colorset modules, export `COLORSETS` (array of all sets), `getActiveColorset()`, and `setActiveColorset(id)` — read initial id from `localStorage` (`ntc-colorset`), default to `basics`
- [x] 2.2 Add `saveColorset(id)` helper in the registry (try/catch localStorage write)

## 3. Wire tColor to registry

- [x] 3.1 In `src/i18n.js`: replace hardcoded `import { translations as colorTranslations } from './colorsets/css-named-colors.js'` with `import { getActiveColorset } from './colors.js'`
- [x] 3.2 Update `tColor()` to call `getActiveColorset().translations` at call time instead of using the captured `colorTranslations`

## 4. Update game.js

- [x] 4.1 Replace `import { COLORS }` with `import { getActiveColorset, COLORSETS, setActiveColorset } from './colors.js'`
- [x] 4.2 In `startRound()` replace `COLORS` references with `getActiveColorset().colors`

## 5. Colorset selector UI

- [x] 5.1 Add `<select id="colorset-select">` in `index.html` footer, next to `#lang-switcher`
- [x] 5.2 In `game.js`: populate `#colorset-select` options from `COLORSETS` using localised `label` (recompute on locale change), set initial value from active colorset id
- [x] 5.3 In `game.js`: on `colorset-select` change — call `setActiveColorset`, save to localStorage, call `startRound()`
- [x] 5.4 In `renderUI()`: update colorset option labels when locale changes

## 6. i18n labels

- [x] 6.1 Add `ui.colorset` key to EN and DE translations in `i18n.js` for the selector's accessible label (EN: "Color Set", DE: "Farbset")

## 7. CSS

- [x] 7.1 Ensure `#colorset-select` matches the existing `#lang-select` styling (reuse or extend the existing rule)
