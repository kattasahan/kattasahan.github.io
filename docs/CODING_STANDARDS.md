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
- Use `@portfolio/routes` as the only source of public route constants and route resolution. `@portfolio/config/routes` is a temporary compatibility re-export for existing imports only.
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
