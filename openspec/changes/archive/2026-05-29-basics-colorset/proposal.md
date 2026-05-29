## Why

The game only ships with the full W3C CSS named color set, which is large and uses obscure technical names — not ideal for casual players. A "Basics" color set (sourced from `farbnamen_hexwerte.csv`) offers ~58 everyday color names in German and English, making the game more accessible and fun for beginners.

## What Changes

- Add a new `basics` colorset module (`src/colorsets/basics.js`) converted from `farbnamen_hexwerte.csv`, with English names derived from the German originals and full `colors` + `translations` exports matching the existing colorset contract
- **BREAKING** (to `colors.js`): replace the hardcoded single-colorset re-export with a dynamic colorset registry that can switch between `basics` and `css-named-colors`
- Add a colorset selector `<select>` in the footer next to the language selector; selection is persisted to `localStorage` under `ntc-colorset`
- Default colorset is `basics`
- Both the colorset selector label and the colorset display names are localised (EN/DE)

## Capabilities

### New Capabilities
- `colorset-selector`: UI control and persistence for switching between available color sets at runtime

### Modified Capabilities
- `colorset-module`: existing spec describes the module contract — now requires a `label` map per locale (for display in the selector) and an `id` export; the contract is already partially met but the spec needs to reflect the selector-facing additions

## Impact

- `src/colorsets/basics.js` — new file
- `src/colors.js` — becomes a dynamic registry (`getColorset`, `setColorset`, `COLORSETS`)
- `src/game.js` — swap `COLORS` import for registry API; re-start round on colorset change
- `src/i18n.js` — swap hardcoded colorset import for registry-aware `tColor`
- `index.html` — add colorset `<select>` in footer
- `src/style.css` — minor: align new selector with existing lang selector
