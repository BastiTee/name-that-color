## ADDED Requirements

### Requirement: Translation registry
The system SHALL maintain a translations registry keyed by locale code (e.g., `"en"`, `"de"`). Each locale entry SHALL contain a `ui` map of static UI strings and a `colors` map of color display names keyed by CSS color name identifier. Adding a new language SHALL require only adding a new top-level entry to this registry.

#### Scenario: Retrieve UI string in active locale
- **WHEN** `t("ui.next")` is called with locale set to `"de"`
- **THEN** the German equivalent of the "Next" label SHALL be returned

#### Scenario: Retrieve color name in active locale
- **WHEN** `t("colors.aliceblue")` is called with locale set to `"de"`
- **THEN** the German name for Alice Blue SHALL be returned

#### Scenario: Fallback to English for missing translation
- **WHEN** a translation key is missing in the active locale
- **THEN** the English (`"en"`) value SHALL be returned instead

### Requirement: Locale state management
The system SHALL expose `getLocale()` and `setLocale(code)` functions. `setLocale` SHALL persist the chosen locale to `localStorage` under the key `"ntc-locale"` and SHALL dispatch a `localechange` CustomEvent on `document`.

#### Scenario: Locale persists across page reloads
- **WHEN** the user selects `"de"` and reloads the page
- **THEN** `getLocale()` SHALL return `"de"` on the next load

#### Scenario: Locale change triggers re-render event
- **WHEN** `setLocale("de")` is called
- **THEN** a `localechange` event SHALL be dispatched on `document`

### Requirement: Language switcher UI
The app SHALL display a `<select>` element populated from the available locale codes. Changing the selection SHALL call `setLocale` with the chosen code, which triggers a re-render of all user-visible strings without restarting the current round.

#### Scenario: Switcher lists all available locales
- **WHEN** the language switcher is rendered
- **THEN** it SHALL contain one `<option>` per locale defined in the translations registry

#### Scenario: Game state preserved on locale switch
- **WHEN** the user switches locale mid-round (before answering)
- **THEN** the same color challenge SHALL remain active, with choice button labels re-rendered in the new locale

#### Scenario: Answered round preserved on locale switch
- **WHEN** the user switches locale after answering
- **THEN** the answer feedback and info panel SHALL remain visible, translated to the new locale
