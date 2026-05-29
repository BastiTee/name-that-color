### Requirement: Color swatch display
The game SHALL display a large colored swatch whose background color is set to the current round's CSS named color. The swatch SHALL be visually prominent (minimum 200×200 px or equivalent).

#### Scenario: Swatch shows correct color
- **WHEN** a new round starts
- **THEN** the swatch background SHALL match the CSS named color for that round exactly

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. The choices SHALL be hidden at round start. A "Reveal Answers" button SHALL be shown instead. When the player clicks "Reveal Answers", the three choice buttons SHALL become visible and the reveal button SHALL be hidden. Exactly one choice SHALL be the correct CSS color for the displayed swatch. The remaining two SHALL be distinct, randomly selected colors that are not the correct answer. All choice labels SHALL be rendered through the active locale's color name translation.

#### Scenario: Choices hidden at round start
- **WHEN** a new round starts
- **THEN** the three choice buttons SHALL NOT be visible and a "Reveal Answers" button SHALL be visible

#### Scenario: Choices revealed on demand
- **WHEN** the player clicks "Reveal Answers"
- **THEN** the three choice buttons SHALL become visible and the "Reveal Answers" button SHALL be hidden

#### Scenario: Choices contain the correct answer
- **WHEN** the choices are revealed
- **THEN** exactly one of the three choices SHALL match the display name of the displayed color in the active locale

#### Scenario: Distractors are different each round
- **WHEN** a new round starts
- **THEN** the two distractor names SHALL be randomly selected from the full CSS named color list, excluding the correct answer

#### Scenario: Choice order is randomized
- **WHEN** the choices are revealed
- **THEN** the position of the correct answer among the three choices SHALL be random

#### Scenario: Labels update on locale switch
- **WHEN** the user changes locale while a round is active
- **THEN** all three choice button labels SHALL immediately re-render using the new locale's color names, without starting a new round

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
After the player selects an answer (correct or incorrect), the game SHALL display additional information about the color. The revealed metadata SHALL include: the localized color display name, the hexadecimal color value, and the RGB component values. A similar colors panel SHALL also appear directly below the metadata box, showing the two most perceptually similar colors flanking the current color.

#### Scenario: Metadata appears after answer
- **WHEN** the player selects any answer choice
- **THEN** a metadata panel SHALL become visible showing the color's localized display name, hex value (e.g., `#FF6347`), and RGB values (e.g., `rgb(255, 99, 71)`)

#### Scenario: Similar colors panel appears after answer
- **WHEN** the player selects any answer choice
- **THEN** the similar colors panel SHALL become visible directly below the metadata panel

#### Scenario: Metadata hidden before answer
- **WHEN** a new round starts and no answer has been selected
- **THEN** the metadata panel SHALL NOT be visible

#### Scenario: Metadata name updates on locale switch
- **WHEN** the user switches locale after an answer has been revealed
- **THEN** the color name in the metadata panel SHALL re-render in the new locale

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
