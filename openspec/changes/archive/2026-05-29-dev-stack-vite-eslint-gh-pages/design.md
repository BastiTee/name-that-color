## Context

The game is currently a zero-dependency, zero-build plain HTML/CSS/JS project. It works, but there is no linting, no bundling, no minification, and no automated deployment path. Any contributor has to manually upload files or rely on GitHub's raw file serving, which does not support a proper `gh-pages` branch deployment with an optimized build.

## Goals / Non-Goals

**Goals:**
- Add Vite as the local dev server (HMR) and production bundler (`dist/`)
- Add ESLint with a modern flat config to catch errors and enforce style
- Provide `npm run dev`, `build`, `preview`, `lint` scripts
- Add a GitHub Actions workflow that builds on push to `main` and deploys `dist/` to GitHub Pages
- Keep the migration transparent — game behavior is 100% unchanged

**Non-Goals:**
- Introducing a JS framework (React, Vue, Svelte) — vanilla JS is fine
- Adding TypeScript — out of scope for this change
- Adding unit/integration tests — separate concern
- Enforcing strict no-warnings ESLint policy from day one — warnings are fine initially

## Decisions

### Vite over Parcel, Webpack, or esbuild directly

**Decision**: Use Vite.

**Rationale**: Vite has the best DX for plain HTML+JS projects with near-zero config. `vite.config.js` for this project will be under 10 lines. Parcel is equally zero-config but its caching has historically caused surprises; Webpack requires substantial configuration; raw esbuild lacks a dev server out of the box.

**Alternative considered**: Parcel — rejected because Vite has become the clear community default for new projects and has better GitHub Pages integration examples.

### Source layout: `src/` subdirectory

**Decision**: Move `game.js`, `colors.js`, and `style.css` into `src/`. Keep `index.html` at the project root (Vite's default entry point).

**Rationale**: Vite discovers `index.html` at the root and follows its `<script type="module">` imports into `src/`. This is the canonical Vite vanilla-JS project layout. It avoids a nested `src/index.html` which would require extra base-path config.

**Alternative considered**: Keep all files flat at root — works but mixes source with config files, making the root messy as the project grows.

### ES modules for `colors.js` and `game.js`

**Decision**: Convert `colors.js` to export `COLORS` with `export const COLORS = [...]` and `game.js` to import it with `import { COLORS } from './colors.js'`. Remove the global `COLORS` reference from `game.js`.

**Rationale**: Vite requires ES module syntax to tree-shake and bundle correctly. The IIFE in `game.js` can be replaced by a top-level module scope (each JS module is already its own scope).

### ESLint flat config (`eslint.config.js`)

**Decision**: Use ESLint v9 flat config with `@eslint/js` recommended rules and `globals` for browser environment.

**Rationale**: ESLint v9 flat config is the current standard; the legacy `.eslintrc` format is deprecated. Config is minimal — no framework-specific plugins needed.

### GitHub Actions for deployment

**Decision**: Use the official `actions/deploy-pages` + `actions/upload-pages-artifact` action pair with `actions/configure-pages`.

**Rationale**: This is the GitHub-recommended approach for deploying static sites. It avoids third-party actions (e.g., `peaceiris/actions-gh-pages`) and uses the native GitHub Pages environment protection.

**Workflow trigger**: Push to `main` only (no PR deploys).

## Risks / Trade-offs

- **Risk**: `COLORS` was a global variable; converting to ES module import could break if any future inline script still references the global.  
  → **Mitigation**: The entire JS surface is two files under our control; the conversion is straightforward and verified by running the build.

- **Risk**: Vite adds a `node_modules/` directory (~50 MB) that must not be committed.  
  → **Mitigation**: Update `.gitignore` as part of this change.

- **Risk**: GitHub Pages base path — if the repo is served at `/<repo-name>/` rather than `/`, asset paths may break.  
  → **Mitigation**: Set `base` in `vite.config.js` to `'./'` (relative paths) or the repo name. Document in README.

- **Risk**: The GitHub Actions workflow requires Pages to be enabled in repo settings.  
  → **Mitigation**: Document the one-time setup step in README.
