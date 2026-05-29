### Requirement: Color set module format
Each color set SHALL be a dedicated JS module exporting `id` (string), `colors` (array of `{ name, label, hex, r, g, b }`), and `translations` (locale-keyed map of `colorName → displayLabel`). The `translations.en` map SHALL be derivable from the `label` fields of the `colors` array. A color set module SHALL be fully self-contained — no other module needs to be edited to add or change its translations.

#### Scenario: Color set contains all required exports
- **WHEN** a color set module is imported
- **THEN** it SHALL export `id`, `colors`, and `translations` with the structure described above

#### Scenario: English translation matches label field
- **WHEN** `translations.en[colorName]` is accessed for any color in the set
- **THEN** it SHALL return the same value as `colors.find(c => c.name === colorName).label`

#### Scenario: Adding a translation requires no change outside the color set module
- **WHEN** a new locale translation is added to a color set
- **THEN** only the color set module file SHALL need to be edited

### Requirement: Color name lookup via tColor
The system SHALL expose a `tColor(name)` function in `i18n.js` that resolves a color name to its display label in the active locale using the active color set's translations. It SHALL fall back to the English translation if the active locale has no entry for that name.

#### Scenario: tColor returns active locale translation
- **WHEN** `tColor('aliceblue')` is called with locale set to `'de'`
- **THEN** the German display name for Alice Blue SHALL be returned

#### Scenario: tColor falls back to English
- **WHEN** `tColor('aliceblue')` is called with a locale that has no entry for that name
- **THEN** the English display name SHALL be returned

### Requirement: i18n module contains only app UI strings
The `i18n.js` module SHALL NOT contain any color-name translations. Its `translations` registry SHALL only contain `ui` sub-maps. It SHALL NOT import `COLORS` or any color set module directly (the color set reference is injected or imported separately).

#### Scenario: i18n has no colors sub-map
- **WHEN** the `translations` object in `i18n.js` is inspected
- **THEN** it SHALL contain only `ui` keys, no `colors` keys
