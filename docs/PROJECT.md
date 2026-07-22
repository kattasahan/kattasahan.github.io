# Sahan Katta Portfolio

## Goal

Build a premium, static portfolio composed of Home and four distinct portfolio perspectives: Workspace, Journal, Editorial, and Calm. Notes is the separate Engineering Journal.

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
