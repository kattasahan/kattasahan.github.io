# Architecture

## Repository layout

```text
apps/
  home/
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
- `packages/config` provides shared configuration utilities.
- `packages/routes` owns the framework-agnostic public route contract.
- `packages/tokens`, `packages/ui`, `packages/content`, and `packages/icons` provide the shared foundation as the project grows.
- The GitHub Pages workflow builds Home, Workspace, and Notes into one `.pages/` artifact and deploys it with the official Pages artifact actions.
- Journal, Editorial, and Calm keep their public paths reserved with generated redirects until their applications are implemented.

## Routing strategy

`packages/routes` (`@portfolio/routes`) owns the public route contract. Its Node-loadable `src/config.js` entrypoint holds public URLs and base-path resolution for Vite configuration, while `src/index.ts` exposes the framework-agnostic TypeScript runtime API, nested Workspace and Notes route groups, matching, and app-scoped helpers.

Application runtime code imports from `@portfolio/routes`; Vite configuration and Node build tooling import from the Node-loadable `@portfolio/routes/config` entrypoint. The public contract names Home as the root application and includes the Engineering Journal article route for “Building Home.”

Each app builds for the base path matching its public route. Home uses `/`; portfolio perspectives use their route names, such as `/workspace/`; the separate Engineering Journal uses `/notes/`. Vite configurations use the shared route resolver, so the same builds can be hosted at the domain root or beneath a GitHub Pages repository path.

Home has one product responsibility: introduce the four portfolio perspectives. Its composition prioritizes the Sahan Katta identity, the portfolio statement, “Choose your perspective,” and then the four promise-led chapter links. The Engineering Journal is one visually secondary link after those chapters.

Notes uses a React Router browser-history route tree for its index and articles. GitHub Pages deployment must provide a static fallback for direct URLs below `/notes/`.

Workspace is the reference shell for future experience apps. It combines the shared route contract with a React Router route tree, a theme-aware application frame, reusable page/section layout components, and loading and not-found states. Its router basename and route patterns are derived from the shared route contract.

Home, Notes, and Workspace use browser-history routing. The Pages artifact includes a root `404.html` fallback that derives Workspace and Notes deep-link handoffs from the shared route contract; a shared helper restores the requested browser route before React Router initializes.

## Deployment

`.github/workflows/deploy-pages.yml` publishes on pushes to `main` and manual runs. It installs frozen pnpm dependencies, invokes `pnpm build:pages`, uploads the `.pages/` directory, and deploys through the `github-pages` environment. The user-site deployment sets `VITE_SITE_BASE=/`, so the portfolio is served from `https://kattasahan.github.io/` without a repository subpath.

Before artifact assembly, the workflow runs `pnpm verify` (`pnpm build`, `pnpm lint`, and `pnpm typecheck`). This keeps the deployment workflow aligned with the repository Definition of Done while retaining frozen-lockfile installation and pnpm caching.

## Boundaries

- Apps own their experience-specific composition and content presentation.
- Packages own reusable, cross-experience concerns.
- Documentation belongs only in `docs/`; public educational articles belong only in `apps/notes/`.
- `docs/CODING_STANDARDS.md` governs component organization, route usage, token usage, accessibility, and code maintainability across every boundary.
