### Requirement: Consecutive correct streak tracking
The game SHALL track the player's current streak of consecutive correct answers. The streak SHALL increment by one after each correct answer, reset to zero after any incorrect answer, and start at zero on page load.

#### Scenario: Streak increments on correct answer
- **WHEN** the player selects the correct color name
- **THEN** the current streak counter SHALL increase by one

#### Scenario: Streak resets on wrong answer
- **WHEN** the player selects an incorrect color name
- **THEN** the current streak counter SHALL reset to zero

#### Scenario: Streak starts at zero
- **WHEN** the page is first loaded
- **THEN** the current streak counter SHALL be zero

### Requirement: High score persistence
The game SHALL persist the player's best streak (high score) to localStorage under the key `ntc-highscore`. The stored value SHALL be updated whenever the current streak exceeds the stored value. The high score SHALL survive page reloads.

#### Scenario: High score updated when streak exceeds it
- **WHEN** the current streak exceeds the value stored in localStorage under `ntc-highscore`
- **THEN** the stored value SHALL be updated to the current streak

#### Scenario: High score survives reload
- **WHEN** the page is reloaded after a non-zero high score has been set
- **THEN** the displayed best value SHALL reflect the previously stored high score

### Requirement: High score display in header
The game SHALL display two labeled counters — one for the current streak and one for the best (high score) — always visible in the header. When no high score has been recorded yet (i.e., no value in localStorage), the best counter SHALL display "—". Both counters SHALL update immediately after each answer.

#### Scenario: Counters always visible
- **WHEN** the game is in any state (before answer, after answer, new round)
- **THEN** both the streak counter and the best counter SHALL be visible in the header

#### Scenario: Best shows dash with no history
- **WHEN** no high score has been stored in localStorage
- **THEN** the best counter SHALL display "—"

#### Scenario: Counters update after answer
- **WHEN** the player selects any answer
- **THEN** both the streak counter and the best counter SHALL immediately reflect the updated values
