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

## ADR-007 — Make Home an experience selector

**Status:** Superseded by ADR-015.

**Original decision:** Keep the root route intentionally concise: introduce the four portfolio perspectives, offer direct entry into each one, and link to the public build notes.

**Why:** Home should orient visitors without competing with the distinct mini-sites. A lightweight theme toggle and responsive card grid provide a polished first impression while leaving each experience space to establish its own identity.

## ADR-008 — Publish Notes as static editorial pages

**Status:** Superseded by ADR-013.

**Original decision:** Build the public Notes app as a Vite multi-page application, with a static entry for the journal index and every article beneath `/notes/`.

**Superseded because:** Notes now uses React Router with explicit shared article routes, aligning it with Home and Workspace. GitHub Pages deep-link fallback support moves to the deployment milestone.

## ADR-009 — Organize shared UI by component boundary

**Decision:** Keep each public UI component in its own folder and move cross-cutting implementation details into small `src/lib` helpers, while maintaining one top-level barrel export.

**Why:** Component-level ownership makes the library easier to navigate, test, and extend as more portfolio experiences arrive. The barrel keeps imports stable for apps, so internal maintenance does not create unnecessary migration work.

## ADR-010 — Centralize public route resolution

**Status:** Superseded by ADR-014.

**Original decision:** Define all public routes and base-path resolution in a framework-agnostic shared module. Apps use the same resolver for internal links and Vite build bases.

**Why:** A configurable site base supports GitHub Pages deployments from either a custom domain root or a repository subpath. One route contract avoids link drift between Home, Notes articles, and future mini-sites.

## ADR-011 — Use Workspace as the experience-shell reference

**Decision:** Build Workspace first as a small, theme-aware application shell with app-local route configuration backed by the shared route contract, reusable page/section layout components, and explicit loading and not-found states.

**Why:** Future mini-sites need a proven structure for navigation, route handling, responsive layout, and accessible placeholders without forcing them to share the same visual identity or page content.

## ADR-012 — Use React Router for Workspace client-side navigation

**Decision:** Use React Router's declarative `BrowserRouter`, `Routes`, and `Route` components for Workspace navigation. Derive its basename and route patterns from the shared route contract instead of duplicating URLs.

**Why:** React Router owns browser-history behavior, back/forward navigation, parameter parsing, and not-found matching more reliably than a local History API implementation. The shared route module remains the authoritative source for public URLs and deployment base paths; GitHub Pages deep-link fallback support is deferred to the deployment milestone.

## ADR-013 — Standardize React Router across interactive experience apps

**Decision:** Use React Router browser-history routing for Home, Notes, and Workspace. Keep each app's basename and every route path derived from the shared route contract; use full links when Home hands off to a separately deployed experience.

**Why:** A common router model gives the interactive apps consistent navigation behavior while preserving their independent build boundaries. Explicit Notes article routes replace its former multi-page setup, and the deployment milestone will provide the shared GitHub Pages deep-link fallback.

## ADR-014 — Publish the route contract as its own package

**Status:** Updated by ADR-028.

**Decision:** Place the global route contract in the framework-agnostic `@portfolio/routes` package. It owns all public route constants, nested experience route groups, GitHub Pages base-path resolution, matching, and app-scoped route helpers. Keep `@portfolio/config/routes` as a temporary re-export while app imports migrate separately.

**Why:** Routing is a cross-cutting public contract rather than build configuration. A dedicated package makes that boundary explicit, gives every present and future app one dependency for URLs, and avoids coupling the package move to a behavior-changing router migration.

## ADR-015 — Make package routes safe at build-config time

**Status:** Superseded by ADR-028.

**Decision:** Keep route data and base-path resolution in the dependency-free `@portfolio/routes/config` JavaScript entrypoint. The TypeScript `@portfolio/routes` runtime API consumes that same data, and `@portfolio/config/routes-config` remains a compatibility re-export for existing Vite configs.

