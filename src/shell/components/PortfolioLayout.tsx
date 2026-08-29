import { lazy, Suspense } from 'react'
import type { PortfolioContent } from '@/data/repositories/portfolioRepository'
import { ProfileCard } from '@/shell/components/ProfileCard'
import { WorkPanel } from '@/shell/components/WorkPanel'

const AboutPanel = lazy(() => import('./AboutPanel').then(({ AboutPanel: Panel }) => ({ default: Panel })))
const ExperiencePanel = lazy(() => import('./ExperiencePanel').then(({ ExperiencePanel: Panel }) => ({ default: Panel })))

type PortfolioLayoutProps = {
  content: PortfolioContent
}

export function PortfolioLayout({ content }: PortfolioLayoutProps) {
  return (
    <div id="portfolio-layout" className="flex min-h-screen flex-col items-start gap-2 p-2 pt-14 sm:gap-3 sm:p-3 lg:flex-row lg:justify-center">
      <aside id="profile-panel" aria-label={content.ui.profileLabel} className="w-full shrink-0 lg:w-70">
        <ProfileCard content={content} />
      </aside>
      <section id="content-panels" aria-label={content.ui.aboutPanelLabel} className="w-full space-y-3 lg:max-w-2xl">
        <Suspense fallback={null}>
          <AboutPanel content={content} />
          <ExperiencePanel content={content} />
        </Suspense>
        <WorkPanel content={content} />
      </section>
    </div>
  )
}
