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
- Keep the visual language monochrome-first, with typography, whitespace, and subtle motion doing the work.
- Exclude Concept 4 from the portfolio.

## Notes application

`apps/notes` is the public Engineering Journal, not a portfolio perspective or project documentation. It publishes polished, article-style explanations of the architectural, design, accessibility, routing, motion, and deployment decisions behind this portfolio.

## Documentation policy

The files in `docs/` are the project's single source of truth. Before each milestone, read every document in this directory and follow the recorded decisions.

`CODING_STANDARDS.md` is the repository rulebook for implementation structure, routes, design-token usage, accessibility, and maintainability.

## Definition of Done

Follow the Definition of Done in `docs/CODING_STANDARDS.md` before committing work. It defines the required architecture, quality, dependency, verification, documentation, UX, and commit checks for this repository.
