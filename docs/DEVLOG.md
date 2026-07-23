# Development Log

## Working agreement

For every milestone:

1. Read every document in `docs/`, including `CODING_STANDARDS.md`.
2. Implement the milestone according to those documents.
3. Update this log with progress and verification notes.
4. Update `ROADMAP.md` if the plan changes.
5. Record material architecture or design tradeoffs in `DECISIONS.md`.
6. When appropriate, turn the completed milestone into a polished public article in `apps/notes`.
7. Commit the completed change with a meaningful message.

## Completed

### Milestone 1 — Repository foundation

- Created the pnpm workspace declaration, root package manifest, and shared TypeScript base configuration.
- Added minimal root ESLint and Prettier configuration.
- Created workspace manifests for Home, Workspace, Journal, Editorial, Calm, Notes, UI, tokens, content, icons, and shared config.
- No application source code or UI has been created.
- Dependency installation and command verification remain pending because pnpm could not initialize its local tool cache in this environment.

## Progress

### Milestone 3 — Shared design system

- Added the framework-agnostic token foundation in `packages/tokens`.
- Defined light and dark color themes, typography, 8-point spacing, radius, elevation, motion, z-index, and breakpoint tokens.
- Added reusable, accessible React primitives in `packages/ui`: actions, navigation, modal, form, content, and portfolio-specific composition components.
- Components consume shared tokens, support light and dark themes, and avoid a CSS framework or Tailwind dependency.
- Refactored the UI library into one folder per component, with shared styling, focus, navigation, and field helpers in `packages/ui/src/lib`.
- Preserved the public barrel exports and component behavior for consuming apps.

### Milestone 2 — Home

- Built the static Vite and React Home application at `/`.
- Added a responsive, light/dark theme-aware experience selector for Workspace, Journal, Editorial, and Calm.
- Added the public `/notes/` route as the entry point to the future build-journal application.
- Kept the page intentionally concise: it directs visitors into an experience instead of presenting a full portfolio feed.
- Redesigned Home as an editorial entry experience with a strong identity statement and spacious, chapter-like routes.
- Clarified Home as an entry point to four perspectives—Workspace, Journal, Editorial, and Calm—and separated the Engineering Journal into one quiet postscript link to Notes.
- Replaced the card grid and dashboard framing with typography, whitespace, subtle atmosphere, and simple dividing lines.
- Verified the Home build and aggregate GitHub Pages artifact locally.

### Milestone 5 — Public Notes

- Built the public Notes application as a calm, article-style developer journal under `/notes/`.
- Added six polished articles covering intent, Home, design tokens, shared components, static routing and deployment, and lessons learned.
- Created static entry pages for the Notes index and each article, with responsive layouts, light/dark themes, and reduced-motion handling.
- Kept Notes separate from internal documentation: it explains the reasoning behind the portfolio rather than its setup.

## Routing foundation

- Extracted the framework-agnostic public route contract into `@portfolio/routes`.
- Added root and mini-site route constants, nested Workspace and Notes route groups, app-scoped helpers, matching, and configurable GitHub Pages base-path resolution.
- Added the Node-loadable `@portfolio/routes/config` entrypoint for Vite config-time base-path resolution, avoiding direct Node imports of TypeScript source.
- Kept `@portfolio/config` route entries as temporary compatibility re-exports, then migrated application runtime imports to `@portfolio/routes` without changing route behavior.
- Updated Home and Notes links and Vite base configuration to use a configurable site base path.
- Migrated Home and Notes to React Router; Notes now has one route tree for the journal index and all article URLs.
- Added explicit shared route names for each public Notes article and removed the former multi-page Notes entries.

### Milestone 4 — Workspace shell

- Built the Workspace application shell for the overview, work, case-study, about, and contact routes.
- Added app-local route configuration backed by the shared public route matcher, with lightweight loading and 404 placeholders.
- Established a reference layout with shared page container, section layout, navigation, footer, responsive wrapping, and light/dark theme support.
- Deferred all actual Workspace page content.
- Verified the Workspace build as part of the aggregate GitHub Pages artifact.
- Replaced the custom History API router with React Router while preserving the shell, loading placeholder, and 404 placeholder.

## Repository standards

- Added `CODING_STANDARDS.md` as the implementation rulebook for component structure, routes, token usage, readability, accessibility, and maintainability.

## Developer experience

- Added root-level, workspace-filtered development, build, and preview commands for every portfolio app.
- Kept root build and quality commands intact; app workspaces remain the owners of their individual scripts.

## Milestone 6 — Deployment

