# Sahan Katta Portfolio

Live site: [kattasahan.github.io](https://kattasahan.github.io/)

## Local development

Install dependencies, then run the Gateway from the repository root:

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

The repository deploys to [kattasahan.github.io](https://kattasahan.github.io/) through GitHub Actions when changes are pushed to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source once before the first deployment.
