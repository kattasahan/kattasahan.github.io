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
- Created workspace manifests for Gateway, Workspace, Journal, Editorial, Calm, Notes, UI, tokens, content, icons, and shared config.
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

### Milestone 2 — Gateway

- Built the static Vite and React gateway application at `/`.
- Added a responsive, light/dark theme-aware experience selector for Workspace, Journal, Editorial, and Calm.
- Added the public `/notes/` route as the entry point to the future build-journal application.
- Kept the page intentionally concise: it directs visitors into an experience instead of presenting a full portfolio feed.
- Redesigned the Gateway as an editorial entry experience: a strong identity statement followed by five spacious, chapter-like routes for Workspace, Journal, Editorial, Calm, and Notes.
- Replaced the card grid and dashboard framing with typography, whitespace, subtle atmosphere, and simple dividing lines.
- Build and type-check verification remain pending because pnpm cannot initialize its local tool cache in this environment.

### Milestone 5 — Public Notes

- Built the public Notes application as a calm, article-style developer journal under `/notes/`.
- Added six polished articles covering intent, the gateway, design tokens, shared components, static routing and deployment, and lessons learned.
- Created static entry pages for the Notes index and each article, with responsive layouts, light/dark themes, and reduced-motion handling.
- Kept Notes separate from internal documentation: it explains the reasoning behind the portfolio rather than its setup.

## Routing foundation

- Added `@portfolio/config/routes` as the framework-agnostic source of truth for all public routes.
- Added the Node-loadable `@portfolio/config/routes-config` entrypoint for Vite config-time base-path resolution, avoiding direct Node imports of TypeScript source.
- Updated Gateway and Notes links and Vite base configuration to use a configurable site base path.
- Migrated Gateway and Notes to React Router; Notes now has one route tree for the journal index and all article URLs.
- Added explicit shared route names for each public Notes article and removed the former multi-page Notes entries.

### Milestone 4 — Workspace shell

- Built the Workspace application shell for the overview, work, case-study, about, and contact routes.
- Added app-local route configuration backed by the shared public route matcher, with lightweight loading and 404 placeholders.
- Established a reference layout with shared page container, section layout, navigation, footer, responsive wrapping, and light/dark theme support.
- Deferred all actual Workspace page content.
- Build and type-check verification remain pending because pnpm cannot initialize its local tool cache in this environment.
- Replaced the custom History API router with React Router while preserving the shell, loading placeholder, and 404 placeholder.

## Repository standards

- Added `CODING_STANDARDS.md` as the implementation rulebook for component structure, routes, token usage, readability, accessibility, and maintainability.

## Developer experience

- Added root-level, workspace-filtered development, build, and preview commands for every portfolio app.
- Kept root build and quality commands intact; app workspaces remain the owners of their individual scripts.

## Current task

Milestones 2, 3, and 5 are complete. Milestone 4 is in progress, beginning with the Workspace shell.
