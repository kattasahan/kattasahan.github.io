import {
  createRouteResolver,
  matchPublicRoute,
  type MatchedPublicRoute,
  type WorkspaceRoute,
  workspaceRouteNames,
} from '@portfolio/config/routes'

export const route = createRouteResolver(import.meta.env.VITE_SITE_BASE)

export interface WorkspaceRouteDefinition {
  route: WorkspaceRoute
  label: string
  title: string
  description: string
}

export interface MatchedWorkspaceRoute extends Omit<MatchedPublicRoute, 'route'> {
  route: WorkspaceRoute
}

export const workspaceRouteDefinitions: WorkspaceRouteDefinition[] = [
  {
    route: 'workspace',
    label: 'Overview',
    title: 'Workspace',
    description: 'A product-minded view of the work, systems, and decisions behind it.',
  },
  {
    route: 'workspaceWork',
    label: 'Work',
    title: 'Work',
    description: 'Selected work and case studies will live here.',
  },
  {
    route: 'workspaceAbout',
    label: 'About',
    title: 'About',
    description: 'A short introduction to the person and practice behind the work.',
  },
  {
    route: 'workspaceContact',
    label: 'Contact',
    title: 'Contact',
    description: 'A focused place to start a conversation.',
  },
]

const workspaceRouteSet = new Set<WorkspaceRoute>(workspaceRouteNames)

export function getWorkspaceRoute(pathname: string): MatchedWorkspaceRoute | undefined {
  const match = matchPublicRoute(pathname, import.meta.env.VITE_SITE_BASE)
  return match && workspaceRouteSet.has(match.route as WorkspaceRoute)
    ? { ...match, route: match.route as WorkspaceRoute }
    : undefined
}

export function getWorkspaceRouteDefinition(routeName: WorkspaceRoute) {
  if (routeName === 'workspaceCaseStudy') {
    return {
      route: routeName,
      label: 'Case study',
      title: 'Case study',
      description: 'A detailed case study will appear here.',
    }
  }

  return workspaceRouteDefinitions.find((definition) => definition.route === routeName)
}
