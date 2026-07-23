# Sahan Katta Portfolio

Live site: [kattasahan.github.io](https://kattasahan.github.io/)

## Development

Install dependencies, then start the unified portfolio development environment:

```sh
pnpm install
pnpm dev
```

The Development Orchestrator provides Home, Workspace, Journal, Editorial, Calm, and Notes from [http://localhost:5173/](http://localhost:5173/) when available, or the next available port when it is occupied. Implemented applications retain Vite Hot Module Reload and Fast Refresh through the shared origin. The development command does not build the GitHub Pages artifact. Use `pnpm dev:workspace`, `pnpm dev:journal`, `pnpm dev:editorial`, `pnpm dev:calm`, or `pnpm dev:notes` for focused, independent app work.

The orchestrator discovers `apps/*` workspaces and matches each directory to a direct route entry in `@portfolio/routes`. A future app therefore joins the unified development origin by adding its route and a standard `dev` script; it does not require a second application registry. The production build, preview, and GitHub Pages deployment remain separate and unchanged.

## Preview

Preview the full production-like route map locally with:

```sh
pnpm preview
```

This builds the GitHub Pages artifact, writes it to `.pages/`, and serves it with the same static fallback behavior used in production. The preview server uses its preferred port when available and automatically selects the next port if it is busy.

## Build

Build workspace applications without starting a server:

```sh
pnpm build
```

Use `pnpm build:pages` when you need only the aggregate GitHub Pages artifact without serving it.

## Deployment

The repository publishes to [kattasahan.github.io](https://kattasahan.github.io/) through GitHub Actions. GitHub Pages is configured in **Settings → Pages** with **Source: GitHub Actions**, and the deployment workflow publishes the aggregate artifact.

### Development

- `pnpm dev` is for fast local iteration; `pnpm preview` is for production-like local route checks.
- Push freely; GitHub Pages deployment is manual during active development.
- Review changes, then use **GitHub Actions → Deploy GitHub Pages → Run workflow** to update GitHub Pages.

### Production (future)

- Deploy automatically on pushes to `main` by enabling the documented `push` trigger in the workflow.

Current flow: Code → Commit → Push → No deployment → Review → Run workflow manually → GitHub Pages updated.

Future flow: Code → Commit → Push to `main` → Automatic deployment.
