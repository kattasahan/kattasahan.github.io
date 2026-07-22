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
import { gatewayRouterPath, route } from './routes'

interface Experience {
  title: string
  index: string
  lens: string
  description: string
  href: string
  action: string
}

type GatewayStyle = CSSProperties & Record<`--${string}`, string>

const experiences: Experience[] = [
  {
    title: 'Workspace',
    index: '01',
    lens: 'The work, considered',
    description: 'A product-minded view of systems, decisions, and the care behind useful digital work.',
    href: route('workspace'),
    action: 'Enter Workspace',
  },
  {
    title: 'Journal',
    index: '02',
    lens: 'Stories in progress',
    description: 'A slower place for observations, process, and the moments that give the work its point of view.',
    href: route('journal'),
    action: 'Open Journal',
  },
  {
    title: 'Editorial',
    index: '03',
    lens: 'Language as interface',
    description: 'A reading-led experience shaped by hierarchy, rhythm, and the quiet force of well-chosen words.',
    href: route('editorial'),
    action: 'Read Editorial',
  },
  {
    title: 'Calm',
    index: '04',
    lens: 'Room to pause',
    description: 'A pared-back space for atmosphere, reflection, and motion that never asks for more attention than it earns.',
    href: route('calm'),
    action: 'Find Calm',
  },
  {
    title: 'Notes',
    index: '05',
    lens: 'The making of it',
    description: 'An open journal about the architecture, design decisions, accessibility, and lessons behind this portfolio.',
    href: route('notes'),
    action: 'Read the notes',
  },
]

function getInitialTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function GatewayLanding() {
  const [theme, setTheme] = useState<ColorTheme>(getInitialTheme)
  const color = colorTokens[theme]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const pageStyle: GatewayStyle = {
    '--gateway-background': color.background,
    '--gateway-border': color.border,
    '--gateway-focus': color.focus,
    '--gateway-muted': color.textMuted,
    '--gateway-subtle': color.textSubtle,
    '--gateway-text': color.text,
    '--gateway-space-1': spacingTokens[1],
    '--gateway-space-2': spacingTokens[2],
    '--gateway-space-3': spacingTokens[3],
    '--gateway-space-4': spacingTokens[4],
    '--gateway-space-6': spacingTokens[6],
    '--gateway-space-10': spacingTokens[10],
    '--gateway-space-16': spacingTokens[16],
    '--gateway-motion': motionTokens.duration.normal,
    '--gateway-easing': motionTokens.easing.standard,
    backgroundColor: color.background,
    color: color.text,
    fontFamily: typographyTokens.fontFamily.sans,
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="gateway" style={pageStyle}>
        <header className="gateway__header">
          <a className="gateway__wordmark" href={route('gateway')}>
            Sahan Katta
          </a>
          <div className="gateway__headerActions">
            <a className="gateway__notesLink" href={route('notes')}>Notes</a>
            <Button
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="gateway__themeToggle"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              theme={theme}
              variant="ghost"
            >
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </header>

        <main>
          <section className="gateway__hero" aria-labelledby="gateway-title">
            <p className="gateway__kicker">Independent designer &amp; builder</p>
            <h1 id="gateway-title">Sahan<br />Katta</h1>
            <div className="gateway__heroFooter">
              <p>
                A portfolio of thoughtful digital experiences, each offering a different way to meet the work.
              </p>
              <a className="gateway__scrollCue" href="#experiences">Explore the collection <span aria-hidden="true">↓</span></a>
            </div>
          </section>

          <section className="gateway__intro" aria-labelledby="experiences-title">
            <p className="gateway__sectionLabel">Selected perspectives</p>
            <h2 id="experiences-title">One practice.<br />Five ways in.</h2>
          </section>

          <section className="gateway__experiences" id="experiences" aria-label="Portfolio experiences">
            {experiences.map((experience) => (
              <article className="gateway__chapter" key={experience.href}>
                <p className="gateway__chapterIndex">{experience.index}</p>
                <div className="gateway__chapterHeading">
                  <p className="gateway__chapterLens">{experience.lens}</p>
                  <h3>{experience.title}</h3>
                </div>
                <div className="gateway__chapterDetail">
                  <p>{experience.description}</p>
                  <LinkButton
                    className="gateway__chapterLink"
                    href={experience.href}
                    style={{ borderRadius: '0', minHeight: 'auto', padding: '0' }}
                    theme={theme}
                    variant="ghost"
                  >
                    {experience.action} <span aria-hidden="true">↗</span>
                  </LinkButton>
                </div>
              </article>
            ))}
          </section>
        </main>

        <footer className="gateway__footer">
          <p>Made with intention in India.</p>
          <a href={route('notes')}>How this was made <span aria-hidden="true">↗</span></a>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export function App() {
  return (
    <Routes>
      <Route path={gatewayRouterPath('gateway')} element={<GatewayLanding />} />
    </Routes>
  )
}
