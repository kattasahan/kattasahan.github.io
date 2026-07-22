import {
  appBasePath,
  normalizeBasePath,
  publicRoutes,
  resolvePublicRoute,
} from './routes.config.js'

/**
 * Framework-agnostic runtime route helpers. Route data and config-time base
 * resolution are defined in the Node-loadable routes.config.js entrypoint.
 */
export { appBasePath, normalizeBasePath, publicRoutes, resolvePublicRoute }

export type PublicRoute = keyof typeof publicRoutes
export type RouteParameters = Record<string, string | number>
export const workspaceRouteNames = ['workspace', 'workspaceWork', 'workspaceCaseStudy', 'workspaceAbout', 'workspaceContact'] as const
export type WorkspaceRoute = (typeof workspaceRouteNames)[number]
export const notesArticleRouteNames = [
  'notesWhyThisPortfolioExists',
  'notesBuildingTheGateway',
  'notesDesignSystemDecisions',
  'notesSharedComponents',
  'notesRoutingAndDeployment',
  'notesWhatILearned',
] as const
export type NotesArticleRoute = (typeof notesArticleRouteNames)[number]

export interface MatchedPublicRoute {
  route: PublicRoute
  parameters: RouteParameters
}

export function createRouteResolver(basePath = '/') {
  return (route: PublicRoute, parameters?: RouteParameters) => resolvePublicRoute(route, basePath, parameters)
}

/** Returns a child route path relative to an app route for framework routers. */
export function relativeRoutePath(appRoute: PublicRoute, route: PublicRoute) {
  const appPath = publicRoutes[appRoute]
  const routePath = publicRoutes[route]

  if (!routePath.startsWith(appPath)) {
    throw new Error(`Route ${route} does not belong to app route ${appRoute}`)
  }

  return routePath.slice(appPath.length).replace(/\/$/, '')
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
