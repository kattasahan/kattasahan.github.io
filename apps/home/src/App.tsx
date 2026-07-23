import { useEffect, useState, type CSSProperties } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  colorTokens,
  motionTokens,
  spacingTokens,
  typographyTokens,
  type ColorTheme,
} from '@portfolio/tokens'
import { Button, LinkButton, ThemeProvider } from '@portfolio/ui'
import { homeRouterPath, route } from './routes'

interface Perspective {
  ornament: string
  ornamentLabel: string
  title: string
  description: string
  href: string
  action: string
  supportingTitle?: string
}

type HomeStyle = CSSProperties & Record<`--${string}`, string>

const perspectives: Perspective[] = [
  {
    ornament: '01',
    ornamentLabel: 'First perspective',
    title: 'Workspace',
    description: 'See how I build.',
    href: route('workspace'),
    action: 'Enter Workspace',
  },
  {
    ornament: '“',
    ornamentLabel: 'Second perspective',
    title: 'Journal',
    description: 'Read the story.',
    href: route('journal'),
    action: 'Enter Journal',
  },
  {
    ornament: '',
    ornamentLabel: 'Third perspective',
    title: 'Editorial',
    description: 'Notice the details.',
    href: route('editorial'),
    action: 'Enter Editorial',
    supportingTitle: 'Notice the details.',
  },
  {
    ornament: '04',
    ornamentLabel: 'Fourth perspective',
    title: 'Calm',
    description: 'Slow down.',
    href: route('calm'),
    action: 'Enter Calm',
  },
]

function getInitialTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function HomeLanding() {
  const [theme, setTheme] = useState<ColorTheme>(getInitialTheme)
  const color = colorTokens[theme]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const pageStyle: HomeStyle = {
    '--home-border': color.border,
    '--home-background': color.background,
    '--home-focus': color.focus,
    '--home-muted': color.textMuted,
    '--home-surface': color.surface,
    '--home-text': color.text,
    '--home-space-1': spacingTokens[1],
    '--home-space-2': spacingTokens[2],
    '--home-space-3': spacingTokens[3],
    '--home-space-4': spacingTokens[4],
    '--home-space-6': spacingTokens[6],
    '--home-space-8': spacingTokens[8],
    '--home-space-10': spacingTokens[10],
    '--home-space-16': spacingTokens[16],
    '--home-motion': motionTokens.duration.normal,
    '--home-easing': motionTokens.easing.standard,
    backgroundColor: color.background,
    color: color.text,
    fontFamily: typographyTokens.fontFamily.sans,
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="home" style={pageStyle}>
        <header className="home__header">
          <a className="home__wordmark" href={route('home')}>Sahan Katta</a>
          <Button
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="home__themeToggle"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            theme={theme}
            variant="ghost"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </Button>
        </header>

        <main>
          <section className="home__hero" aria-labelledby="home-title">
            <p className="home__kicker">Independent engineer</p>
            <div className="home__heroIdentity">
              <h1 id="home-title">Sahan<br />Katta</h1>
              <p className="home__heroStatement">I build digital products that feel simpler than they are.</p>
              <a aria-label="Choose a perspective" className="home__heroArrow" href="#perspectives"><span aria-hidden="true">↓</span></a>
            </div>
            <div className="home__heroFooter">
              <p>Four perspectives, one practice.</p>
              <a className="home__scrollCue" href="#perspectives">Choose a perspective <span aria-hidden="true">↓</span></a>
            </div>
          </section>

          <section className="home__intro" aria-labelledby="perspectives-title">
            <p className="home__sectionLabel">The portfolio</p>
            <h2 id="perspectives-title">Choose your<br />perspective</h2>
          </section>

          <section className="home__perspectives" id="perspectives" aria-label="Portfolio perspectives">
            {perspectives.map((perspective) => (
              <article className={`home__chapter home__chapter--${perspective.title.toLowerCase()}`} key={perspective.href}>
                <div aria-label={perspective.ornamentLabel} className="home__chapterOrnament" role="img">
                  <span>{perspective.ornament}</span>
                </div>
                <div className="home__chapterTitle">
                  <h3>{perspective.title}</h3>
                  {perspective.supportingTitle ? <p>{perspective.supportingTitle}</p> : null}
                </div>
                <div className="home__chapterDetail">
                  <p>{perspective.description}</p>
                  <LinkButton
                    className="home__chapterLink"
                    href={perspective.href}
                    style={{ borderRadius: '0', minHeight: 'auto', padding: '0' }}
                    theme={theme}
                    variant="ghost"
                  >
                    {perspective.action} <span aria-hidden="true">→</span>
                  </LinkButton>
                </div>
              </article>
            ))}
          </section>

          <section className="home__journal" aria-labelledby="journal-title">
            <p className="home__sectionLabel">Engineering Journal</p>
            <div className="home__journalGrid">
              <div>
                <h2 id="journal-title">How this portfolio<br />was built.</h2>
                <LinkButton
                  className="home__journalLink"
                  href={route('notes')}
                  style={{ borderRadius: '0', minHeight: 'auto', padding: '0' }}
                  theme={theme}
                  variant="ghost"
                >
                  Read the process <span aria-hidden="true">→</span>
                </LinkButton>
              </div>
              <p className="home__journalDescription">A behind-the-scenes look<br />at the ideas, decisions and<br />engineering behind this site.</p>
            </div>
          </section>
        </main>

        <footer className="home__footer"><p>Made with intention in India.</p><span aria-hidden="true" className="home__footerDot" /></footer>
      </div>
    </ThemeProvider>
  )
}

export function App() {
  return (
    <Routes>
      <Route path={homeRouterPath('home')} element={<HomeLanding />} />
    </Routes>
  )
}
