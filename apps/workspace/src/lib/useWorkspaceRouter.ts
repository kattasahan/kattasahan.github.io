import { useCallback, useEffect, useState } from 'react'
import { motionTokens } from '@portfolio/tokens'
import { getWorkspaceRoute } from '../routes'

function currentPathname() {
  return window.location.pathname
}

export function useWorkspaceRouter() {
  const [pathname, setPathname] = useState(currentPathname)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handlePopState = () => setPathname(currentPathname())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const timeout = window.setTimeout(() => setIsLoading(false), Number.parseInt(motionTokens.duration.fast, 10))
    return () => window.clearTimeout(timeout)
  }, [pathname])

  const navigate = useCallback((href: string) => {
    if (href === currentPathname()) return
    window.history.pushState({}, '', href)
    setPathname(currentPathname())
  }, [])

  return {
    isLoading,
    navigate,
    route: getWorkspaceRoute(pathname),
  }
}
