# Sahan Katta Portfolio

Live site: [kattasahan.github.io](https://kattasahan.github.io/)

## Local development

Install dependencies, then run Home from the repository root:

```sh
pnpm install
pnpm dev
```

Run an individual implemented experience with `pnpm dev:workspace` or `pnpm dev:notes`.

## Production build

Build the GitHub Pages artifact locally with:

```sh
pnpm build:pages
```

The generated static site is written to `.pages/`.

## Deployment

The repository publishes to [kattasahan.github.io](https://kattasahan.github.io/) through GitHub Actions. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source once before the first deployment.

### Development

- Push freely; deployment is manual during active development.
- Review changes, then use **GitHub Actions → Deploy GitHub Pages → Run workflow** to update GitHub Pages.

### Production (future)

- Deploy automatically on pushes to `main` by enabling the documented `push` trigger in the workflow.

Current flow: Code → Commit → Push → No deployment → Review → Run workflow manually → GitHub Pages updated.

Future flow: Code → Commit → Push to `main` → Automatic deployment.
