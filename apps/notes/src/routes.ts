import { appBasePath, createRouteResolver, relativeRoutePath, type NotesArticleRoute } from '@portfolio/routes'

export const route = createRouteResolver(import.meta.env.VITE_SITE_BASE)
export const notesRouterBaseName = appBasePath('notes', import.meta.env.VITE_SITE_BASE).replace(/\/$/, '') || '/'

export function notesRouterPath(routeName: 'notes' | NotesArticleRoute) {
  const relativePath = relativeRoutePath('notes', routeName)
  return relativePath ? `/${relativePath}` : '/'
}
