## MODIFIED Requirements

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
