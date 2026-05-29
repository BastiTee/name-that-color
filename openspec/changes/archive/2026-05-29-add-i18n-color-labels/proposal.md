## Why

Color names in the app are raw CSS identifiers (e.g., `cornsilk`, `aliceblue`) which are cryptic to non-technical users. Adding human-readable English labels and German translations makes the game more accessible and opens the door to a fully multilingual experience.

## What Changes

- Each color entry gains a `label` field with a properly formatted English display name (e.g., `"Corn Silk"` instead of `"cornsilk"`).
- A new `translations` data structure maps UI strings and color names to German (`de`).
- A language-switcher UI control allows the player to toggle between English and German, with the architecture ready for additional languages.
- The game renders color names and all UI text through a translation layer instead of hardcoded strings.

## Capabilities

### New Capabilities

- `i18n`: Internationalization layer — locale detection/selection, a translations registry keyed by locale code, and a language-switcher UI component. Covers all user-visible strings: color names, button labels, status messages, and any future UI text.

### Modified Capabilities

- `color-quiz`: The quiz now renders color names via the i18n layer instead of the raw `name` field. The `COLORS` data structure gains a `label` (English display name) field.

## Impact

- `colors.js` — add `label` field to all 148 color entries.
- `game.js` — replace direct `color.name` references with translated color name lookups; wire up locale state and language-switcher events.
- `index.html` — add language-switcher markup.
- `style.css` — style the language-switcher component.
- New file `i18n.js` — translation registry and locale helpers.
- No breaking changes to existing game logic; purely additive to the data model.
