## Why

The game currently ships as raw HTML/CSS/JS files with no tooling, which makes it hard to catch errors early, enforce code style, or produce an optimized build. Adding a proper dev stack removes this friction and enables one-command deployment to GitHub Pages.

## What Changes

- **BREAKING** (file layout): Source files move under `src/`; `index.html` and JS/CSS are imported via ES modules instead of plain `<script>` tags
- Introduce **Vite** as the dev server and bundler — provides HMR in dev, optimized minified output in `dist/` for production
- Introduce **ESLint** (with a sensible flat-config preset) for static analysis and consistent code style
- Add **npm scripts**: `dev`, `build`, `preview`, `lint`
- Add **GitHub Actions workflow** that runs `npm run build` and deploys `dist/` to the `gh-pages` branch on every push to `main`
- Update `.gitignore` to exclude `node_modules/` and `dist/`
- Update `README.md` with setup and deployment instructions

## Capabilities

### New Capabilities

- `build-pipeline`: Vite-based build that takes `src/` source files and produces an optimized `dist/` bundle ready for static hosting
- `gh-pages-deploy`: GitHub Actions workflow that automatically builds and publishes to GitHub Pages on push to `main`

### Modified Capabilities

_(none — game behavior is unchanged; only the delivery mechanism changes)_

## Impact

- `index.html`, `game.js`, `colors.js`, `style.css` are moved/refactored to use ES module imports
- New files: `package.json`, `vite.config.js`, `eslint.config.js`, `.github/workflows/deploy.yml`
- `node_modules/` and `dist/` added to `.gitignore`
- No runtime behavior changes — the game plays identically after the migration