- Added a GitHub Actions workflow that builds and deploys the aggregate static artifact to GitHub Pages on `main`.
- Added `pnpm build:pages` to compose Home, Workspace, and Notes into `.pages/` with root-hosted Vite bases.
- Added a static fallback and route restoration for direct Workspace and Notes deep links on GitHub Pages.
- Reserved the Journal, Editorial, and Calm paths with generated redirects until those experiences are implemented.
- Validated the aggregate production build and its required Pages route entries locally.

## Home architecture and UX audit

- Audited the Home rename, information architecture, shared routing usage, GitHub Pages fallback, responsive CSS, theme handling, and accessibility semantics.
- Confirmed Home presents exactly four perspectives and one visually secondary Engineering Journal CTA after them.
- Removed the obsolete root-app alias, migrated application imports to `@portfolio/routes`, and renamed the public Engineering Journal article and route to “Building Home.”
- Reworked the Pages assembly script to derive public paths from `@portfolio/routes/config`, including fallback handoffs and reserved-experience redirects.
- Added the shared UI package's missing React type dependency and resolved the audit-discovered `SectionHeader` type conflict and stale imports.
- Verified the completed state with production builds, type checks, source scans, and generated Pages artifact checks.

## Home final product review

- Reviewed Home as the final entry experience for naming, editorial hierarchy, perspective copy, CTA placement, motion, accessibility, routing, and GitHub Pages compatibility.
- Replaced the perspective promises with the canonical product copy and standardized every perspective CTA as “Enter.”
- Kept the Engineering Journal as one secondary link after the four perspective chapters and removed a stale, untracked legacy Notes directory.

## Engineering workflow improvement

- GitHub Pages deployment initially failed because `pnpm-lock.yaml` was not synchronized with workspace dependency manifests.
- The repository now requires lockfile synchronization whenever dependencies change: run `pnpm install`, update and commit `pnpm-lock.yaml`, then rely on CI’s frozen-lockfile install.
- Added a formal Definition of Done to `CODING_STANDARDS.md` and a `pnpm verify` command for the required build, lint, and type-check gates.
- The GitHub Pages workflow now runs the same verification command before it assembles and deploys the static artifact.

## Home visual hierarchy and storytelling refinement

- Refined Home without changing its route architecture or four-perspective information structure.
- Added a concise hero statement and a restrained monochrome geometric focal element so the opening conveys the author, the work, and a reason to explore.
- Removed incidental chapter numbering and differentiated Workspace, Journal, Editorial, and Calm through layout, type treatment, and whitespace rather than cards, color, or decoration.
- Tightened the vertical rhythm, strengthened the destination-specific CTAs, and renamed the separate Engineering Journal heading to “How this portfolio was built.”
- Preserved shared tokens, shared routes, light and dark modes, responsive behavior, visible focus treatment, and reduced-motion support.

## Manual GitHub Pages deployment workflow

- Changed GitHub Pages deployment to manual dispatch during active development.
- Pushes no longer publish automatically, enabling faster iteration, fewer unnecessary Actions runs, lower Actions usage, and review-driven releases.
- Preserved the frozen-lockfile install, pnpm cache, repository verification, Pages configuration, and aggregate static build.
- Documented the commented future production-mode trigger for automatic deployment on pushes to `main`.

## Reference-led Home composition

- Rebuilt the Home presentation around the approved editorial reference while preserving the frozen Home route, shared tokens, shared UI primitives, and light/dark mode behavior.
- Matched the reference structure with an open hero, quiet top bar, atmospheric circle and diagonal line, strapline divider, four ornamented editorial rows, a separate Engineering Journal epilogue, and a minimal footer marker.
- Kept the approved perspective promises and route destinations, while making each destination CTA explicit and visually discoverable.
- Added only gentle opacity and small translate reveal motion, with the existing reduced-motion preference fully respected.

## Home viewport framing and divider refinement

- Made the Home hero and top bar share one full first viewport so the perspective introduction does not appear before the visitor intentionally scrolls.
- Increased the contrast of the existing hero circle and diagonal line without adding a new illustration or changing the monochrome composition.
- Removed the duplicate Calm-to-Journal boundary by making the Engineering Journal's top rule the single intended separator.

## Local composed route development

- Changed the root `pnpm dev` command to build and serve the same aggregate route map used for GitHub Pages.
- Added a small local static server that serves the composed artifact and returns its shared fallback document for direct Notes and Workspace deep links.
- Kept the per-app development commands and the production Pages assembly unchanged; Home can now open `/notes/` locally without switching application servers.
