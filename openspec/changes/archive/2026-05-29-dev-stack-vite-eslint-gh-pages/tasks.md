## 1. Project setup

- [x] 1.1 Create `package.json` with `name`, `type: "module"`, `scripts` (`dev`, `build`, `preview`, `lint`), and dev dependencies (`vite`, `eslint`, `@eslint/js`, `globals`)
- [x] 1.2 Run `npm install` to generate `package-lock.json`
- [x] 1.3 Update `.gitignore` to exclude `node_modules/` and `dist/`

## 2. Vite configuration

- [x] 2.1 Create `vite.config.js` setting `base` to `'./'` for GitHub Pages compatibility (relative asset paths)
- [x] 2.2 Create `src/` directory and move `game.js`, `colors.js`, and `style.css` into it
- [x] 2.3 Update `index.html` to use `<script type="module" src="./src/game.js">` and `<link rel="stylesheet" href="./src/style.css">` (remove the `colors.js` script tag)

## 3. ES module migration

- [x] 3.1 Prefix the `COLORS` array declaration in `src/colors.js` with `export` (`export const COLORS = [...]`)
- [x] 3.2 Add `import { COLORS } from './colors.js';` at the top of `src/game.js` and remove the IIFE wrapper (top-level module scope replaces it)

## 4. ESLint configuration

- [x] 4.1 Create `eslint.config.js` using ESLint v9 flat config: import `@eslint/js` recommended rules and `globals`, set `browser: true` globals, target `src/**/*.js`
- [x] 4.2 Run `npm run lint` and fix any reported errors in `src/`

## 5. GitHub Actions workflow

- [x] 5.1 Create `.github/workflows/deploy.yml` with a workflow triggered on push to `main` that: installs Node, runs `npm ci`, runs `npm run build`, uploads `dist/` as a Pages artifact, and deploys to GitHub Pages using the official actions
- [x] 5.2 Set workflow permissions: `contents: read`, `pages: write`, `id-token: write`

## 6. Verification

- [x] 6.1 Run `npm run dev` — verify the game loads and plays correctly in the browser
- [x] 6.2 Run `npm run build` — verify `dist/` is created with `index.html`, hashed JS, and hashed CSS
- [x] 6.3 Run `npm run preview` — verify the production build plays correctly
- [x] 6.4 Run `npm run lint` — verify it exits 0 with no errors
- [x] 6.5 Update `README.md` with: local dev instructions, build instructions, and the one-time GitHub Pages setup step (Settings → Pages → Source: GitHub Actions)
