import {
  createContext,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { colorTokens } from '@portfolio/tokens'
import { themeManager, type Theme } from './manager'

export interface ThemeState {
  color: (typeof colorTokens)[Theme]
  setTheme: (theme: Theme) => void
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeState | null>(null)

function useManagedTheme(): ThemeState {
  const theme = useSyncExternalStore(
    themeManager.subscribe,
    themeManager.getTheme,
    themeManager.getTheme,
  )

  return {
    color: colorTokens[theme],
    setTheme: themeManager.setTheme,
    theme,
    toggleTheme: themeManager.toggleTheme,
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const state = useManagedTheme()

  useLayoutEffect(() => {
    themeManager.initialize()
  }, [])

  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
}

export function useTheme(themeOverride?: Theme): ThemeState {
  const managedState = useManagedTheme()
  const contextState = useContext(ThemeContext)
  const state = contextState ?? managedState
  const theme = themeOverride ?? state.theme

  return theme === state.theme ? state : { ...state, color: colorTokens[theme], theme }
}
