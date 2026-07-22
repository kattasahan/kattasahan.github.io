import { appBasePath, createRouteResolver, relativeRoutePath, type PublicRoute } from '@portfolio/routes'

export const route = createRouteResolver(import.meta.env.VITE_SITE_BASE)
export const homeRouterBaseName = appBasePath('home', import.meta.env.VITE_SITE_BASE).replace(/\/$/, '') || '/'

export function homeRouterPath(routeName: PublicRoute) {
  const relativePath = relativeRoutePath('home', routeName)
  return relativePath ? `/${relativePath}` : '/'
}
