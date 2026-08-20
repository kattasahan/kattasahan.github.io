import { lazy, Suspense, useEffect } from 'react'
import { LanguageToggle } from './components/LanguageToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { ProfileCard } from './components/ProfileCard'
import { getContent } from './data/content'
import { useLanguagePreference } from './hooks/useLanguagePreference'
import { useThemePreference } from './hooks/useThemePreference'

const AboutPanel = lazy(() => import('./components/AboutPanel').then(({ AboutPanel: Panel }) => ({ default: Panel })))
const ExperiencePanel = lazy(() => import('./components/ExperiencePanel').then(({ ExperiencePanel: Panel }) => ({ default: Panel })))

function App() {
  const { theme, updateTheme } = useThemePreference()
  const { language, updateLanguage } = useLanguagePreference()
  const content = getContent(language)

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.title = content.metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.metadata.description)
  }, [content])

  return (
    <main
      id="main-content"
      data-theme={theme}
      className="group min-h-screen bg-canvas text-ink data-[theme=dark]:bg-ink data-[theme=dark]:text-zinc-50"
    >
      <nav aria-label={content.ui.controlsLabel} className="absolute right-2 top-2 z-10 flex">
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
