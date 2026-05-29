## ADDED Requirements

### Requirement: Similar colors computation
The system SHALL find the two most perceptually similar colors to the current round's color from the full CSS named color palette, excluding exact hex duplicates and the current color itself. Similarity SHALL be measured using Euclidean distance in CIE Lab color space (D65 illuminant). The result SHALL be two neighbors: a left neighbor (lower LCH hue angle) and a right neighbor (higher LCH hue angle). If both closest colors fall on the same hue side, the second-closest by Lab distance SHALL fill the opposite side.

#### Scenario: Neighbors are most similar by Lab distance
- **WHEN** an answer is revealed for a given color
- **THEN** the two neighbors displayed SHALL have a smaller CIE Lab ΔE to the current color than any other color in the palette (excluding hex duplicates)

#### Scenario: Left neighbor has lower hue angle
- **WHEN** the two neighbors have different LCH hue angles relative to the current color
- **THEN** the neighbor with the lower hue angle SHALL appear on the left

#### Scenario: Hex duplicates excluded
- **WHEN** computing neighbors for a color
- **THEN** any palette color with an identical hex value to the current color SHALL be excluded from consideration

### Requirement: Similar colors panel display
After the player selects an answer, the app SHALL display a panel below the metadata info box containing three equal-width cells: left neighbor, current color (center), right neighbor. Each cell SHALL show a color swatch and the localized color name. The center cell SHALL be visually distinguished from the neighbor cells. The panel SHALL be hidden before an answer is selected and cleared on the next round.

#### Scenario: Panel appears after answer
- **WHEN** the player selects any answer choice
- **THEN** the similar colors panel SHALL become visible below the info panel

#### Scenario: Panel hidden before answer
- **WHEN** a new round starts and no answer has been selected
- **THEN** the similar colors panel SHALL NOT be visible

#### Scenario: Center cell shows current color
- **WHEN** the similar colors panel is visible
- **THEN** the center cell SHALL display the current round's color swatch and its localized name

#### Scenario: Names update on locale switch
- **WHEN** the user switches locale while the similar colors panel is visible
- **THEN** all three color names in the panel SHALL re-render in the new locale
