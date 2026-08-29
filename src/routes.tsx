import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import type { PortfolioContent } from '@/data/repositories/portfolioRepository'
import { PortfolioLayout } from '@/shell/components/PortfolioLayout'

const projectPages = {
  'healthcare-data-validation': lazy(() => import('@/projects/healthcare-data-validation').then(({ HealthcareDataValidationPage: Page }) => ({ default: Page }))),
  'network-data-automation': lazy(() => import('@/projects/network-data-automation').then(({ NetworkDataAutomationPage: Page }) => ({ default: Page }))),
  promptopia: lazy(() => import('@/projects/promptopia').then(({ PromptopiaPage: Page }) => ({ default: Page }))),
}

type AppRoutesProps = {
  content: PortfolioContent
}

function ProjectRoute({ content }: AppRoutesProps) {
  const { slug } = useParams()
  const project = content.work.items.find((item) => item.slug === slug)
  const ProjectPage = project ? projectPages[project.slug as keyof typeof projectPages] : undefined

  if (!ProjectPage || !project) return <Navigate to="/" replace />

  return (
    <Suspense fallback={null}>
      <ProjectPage content={content} project={project} />
    </Suspense>
  )
}

export function AppRoutes({ content }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<PortfolioLayout content={content} />} />
      <Route path="/work/:slug" element={<ProjectRoute content={content} />} />
      <Route path="*" element={<ProjectRoute content={content} />} />
    </Routes>
  )
}
