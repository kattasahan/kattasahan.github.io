import { type ReactNode } from 'react'
import { motionTokens, typographyTokens } from '@portfolio/tokens'
import { useTheme } from '@portfolio/theme'
import { Button, Navbar } from '@portfolio/ui'
import type { WorkspaceRoute } from '@portfolio/routes'
import { route } from '../../routes'
import { PageContainer } from '../PageContainer/PageContainer'
import { WorkspaceFooter } from '../WorkspaceFooter/WorkspaceFooter'
import { WorkspaceNavigation } from '../WorkspaceNavigation/WorkspaceNavigation'

export interface AppShellProps {
  activeRoute?: WorkspaceRoute
  children: ReactNode
  onNavigate: (route: WorkspaceRoute) => void
}

export function AppShell({ activeRoute, children, onNavigate }: AppShellProps) {
  const { color, theme, toggleTheme } = useTheme()

  return (
    <div
      style={{
        backgroundColor: color.background,
        color: color.text,
        fontFamily: typographyTokens.fontFamily.sans,
        minHeight: '100vh',
        transition: `background-color ${motionTokens.duration.normal} ${motionTokens.easing.standard}, color ${motionTokens.duration.normal} ${motionTokens.easing.standard}`,
      }}
    >
      <Navbar
        brand={
          <a
            href={route('workspace')}
            style={{
              color: color.text,
              fontWeight: typographyTokens.fontWeight.semibold,
              textDecoration: 'none',
            }}
          >
            Workspace
          </a>
        }
        items={[
          { href: route('home'), label: 'Portfolio' },
          { href: route('notes'), label: 'Notes' },
        ]}
        theme={theme}
      >
        <Button
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          onClick={toggleTheme}
          theme={theme}
          variant="secondary"
        >
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </Button>
      </Navbar>
      <PageContainer>
        <WorkspaceNavigation activeRoute={activeRoute} onNavigate={onNavigate} theme={theme} />
        {children}
      </PageContainer>
      <WorkspaceFooter theme={theme} />
    </div>
  )
}
