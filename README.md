# mafhper.github.io

![Homepage hero carousel cycling through the twelve featured projects](public/hero-carousel.webp)

Portfolio site for Matheus Pereira, built with React, Vite, TypeScript, Tailwind CSS v4, and i18next.

**Live at [mafhper.github.io](https://mafhper.github.io/)**

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- i18next

## Development

Requires Node 24 (see `.nvmrc`) and npm 11.

> The npm version is pinned by the `packageManager` field in `package.json`. Run
> `corepack enable` once and use `corepack npm ...` for installs, so the lockfile is not
> rewritten by a different npm 11 minor version. After `corepack enable`, the plain `npm`
> command already resolves to the pinned version, so the examples below work as they are.

```powershell
npm install
npm run dev
```

Preview the production build:

```powershell
npm run build
npm run preview
```

The preview server runs on `http://localhost:4200` (dev: `http://localhost:5200`). Both ports are named and overridable via `PORT` / `PREVIEW_PORT`.

For a deterministic clean install (what CI runs):

```powershell
npm ci
```

## Available Scripts

- `npm run dev`: starts the Vite dev server
- `npm run build`: type-checks and builds for production
- `npm run preview`: serves the production build locally
- `npm run lint`: runs ESLint
- `npm run type-check`: runs TypeScript without emitting files
- `npm run format`: formats the codebase with Prettier
- `npm run format:check`: verifies formatting without writing changes

## Project Structure

```text
src/
  components/   UI sections and reusable cards
  data/         project metadata rendered on the page
  layouts/      layout shell
  lib/          color and helper utilities
  locales/      translations
  styles/       shared theme tokens
public/
  projects/     logos and project assets used by the cards
```

## Notes

- The homepage is localized in Portuguese, English, and Spanish.
- Project cards link to live demos or GitHub repositories.
- `stats.html` is generated locally by the production build (Rollup visualizer) and is
  gitignored; inspect it after `npm run build` for bundle analysis.
