### Requirement: Local development server
The project SHALL provide a local dev server via `npm run dev` that serves the application with hot module replacement (HMR). The server SHALL start without errors and the game SHALL be fully playable at the served URL.

#### Scenario: Dev server starts
- **WHEN** the developer runs `npm run dev` in the project root
- **THEN** a local HTTP server SHALL start and output a localhost URL to the terminal within 5 seconds

#### Scenario: Game is playable in dev mode
- **WHEN** the developer opens the dev server URL in a browser
- **THEN** the color quiz game SHALL load and function identically to the pre-build version

### Requirement: Production build output
The project SHALL produce an optimized, self-contained static bundle in `dist/` via `npm run build`. The bundle SHALL include minified JS, CSS, and a root `index.html` that references the hashed asset files.

#### Scenario: Build succeeds
- **WHEN** the developer runs `npm run build`
- **THEN** the command SHALL exit 0 and a `dist/` directory SHALL be created containing at minimum `index.html` and at least one `.js` and one `.css` file

#### Scenario: Dist is self-contained
- **WHEN** `dist/index.html` is opened directly in a browser (file:// or static server)
- **THEN** the game SHALL load and function correctly with no network errors

### Requirement: Preview of production build
The project SHALL provide `npm run preview` to serve the `dist/` output locally so developers can verify the production build before deploying.

#### Scenario: Preview serves dist
- **WHEN** the developer runs `npm run build && npm run preview`
- **THEN** a local server SHALL serve `dist/` and the game SHALL be fully playable

### Requirement: Linting
The project SHALL provide `npm run lint` using ESLint with browser globals enabled. Running lint on the source files SHALL exit 0 when no errors are present.

#### Scenario: Clean source passes lint
- **WHEN** the developer runs `npm run lint` on the unmodified source
- **THEN** the command SHALL exit 0 with no errors reported

#### Scenario: Lint catches undefined variables
- **WHEN** a source file references an undeclared variable
- **THEN** `npm run lint` SHALL report an error and exit non-zero

### Requirement: ES module source structure
Source JS files SHALL use ES module syntax (`import`/`export`). `colors.js` SHALL export `COLORS` as a named export. `game.js` SHALL import `COLORS` from `./colors.js` rather than relying on a global variable.

#### Scenario: Colors imported correctly
- **WHEN** Vite bundles the project
- **THEN** `COLORS` SHALL be resolved via the ES module import graph, not as a global, and the bundle SHALL contain all color data
