import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProjectPageProps } from '@/projects/types'

export function ProjectShell({ content, project }: ProjectPageProps) {
  return (
    <section id={`${project.slug}-project`} aria-labelledby="project-title" className="mx-auto w-full max-w-3xl px-5 pb-12 pt-20 sm:px-6 sm:pt-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[0.875rem] text-neutral-500 transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent group-data-[theme=dark]:text-neutral-400 group-data-[theme=dark]:hover:text-[var(--color-accent-dark)]"
      >
        <ArrowLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
        {content.ui.backToPortfolio}
      </Link>
      <header className="mt-12">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent group-data-[theme=dark]:text-[var(--color-accent-dark)]">{project.kind}</p>
        <h1 id="project-title" className="mt-3 text-balance text-[clamp(2rem,8vw,4rem)] font-[650] leading-[0.98] tracking-[-0.05em]">{project.title}</h1>
      </header>
    </section>
  )
}
