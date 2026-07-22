/**
 * Public URLs for the portfolio. This module intentionally has no framework
 * or build-tool dependency so apps and deployment configuration can share it.
 */
export const publicRoutes = {
  gateway: '/',
  workspace: '/workspace/',
  workspaceWork: '/workspace/work/',
  workspaceCaseStudy: '/workspace/case-study/:slug/',
  workspaceAbout: '/workspace/about/',
  workspaceContact: '/workspace/contact/',
  journal: '/journal/',
  editorial: '/editorial/',
  calm: '/calm/',
  notes: '/notes/',
  notesArticle: '/notes/:slug/',
} as const

export type PublicRoute = keyof typeof publicRoutes
export type RouteParameters = Record<string, string | number>
export const workspaceRouteNames = ['workspace', 'workspaceWork', 'workspaceCaseStudy', 'workspaceAbout', 'workspaceContact'] as const
export type WorkspaceRoute = (typeof workspaceRouteNames)[number]

export interface MatchedPublicRoute {
  route: PublicRoute
  parameters: RouteParameters
}

export function normalizeBasePath(basePath = '/') {
  const trimmed = basePath.trim()
  if (!trimmed || trimmed === '/') return '/'

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

export function resolvePublicRoute(route: PublicRoute, basePath = '/', parameters: RouteParameters = {}) {
  const routePath = publicRoutes[route].replace(/:([A-Za-z0-9_]+)/g, (_match, parameterName: string) => {
    const value = parameters[parameterName]
    if (value === undefined) throw new Error(`Missing route parameter: ${parameterName}`)
    return encodeURIComponent(String(value))
  })

  return `${normalizeBasePath(basePath).replace(/\/$/, '')}${routePath}`
}

export function createRouteResolver(basePath = '/') {
  return (route: PublicRoute, parameters?: RouteParameters) => resolvePublicRoute(route, basePath, parameters)
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function routePattern(template: string) {
  const parameterNames: string[] = []
  const pattern = template
    .split(/(:[A-Za-z0-9_]+)/g)
    .map((part) => {
      if (!part.startsWith(':')) return escapeRegExp(part)
      parameterNames.push(part.slice(1))
      return '([^/]+)'
    })
    .join('')

  const optionalTrailingSlash = pattern.endsWith('/') ? `${pattern.slice(0, -1)}/?` : pattern
  return { parameterNames, expression: new RegExp(`^${optionalTrailingSlash}$`) }
}

/** Matches a browser pathname against the shared public route definitions. */
export function matchPublicRoute(pathname: string, basePath = '/'): MatchedPublicRoute | undefined {
  const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  const basePrefix = normalizeBasePath(basePath).replace(/\/$/, '')
  const routePathname = basePrefix && basePrefix !== '/'
    ? normalizedPathname.startsWith(`${basePrefix}/`) || normalizedPathname === basePrefix
      ? normalizedPathname.slice(basePrefix.length) || '/'
      : undefined
    : normalizedPathname

  if (!routePathname) return undefined

  for (const [route, template] of Object.entries(publicRoutes) as [PublicRoute, string][]) {
    const { expression, parameterNames } = routePattern(template)
    const match = routePathname.match(expression)
    if (!match) continue

    const parameters = Object.fromEntries(parameterNames.map((name, index) => [name, decodeURIComponent(match[index + 1])]))
    return { route, parameters }
  }

  return undefined
}

/** Returns the public base Vite should use when building an individual app. */
export function appBasePath(route: Exclude<PublicRoute, 'notesArticle'>, siteBasePath = '/') {
  return resolvePublicRoute(route, siteBasePath)
}
