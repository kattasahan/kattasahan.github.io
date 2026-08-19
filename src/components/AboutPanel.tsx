import { motion, useReducedMotion } from 'motion/react'
import type { ComponentType, SVGProps } from 'react'
import {
  Angular,
  Cypress,
  Figma,
  JavaScript,
  Nextjs,
  ReactDark,
  TailwindCSS,
  TypeScript,
} from '@ridemountainpig/svgl-react'
import type { PortfolioContent } from '../data/content'

type AboutPanelProps = {
  content: PortfolioContent
}

type TechnologyLogo = ComponentType<SVGProps<SVGSVGElement>>

const technologyLogos: Record<string, TechnologyLogo> = {
  angular: Angular,
  cypress: Cypress,
  figma: Figma,
  javascript: JavaScript,
  nextjs: Nextjs,
  react: ReactDark,
  tailwind: TailwindCSS,
  typescript: TypeScript,
}

export function AboutPanel({ content }: AboutPanelProps) {
  const reduceMotion = useReducedMotion()
  const { about } = content

  return (
    <motion.section
      id="about-panel"
      aria-labelledby="about-title"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut', delay: reduceMotion ? 0 : 0.05 }}
      className="w-full rounded-xl border border-[#ddd9d1] bg-surface p-5 text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-6 lg:max-w-[42rem] lg:rounded-2xl group-data-[theme=dark]:border-zinc-700 group-data-[theme=dark]:bg-[#22211f] group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:shadow-none"
    >
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
        {about.label}
      </p>
      <h2 id="about-title" className="mt-3 max-w-[18ch] text-balance text-[clamp(1.5rem,4vw,2.25rem)] font-[650] leading-[1.05] tracking-[-0.04em]">
        {about.title}
      </h2>
      <p className="mt-4 max-w-prose text-pretty hyphens-auto text-justify text-[0.9375rem] leading-6 text-zinc-600 group-data-[theme=dark]:text-zinc-300">
        {about.description}
      </p>

      <section id="tech-stack" aria-labelledby="tech-stack-label" className="mt-7 border-t border-[#ddd9d1] pt-4 group-data-[theme=dark]:border-zinc-700">
        <p id="tech-stack-label" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
          {about.techStackLabel}
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-x-6 min-[320px]:grid-cols-2 sm:grid-cols-3">
          {about.techStack.map((technology) => {
            const Logo = technology.logo ? technologyLogos[technology.logo] : undefined

            return (
              <li key={technology.name} className="flex min-w-0 items-center gap-2 py-2 text-[0.875rem] tracking-[-0.01em]">
                {Logo && (
                  <Logo
                    className={`size-4 shrink-0 ${technology.logo === 'nextjs' ? 'group-data-[theme=dark]:invert' : ''}`}
                    aria-hidden="true"
                  />
                )}
                <span className="truncate">{technology.name}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </motion.section>
  )
}
