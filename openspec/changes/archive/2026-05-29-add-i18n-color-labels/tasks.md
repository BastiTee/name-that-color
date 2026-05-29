## 1. Extend color data with English display labels

- [x] 1.1 Add a `label` field to every entry in `src/colors.js` with a properly title-cased English display name (e.g., `"Alice Blue"`, `"Corn Silk"`, `"Rebecca Purple"`)

## 2. Create the i18n module

- [x] 2.1 Create `src/i18n.js` with a `translations` registry object containing `en` and `de` top-level locale keys, each with a `ui` map and a `colors` map
- [x] 2.2 Populate `en.colors` by mapping each CSS color `name` to its `label` from `COLORS` (imported from `colors.js`)
- [x] 2.3 Populate `de.colors` with German translations for all 148 color names
- [x] 2.4 Populate `en.ui` with English strings: `next`, `correct`, `incorrect`, `switchLanguageLabel`, and any other static UI text
- [x] 2.5 Populate `de.ui` with German equivalents of all `en.ui` strings
- [x] 2.6 Implement `getLocale()` — reads from `localStorage` key `"ntc-locale"`, defaulting to `"en"`
- [x] 2.7 Implement `setLocale(code)` — persists to `localStorage`, dispatches `localechange` CustomEvent on `document`
- [x] 2.8 Implement `t(key)` helper — resolves dot-notation keys (e.g., `"ui.next"`, `"colors.aliceblue"`) against the active locale, falling back to `"en"` when a key is missing
- [x] 2.9 Export `getLocale`, `setLocale`, `t`, and `LOCALES` (array of `{code, label}` objects for populating the switcher)

## 3. Add language-switcher UI

- [x] 3.1 Add a `<div id="lang-switcher">` containing a `<label>` and `<select id="lang-select">` to `index.html`, positioned above the game board
- [x] 3.2 Add CSS for `#lang-switcher` and `#lang-select` in `src/style.css` using existing CSS custom properties so it matches the dark theme

## 4. Wire i18n into game logic

- [x] 4.1 Import `t`, `getLocale`, `setLocale`, and `LOCALES` from `./i18n.js` in `src/game.js`
- [x] 4.2 On app init, populate `#lang-select` options from `LOCALES` and set its value to `getLocale()`
- [x] 4.3 Add a `change` event listener on `#lang-select` that calls `setLocale(select.value)`
- [x] 4.4 Add a `localechange` event listener on `document` that re-renders the current round (buttons + info panel) in the new locale without resetting game state
- [x] 4.5 Replace `choices[i].name` in choice button rendering with `t("colors." + choices[i].name)`
- [x] 4.6 Replace `currentColor.name` in `infoName.textContent` assignment with `t("colors." + currentColor.name)`
- [x] 4.7 Replace any hardcoded button text (`nextBtn.textContent`, feedback strings) with `t("ui.*")` equivalents

## 5. Verification

- [x] 5.1 Run the app and confirm color buttons show human-readable English names (e.g., "Alice Blue" not "aliceblue")
- [x] 5.2 Switch to German and verify all 3 choice buttons, the info panel color name, and all UI strings update without restarting the round
- [x] 5.3 Reload the page after selecting German and confirm the language preference is restored from `localStorage`
- [x] 5.4 Switch language on a revealed-answer round and confirm feedback state (correct/incorrect highlights) and metadata panel remain intact
