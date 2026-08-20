import { motion, useReducedMotion } from 'motion/react'
import type { PortfolioContent } from '../data/content'

type AboutPanelProps = {
  content: PortfolioContent
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
      className="w-full rounded-xl border border-[#ddd9d1] bg-surface p-5 text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-6 lg:rounded-2xl group-data-[theme=dark]:border-zinc-700 group-data-[theme=dark]:bg-[#22211f] group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:shadow-none"
    >
      <p className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent group-data-[theme=dark]:text-[#ff8a7d]">
        {about.label}
      </p>
      <h2 id="about-title" className="mt-3 max-w-[18ch] text-balance text-[clamp(1.5rem,4vw,2.25rem)] font-[650] leading-[1.05] tracking-[-0.04em]">
        {about.title}
      </h2>
      <p className="mt-4 max-w-prose text-pretty hyphens-auto text-justify text-[0.9375rem] leading-6 text-zinc-600 group-data-[theme=dark]:text-zinc-300">
        {about.description}
      </p>
    </motion.section>
  )
}
