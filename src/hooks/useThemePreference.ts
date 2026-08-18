import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../components/ThemeToggle'

const storageKey = 'theme-preference'

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function readThemePreference(): Theme {
  try {
    const storedTheme = window.localStorage.getItem(storageKey)
    return isTheme(storedTheme) ? storedTheme : 'light'
  } catch {
    return 'light'
  }
}

export function useThemePreference() {
  const [theme, setTheme] = useState<Theme>(readThemePreference)

  const updateTheme = useCallback((nextTheme: Theme) => {
    setTheme(nextTheme)

    try {
      window.localStorage.setItem(storageKey, nextTheme)
    } catch {
      // Continue with the in-memory preference when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    const syncThemePreference = (event: StorageEvent) => {
      if (event.key === storageKey && isTheme(event.newValue)) {
        setTheme(event.newValue)
      }
    }

    window.addEventListener('storage', syncThemePreference)
    return () => window.removeEventListener('storage', syncThemePreference)
  }, [])

  return { theme, updateTheme }
}
