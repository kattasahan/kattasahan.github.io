import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import type { PortfolioContent } from '../data/content'

type ExperiencePanelProps = {
  content: PortfolioContent
}

export function ExperiencePanel({ content }: ExperiencePanelProps) {
  const { about } = content
  const [openExperiences, setOpenExperiences] = useState<string[]>([])
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="experience"
      aria-labelledby="experience-label"
      className="w-full rounded-xl border border-[#ddd9d1] bg-surface p-5 text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-6 lg:rounded-2xl group-data-[theme=dark]:border-zinc-700 group-data-[theme=dark]:bg-[#22211f] group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:shadow-none"
    >
      <p id="experience-label" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
        {about.experienceLabel}
      </p>
      <ol className="mt-3 divide-y divide-[#e5e1da] group-data-[theme=dark]:divide-zinc-700">
        {about.experience.map((entry, index) => {
          const entryId = `experience-entry-${index}`
          const isOpen = openExperiences.includes(entryId)

          return (
            <li key={`${entry.company}-${entry.dates}`} className="py-3 first:pt-0 last:pb-0">
              <button
                id={`${entryId}-trigger`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={entryId}
                onClick={() => setOpenExperiences((openEntries) => (
                  isOpen ? openEntries.filter((openEntry) => openEntry !== entryId) : [...openEntries, entryId]
                ))}
                className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h2 className="text-[1rem] tracking-[-0.015em]">{entry.company}</h2>
                  <span className="flex items-center gap-2 text-[0.8125rem] text-zinc-500 group-data-[theme=dark]:text-zinc-400">
                    {entry.dates}
                    <ChevronDown className={`size-3.5 transition-transform duration-150 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-1 text-[0.9375rem] font-medium leading-5 tracking-[-0.01em] text-zinc-800 group-data-[theme=dark]:text-zinc-200">{entry.role}</p>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={entryId}
                    role="region"
                    aria-labelledby={`${entryId}-trigger`}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3">
                      <p className="text-pretty hyphens-auto text-justify text-[0.9375rem] leading-6 text-zinc-600 group-data-[theme=dark]:text-zinc-300">{entry.description}</p>
                      <ul className="mt-3 list-disc space-y-2 pl-4 text-pretty text-[0.875rem] leading-[1.55] text-zinc-500 marker:text-accent group-data-[theme=dark]:text-zinc-400">
                        {entry.details.map((detail) => <li key={detail}>{detail}</li>)}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
