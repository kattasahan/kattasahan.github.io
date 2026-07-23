import { type ReactNode } from 'react'
import { motionTokens, spacingTokens, typographyTokens } from '@portfolio/tokens'
import { useTheme } from '@portfolio/theme'
import { Button, Navbar } from '@portfolio/ui'
import { route } from './routes'

export function NotesShell({ children }: { children: ReactNode }) {
  const { color, theme, toggleTheme } = useTheme()

  return (
    <div
      className="notes-shell"
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
            href={route('home')}
            style={{
              color: color.text,
              fontWeight: typographyTokens.fontWeight.semibold,
              textDecoration: 'none',
            }}
          >
            Sahan Katta
          </a>
        }
        items={[{ href: route('notes'), label: 'Notes', current: true }]}
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
      <main
        style={{
          margin: '0 auto',
          maxWidth: '74rem',
          padding: `${spacingTokens[5]} ${spacingTokens[3]} ${spacingTokens[6]}`,
        }}
      >
        {children}
      </main>
    </div>
  )
}
