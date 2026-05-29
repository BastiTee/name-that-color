## MODIFIED Requirements

### Requirement: Color set module format
Each color set SHALL be a dedicated JS module exporting `id` (string), `label` (locale-keyed map of display names for the colorset itself, e.g. `{ en: 'Basics', de: 'Grundlagen' }`), `colors` (array of `{ name, label, hex, r, g, b }`), and `translations` (locale-keyed map of `colorName → displayLabel`). The `translations.en` map SHALL be derivable from the `label` fields of the `colors` array. A color set module SHALL be fully self-contained — no other module needs to be edited to add or change its translations.

#### Scenario: Color set contains all required exports
- **WHEN** a color set module is imported
- **THEN** it SHALL export `id`, `label`, `colors`, and `translations` with the structure described above

#### Scenario: English translation matches label field
- **WHEN** `translations.en[colorName]` is accessed for any color in the set
- **THEN** it SHALL return the same value as `colors.find(c => c.name === colorName).label`

#### Scenario: Adding a translation requires no change outside the color set module
- **WHEN** a new locale translation is added to a color set
- **THEN** only the color set module file SHALL need to be edited

### Requirement: Color name lookup via tColor
The system SHALL expose a `tColor(name)` function in `i18n.js` that resolves a color name to its display label in the active locale using the **currently active** color set's translations. It SHALL fall back to the English translation if the active locale has no entry for that name. The active colorset SHALL be obtained from the colorset registry (`colors.js`) at call time, not at import time.

#### Scenario: tColor returns active locale translation
- **WHEN** `tColor('rot')` is called with locale set to `'en'` and the basics colorset active
- **THEN** the English display name for that color SHALL be returned

#### Scenario: tColor falls back to English
- **WHEN** `tColor` is called with a locale that has no entry for a given name
- **THEN** the English display name SHALL be returned

#### Scenario: tColor reflects colorset switch
- **WHEN** the active colorset is changed and `tColor` is called for a name in the new set
- **THEN** the correct translation from the new set SHALL be returned
