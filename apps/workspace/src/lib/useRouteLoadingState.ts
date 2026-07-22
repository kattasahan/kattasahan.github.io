import { useEffect, useState } from 'react'
import { motionTokens } from '@portfolio/tokens'

export function useRouteLoadingState(locationKey: string) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timeout = window.setTimeout(() => setIsLoading(false), Number.parseInt(motionTokens.duration.fast, 10))
    return () => window.clearTimeout(timeout)
  }, [locationKey])

  return isLoading
}
