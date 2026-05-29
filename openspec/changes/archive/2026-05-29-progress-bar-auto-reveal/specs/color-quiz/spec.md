## MODIFIED Requirements

### Requirement: Multiple-choice name selection
The game SHALL present exactly three answer choices per round. The choices SHALL be hidden at round start. A 3-second animated countdown progress bar SHALL be shown instead of a "Reveal Options" button. When the countdown completes, the three choice buttons SHALL become visible and the progress bar SHALL be hidden. Exactly one choice SHALL be the correct CSS color for the displayed swatch. The remaining two SHALL be distinct, randomly selected colors that are not the correct answer. All choice labels SHALL be rendered through the active color set's locale translation via `tColor()` rather than through `i18n.t('colors.*')`.

#### Scenario: Choices contain the correct answer
- **WHEN** the choices are revealed
- **THEN** exactly one of the three choices SHALL match the display name of the displayed color in the active locale

#### Scenario: Labels update on locale switch
- **WHEN** the user changes locale while a round is active
- **THEN** all three choice button labels SHALL immediately re-render using the color set's translations for the new locale

#### Scenario: Choices revealed after timer
- **WHEN** 3 seconds have elapsed since the round started
- **THEN** the three answer-choice buttons SHALL become visible automatically without any player interaction
