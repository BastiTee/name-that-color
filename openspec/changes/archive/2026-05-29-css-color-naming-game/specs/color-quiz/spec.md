## ADDED Requirements

### Requirement: Color swatch display
The game SHALL display a large colored swatch whose background color is set to the current round's CSS named color. The swatch SHALL be visually prominent (minimum 200×200 px or equivalent).

#### Scenario: Swatch shows correct color
- **WHEN** a new round starts
- **THEN** the swatch background SHALL match the CSS named color for that round exactly

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. Exactly one choice SHALL be the correct CSS name for the displayed color. The remaining two SHALL be distinct, randomly selected CSS named color names that are not the correct answer.

#### Scenario: Choices contain the correct answer
- **WHEN** a round is displayed
- **THEN** exactly one of the three choices SHALL match the name of the displayed color

#### Scenario: Distractors are different each round
- **WHEN** a new round starts
- **THEN** the two distractor names SHALL be randomly selected from the full CSS named color list, excluding the correct answer

#### Scenario: Choice order is randomized
- **WHEN** a round is displayed
- **THEN** the position of the correct answer among the three choices SHALL be random (not always first, second, or third)

### Requirement: Answer feedback
After the player selects an answer, the game SHALL immediately indicate whether the choice was correct or incorrect. The correct answer SHALL always be highlighted after selection, even if the player chose incorrectly.

#### Scenario: Correct guess feedback
- **WHEN** the player selects the correct color name
- **THEN** the selected choice SHALL be visually marked as correct (e.g., green highlight)

#### Scenario: Wrong guess feedback
- **WHEN** the player selects an incorrect color name
- **THEN** the selected choice SHALL be visually marked as incorrect AND the correct choice SHALL be visually marked as correct simultaneously

### Requirement: Color metadata reveal
After the player selects an answer (correct or incorrect), the game SHALL display additional information about the color. The revealed metadata SHALL include at minimum: the CSS color name, the hexadecimal color value, and the RGB component values.

#### Scenario: Metadata appears after answer
- **WHEN** the player selects any answer choice
- **THEN** a metadata panel SHALL become visible showing the color's CSS name, hex value (e.g., `#FF6347`), and RGB values (e.g., `rgb(255, 99, 71)`)

#### Scenario: Metadata hidden before answer
- **WHEN** a new round starts and no answer has been selected
- **THEN** the metadata panel SHALL NOT be visible

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
