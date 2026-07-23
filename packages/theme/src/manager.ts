import { colorTokens, type ColorTheme } from '@portfolio/tokens'
import { persistTheme, readStoredTheme, themeStorageKey } from './storage'
import { getSystemTheme } from './system'

export type Theme = ColorTheme

type ThemeListener = () => void

export function resolveTheme(): Theme {
  const storedTheme = readStoredTheme()
  const theme = storedTheme ?? getSystemTheme()

  if (!storedTheme) persistTheme(theme)

  return theme
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme

  let themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!themeColor) {
    themeColor = document.createElement('meta')
    themeColor.name = 'theme-color'
    document.head.append(themeColor)
  }

  themeColor.content = colorTokens[theme].background
}

class ThemeManager {
  private readonly listeners = new Set<ThemeListener>()
  private readonly onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey) return

    const theme = readStoredTheme()
    if (theme) this.update(theme, false)
  }
  private initialized = false
  private theme: Theme = resolveTheme()

  getTheme = (): Theme => this.theme

  initialize = (): void => {
    if (this.initialized) return

    this.initialized = true
    applyTheme(this.theme)
    window.addEventListener('storage', this.onStorage)
  }

  setTheme = (theme: Theme): void => {
    this.update(theme, true)
  }

  toggleTheme = (): void => {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light')
  }

  subscribe = (listener: ThemeListener): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private update(theme: Theme, shouldPersist: boolean): void {
    if (this.theme === theme) return

    this.theme = theme
    if (shouldPersist) persistTheme(theme)
    applyTheme(theme)
    this.listeners.forEach((listener) => listener())
  }
}

export const themeManager = new ThemeManager()
