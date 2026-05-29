## MODIFIED Requirements

### Requirement: Color metadata reveal
After the player selects an answer (correct or incorrect), the game SHALL display additional information about the color. The revealed metadata SHALL include: the localized color display name, the hexadecimal color value, and the RGB component values. A similar colors panel SHALL also appear directly below the metadata box, showing the two most perceptually similar colors flanking the current color.

#### Scenario: Metadata appears after answer
- **WHEN** the player selects any answer choice
- **THEN** a metadata panel SHALL become visible showing the color's localized display name, hex value (e.g., `#FF6347`), and RGB values (e.g., `rgb(255, 99, 71)`)

#### Scenario: Similar colors panel appears after answer
- **WHEN** the player selects any answer choice
- **THEN** the similar colors panel SHALL become visible directly below the metadata panel

### Requirement: Next round button placement
The "Next Color" button SHALL appear above the metadata info panel, not below the similar colors panel. This ensures the button remains visible and accessible without scrolling after both post-answer panels are shown.

#### Scenario: Next button above info panel
- **WHEN** the player has selected an answer and both the metadata panel and similar colors panel are visible
- **THEN** the "Next Color" button SHALL appear above the metadata panel in the visual stacking order

#### Scenario: Metadata hidden before answer
- **WHEN** a new round starts and no answer has been selected
- **THEN** the metadata panel SHALL NOT be visible

#### Scenario: Metadata name updates on locale switch
- **WHEN** the user switches locale after an answer has been revealed
- **THEN** the color name in the metadata panel SHALL re-render in the new locale
