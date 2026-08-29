import type { PortfolioContent } from '@/data/repositories/portfolioRepository'

export type WorkItem = PortfolioContent['work']['items'][number]

export type ProjectPageProps = {
  content: PortfolioContent
  project: WorkItem
}
