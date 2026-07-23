import { spawn } from 'node:child_process'
import { createServer, request as createRequest } from 'node:http'
import { connect, createServer as createNetServer } from 'node:net'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { publicRoutes } from '@portfolio/routes/config'

const repositoryRoot = fileURLToPath(new URL('..', import.meta.url))
const applicationsDirectory = join(repositoryRoot, 'apps')
const preferredPort = Number(process.env.PORT ?? '5173')
const host = '127.0.0.1'
const children = []

function applicationRoute(applicationName) {
  const route = publicRoutes[applicationName]
  return route && !route.includes(':') ? route : undefined
}

async function discoverApplications() {
  const entries = await readdir(applicationsDirectory, { withFileTypes: true })
  const applications = await Promise.all(entries.filter((entry) => entry.isDirectory()).map(async (entry) => {
    const directory = join(applicationsDirectory, entry.name)

    try {
      const manifest = JSON.parse(await readFile(join(directory, 'package.json'), 'utf8'))
      const route = applicationRoute(entry.name)

      if (!route) {
        console.warn(`Skipping ${entry.name}: add its public route to @portfolio/routes before starting it through the development orchestrator.`)
        return undefined
      }

      return {
        directory,
        name: entry.name,
        packageName: manifest.name,
        route,
        startsDevServer: Boolean(manifest.scripts?.dev),
      }
    } catch {
      return undefined
    }
  }))

  return applications
    .filter(Boolean)
    .sort((left, right) => left.route.length - right.route.length || left.name.localeCompare(right.name))
}

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = createNetServer()
    probe.once('error', reject)
    probe.listen(0, host, () => {
      const address = probe.address()
      probe.close((error) => error ? reject(error) : resolve(address.port))
    })
  })
}

function waitForServer(port, child) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 15_000

    const tryConnection = () => {
      const socket = connect(port, host)
      socket.once('connect', () => {
        socket.end()
        resolve()
      })
      socket.once('error', () => {
        if (child.exitCode !== null) {
          reject(new Error(`The ${child.spawnargs.at(-1) ?? 'application'} development server exited before it became available.`))
          return
        }

        if (Date.now() >= deadline) {
          reject(new Error(`Timed out waiting for a development server on port ${port}.`))
          return
        }

        setTimeout(tryConnection, 100)
      })
    }

    tryConnection()
  })
}

async function startApplication(application) {
  if (!application.startsDevServer) return application

  const port = await findAvailablePort()
  const child = spawn('pnpm', [
    '--filter', application.packageName,
    'dev',
    '--host', host,
    '--port', String(port),
    '--strictPort',
  ], {
    cwd: repositoryRoot,
    env: { ...process.env, VITE_SITE_BASE: '/' },
    stdio: 'inherit',
  })

  children.push(child)
  await waitForServer(port, child)
  return { ...application, port }
}

function matchesRoute(pathname, route) {
  if (route === '/') return true
  const routeWithoutTrailingSlash = route.slice(0, -1)
  return pathname === routeWithoutTrailingSlash || pathname.startsWith(route)
}

function targetForPathname(pathname, applications) {
  return [...applications]
    .sort((left, right) => right.route.length - left.route.length)
    .find((application) => matchesRoute(pathname, application.route))
}

function proxyRequest(request, response, target) {
  const upstream = createRequest({
    headers: { ...request.headers, host: `${host}:${target.port}` },
    hostname: host,
    method: request.method,
    path: request.url,
    port: target.port,
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers)
    upstreamResponse.pipe(response)
  })

  upstream.once('error', () => {
    response.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(`The ${target.name} development server is unavailable.`)
  })

  request.pipe(upstream)
}

function proxyUpgrade(request, socket, head, target) {
  const upstream = createRequest({
    headers: { ...request.headers, host: `${host}:${target.port}` },
    hostname: host,
    method: request.method,
    path: request.url,
    port: target.port,
  })

  upstream.once('upgrade', (upstreamResponse, upstreamSocket, upstreamHead) => {
    const responseHeaders = upstreamResponse.rawHeaders
      .reduce((lines, value, index, headers) => index % 2 === 0 ? lines : `${lines}${headers[index - 1]}: ${value}\r\n`, '')
    socket.write(`HTTP/${upstreamResponse.httpVersion} ${upstreamResponse.statusCode} ${upstreamResponse.statusMessage}\r\n${responseHeaders}\r\n`)
    if (head.length) upstreamSocket.write(head)
    if (upstreamHead.length) socket.write(upstreamHead)
    upstreamSocket.pipe(socket)
    socket.pipe(upstreamSocket)
  })

  upstream.once('error', () => socket.destroy())
  upstream.end()
}

function redirectToHome(response) {
  response.writeHead(302, { Location: publicRoutes.home })
  response.end()
}

async function start() {
  const discoveredApplications = await discoverApplications()
  const applications = await Promise.all(discoveredApplications.map(startApplication))
  const home = applications.find((application) => application.route === '/')

  if (!home?.port) {
    throw new Error('The Home application needs a dev script for the development orchestrator.')
  }

  const gateway = createServer((request, response) => {
    if (!request.url) {
      response.writeHead(400)
      response.end()
      return
    }

    const target = targetForPathname(new URL(request.url, `http://${host}`).pathname, applications)
    if (!target || !target.port) {
      redirectToHome(response)
      return
    }

    proxyRequest(request, response, target)
  })

  gateway.on('upgrade', (request, socket, head) => {
    if (!request.url) {
      socket.destroy()
      return
    }

    const target = targetForPathname(new URL(request.url, `http://${host}`).pathname, applications)
    if (!target?.port) {
      socket.destroy()
      return
    }

    proxyUpgrade(request, socket, head, target)
  })

  gateway.on('listening', () => {
    const address = gateway.address()
    const port = typeof address === 'object' && address ? address.port : preferredPort
    console.log(`Portfolio development environment available at http://localhost:${port}/`)
  })

  const listen = (port) => {
    gateway.once('error', (error) => {
      if (error.code !== 'EADDRINUSE') throw error
      console.warn(`Port ${port} is in use; trying the next available port.`)
      listen(port + 1)
    })
    gateway.listen(port)
  }

  listen(preferredPort)
}

function stopChildren() {
  for (const child of children) child.kill('SIGTERM')
}

process.once('SIGINT', stopChildren)
process.once('SIGTERM', stopChildren)

start().catch((error) => {
  console.error(error)
  stopChildren()
  process.exitCode = 1
})
