## 1. Create the color set module

- [x] 1.1 Create directory `src/colorsets/`
- [x] 1.2 Create `src/colorsets/css-named-colors.js` — export `id = 'css-named-colors'`
- [x] 1.3 Move all 148 color entries (with `name`, `label`, `hex`, `r`, `g`, `b`) from `src/colors.js` into the `colors` array export in `src/colorsets/css-named-colors.js`
- [x] 1.4 Add `translations` export to `src/colorsets/css-named-colors.js`: build `en` map from `colors` labels (`Object.fromEntries(colors.map(c => [c.name, c.label]))`); move the entire `de` color map from `src/i18n.js` into `translations.de`

## 2. Refactor colors.js

- [x] 2.1 Replace the content of `src/colors.js` with a thin re-export: `export { colors as COLORS } from './colorsets/css-named-colors.js'`

## 3. Refactor i18n.js

- [x] 3.1 Remove `import { COLORS } from './colors.js'` from `src/i18n.js`
- [x] 3.2 Remove the `colors` sub-maps from both `en` and `de` in the `translations` object
- [x] 3.3 Add `import { translations as colorTranslations } from './colorsets/css-named-colors.js'` to `src/i18n.js`
- [x] 3.4 Add and export a `tColor(name)` function that resolves via `colorTranslations[getLocale()]?.[name] ?? colorTranslations['en']?.[name] ?? name`

## 4. Update game.js

- [x] 4.1 Add `tColor` to the import from `./i18n.js` in `src/game.js`
- [x] 4.2 Replace every `t('colors.' + ...)` call with `tColor(...)` throughout `src/game.js`

## 5. Verification

- [x] 5.1 Run the app in German (default) and confirm color names display correctly in buttons, info panel, and similar colors panel
- [x] 5.2 Switch to English and confirm all color names update to their English labels
- [x] 5.3 Confirm no console errors on load or during gameplay
- [x] 5.4 Confirm `i18n.js` has no `colors` keys and no `import { COLORS }` import
