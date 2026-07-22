import {
  appBasePath,
  createRouteResolver,
  relativeRoutePath,
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

export const workspaceRouterBaseName = appBasePath('workspace', import.meta.env.VITE_SITE_BASE).replace(/\/$/, '') || '/'

export function workspaceRouterPath(routeName: WorkspaceRoute) {
  const relativePath = relativeRoutePath('workspace', routeName)
  return relativePath ? `/${relativePath}` : '/'
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
