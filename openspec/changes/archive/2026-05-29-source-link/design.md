## Context

Static single-page app. The footer already contains the language and colorset selectors. The link just needs to sit alongside or below them, visually subordinate.

## Goals / Non-Goals

**Goals:**
- Visible but unobtrusive "Source Code" link to the GitHub repo

**Non-Goals:**
- Internationalising the link text (it's a proper-noun label that works in any locale)
- Opening in a new tab is fine (`target="_blank"` with `rel="noopener"`)

## Decisions

### Placement: below the selectors row

**Decision**: Put the link on its own line below the switchers, centered.

**Rationale**: Keeps it out of the way of the functional controls. A separate line avoids cramping the selectors on small screens.

## Risks / Trade-offs

None — purely additive HTML/CSS change.
