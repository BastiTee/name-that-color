## ADDED Requirements

### Requirement: Viewport scales correctly on mobile
The app SHALL include a viewport meta tag so that mobile browsers render at device width without artificial scaling.

#### Scenario: Mobile browser renders at device width
- **WHEN** a user opens the app on a mobile browser
- **THEN** the page SHALL render at the device's native pixel width without shrinking content

### Requirement: Layout adapts to screen width
The layout SHALL switch from a stacked single-column arrangement on narrow screens to a wider multi-column arrangement on screens ≥600px wide.

#### Scenario: Narrow viewport single-column layout
- **WHEN** the viewport width is less than 600px
- **THEN** the three color option buttons SHALL be stacked vertically in a single column

#### Scenario: Wide viewport horizontal layout
- **WHEN** the viewport width is 600px or wider
- **THEN** the three color option buttons SHALL be arranged horizontally in a row

### Requirement: Buttons meet minimum tap-target size
Color option buttons SHALL have a minimum height of 44px to comply with accessibility tap-target guidelines.

#### Scenario: Button tap target on mobile
- **WHEN** the app is displayed on a screen narrower than 600px
- **THEN** each color button SHALL have a computed height of at least 44px

### Requirement: Typography remains legible on small screens
All text (color name prompt, button labels, score display) SHALL remain readable at viewport widths down to 320px.

#### Scenario: Color name prompt fits on narrow screen
- **WHEN** the viewport width is 320px
- **THEN** the color name prompt text SHALL not overflow or be clipped

#### Scenario: Long color names wrap in buttons
- **WHEN** a color name such as "lightgoldenrodyellow" is displayed in a button on a narrow screen
- **THEN** the label text SHALL wrap or reduce in size rather than overflow the button boundary
