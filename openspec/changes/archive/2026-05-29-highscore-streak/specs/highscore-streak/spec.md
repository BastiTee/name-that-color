## ADDED Requirements

### Requirement: Consecutive correct streak tracking
The game SHALL maintain a current-streak counter that increments by one for each consecutive correct answer and resets to zero when the player selects an incorrect answer. The streak counter SHALL reset to zero at the start of each new session (page load).

#### Scenario: Streak increments on correct answer
- **WHEN** the player selects the correct color name
- **THEN** the current streak counter SHALL increase by one

#### Scenario: Streak resets on wrong answer
- **WHEN** the player selects an incorrect color name
- **THEN** the current streak counter SHALL reset to zero

#### Scenario: Streak starts at zero on page load
- **WHEN** the page is first loaded
- **THEN** the current streak counter SHALL be zero

### Requirement: High score persistence
The game SHALL persist the all-time best streak to `localStorage` under the key `ntc-highscore`. The stored value SHALL be updated immediately whenever the current streak exceeds the stored high score after a correct answer. If `localStorage` is unavailable, the high score SHALL still function for the current session without throwing an error.

#### Scenario: High score updated when streak exceeds it
- **WHEN** the player answers correctly AND the resulting streak is greater than the stored high score
- **THEN** the stored high score SHALL be updated to the new streak value

#### Scenario: High score not updated when streak is lower
- **WHEN** the player answers correctly AND the resulting streak does not exceed the stored high score
- **THEN** the stored high score SHALL remain unchanged

#### Scenario: High score survives page reload
- **WHEN** the player reloads the page after setting a high score
- **THEN** the previously stored high score SHALL be restored from `localStorage`

### Requirement: High score display in header
The game SHALL display the current streak and the all-time high score as two labeled counters in the page header, visible at all times. Each counter SHALL have a short label (e.g., "Streak" and "Best"). When no high score has been recorded yet, the high score counter SHALL display "—". The counters SHALL update immediately after each answer is revealed.

#### Scenario: Counters visible on page load with no history
- **WHEN** the page loads and no high score exists in localStorage
- **THEN** the header SHALL show streak "0" and best "—"

#### Scenario: Counters update after correct answer
- **WHEN** the player answers correctly
- **THEN** the streak counter SHALL show the updated streak value AND the best counter SHALL reflect the current high score

#### Scenario: Streak counter resets visually on wrong answer
- **WHEN** the player answers incorrectly
- **THEN** the streak counter in the header SHALL display "0"
