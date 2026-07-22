# Architecture

## Repo structure
- apps/gateway
- apps/workspace
- apps/journal
- apps/editorial
- apps/calm
- apps/notes
- packages/ui
- packages/tokens
- packages/content
- packages/icons
- packages/config

## Build approach
- pnpm workspaces
- Vite for each app
- Shared packages for UI, tokens, and content
- GitHub Actions for deploy
- GitHub Pages for hosting