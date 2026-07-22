/**
 * Public URLs for the portfolio. This module intentionally has no framework
 * or build-tool dependency so apps and deployment configuration can share it.
 */
export const publicRoutes = {
  gateway: '/',
  workspace: '/workspace/',
  journal: '/journal/',
  editorial: '/editorial/',
  calm: '/calm/',
  notes: '/notes/',
  notesArticle: '/notes/:slug/',
} as const

export type PublicRoute = keyof typeof publicRoutes
export type RouteParameters = Record<string, string | number>

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

/** Returns the public base Vite should use when building an individual app. */
export function appBasePath(route: Exclude<PublicRoute, 'notesArticle'>, siteBasePath = '/') {
  return resolvePublicRoute(route, siteBasePath)
}
