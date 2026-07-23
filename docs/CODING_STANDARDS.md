# Coding Standards

## Purpose

This is the implementation rulebook for the repository. Follow it alongside every document in `docs/` before changing code.

## Component structure

- Put each public UI component in its own folder and primary file.
- Keep related types, tests, and component-local helpers beside that component when they are not shared elsewhere.
- Put helpers used by more than one component in a focused `lib/` module.
- Keep public package exports in a small, deliberate barrel file.
- Prefer small, composable components over large components with unrelated responsibilities.

## Routes

- Never hardcode public route strings in application code.
- Use `@portfolio/routes` for application runtime route constants and resolution. Vite configuration must use the Node-loadable `@portfolio/routes/config` entrypoint.
- Use the shared route resolver for both internal links and app build-base configuration.
- Keep route utilities framework-agnostic and pass deployment base paths explicitly.

## Design system

- Use `@portfolio/tokens` for colors, typography, spacing, radii, shadows, motion, z-index values, and breakpoints.
- Do not introduce one-off design values when an existing token expresses the same intent.
- Use `@portfolio/ui` for shared interaction and accessibility primitives before creating a duplicate implementation.
- Keep any experience-specific styling within its app while preserving the shared token contract.

## Readability and organization

- Keep imports readable: external modules first, then workspace packages, then local modules.
- Use clear names that communicate purpose rather than implementation detail.
- Keep folders shallow and predictable; avoid catch-all files that accumulate unrelated code.
- Keep files small enough to review comfortably. Split a file when it starts owning more than one clear responsibility.
- Prefer explicit composition and data flow over hidden coupling or unnecessary abstraction.

## Accessibility and quality

- Start with semantic HTML and correct document structure.
- Make keyboard interaction, visible focus, meaningful labels, and sufficient contrast default behavior.
- Respect `prefers-reduced-motion`; motion must clarify state, not distract from content.
- Build responsive layouts from content relationships, not only device-specific snapshots.
- Preserve public APIs and behavior during refactors unless a documented change requires otherwise.

# Definition of Done

A task is not complete until every applicable item below is satisfied.

## Architecture

- [ ] Follows the project architecture.
- [ ] Follows `PROJECT.md`.
- [ ] Follows `ARCHITECTURE.md`.
- [ ] Follows `CODING_STANDARDS.md`.

## Code Quality

- [ ] Components are modular.
- [ ] Each component has one responsibility.
- [ ] No logic is duplicated without a documented reason.
- [ ] The folder structure is readable.
- [ ] Shared code belongs in `packages/`.

## Dependencies

Whenever any `package.json` changes:

- [ ] Run `pnpm install`.
- [ ] Update `pnpm-lock.yaml`.
- [ ] Commit `pnpm-lock.yaml`.

GitHub CI uses `pnpm install --frozen-lockfile`. The lockfile is part of the source of truth. Never commit a `package.json` change without a synchronized `pnpm-lock.yaml`.

## Verification

Before every commit run:

- [ ] `pnpm build`
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`

`pnpm verify` runs these required checks in that order. Never commit code that does not pass.

## Documentation

When implementation changes, update as applicable:

- [ ] `PROJECT.md`
- [ ] `ARCHITECTURE.md`
- [ ] `ROADMAP.md`
- [ ] `DEVLOG.md`
- [ ] `DECISIONS.md`

Documentation is part of the implementation.

## UX

Every UI milestone satisfies:

- [ ] Responsive behavior
- [ ] Accessibility
- [ ] Light mode
- [ ] Dark mode
- [ ] Keyboard navigation
- [ ] Reduced motion
- [ ] Shared tokens
- [ ] Shared routes
- [ ] Shared UI

## Commits

Commits are focused, meaningful, small, and atomic. Never mix unrelated work.
