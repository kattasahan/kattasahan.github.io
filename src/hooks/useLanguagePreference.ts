import { useCallback, useEffect, useState } from 'react'
import { languages, type Language } from '../data/content'

const storageKey = 'language-preference'

function isLanguage(value: string | null): value is Language {
  return languages.some((language) => language === value)
}

function readLanguagePreference(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(storageKey)
    return isLanguage(storedLanguage) ? storedLanguage : 'en'
  } catch {
    return 'en'
  }
}

export function useLanguagePreference() {
  const [language, setLanguage] = useState<Language>(readLanguagePreference)

  const updateLanguage = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage)

    try {
      window.localStorage.setItem(storageKey, nextLanguage)
    } catch {
      // Continue with the in-memory preference when storage is unavailable.
    }
  }, [])

  useEffect(() => {
    const syncLanguagePreference = (event: StorageEvent) => {
      if (event.key === storageKey && isLanguage(event.newValue)) {
        setLanguage(event.newValue)
      }
    }

    window.addEventListener('storage', syncLanguagePreference)
    return () => window.removeEventListener('storage', syncLanguagePreference)
  }, [])

  return { language, updateLanguage }
}
