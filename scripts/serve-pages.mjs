import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))
const outputDirectory = join(repositoryRoot, '.pages')
const fallbackDocument = join(outputDirectory, '404.html')
const port = Number(process.env.PORT ?? '4173')

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function contentType(filePath) {
  return contentTypes[extname(filePath)] ?? 'application/octet-stream'
}

function outputPath(pathname) {
  const relativePath = decodeURIComponent(pathname).replace(/^\/+/, '')
  const resolvedPath = resolve(outputDirectory, relativePath)

  if (resolvedPath !== outputDirectory && !resolvedPath.startsWith(`${outputDirectory}${sep}`)) {
    return undefined
  }

  return resolvedPath
}

async function documentPath(pathname) {
  const requestedPath = outputPath(pathname)
  if (!requestedPath) return undefined

  try {
    const metadata = await stat(requestedPath)
    return metadata.isDirectory() ? join(requestedPath, 'index.html') : requestedPath
  } catch {
    return undefined
  }
}

async function sendFile(response, filePath, statusCode = 200, method = 'GET') {
  try {
    const body = method === 'HEAD' ? undefined : await readFile(filePath)
    response.writeHead(statusCode, { 'Content-Type': contentType(filePath) })
    response.end(body)
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Unable to serve the composed portfolio output.')
  }
}

const server = createServer(async (request, response) => {
  if (!request.url || !['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' })
    response.end()
    return
  }

  const pathname = new URL(request.url, 'http://localhost').pathname
  const requestedDocument = await documentPath(pathname)

  if (requestedDocument) {
    await sendFile(response, requestedDocument, 200, request.method)
    return
  }

  await sendFile(response, fallbackDocument, 404, request.method)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Composed portfolio available at http://127.0.0.1:${port}/`)
})
