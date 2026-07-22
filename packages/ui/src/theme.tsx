import {
  colorTokens,
  motionTokens,
  radiusTokens,
  shadowTokens,
  spacingTokens,
  typographyTokens,
  type ColorTheme,
} from '@portfolio/tokens'
import { createContext, useContext, type CSSProperties, type ReactNode } from 'react'

export type Theme = ColorTheme

const ThemeContext = createContext<Theme>('light')

export interface ThemeProviderProps {
  theme: Theme
  children: ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export function useTheme(theme?: Theme) {
  const contextTheme = useContext(ThemeContext)
  const resolvedTheme = theme ?? contextTheme

  return {
    theme: resolvedTheme,
    color: colorTokens[resolvedTheme],
  }
}

export function focusRing(color: string): CSSProperties {
  return {
    outline: `3px solid ${color}`,
    outlineOffset: '2px',
  }
}

export const sharedStyles = {
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  shadow: shadowTokens,
  motion: motionTokens,
} as const
