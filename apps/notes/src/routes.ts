import { createRouteResolver } from '@portfolio/config/routes'

export const route = createRouteResolver(import.meta.env.VITE_SITE_BASE)
