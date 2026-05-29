## Context

The game is a single-page app with no server. All state lives in JS module scope and `localStorage`. The game loop is in `src/game.js`: `startRound()` sets up a new round, `revealAnswer()` is called when a choice is clicked. There is no existing streak or scoring concept. The header currently shows only the `<h1>` title.

## Goals / Non-Goals

**Goals:**
- Track the current consecutive correct streak in memory (reset to 0 on wrong answer)
- Persist the best-ever streak to `localStorage` (key: `ntc-highscore`)
- Render current streak and high score in the header, updating live after each answer
- Display a meaningful empty state ("—") when no high score is stored yet

**Non-Goals:**
- Server-side or multi-user leaderboards
- Streak history or per-session stats
- Resetting the high score via UI (localStorage can be cleared by the user in devtools)

## Decisions

### Where to display: header vs. in-game area

**Decision**: Header, inline with / below the title.

**Rationale**: High score is a persistent stat, not round-specific feedback. Placing it in the header keeps it always visible without interfering with the game flow (swatch → timer bar → choices → answer). Putting it inside the game area would cause layout shifts each round.

### What to show: streak only vs. streak + high score

**Decision**: Show both — current streak and high score — as two small labeled counters side by side.

**Rationale**: Showing only the high score gives no feedback on in-progress performance. Showing both gives the player a live "am I on track to beat my record?" signal, which increases engagement.

### Empty-state representation

**Decision**: Render "—" (em dash) when `localStorage` has no value.

**Rationale**: A dash is universally understood as "not set". Alternatives like "0" are misleading (a streak of 0 is a real state), and "N/A" is verbose.

### Storage key

**Decision**: `ntc-highscore` — consistent with the existing `ntc-locale` key convention.

## Risks / Trade-offs

- [localStorage unavailable] In private-browsing or restricted environments, `localStorage` may throw. → Wrap read/write in try/catch; fall back to in-memory only (high score still works for the session, just won't persist).
