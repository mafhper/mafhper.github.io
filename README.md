# mafhper.github.io

Portfolio site for Matheus Pereira, built with React, Vite, TypeScript, Tailwind CSS v4, and i18next.

## Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- i18next

## Development

Preferred package manager: Bun.

```powershell
bun install
bun run dev
```

Preview the production build:

```powershell
bun run build
bun run preview
```

The preview server runs on `http://localhost:4300`.

If needed, npm also works:

```powershell
npm install
npm run dev
```

## Available Scripts

- `bun run dev` / `npm run dev`: starts the Vite dev server
- `bun run build` / `npm run build`: type-checks and builds for production
- `bun run preview` / `npm run preview`: serves the production build locally
- `bun run lint` / `npm run lint`: runs ESLint
- `bun run type-check` / `npm run type-check`: runs TypeScript without emitting files
- `bun run format` / `npm run format`: formats the codebase with Prettier

## Project Structure

```text
src/
  components/   UI sections and reusable cards
  data/         project metadata rendered on the page
  hooks/        render and motion helpers
  layouts/      layout shell
  locales/      translations
  styles/       shared theme tokens
public/
  projects/     logos and project assets used by the cards
```

## Notes

- The homepage is localized in Portuguese, English, and Spanish.
- Project cards link to live demos or GitHub repositories.
- `stats.html` is kept for bundle inspection and optimization passes.
