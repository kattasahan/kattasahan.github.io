export const publicRoutes: Readonly<{
  home: '/'
  workspace: '/workspace/'
  workspaceWork: '/workspace/work/'
  workspaceCaseStudy: '/workspace/case-study/:slug/'
  workspaceAbout: '/workspace/about/'
  workspaceContact: '/workspace/contact/'
  journal: '/journal/'
  editorial: '/editorial/'
  calm: '/calm/'
  notes: '/notes/'
  notesWhyThisPortfolioExists: '/notes/why-this-portfolio-exists/'
  notesBuildingHome: '/notes/building-home/'
  notesDesignSystemDecisions: '/notes/design-system-decisions/'
  notesSharedComponents: '/notes/shared-components/'
  notesRoutingAndDeployment: '/notes/routing-and-deployment/'
  notesWhatILearned: '/notes/what-i-learned/'
  notesArticle: '/notes/:slug/'
}>

export type ConfigRoute = keyof typeof publicRoutes
export type RouteParameters = Record<string, string | number>

export function normalizeBasePath(basePath?: string): string
export function resolvePublicRoute(
  route: ConfigRoute,
  basePath?: string,
  parameters?: RouteParameters,
): string
export function appBasePath(
  route: Exclude<ConfigRoute, 'notesArticle'>,
  siteBasePath?: string,
): string
