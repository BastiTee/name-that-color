### Requirement: Color swatch display
The game SHALL display a large colored swatch whose background color is set to the current round's CSS named color. The swatch SHALL be visually prominent (minimum 200×200 px or equivalent).

#### Scenario: Swatch shows correct color
- **WHEN** a new round starts
- **THEN** the swatch background SHALL match the CSS named color for that round exactly

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. The choices SHALL be hidden at round start. A "Reveal Options" button SHALL be shown instead. When the player clicks "Reveal Options", the three choice buttons SHALL become visible and the reveal button SHALL be hidden. Exactly one choice SHALL be the correct CSS color for the displayed swatch. The remaining two SHALL be distinct, randomly selected colors that are not the correct answer. All choice labels SHALL be rendered through the active color set's locale translation via `tColor()` rather than through `i18n.t('colors.*')`.

#### Scenario: Choices contain the correct answer
- **WHEN** the choices are revealed
- **THEN** exactly one of the three choices SHALL match the display name of the displayed color in the active locale

#### Scenario: Labels update on locale switch
- **WHEN** the user changes locale while a round is active
- **THEN** all three choice button labels SHALL immediately re-render using the color set's translations for the new locale

### Requirement: Answer feedback
After the player selects an answer, the game SHALL immediately indicate whether the choice was correct or incorrect. The correct answer SHALL always be highlighted after selection, even if the player chose incorrectly. Each choice button SHALL display a small color swatch square showing the actual color it represents.

#### Scenario: Correct guess feedback
- **WHEN** the player selects the correct color name
- **THEN** the selected choice SHALL be visually marked as correct (e.g., green highlight)

#### Scenario: Wrong guess feedback
- **WHEN** the player selects an incorrect color name
- **THEN** the selected choice SHALL be visually marked as incorrect AND the correct choice SHALL be visually marked as correct simultaneously

#### Scenario: Color swatches shown after answer
- **WHEN** the player selects any answer choice
- **THEN** each of the three choice buttons SHALL display a small colored square showing the CSS color it represents

### Requirement: Color metadata reveal
After the player selects an answer, the app SHALL display the color's localized display name via `tColor()`, hex value, and RGB values. The similar colors panel SHALL also appear. Color name resolution SHALL use the active color set's translations, not `i18n.js`'s `t()` function.

#### Scenario: Metadata shows localized color name
- **WHEN** the player selects any answer choice
- **THEN** the color name in the metadata panel SHALL be resolved via `tColor()` in the active locale

### Requirement: Next round button placement
The "Next Color" button SHALL appear above the metadata info panel, not below the similar colors panel. This ensures the button remains visible and accessible without scrolling after both post-answer panels are shown.

#### Scenario: Next button above info panel
- **WHEN** the player has selected an answer and both the metadata panel and similar colors panel are visible
- **THEN** the "Next Color" button SHALL appear above the metadata panel in the visual stacking order

### Requirement: Next round progression
After an answer is revealed, the game SHALL provide a way for the player to advance to the next round with a new random color.

#### Scenario: Next button after answer
- **WHEN** the player has selected an answer and the metadata is visible
- **THEN** a "Next" (or equivalent) button SHALL be available to start a new round

#### Scenario: New color each round
- **WHEN** the player advances to the next round
- **THEN** a different CSS named color SHALL be selected (same color SHALL NOT appear consecutively)

### Requirement: Full CSS named color dataset
The game SHALL use all 140+ CSS named colors as defined by the W3C CSS Color Level 4 specification as the source pool for both correct answers and distractors.

#### Scenario: All colors are eligible
- **WHEN** any round starts
- **THEN** any color from the full CSS named color list MAY be selected as the round's color
