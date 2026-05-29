### Requirement: Auto-reveal countdown timer
At the start of each round, the game SHALL display a visual countdown progress bar that drains over exactly 3 seconds. When the countdown completes, the three answer-choice buttons SHALL be revealed automatically without any player interaction.

#### Scenario: Bar starts full on new round
- **WHEN** a new round begins
- **THEN** the progress bar SHALL be visible and at 100% width

#### Scenario: Bar drains to zero and reveals choices
- **WHEN** 3 seconds have elapsed since the round started
- **THEN** the progress bar SHALL be empty AND the three answer-choice buttons SHALL become visible

#### Scenario: Timer resets on next round
- **WHEN** the player advances to the next round before the previous timer fired
- **THEN** any pending auto-reveal SHALL be cancelled AND the bar SHALL restart at 100% for the new round
