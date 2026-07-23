# Sahan Katta Portfolio

Live site: [kattasahan.github.io](https://kattasahan.github.io/)

## Development

Install dependencies, then start Home with Vite’s development server:

```sh
pnpm install
pnpm dev
```

Vite provides Hot Module Reload and Fast Refresh at [http://localhost:5173/](http://localhost:5173/) when available, or the next available port when it is occupied. It does not build the GitHub Pages artifact. Use `pnpm dev:workspace`, `pnpm dev:journal`, `pnpm dev:editorial`, `pnpm dev:calm`, or `pnpm dev:notes` for focused work on another app.

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

The repository publishes to [kattasahan.github.io](https://kattasahan.github.io/) through GitHub Actions. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source once before the first deployment.

### Development

- `pnpm dev` is for fast local iteration; `pnpm preview` is for production-like local route checks.
- Push freely; GitHub Pages deployment is manual during active development.
- Review changes, then use **GitHub Actions → Deploy GitHub Pages → Run workflow** to update GitHub Pages.

### Production (future)

- Deploy automatically on pushes to `main` by enabling the documented `push` trigger in the workflow.

Current flow: Code → Commit → Push → No deployment → Review → Run workflow manually → GitHub Pages updated.

Future flow: Code → Commit → Push to `main` → Automatic deployment.
