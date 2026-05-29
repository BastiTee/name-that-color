## ADDED Requirements

### Requirement: Source code link in footer
The app SHALL display a subtle "Source Code" anchor link in the footer, below the language and colorset selectors, pointing to the project's GitHub repository. The link SHALL open in a new tab and be styled to be visually unobtrusive (muted colour, small font size).

#### Scenario: Link is present and correct
- **WHEN** the page loads
- **THEN** a link with text "Source Code" pointing to `https://github.com/BastiTee/name-that-color` SHALL be visible in the footer
