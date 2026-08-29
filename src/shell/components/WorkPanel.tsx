import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { PortfolioContent } from '@/data/repositories/portfolioRepository'

type WorkPanelProps = {
  content: PortfolioContent
}

export function WorkPanel({ content }: WorkPanelProps) {
  const reduceMotion = useReducedMotion()
  const { work } = content

  return (
    <motion.section
      id="work"
      aria-labelledby="work-title"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut', delay: reduceMotion ? 0 : 0.1 }}
      className="w-full rounded-xl border border-[#e5e5e5] bg-surface p-5 text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-6 lg:rounded-2xl group-data-[theme=dark]:border-neutral-800 group-data-[theme=dark]:bg-[#0a0a0a] group-data-[theme=dark]:text-neutral-50 group-data-[theme=dark]:shadow-none"
    >
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent group-data-[theme=dark]:text-[var(--color-accent-dark)]">
        {work.label}
      </p>
      <h2 id="work-title" className="mt-3 text-balance text-[clamp(1.5rem,4vw,2.25rem)] font-[650] leading-[1.05] tracking-[-0.04em]">
        {work.title}
      </h2>
      <ul className="mt-5 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5] group-data-[theme=dark]:divide-neutral-800 group-data-[theme=dark]:border-neutral-800">
        {work.items.map((project) => (
          <li key={project.slug}>
            <Link
              to={`/work/${project.slug}`}
              className="group/work flex items-center justify-between gap-4 py-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="min-w-0">
                <span className="block text-[0.75rem] leading-5 text-neutral-500 group-data-[theme=dark]:text-neutral-400">{project.kind}</span>
                <span className="block text-[1rem] font-medium tracking-[-0.015em]">{project.title}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-[0.8125rem] text-neutral-500 transition-colors duration-150 group-hover/work:text-accent group-data-[theme=dark]:text-neutral-400 group-data-[theme=dark]:group-hover/work:text-[var(--color-accent-dark)]">
                {project.actionLabel}
                <ArrowUpRight className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
