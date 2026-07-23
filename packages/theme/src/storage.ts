import type { ColorTheme } from '@portfolio/tokens'

export const themeStorageKey = 'sahan-katta-portfolio-theme'

function isTheme(value: string | null): value is ColorTheme {
  return value === 'light' || value === 'dark'
}

export function readStoredTheme(): ColorTheme | null {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(themeStorageKey)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

export function persistTheme(theme: ColorTheme): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(themeStorageKey, theme)
  } catch {
    // A private or restricted browser context can deny storage. The in-memory theme still works.
  }
}
