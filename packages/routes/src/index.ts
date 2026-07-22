/**
 * Framework-agnostic public route contract for the portfolio.
 *
 * Route values are deployment-relative. Resolve them through this module when
 * rendering links for a GitHub Pages deployment.
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
  notesWhyThisPortfolioExists: '/notes/why-this-portfolio-exists/',
  notesBuildingTheGateway: '/notes/building-the-gateway/',
  notesDesignSystemDecisions: '/notes/design-system-decisions/',
  notesSharedComponents: '/notes/shared-components/',
  notesRoutingAndDeployment: '/notes/routing-and-deployment/',
  notesWhatILearned: '/notes/what-i-learned/',
  notesArticle: '/notes/:slug/',
} as const

export type PublicRoute = keyof typeof publicRoutes
export type RouteParameters = Record<string, string | number>

export const appRouteNames = [
  'gateway',
  'workspace',
  'journal',
  'editorial',
  'calm',
  'notes',
] as const

export type AppRoute = (typeof appRouteNames)[number]

export const workspaceRouteNames = [
  'workspace',
  'workspaceWork',
  'workspaceCaseStudy',
  'workspaceAbout',
  'workspaceContact',
] as const

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

/** Route names grouped by the public experience that owns them. */
export const appRoutes = {
  gateway: ['gateway'],
  workspace: workspaceRouteNames,
  journal: ['journal'],
  editorial: ['editorial'],
  calm: ['calm'],
  notes: ['notes', ...notesArticleRouteNames, 'notesArticle'],
} as const satisfies Record<AppRoute, readonly PublicRoute[]>

export interface MatchedPublicRoute {
  route: PublicRoute
  parameters: RouteParameters
}

/** Normalizes a GitHub Pages repository base path to leading and trailing slashes. */
export function normalizeBasePath(basePath = '/'): string {
  const trimmed = basePath.trim()
  if (!trimmed || trimmed === '/') return '/'

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

/** Resolves a route template for the current deployment base path. */
export function resolvePublicRoute(
  route: PublicRoute,
  basePath = '/',
  parameters: RouteParameters = {},
): string {
  const routePath = publicRoutes[route].replace(/:([A-Za-z0-9_]+)/g, (_match, parameterName: string) => {
    const value = parameters[parameterName]
    if (value === undefined) throw new Error(`Missing route parameter: ${parameterName}`)
    return encodeURIComponent(String(value))
  })

  return `${normalizeBasePath(basePath).replace(/\/$/, '')}${routePath}`
}

/** Creates a reusable resolver for a deployment's configured base path. */
export function createRouteResolver(basePath = '/') {
  return (route: PublicRoute, parameters?: RouteParameters) => resolvePublicRoute(route, basePath, parameters)
}

/** Returns the route names owned by a public experience. */
export function routesForApp(appRoute: AppRoute): readonly PublicRoute[] {
  return appRoutes[appRoute]
}

/** Creates a resolver constrained to routes belonging to one public experience. */
export function createAppRouteResolver(appRoute: AppRoute, basePath = '/') {
  return (route: PublicRoute, parameters?: RouteParameters) => {
    if (!routesForApp(appRoute).includes(route)) {
      throw new Error(`Route ${route} does not belong to the ${appRoute} experience.`)
    }

    return resolvePublicRoute(route, basePath, parameters)
  }
}

/** Returns a child route path relative to an app route for framework routers. */
export function relativeRoutePath(appRoute: AppRoute, route: PublicRoute): string {
  const appPath = publicRoutes[appRoute]
  const routePath = publicRoutes[route]

  if (appRoute !== 'gateway' && (!routesForApp(appRoute).includes(route) || !routePath.startsWith(appPath))) {
    throw new Error(`Route ${route} does not belong to app route ${appRoute}`)
  }

  return routePath.slice(appPath.length).replace(/\/$/, '')
}

function escapeRegExp(value: string): string {
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

/** Returns the GitHub Pages-aware base path for one public experience. */
export function appBasePath(appRoute: AppRoute, siteBasePath = '/') {
  return resolvePublicRoute(appRoute, siteBasePath)
}