**Why:** Vite configuration is loaded by Node before Vite transforms application TypeScript. A JavaScript entrypoint prevents Node's unknown `.ts` extension error without duplicating route data or weakening the dedicated routing-package boundary.

## ADR-016 — Make Home an editorial entry experience

**Status:** Superseded by ADR-018.

**Original decision:** Present Home as a calm editorial introduction to Sahan Katta, followed by large chapter-like entrances. Use typography, whitespace, and simple dividing lines instead of cards, dashboards, or dense navigation patterns.

**Why:** The root experience should create a memorable sense of authorship before visitors choose a perspective. Separate full-width sections give every destination room to feel distinct while keeping Home quiet, legible, and intentionally restrained.

## ADR-017 — Deploy one aggregated GitHub Pages artifact

**Decision:** Build Home, Workspace, and Notes independently, then compose their static outputs into a single `.pages/` artifact for the GitHub Pages Actions workflow. Use a generated static `404.html` redirect plus a shared route-restoration helper to support direct Workspace and Notes deep links. Reserve the future Journal, Editorial, and Calm paths with generated redirects until those apps exist.

**Why:** GitHub Pages deploys one static artifact and has no server-side history fallback. Aggregation preserves each app's public base path, while the fallback makes browser-history routes reload safely without changing app content or adding backend infrastructure.

## ADR-018 — Separate Home perspectives from the Engineering Journal

**Decision:** The Home application is the entry point to the portfolio. It introduces four perspectives: Workspace, Journal, Editorial, and Calm. The Engineering Journal is intentionally separated because it explains how the portfolio was built rather than presenting the portfolio itself.

**Why:** Treating the Engineering Journal as a fifth perspective blurs the purpose of the entry experience. A quiet, secondary invitation after the four perspectives preserves the Home page's clarity while keeping the learning resource easy to discover.

## ADR-019 — Complete the Home naming migration in the route contract

**Decision:** Remove the former root-app route alias and rename the related Engineering Journal article to “Building Home.” All application runtime links now import from `@portfolio/routes`; Node build tooling reads the same contract through `@portfolio/routes/config`.

**Why:** A compatibility alias made the internal rename incomplete and allowed old terminology to persist in navigation, public content, and route keys. One canonical Home contract prevents link drift and keeps the project’s naming, deployment output, and public writing aligned.

## ADR-020 — Let Home promises lead each perspective

**Decision:** Keep Home limited to four perspective chapters, each with a fixed name, a one-line promise, and the same concise “Enter” CTA. Preserve the Engineering Journal as one separate, secondary path after the chapters.

**Why:** The root experience should help a visitor choose how to enter the portfolio, not describe every destination or compete with them. Consistent actions and promise-led copy make that decision quick while typography, whitespace, and sequence retain the intended editorial character.

## ADR-021 — Enforce a repository Definition of Done

**Decision:** Treat the Definition of Done in `CODING_STANDARDS.md` as the required completion gate for every task. Dependency manifest changes require a synchronized committed lockfile, and `pnpm verify` enforces the mandatory build, lint, and type-check gates locally and in the GitHub Pages workflow.

**Why:** GitHub Pages deployment previously exposed lockfile drift that local work had not caught. A shared, explicit workflow keeps documentation, dependency state, and validation aligned before a task is considered complete.

## ADR-022 — Use composition, not decoration, to distinguish Home perspectives

**Decision:** Keep Home monochrome and chapter-based. Use a restrained geometric hero focal point, a concise authorial statement, and perspective-specific layout and typography treatments to create distinction. Remove decorative numbering and avoid cards, color coding, and prominent motion.

**Why:** The opening page needs emotional clarity without turning into a gallery of visual devices. Composition gives each perspective an identity while preserving the calm, premium, editorial character of one cohesive product entry point.

## ADR-023 — Deploy GitHub Pages manually during active development

