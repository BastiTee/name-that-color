# name-that-color

A browser game where you identify CSS named colors. A colored swatch is shown — pick its CSS name from three choices, then see the hex and RGB values revealed.

## Development

```bash
npm install
npm run dev        # starts dev server at http://localhost:5173
```

## Build

```bash
npm run build      # outputs optimized bundle to dist/
npm run preview    # serves dist/ locally for verification
```

## Lint

```bash
npm run lint
```

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys to GitHub Pages automatically on every push to `main`.

**One-time setup** (do this once in the repository settings):

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will build and deploy automatically

The deployed game will be available at `https://<your-username>.github.io/name-that-color/`.
