### Requirement: Automated GitHub Pages deployment
The repository SHALL include a GitHub Actions workflow that automatically builds the project and deploys the `dist/` output to GitHub Pages on every push to the `main` branch.

#### Scenario: Successful deploy on push to main
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the GitHub Actions workflow SHALL trigger, run `npm run build`, and publish `dist/` to GitHub Pages without manual intervention

#### Scenario: Deployment makes game publicly accessible
- **WHEN** the workflow completes successfully
- **THEN** the game SHALL be accessible at the repository's GitHub Pages URL (e.g., `https://<user>.github.io/<repo>/`)

### Requirement: Workflow uses official GitHub Pages actions
The deployment workflow SHALL use the GitHub-provided actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) rather than third-party deployment actions.

#### Scenario: Workflow uses official actions
- **WHEN** the workflow file is inspected
- **THEN** it SHALL reference `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` for the Pages deployment steps

### Requirement: Vite base path configured for GitHub Pages
The Vite build configuration SHALL set `base` so that all asset paths in `dist/` are correct when the site is served from a GitHub Pages subdirectory (e.g., `/<repo-name>/`).

#### Scenario: Assets load correctly on GitHub Pages
- **WHEN** the deployed `index.html` is loaded from a subdirectory URL
- **THEN** all JS and CSS assets SHALL load without 404 errors
