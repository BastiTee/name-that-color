## Context

The app is a single-page CSS color quiz built with vanilla HTML/CSS/JS. The current `style.css` uses fixed pixel widths and desktop-centric sizing. There is no viewport meta tag, so mobile browsers render the page at a virtual ~980px width and scale it down, making tap targets tiny. The change is purely presentational — no game logic touches, no build pipeline changes.

## Goals / Non-Goals

**Goals:**
- Fluid layout that works from 320px (iPhone SE) to 1440px+ (desktop)
- Thumb-friendly tap targets (≥44px height on buttons)
- Readable typography at all viewport widths
- Fit the game UI above the fold on a typical mobile phone in portrait orientation

**Non-Goals:**
- Landscape-specific tweaks beyond what fluid layout naturally provides
- Dark/light theme toggle (out of scope)
- PWA / installability
- Animations or interaction redesign

## Decisions

### 1. CSS media queries vs. container queries
**Decision**: Use `@media` breakpoints (one breakpoint at ~600px).  
**Rationale**: The game has a single root container; container queries add no benefit here and require modern browser support. A single mobile/desktop breakpoint is sufficient given the simple layout.

### 2. Breakpoint strategy
**Decision**: Mobile-first stylesheet — base styles target small screens, `@media (min-width: 600px)` overrides for larger screens.  
**Rationale**: Easier to progressively enhance than to override a desktop base; aligns with best practice. The current desktop rules become the `min-width: 600px` overrides.

### 3. Button sizing approach
**Decision**: Set `min-height: 44px` and `padding` on `.color-btn` rather than a fixed `height`.  
**Rationale**: Allows multi-line label wrapping for long color names without clipping, while meeting the WCAG 2.5.5 tap-target guideline.

### 4. Color swatch layout
**Decision**: Stack the three option buttons vertically on mobile (flex-direction: column), horizontal on desktop.  
**Rationale**: Three side-by-side swatches become too narrow to read on a 375px screen. Vertical stacking keeps each button readable and easily tappable.

## Risks / Trade-offs

- **Risk**: Refactoring existing CSS could accidentally break desktop layout. → Mitigation: keep all existing desktop rules; the mobile-first rewrite moves them into `@media (min-width: 600px)` blocks with the same values.
- **Risk**: Long color names (e.g., `lightgoldenrodyellow`) may overflow button labels on very narrow screens. → Mitigation: `word-break: break-word` or font-size reduction on mobile for button text.
