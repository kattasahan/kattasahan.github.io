import { lazy, Suspense, useEffect, type CSSProperties } from 'react'
import { AccentColorToggle } from './components/AccentColorToggle'
import { LanguageToggle } from './components/LanguageToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { ProfileCard } from './components/ProfileCard'
import { accents } from './data/accents'
import { getContent } from './data/content'
import { useAccentPreference } from './hooks/useAccentPreference'
import { useLanguagePreference } from './hooks/useLanguagePreference'
import { useThemePreference } from './hooks/useThemePreference'

const AboutPanel = lazy(() => import('./components/AboutPanel').then(({ AboutPanel: Panel }) => ({ default: Panel })))
const ExperiencePanel = lazy(() => import('./components/ExperiencePanel').then(({ ExperiencePanel: Panel }) => ({ default: Panel })))

function App() {
  const { theme, updateTheme } = useThemePreference()
  const { language, updateLanguage } = useLanguagePreference()
  const { accent, updateAccent } = useAccentPreference()
  const content = getContent(language)
  const accentColors = accents[accent]

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.title = content.metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.metadata.description)
  }, [content])

  return (
    <main
      id="main-content"
      data-theme={theme}
      className="group min-h-screen bg-canvas text-ink data-[theme=dark]:bg-[#0a0a0a] data-[theme=dark]:text-neutral-50"
      style={{ '--color-accent': accentColors.light, '--color-accent-dark': accentColors.dark } as CSSProperties}
    >
      <nav aria-label={content.ui.controlsLabel} className="absolute right-2 top-2 z-10 flex items-center gap-1">
        <AccentColorToggle accent={accent} onAccentChange={updateAccent} label={content.ui.accent.label} options={content.ui.accent.options} />
        <LanguageToggle language={language} onLanguageChange={updateLanguage} label={content.ui.language.switchTo} />
        <ThemeToggle theme={theme} onThemeChange={updateTheme} labels={content.ui.theme} />
      </nav>
      <div id="portfolio-layout" className="flex min-h-screen flex-col items-start gap-2 p-2 pt-14 sm:gap-3 sm:p-3 lg:flex-row lg:justify-center">
        <aside id="profile-panel" aria-label={content.ui.profileLabel} className="w-full shrink-0 lg:w-70">
          <ProfileCard content={content} />
        </aside>
        <section id="content-panels" aria-label={content.ui.aboutPanelLabel} className="w-full space-y-3 lg:max-w-2xl">
          <Suspense fallback={null}>
            <AboutPanel content={content} />
            <ExperiencePanel content={content} />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

export default App
