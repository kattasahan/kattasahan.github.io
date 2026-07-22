import { appBasePath, createRouteResolver, relativeRoutePath, type PublicRoute } from '@portfolio/config/routes'

export const route = createRouteResolver(import.meta.env.VITE_SITE_BASE)
export const gatewayRouterBaseName = appBasePath('gateway', import.meta.env.VITE_SITE_BASE).replace(/\/$/, '') || '/'

export function gatewayRouterPath(routeName: PublicRoute) {
  const relativePath = relativeRoutePath('gateway', routeName)
  return relativePath ? `/${relativePath}` : '/'
}
