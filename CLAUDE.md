# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

This is a static web app with no build step. Open `index.html` directly in a browser or serve it with any static file server:

```
npx serve .
# or
python3 -m http.server
```

## Architecture

The app is a single-page CSS color guessing game with three files:

- **`colors.js`** — declares the global `COLORS` array: all 148 W3C CSS Color Level 4 named colors, each with `name`, `hex`, `r`, `g`, `b`.
- **`game.js`** — IIFE that drives the game loop. Reads `COLORS`, picks a target color and two distractors, renders them as buttons, and reveals the correct answer on click. State: `currentColor`, `lastColor`, `answered`.
- **`style.css`** — dark-theme styling using CSS custom properties (`--bg`, `--surface`, `--accent`, `--correct`, `--incorrect`, etc.).

`colors.js` must load before `game.js` (script order in `index.html`).

## OpenSpec workflow

This project uses the OpenSpec change management workflow under `openspec/`. Use the `/opsx:*` commands to propose, implement, and archive changes.
