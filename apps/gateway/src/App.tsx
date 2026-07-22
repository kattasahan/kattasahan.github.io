import { useEffect, useState } from 'react'
import {
  colorTokens,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
  type ColorTheme,
} from '@portfolio/tokens'
import {
  Button,
  Card,
  ExperienceSwitcher,
  LinkButton,
  Navbar,
  ThemeProvider,
} from '@portfolio/ui'

interface Experience {
  title: string
  eyebrow: string
  description: string
  href: string
}

const experiences: Experience[] = [
  {
    title: 'Workspace',
    eyebrow: 'Product-minded',
    description: 'A focused view of systems, decisions, and the work behind useful products.',
    href: '/workspace/',
  },
  {
    title: 'Journal',
    eyebrow: 'Storytelling',
    description: 'A slower, narrative-led space for the ideas and moments that shape the work.',
    href: '/journal/',
  },
  {
    title: 'Editorial',
    eyebrow: 'Typography-first',
    description: 'A reading experience where hierarchy, pace, and language are the interface.',
    href: '/editorial/',
  },
  {
    title: 'Calm',
    eyebrow: 'Quietly immersive',
    description: 'A pared-back retreat built around atmosphere, reflection, and considered motion.',
    href: '/calm/',
  },
]

function getInitialTheme(): ColorTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function App() {
  const [theme, setTheme] = useState<ColorTheme>(getInitialTheme)
  const color = colorTokens[theme]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const switcherItems = experiences.map(({ href, title }) => ({ href, label: title }))

  return (
    <ThemeProvider theme={theme}>
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
            <a href="/" style={{ color: color.text, fontWeight: typographyTokens.fontWeight.semibold, textDecoration: 'none' }}>
              Sahan Katta
            </a>
          }
          items={[{ href: '/notes/', label: 'Build notes' }]}
          theme={theme}
        >
          <Button
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            theme={theme}
            variant="secondary"
          >
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>
        </Navbar>

        <main style={{ margin: '0 auto', maxWidth: '76rem', padding: `${spacingTokens[6]} ${spacingTokens[3]}` }}>
          <section aria-labelledby="gateway-title" style={{ maxWidth: '50rem' }}>
            <p
              style={{
                color: color.textMuted,
                fontSize: typographyTokens.fontSize.sm,
                fontWeight: typographyTokens.fontWeight.semibold,
                letterSpacing: typographyTokens.letterSpacing.wide,
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Four ways to look at the work
            </p>
            <h1
              id="gateway-title"
              style={{
                fontSize: `clamp(${typographyTokens.fontSize['4xl']}, 8vw, ${typographyTokens.fontSize['6xl']})`,
                letterSpacing: typographyTokens.letterSpacing.tight,
                lineHeight: typographyTokens.lineHeight.tight,
                margin: `${spacingTokens[2]} 0 0`,
              }}
            >
              Choose a point of view.
            </h1>
            <p
              style={{
                color: color.textMuted,
                fontSize: typographyTokens.fontSize.lg,
                lineHeight: typographyTokens.lineHeight.relaxed,
                margin: `${spacingTokens[2]} 0 0`,
                maxWidth: '40rem',
              }}
            >
              This is a gateway, not a catalog. Each space below tells the same story through a different lens.
            </p>
          </section>

          <section aria-label="Experience shortcuts" style={{ marginTop: spacingTokens[4] }}>
            <ExperienceSwitcher items={switcherItems} theme={theme} />
          </section>

          <section aria-labelledby="experiences-title" style={{ marginTop: spacingTokens[5] }}>
            <h2 id="experiences-title" style={{ fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.semibold, letterSpacing: typographyTokens.letterSpacing.wide, margin: 0, textTransform: 'uppercase' }}>
              Experiences
            </h2>
            <div
              style={{
                display: 'grid',
                gap: spacingTokens[2],
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
                marginTop: spacingTokens[2],
              }}
            >
              {experiences.map((experience) => (
                <Card
                  as="article"
                  elevated
                  key={experience.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '18rem',
                    transition: `box-shadow ${motionTokens.duration.normal} ${motionTokens.easing.standard}, transform ${motionTokens.duration.normal} ${motionTokens.easing.standard}`,
                  }}
                  theme={theme}
                >
                  <p
                    style={{
                      color: color.textMuted,
                      fontSize: typographyTokens.fontSize.sm,
                      fontWeight: typographyTokens.fontWeight.medium,
                      margin: 0,
                    }}
                  >
                    {experience.eyebrow}
                  </p>
                  <h3
                    style={{
                      fontSize: typographyTokens.fontSize['2xl'],
                      letterSpacing: typographyTokens.letterSpacing.tight,
                      margin: `${spacingTokens[1]} 0 0`,
                    }}
                  >
                    {experience.title}
                  </h3>
                  <p style={{ color: color.textMuted, lineHeight: typographyTokens.lineHeight.relaxed, margin: `${spacingTokens[1]} 0 0` }}>
                    {experience.description}
                  </p>
                  <LinkButton href={experience.href} style={{ alignSelf: 'start', marginTop: 'auto' }} theme={theme} variant="ghost">
                    Enter {experience.title}
                  </LinkButton>
                </Card>
              ))}
            </div>
          </section>

          <section
            aria-label="How this portfolio was made"
            style={{
              backgroundColor: color.surface,
              border: `1px solid ${color.border}`,
              borderRadius: radiusTokens.lg,
              marginTop: spacingTokens[5],
              padding: spacingTokens[3],
            }}
          >
            <p style={{ color: color.textMuted, margin: 0 }}>For builders</p>
            <h2 style={{ fontSize: typographyTokens.fontSize['2xl'], letterSpacing: typographyTokens.letterSpacing.tight, margin: `${spacingTokens[1]} 0 0` }}>
              Follow the decisions behind the work.
            </h2>
            <p style={{ color: color.textMuted, lineHeight: typographyTokens.lineHeight.relaxed, margin: `${spacingTokens[1]} 0 0`, maxWidth: '42rem' }}>
              The notes are an article series about the architecture, design system, accessibility, motion, and lessons learned while making this portfolio.
            </p>
            <LinkButton href="/notes/" style={{ marginTop: spacingTokens[2] }} theme={theme} variant="secondary">
              Read the build notes
            </LinkButton>
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}
