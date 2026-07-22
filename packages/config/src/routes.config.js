/**
 * Node-loadable route data and base-path helpers for build-tool configuration.
 * Keep this module dependency-free so Vite can load it without a TypeScript
 * runtime loader.
 */
export const publicRoutes = Object.freeze({
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
})

export function normalizeBasePath(basePath = '/') {
  const trimmed = basePath.trim()
  if (!trimmed || trimmed === '/') return '/'

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}/`
}

export function resolvePublicRoute(route, basePath = '/', parameters = {}) {
  const routePath = publicRoutes[route].replace(/:([A-Za-z0-9_]+)/g, (_match, parameterName) => {
    const value = parameters[parameterName]
    if (value === undefined) throw new Error(`Missing route parameter: ${parameterName}`)
    return encodeURIComponent(String(value))
  })

  return `${normalizeBasePath(basePath).replace(/\/$/, '')}${routePath}`
}

/** Returns the public base Vite should use when building an individual app. */
export function appBasePath(route, siteBasePath = '/') {
  return resolvePublicRoute(route, siteBasePath)
}
