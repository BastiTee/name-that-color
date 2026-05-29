## ADDED Requirements

### Requirement: Page declares dark color scheme
The page SHALL declare `color-scheme: dark` so that the browser treats it as a dark-themed document and does not apply automatic forced-color adjustments.

#### Scenario: CSS color-scheme declaration present
- **WHEN** the browser parses `src/style.css`
- **THEN** the `:root` block SHALL contain `color-scheme: dark`

#### Scenario: Meta color-scheme tag present
- **WHEN** the browser parses `index.html`
- **THEN** a `<meta name="color-scheme" content="dark">` tag SHALL be present in `<head>`

#### Scenario: iOS Safari dark mode does not override swatch colors
- **WHEN** the page is viewed on iOS Safari with system dark mode enabled
- **THEN** color swatch background colors SHALL match the declared CSS `background-color` value exactly, with no browser-applied color filter
