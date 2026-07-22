import { useEffect, useState, type ReactNode } from 'react'
import { colorTokens, motionTokens, spacingTokens, typographyTokens, type ColorTheme } from '@portfolio/tokens'
import { Button, Navbar, ThemeProvider } from '@portfolio/ui'

function initialTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function NotesShell({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ColorTheme>(initialTheme)
  const color = colorTokens[theme]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <div className="notes-shell" style={{ backgroundColor: color.background, color: color.text, fontFamily: typographyTokens.fontFamily.sans, minHeight: '100vh', transition: `background-color ${motionTokens.duration.normal} ${motionTokens.easing.standard}, color ${motionTokens.duration.normal} ${motionTokens.easing.standard}` }}>
        <Navbar
          brand={<a href="/" style={{ color: color.text, fontWeight: typographyTokens.fontWeight.semibold, textDecoration: 'none' }}>Sahan Katta</a>}
          items={[{ href: '/notes/', label: 'Notes', current: true }]}
          theme={theme}
        >
          <Button aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} theme={theme} variant="secondary">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>
        </Navbar>
        <main style={{ margin: '0 auto', maxWidth: '74rem', padding: `${spacingTokens[5]} ${spacingTokens[3]} ${spacingTokens[6]}` }}>{children}</main>
      </div>
    </ThemeProvider>
  )
}
