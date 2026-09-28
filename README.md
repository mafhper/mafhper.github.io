# mafhper.github.io

Portfolio site for Matheus Pereira, built with React, Vite, TypeScript, Tailwind CSS v4, and i18next.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- i18next

## Development

Requires Node 24 (see `.nvmrc`) and npm 11.

```powershell
npm install
npm run dev
```

Preview the production build:

```powershell
npm run build
npm run preview
```

The preview server runs on `http://localhost:4300`.

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
- `stats.html` is kept for bundle inspection and optimization passes.
