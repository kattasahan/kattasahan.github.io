# Design System

## Status

The framework-agnostic token foundation, global theme package, and shared React component library are implemented in `packages/tokens`, `packages/theme`, and `packages/ui`.

## Principles

- Monochrome-first: use color sparingly and intentionally.
- Typography leads: hierarchy, rhythm, and readable measure should carry the interface.
- Whitespace is a feature, not unused space.
- Motion is subtle, purposeful, and respectful of reduced-motion preferences.
- Accessibility is a default requirement, including semantic structure, keyboard access, contrast, focus treatment, and responsive layouts.

## Ownership

- `packages/tokens` holds reusable visual tokens.
- `packages/theme` owns the selected light/dark mode, persistence, system-preference detection, `html[data-theme]`, browser chrome color, and the React provider/hook. Its bootstrap applies the resolved theme before React mounts to prevent a flash of incorrect color.
- `packages/ui` holds accessible shared React components and consumes theme state for presentation; it does not own theme storage, browser APIs, or theme state.
- Individual apps may express their own personality without breaking shared accessibility or token conventions.

## Inspiration boundary

The portfolio may draw on the clarity, restraint, and reliability associated with Apple design principles. It must not copy Apple layouts or product interfaces.
