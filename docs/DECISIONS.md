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
