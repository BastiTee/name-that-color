## MODIFIED Requirements

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. Exactly one choice SHALL be the correct CSS color for the displayed swatch. The remaining two SHALL be distinct, randomly selected colors that are not the correct answer. All choice labels SHALL be rendered through the active locale's color name translation (e.g., "Alice Blue" in English, "Alice-Blau" in German) rather than raw CSS identifiers.

#### Scenario: Choices contain the correct answer
- **WHEN** a round is displayed
- **THEN** exactly one of the three choices SHALL match the display name of the displayed color in the active locale

#### Scenario: Distractors are different each round
- **WHEN** a new round starts
- **THEN** the two distractor names SHALL be randomly selected from the full CSS named color list, excluding the correct answer

#### Scenario: Choice order is randomized
- **WHEN** a round is displayed
- **THEN** the position of the correct answer among the three choices SHALL be random (not always first, second, or third)

#### Scenario: Labels update on locale switch
- **WHEN** the user changes locale while a round is active
- **THEN** all three choice button labels SHALL immediately re-render using the new locale's color names, without starting a new round

### Requirement: Color metadata reveal
After the player selects an answer (correct or incorrect), the game SHALL display additional information about the color. The revealed metadata SHALL include: the localized color display name, the hexadecimal color value, and the RGB component values.

#### Scenario: Metadata appears after answer
- **WHEN** the player selects any answer choice
- **THEN** a metadata panel SHALL become visible showing the color's localized display name, hex value (e.g., `#FF6347`), and RGB values (e.g., `rgb(255, 99, 71)`)

#### Scenario: Metadata hidden before answer
- **WHEN** a new round starts and no answer has been selected
- **THEN** the metadata panel SHALL NOT be visible

#### Scenario: Metadata name updates on locale switch
- **WHEN** the user switches locale after an answer has been revealed
- **THEN** the color name in the metadata panel SHALL re-render in the new locale
