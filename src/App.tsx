import { useEffect } from 'react'
import { AboutPanel } from './components/AboutPanel'
import { LanguageToggle } from './components/LanguageToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { ProfileCard } from './components/ProfileCard'
import { getContent } from './data/content'
import { useLanguagePreference } from './hooks/useLanguagePreference'
import { useThemePreference } from './hooks/useThemePreference'

function App() {
  const { theme, updateTheme } = useThemePreference()
  const { language, updateLanguage } = useLanguagePreference()
  const content = getContent(language)

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.title = content.metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content.metadata.description)
  }, [content])

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    let registration: ServiceWorkerRegistration | undefined

    void navigator.serviceWorker.register('/service-worker.js')
      .then((registeredWorker) => {
        registration = registeredWorker
      })
      .catch(() => {
        // The site remains fully functional when service workers are unavailable.
      })

    const clearImageCache = () => {
      const worker = navigator.serviceWorker.controller ?? registration?.active ?? registration?.waiting
      worker?.postMessage({ type: 'CLEAR_IMAGE_CACHE' })
    }

    window.addEventListener('pagehide', clearImageCache)
    return () => window.removeEventListener('pagehide', clearImageCache)
  }, [])

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
        <aside id="profile-panel" aria-label={content.ui.profileLabel} className="w-full shrink-0 sm:w-70">
          <ProfileCard content={content} />
        </aside>
        <AboutPanel content={content} />
      </div>
    </main>
  )
}

export default App
