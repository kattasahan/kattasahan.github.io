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

**Status:** Superseded by ADR-013.

**Original decision:** Build the public Notes app as a Vite multi-page application, with a static entry for the journal index and every article beneath `/notes/`.

**Superseded because:** Notes now uses React Router with explicit shared article routes, aligning it with Gateway and Workspace. GitHub Pages deep-link fallback support moves to the deployment milestone.

## ADR-009 — Organize shared UI by component boundary

**Decision:** Keep each public UI component in its own folder and move cross-cutting implementation details into small `src/lib` helpers, while maintaining one top-level barrel export.

**Why:** Component-level ownership makes the library easier to navigate, test, and extend as more portfolio experiences arrive. The barrel keeps imports stable for apps, so internal maintenance does not create unnecessary migration work.

## ADR-010 — Centralize public route resolution

**Decision:** Define all public routes and base-path resolution in the framework-agnostic `@portfolio/config/routes` module. Apps use the same resolver for internal links and Vite build bases.

**Why:** A configurable site base supports GitHub Pages deployments from either a custom domain root or a repository subpath. One route contract avoids link drift between the gateway, Notes articles, and future mini-sites.

## ADR-011 — Use Workspace as the experience-shell reference

**Decision:** Build Workspace first as a small, theme-aware application shell with app-local route configuration backed by the shared route contract, reusable page/section layout components, and explicit loading and not-found states.

**Why:** Future mini-sites need a proven structure for navigation, route handling, responsive layout, and accessible placeholders without forcing them to share the same visual identity or page content.

## ADR-012 — Use React Router for Workspace client-side navigation

**Decision:** Use React Router's declarative `BrowserRouter`, `Routes`, and `Route` components for Workspace navigation. Derive its basename and route patterns from the shared route contract instead of duplicating URLs.

**Why:** React Router owns browser-history behavior, back/forward navigation, parameter parsing, and not-found matching more reliably than a local History API implementation. The shared route module remains the authoritative source for public URLs and deployment base paths; GitHub Pages deep-link fallback support is deferred to the deployment milestone.

## ADR-013 — Standardize React Router across interactive experience apps

**Decision:** Use React Router browser-history routing for Gateway, Notes, and Workspace. Keep each app's basename and every route path derived from `@portfolio/config/routes`; use full links when Gateway hands off to a separately deployed experience.

**Why:** A common router model gives the interactive apps consistent navigation behavior while preserving their independent build boundaries. Explicit Notes article routes replace its former multi-page setup, and the deployment milestone will provide the shared GitHub Pages deep-link fallback.

## ADR-014 — Separate config-time route access from TypeScript runtime access

**Decision:** Keep shared route data and base-path resolution in a dependency-free JavaScript entrypoint, `@portfolio/config/routes-config`, and have the TypeScript runtime route module consume that entrypoint. Vite configuration imports the JavaScript entrypoint; application runtime code continues to import `@portfolio/config/routes`.

**Why:** Vite configuration is loaded by Node before Vite transforms application TypeScript. A JavaScript entrypoint prevents Node's unknown `.ts` extension error while preserving one shared route contract and avoiding UI or routing behavior changes.
