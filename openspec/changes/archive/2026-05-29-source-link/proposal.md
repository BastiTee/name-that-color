## Why

The app has no link back to its source repository, making it hard for curious users to find the code. A subtle footer link fixes that with minimal visual noise.

## What Changes

- Add a small "Source Code" anchor link in the footer pointing to `https://github.com/BastiTee/name-that-color`
- Style it to be unobtrusive — muted colour, small font, no underline by default

## Capabilities

### New Capabilities

### Modified Capabilities

## Impact

- `index.html`: add `<a>` element in `<footer>`
- `src/style.css`: style the link (muted, small, subtle hover)
