import { useCallback, useEffect, useState } from 'react'
import { defaultAccent, isAccent, type Accent } from '../data/accents'

const storageKey = 'accent-preference'

function readAccentPreference(): Accent {
  try {
    const storedAccent = window.localStorage.getItem(storageKey)
    return isAccent(storedAccent) ? storedAccent : defaultAccent
  } catch {
    return defaultAccent
  }
}

export function useAccentPreference() {
  const [accent, setAccent] = useState<Accent>(readAccentPreference)

  const updateAccent = useCallback((nextAccent: Accent) => {
    setAccent(nextAccent)

    try {
      window.localStorage.setItem(storageKey, nextAccent)
    } catch {
      // Continue with the in-memory preference when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    const syncAccentPreference = (event: StorageEvent) => {
      if (event.key === storageKey && isAccent(event.newValue)) {
        setAccent(event.newValue)
      }
    }

    window.addEventListener('storage', syncAccentPreference)
    return () => window.removeEventListener('storage', syncAccentPreference)
  }, [])

  return { accent, updateAccent }
}
