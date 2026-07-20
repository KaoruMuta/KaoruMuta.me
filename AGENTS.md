# AGENTS.md

## Project Overview
A personal blog built with Next.js, covering travel experiences, study-abroad records, and tech book reviews.

## Tech Stack
- **Framework**: Next.js (Pages Router) + React
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Markdown files with gray-matter frontmatter
- **Testing**: Jest + Testing Library
- **Runtime & package manager**: Node.js + Bun, managed via mise (see `mise.toml` for pinned versions)

## Development Commands
- `bun run dev` - start the dev server (with debugger attached)
- `bun run build` - production build
- `bun run lint` - run ESLint
- `bun run format` - format code with Prettier
- `bun run test` - run Jest tests with coverage

## Project Structure
- `src/pages/` - Next.js pages and API routes
- `src/components/` - reusable React components
- `src/lib/` - utility functions and helpers
- `posts/` - Markdown blog posts organized by year
- `public/posts/` - static assets for blog posts

## Content Management
- Blog posts are managed as Markdown files with frontmatter metadata
- Images are stored under `public/posts/`, organized by year
- Categories are managed via frontmatter tags

## Development Guidelines
- Follow the existing TypeScript and ESLint configuration
- Use Tailwind CSS for styling, and prefer existing utility classes
- Add or update Jest tests when adding features or changing behavior
- Preserve existing responsive design patterns
- Follow Next.js best practices for SEO and performance
- Don't revert existing user changes without being asked

## Commit & Push Rules
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>[(scope)]: <subject>`
  - Common types: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`
  - Write the subject in English (e.g. `fix: resolve incorrect OGP image path`)
  - For breaking changes, use `type!:` or add `BREAKING CHANGE:` in the body
- PR titles and descriptions are also written in English
- Push behavior
  - Pushing to feature branches can be done without confirmation
  - Always confirm with the user before pushing directly to `main` or force-pushing (`--force` / `--force-with-lease`)