**Decision:** Use `workflow_dispatch` as the only active GitHub Pages deployment trigger. Keep a commented `push` trigger in the workflow as the documented switch for a future production mode that deploys on `main`.

**Why:** Manual publishing separates iteration from release decisions, avoids unnecessary Actions runs and usage, and gives each public update an explicit review point without weakening the existing build, quality, caching, or Pages configuration.

## ADR-024 — Use the approved editorial reference as Home’s composition contract

**Decision:** Preserve Home’s architecture and public routes while aligning its presentation to the approved monochrome editorial composition: a large author-led hero, subtle geometric atmosphere, hairline-divided perspective rows with meaningful ornaments, and a quiet Engineering Journal epilogue.

**Why:** The reference provides a precise visual hierarchy and rhythm for the entry experience. Treating it as a composition contract keeps the implementation focused on typography, whitespace, and restrained geometry instead of introducing cards, dashboard patterns, or a separate visual language.

## ADR-025 — Develop against the composed Pages route map

**Status:** Superseded by ADR-026.

**Decision:** Make `pnpm dev` build and locally serve the aggregate `.pages/` artifact. Its server returns the same static fallback document used by GitHub Pages for unknown paths, while the composed artifact remains the single implementation of cross-app route behavior.

**Why:** Running Home alone made `/notes/` unavailable during local navigation even though it worked after deployment. Serving the composed output gives developers one local URL for Home, Workspace, the reserved perspective routes, Notes, and their deep-link restoration without changing individual app builds or duplicating route definitions.

## ADR-026 — Separate fast development from production-like preview

**Status:** Superseded by ADR-027.

**Decision:** Reserve the composed Pages artifact for `pnpm preview` and make `pnpm dev` run Home’s normal Vite development server. Let Vite choose the development port, and let the composed preview server advance from its preferred port when that port is occupied.

**Why:** Building the entire static artifact before every Home edit made development slow and removed Vite’s Fast Refresh benefits. A separate preview command retains accurate multi-app and GitHub Pages fallback checks without burdening the normal edit loop or failing on a routine port conflict.

## ADR-027 — Use a discovery-driven development orchestrator

**Decision:** Make `pnpm dev` run a root development gateway that discovers app workspaces, starts each implemented Vite app internally, and proxies HTTP plus HMR WebSocket traffic through one localhost origin. Derive each app prefix from its matching direct route entry in `@portfolio/routes`; preserve independent `pnpm dev:<app>` commands and keep the composed Pages pipeline exclusively for preview and deployment.

**Why:** The root Home Vite server could not serve the independently built Notes and Workspace applications, so navigation from one app to another failed in normal development. Discovery plus the shared route contract prevents a duplicated app registry: future apps join the unified environment by adding their public route and conventional `dev` script, while GitHub Pages retains its existing static deployment architecture.

## ADR-028 — Keep only active shared packages and source artifacts

**Decision:** Remove the deprecated `@portfolio/config` route compatibility package and the empty `@portfolio/content` and `@portfolio/icons` placeholders. Keep `@portfolio/routes`, `@portfolio/tokens`, and `@portfolio/ui` as the current shared package boundary. Ignore build output, local pnpm state, and obsolete generated documentation files.

**Why:** Every application already imports the canonical route package, so a compatibility package only obscured ownership. Empty workspace packages create architectural promises without implementation. Removing them makes the repository's current architecture explicit, while ignored artifacts keep generated output out of the source tree and Git history without changing the Pages build or deployment workflow.

## ADR-029 — Configure the Pages source for Actions

**Decision:** Configure GitHub Pages once at the repository level to use GitHub Actions; the manual workflow then builds and deploys the aggregate artifact.

**Why:** A successful artifact deployment cannot restore a user site when GitHub Pages is disabled or still configured to publish from a branch directory. The workflow token is intentionally not permitted to change this repository-level setting, so the setting remains explicit in GitHub while the workflow owns artifact publication.
