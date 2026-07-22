import { useEffect, useState, type ReactNode } from 'react'
import { colorTokens, motionTokens, typographyTokens, type ColorTheme } from '@portfolio/tokens'
import { Button, Navbar, ThemeProvider } from '@portfolio/ui'
import type { WorkspaceRoute } from '@portfolio/config/routes'
import { route } from '../../routes'
import { PageContainer } from '../PageContainer/PageContainer'
import { WorkspaceFooter } from '../WorkspaceFooter/WorkspaceFooter'
import { WorkspaceNavigation } from '../WorkspaceNavigation/WorkspaceNavigation'

function initialTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export interface AppShellProps {
  activeRoute?: WorkspaceRoute
  children: ReactNode
  onNavigate: (route: WorkspaceRoute) => void
}

export function AppShell({ activeRoute, children, onNavigate }: AppShellProps) {
  const [theme, setTheme] = useState<ColorTheme>(initialTheme)
  const color = colorTokens[theme]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: color.background, color: color.text, fontFamily: typographyTokens.fontFamily.sans, minHeight: '100vh', transition: `background-color ${motionTokens.duration.normal} ${motionTokens.easing.standard}, color ${motionTokens.duration.normal} ${motionTokens.easing.standard}` }}>
        <Navbar
          brand={<a href={route('workspace')} style={{ color: color.text, fontWeight: typographyTokens.fontWeight.semibold, textDecoration: 'none' }}>Workspace</a>}
          items={[{ href: route('gateway'), label: 'Portfolio' }, { href: route('notes'), label: 'Notes' }]}
          theme={theme}
        >
          <Button aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} theme={theme} variant="secondary">
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>
        </Navbar>
        <PageContainer>
          <WorkspaceNavigation activeRoute={activeRoute} onNavigate={onNavigate} theme={theme} />
          {children}
        </PageContainer>
        <WorkspaceFooter theme={theme} />
      </div>
    </ThemeProvider>
  )
}
