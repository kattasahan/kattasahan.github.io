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
  routes/
  tokens/
  ui/
```

## Build approach

- pnpm workspaces manage the monorepo.
- Each app is a standalone Vite application using React and TypeScript.
- `packages/config` provides shared Vite configuration and a temporary route-export compatibility bridge.
- `packages/routes` owns the framework-agnostic public route contract.
- `packages/tokens`, `packages/ui`, `packages/content`, and `packages/icons` provide the shared foundation as the project grows.
- Every app is statically built. GitHub Pages deployment will be added in Milestone 6.

## Routing strategy

`packages/routes/src/index.ts` (`@portfolio/routes`) is the single source of truth for public URLs. It exports root and mini-site route constants, nested Workspace and Notes route groups, app-scoped route helpers, and a resolver that prefixes a configurable site base path. The route utilities are independent of React, Vite, and any other framework.

`@portfolio/config/routes` temporarily re-exports `@portfolio/routes` so existing app imports continue to work while the route-package extraction remains separate from app-routing changes. New code imports from `@portfolio/routes`.

Each app builds for the base path matching its public route. The gateway uses `/`; the experience apps use their route names, such as `/workspace/` and `/notes/`. Vite configurations use the shared route resolver, so the same builds can be hosted at the domain root or beneath a GitHub Pages repository path.

Notes uses a React Router browser-history route tree for its index and articles. GitHub Pages deployment must provide a static fallback for direct URLs below `/notes/`.

Workspace is the reference shell for future experience apps. It combines the shared route contract with a React Router route tree, a theme-aware application frame, reusable page/section layout components, and loading and not-found states. Its router basename and route patterns are derived from the shared route contract.

Gateway, Notes, and Workspace use browser-history routing, so the GitHub Pages deployment work must include a static fallback strategy for direct deep links beneath their route bases.

## Boundaries

- Apps own their experience-specific composition and content presentation.
- Packages own reusable, cross-experience concerns.
- Documentation belongs only in `docs/`; public educational articles belong only in `apps/notes/`.
- `docs/CODING_STANDARDS.md` governs component organization, route usage, token usage, accessibility, and code maintainability across every boundary.
