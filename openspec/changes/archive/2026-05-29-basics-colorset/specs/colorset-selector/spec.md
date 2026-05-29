## ADDED Requirements

### Requirement: Colorset selector UI
The app SHALL display a colorset selector `<select>` element in the footer, adjacent to the language selector. The selector SHALL list all available color sets with their localised display names. Changing the selection SHALL immediately switch the active color set, persist the choice to `localStorage` under the key `ntc-colorset`, and start a new round so the game is always consistent with the active set. The selector SHALL update its displayed option labels when the locale changes.

#### Scenario: Selector shows localised colorset names
- **WHEN** the page loads or the locale changes
- **THEN** each option in the colorset selector SHALL display the name of that colorset in the active locale

#### Scenario: Changing colorset starts a new round
- **WHEN** the user selects a different colorset from the selector
- **THEN** the active color set SHALL change AND a new round SHALL start immediately

#### Scenario: Colorset selection persists across page reloads
- **WHEN** the user selects a colorset and then reloads the page
- **THEN** the previously selected colorset SHALL be restored from `localStorage`

#### Scenario: Default colorset is basics
- **WHEN** the page loads and no colorset is stored in `localStorage`
- **THEN** the `basics` colorset SHALL be active
