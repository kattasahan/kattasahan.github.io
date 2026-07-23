# Sahan Katta Portfolio

## Goal

Build a premium, static portfolio composed of Home and four distinct portfolio perspectives: Workspace, Journal, Editorial, and Calm. Notes is the separate Engineering Journal.

Home is an editorial entry point, not a fifth portfolio experience or a full portfolio page. It introduces the four perspectives, then offers one visually secondary path to the Engineering Journal.

## Home perspective copy

- Workspace — See how I build.
- Journal — Read the story.
- Editorial — Notice the details.
- Calm — Slow down.

Each perspective uses the same concise “Enter” CTA. The promise leads the decision; the title identifies the perspective.

## Routes

- `/` — Home entry point
- `/workspace` — product-minded experience
- `/journal` — storytelling experience
- `/editorial` — typography-first experience
- `/calm` — quiet immersive experience
- `/notes` — Engineering Journal and learning resource

## Product principles

- Static-only; no backend.
- Deploy freely to GitHub Pages.
- Use React, TypeScript, Vite, and pnpm workspaces.
- Share one design system while giving each experience its own character.
- Keep global theme behavior in `@portfolio/theme` so every implemented experience reads and writes one persisted preference.
- Keep shared packages limited to active, owned concerns; do not retain empty workspace placeholders.
- Keep the visual language monochrome-first, with typography, whitespace, and subtle motion doing the work.
- Exclude Concept 4 from the portfolio.

## Notes application

`apps/notes` is the public Engineering Journal, not a portfolio perspective or project documentation. It publishes polished, article-style explanations of the architectural, design, accessibility, routing, motion, and deployment decisions behind this portfolio.

## Documentation policy

The files in `docs/` are the project's single source of truth. Before each milestone, read every document in this directory and follow the recorded decisions.

`CODING_STANDARDS.md` is the repository rulebook for implementation structure, routes, design-token usage, accessibility, and maintainability.

## Definition of Done

Follow the Definition of Done in `docs/CODING_STANDARDS.md` before committing work. It defines the required architecture, quality, dependency, verification, documentation, UX, and commit checks for this repository.

## Deployment workflow

During active development, GitHub Pages deployment is manual and review-driven: push freely, review the change, then start the **Deploy GitHub Pages** workflow from GitHub Actions when the site should be published. Automatic deployment on pushes to `main` is reserved for a future production mode.

## Theme system

`@portfolio/theme` owns the global light/dark preference for the portfolio. Before React mounts, each implemented application applies the stored preference, or the system preference on a first visit, to `html[data-theme]`. The manager persists the resolved preference, updates browser `theme-color`, and keeps the same theme when visitors move between independently built applications. `@portfolio/ui` consumes that state only to present token-backed controls and surfaces.

## Local workflow

- **Development:** `pnpm dev` starts the Development Orchestrator: one Vite-powered localhost origin for every routed app, with Fast Refresh and no production build. It discovers app workspaces and route prefixes from the repository and shared route contract, using port 5173 when available and selecting the next available port otherwise.
- **Preview:** `pnpm preview` builds the aggregate GitHub Pages artifact, then serves it locally with the same static fallback behavior used in production.
- **Production:** GitHub Actions runs verification and publishes that same aggregate artifact to GitHub Pages only when manually dispatched during active development.
