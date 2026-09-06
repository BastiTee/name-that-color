# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # Vite dev server at http://localhost:5173
npm run build      # build to dist/
npm run preview    # serve dist/ locally
npm run lint        # eslint src
```

There is no test suite. `playwright` is a devDependency but no spec files or config currently exist.

## Architecture

Single-page color-guessing game built with Vite (no framework). Entry point is `index.html`, which loads `./src/style.css` and `./src/game.js` (`type="module"`).

- **`src/colors.js`** — registers available colorsets (`COLORSETS`) and tracks the active one, persisted to `localStorage` (`ntc-colorset`). `getActiveColorset()` / `setActiveColorset(id)` are the module's public surface.
- **`src/colorsets/*.js`** — one file per colorset (`basics.js`, `css-named-colors.js`). Each exports `id`, `label` (`{en, de}`), `colors` (array of `{name, label, hex, r, g, b}`), and `translations` (`{en: {...}, de: {...}}` mapping color `name` → localized label). `css-named-colors.js` holds all 148 W3C CSS Color Level 4 named colors; `basics.js` is a small curated set with German-language `name` keys. Adding a colorset means adding a new file here and registering it in `colors.js`'s `COLORSETS` array.
- **`src/i18n.js`** — UI-string translations (`t(key)`, keys like `ui.title`) and color-name translations (`tColor(name)`, delegates to the active colorset's `translations`). Locale is persisted to `localStorage` (`ntc-locale`, default `de`) and changing it dispatches a `localechange` DOM event that `game.js` listens for to re-render in place.
- **`src/game.js`** — drives the game loop: picks a target color + two distractors from the active colorset, renders the three choice buttons, reveals the answer on click (or after the 3s auto-reveal timer), and tracks/persists a streak and high score (`localStorage`, `ntc-highscore`). Also computes the two nearest-neighbor colors for the post-answer "similar colors" panel by converting sRGB → CIE Lab and ranking by ΔE (`rgbToLab`/`findNeighbors`), splitting the two nearest by hue so one renders left and one right of the target swatch.
- **`src/style.css`** — dark-theme styling via CSS custom properties (`--bg`, `--surface`, `--accent`, `--correct`, `--incorrect`, etc.).

State in `game.js` is module-level (`currentColor`, `lastColor`, `answered`, `currentChoices`, `currentNeighbors`, `streak`) — there's no framework or store.

## Deployment

`.github/workflows/deploy.yml` builds with `npm run build` and deploys `dist/` to GitHub Pages on every push to `main`, via GitHub Actions (Pages must be set to "GitHub Actions" as the source, done once in repo settings).

## OpenSpec workflow

This project uses the OpenSpec change management workflow under `openspec/`. Use the `/opsx:*` commands to propose, implement, and archive changes. Existing specs (`openspec/specs/`) cover: `color-quiz`, `colorset-module`, `colorset-selector`, `similar-colors`, `highscore-streak`, `auto-reveal-timer`, `i18n`, `responsive-layout`, `ios-color-scheme`, `source-link`, `build-pipeline`, `gh-pages-deploy`.
