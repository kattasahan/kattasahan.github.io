# Architecture

## Repository layout

```text
apps/
  gateway/
  workspace/
  journal/
  editorial/
  calm/
  notes/
packages/
  config/
  content/
  icons/
  tokens/
  ui/
```

## Build approach

- pnpm workspaces manage the monorepo.
- Each app is a standalone Vite application using React and TypeScript.
- `packages/config` provides shared Vite configuration.
- `packages/tokens`, `packages/ui`, `packages/content`, and `packages/icons` provide the shared foundation as the project grows.
- Every app is statically built. GitHub Pages deployment will be added in Milestone 6.

## Routing strategy

`packages/config/src/routes.ts` is the single source of truth for public URLs. It exports the root, mini-site, Notes, and Notes article routes, along with a resolver that prefixes a configurable site base path.

Each app builds for the base path matching its public route. The gateway uses `/`; the experience apps use their route names, such as `/workspace/` and `/notes/`. Vite configurations use the shared route resolver, so the same builds can be hosted at the domain root or beneath a GitHub Pages repository path.

The Notes app uses static multi-page entries for its index and articles so URLs below `/notes/` can be opened directly without relying on server-side route rewrites.

Workspace is the reference shell for future experience apps. It combines the shared route contract with a React Router route tree, a theme-aware application frame, reusable page/section layout components, and loading and not-found states. Its router basename and route patterns are derived from `@portfolio/config/routes`.

Workspace uses browser-history routing, so the GitHub Pages deployment work must include a static fallback strategy for direct deep links beneath `/workspace/`.

## Boundaries

- Apps own their experience-specific composition and content presentation.
- Packages own reusable, cross-experience concerns.
- Documentation belongs only in `docs/`; public educational articles belong only in `apps/notes/`.
- `docs/CODING_STANDARDS.md` governs component organization, route usage, token usage, accessibility, and code maintainability across every boundary.
