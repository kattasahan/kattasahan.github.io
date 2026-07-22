import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))
const outputDirectory = join(repositoryRoot, '.pages')
const appBuilds = [
  { name: '@portfolio/home', output: '' },
  { name: '@portfolio/workspace', output: 'workspace' },
  { name: '@portfolio/notes', output: 'notes' },
]

function runPnpm(args) {
  const result = spawnSync('pnpm', args, {
    cwd: repositoryRoot,
    env: { ...process.env, VITE_SITE_BASE: process.env.VITE_SITE_BASE ?? '/' },
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function redirectDocument(destination) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Redirecting…</title>
    <script>window.location.replace(${JSON.stringify(destination)})</script>
  </head>
  <body><p>Redirecting…</p></body>
</html>`
}

function fallbackDocument() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loading…</title>
    <script>
      (() => {
        const path = window.location.pathname
        const requestedRoute = path + window.location.search + window.location.hash
        const appBase = path === '/workspace' || path.startsWith('/workspace/')
          ? '/workspace/'
          : path === '/notes' || path.startsWith('/notes/')
            ? '/notes/'
            : undefined

        if (appBase) {
          window.location.replace(appBase + '?__gh_pages_route=' + encodeURIComponent(requestedRoute))
          return
        }

        window.location.replace('/')
      })()
    </script>
  </head>
  <body><p>Loading…</p></body>
</html>`
}

await rm(outputDirectory, { force: true, recursive: true })

for (const app of appBuilds) {
  runPnpm(['--filter', app.name, 'build'])
  await cp(
    join(repositoryRoot, 'apps', app.name.replace('@portfolio/', ''), 'dist'),
    join(outputDirectory, app.output),
    { recursive: true },
  )
}

for (const route of ['journal', 'editorial', 'calm']) {
  const destination = join(outputDirectory, route, 'index.html')
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, redirectDocument('/'))
}

await writeFile(join(outputDirectory, '.nojekyll'), '')
await writeFile(join(outputDirectory, '404.html'), fallbackDocument())
