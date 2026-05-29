## MODIFIED Requirements

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. The choices SHALL be hidden at round start. A "Reveal Options" button SHALL be shown instead. When the player clicks "Reveal Options", the three choice buttons SHALL become visible and the reveal button SHALL be hidden. Exactly one choice SHALL be the correct CSS color for the displayed swatch. The remaining two SHALL be distinct, randomly selected colors that are not the correct answer. All choice labels SHALL be rendered through the active color set's locale translation via `tColor()` rather than through `i18n.t('colors.*')`.

#### Scenario: Choices contain the correct answer
- **WHEN** the choices are revealed
- **THEN** exactly one of the three choices SHALL match the display name of the displayed color in the active locale

#### Scenario: Labels update on locale switch
- **WHEN** the user changes locale while a round is active
- **THEN** all three choice button labels SHALL immediately re-render using the color set's translations for the new locale

### Requirement: Color metadata reveal
After the player selects an answer, the app SHALL display the color's localized display name via `tColor()`, hex value, and RGB values. The similar colors panel SHALL also appear. Color name resolution SHALL use the active color set's translations, not `i18n.js`'s `t()` function.

#### Scenario: Metadata shows localized color name
- **WHEN** the player selects any answer choice
- **THEN** the color name in the metadata panel SHALL be resolved via `tColor()` in the active locale
