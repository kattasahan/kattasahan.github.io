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
  title: string
  index: string
  description: string
  href: string
  action: string
}

type HomeStyle = CSSProperties & Record<`--${string}`, string>

const perspectives: Perspective[] = [
  {
    title: 'Workspace',
    index: '01',
    description: 'See how I build.',
    href: route('workspace'),
    action: 'Enter',
  },
  {
    title: 'Journal',
    index: '02',
    description: 'Read the story.',
    href: route('journal'),
    action: 'Enter',
  },
  {
    title: 'Editorial',
    index: '03',
    description: 'Notice the details.',
    href: route('editorial'),
    action: 'Enter',
  },
  {
    title: 'Calm',
    index: '04',
    description: 'Slow down.',
    href: route('calm'),
    action: 'Enter',
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
    '--home-focus': color.focus,
    '--home-muted': color.textMuted,
    '--home-text': color.text,
    '--home-space-1': spacingTokens[1],
    '--home-space-2': spacingTokens[2],
    '--home-space-3': spacingTokens[3],
    '--home-space-4': spacingTokens[4],
    '--home-space-6': spacingTokens[6],
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
            <p className="home__kicker">Independent designer &amp; builder</p>
            <h1 id="home-title">Sahan<br />Katta</h1>
            <div className="home__heroFooter">
              <p>A portfolio experienced through four distinct perspectives.</p>
              <a className="home__scrollCue" href="#perspectives">Choose a perspective <span aria-hidden="true">↓</span></a>
            </div>
          </section>

          <section className="home__intro" aria-labelledby="perspectives-title">
            <p className="home__sectionLabel">The portfolio</p>
            <h2 id="perspectives-title">Choose your<br />perspective</h2>
          </section>

          <section className="home__perspectives" id="perspectives" aria-label="Portfolio perspectives">
            {perspectives.map((perspective) => (
              <article className="home__chapter" key={perspective.href}>
                <p className="home__chapterIndex">{perspective.index}</p>
                <h3>{perspective.title}</h3>
                <div className="home__chapterDetail">
                  <p>{perspective.description}</p>
                  <LinkButton
                    className="home__chapterLink"
                    href={perspective.href}
                    style={{ borderRadius: '0', minHeight: 'auto', padding: '0' }}
                    theme={theme}
                    variant="ghost"
                  >
                    {perspective.action} <span aria-hidden="true">↗</span>
                  </LinkButton>
                </div>
              </article>
            ))}
          </section>

          <section className="home__journal" aria-labelledby="journal-title">
            <p className="home__sectionLabel">Engineering Journal</p>
            <h2 id="journal-title">Curious how this portfolio was built?</h2>
            <LinkButton
              className="home__journalLink"
              href={route('notes')}
              style={{ borderRadius: '0', minHeight: 'auto', padding: '0' }}
              theme={theme}
              variant="ghost"
            >
              How I built this <span aria-hidden="true">→</span>
            </LinkButton>
          </section>
        </main>

        <footer className="home__footer"><p>Made with intention in India.</p></footer>
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
