# Decisions

## ADR-001 — Use a static pnpm monorepo

**Decision:** Use pnpm workspaces with React, TypeScript, and Vite for six independently built static applications.

**Why:** This preserves a clear boundary between experiences while allowing configuration, content, tokens, icons, and UI primitives to be shared.

## ADR-002 — Use route-specific static builds

**Decision:** Each app uses the public route as its Vite base path.

**Why:** GitHub Pages can host the portfolio without a server-side router, while every experience remains independently deployable as static output.

## ADR-003 — Separate internal documentation from public notes

**Decision:** `docs/` is the project's authoritative internal documentation. `apps/notes` is a public educational application.

**Why:** Developers need stable implementation guidance, while visitors need polished explanations of the reasoning and lessons behind the finished portfolio—not setup documentation.

## ADR-004 — Build a shared system without flattening experiences

**Decision:** Share accessible foundations and design tokens, but allow each mini-site to have a distinct editorial and interaction character.

**Why:** Consistency should improve quality and maintainability without making the portfolio feel like one repeated template.

## ADR-005 — Use framework-agnostic semantic design tokens

**Decision:** Keep design tokens in TypeScript as immutable data with semantic names, CSS-compatible values where units are needed, and no component or styling-framework dependency.

**Why:** Every portfolio experience can consume the same accessible visual foundation while remaining free to choose its own implementation details. Light and dark themes share one token shape, and the eight-point spacing scale preserves consistent rhythm across experiences.

## ADR-006 — Keep shared UI components dependency-light and composable

**Decision:** Build `packages/ui` as accessible React components with semantic HTML, token-backed TypeScript style objects, a small theme context, and style/children escape hatches instead of a CSS framework.

**Why:** The portfolio can share reliable interaction and accessibility defaults without coupling every app to Tailwind, a CSS-in-JS runtime, or a fixed page layout. Apps can compose the primitives and add experience-specific styling while retaining one light/dark token foundation.

## ADR-007 — Make the gateway an experience selector

**Decision:** Keep the root route intentionally concise: introduce the four portfolio perspectives, offer direct entry into each one, and link to the public build notes.

**Why:** The gateway should orient visitors without competing with the distinct mini-sites. A lightweight theme toggle and responsive card grid provide a polished first impression while leaving each experience space to establish its own identity.

## ADR-008 — Publish Notes as static editorial pages

**Decision:** Build the public Notes app as a Vite multi-page application, with a static entry for the journal index and every article beneath `/notes/`.

**Why:** Notes are meant to be read, bookmarked, and shared. Static article routes work directly on GitHub Pages without a client-router fallback, while preserving React composition and the shared design system.

## ADR-009 — Organize shared UI by component boundary

**Decision:** Keep each public UI component in its own folder and move cross-cutting implementation details into small `src/lib` helpers, while maintaining one top-level barrel export.

**Why:** Component-level ownership makes the library easier to navigate, test, and extend as more portfolio experiences arrive. The barrel keeps imports stable for apps, so internal maintenance does not create unnecessary migration work.
