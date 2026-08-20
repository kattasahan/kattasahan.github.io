import { Circle, Eclipse } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type Theme = 'light' | 'dark'

type ThemeToggleProps = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  labels: {
    switchToLight: string
    switchToDark: string
  }
}

export function ThemeToggle({ theme, onThemeChange, labels }: ThemeToggleProps) {
  const reduceMotion = useReducedMotion()
  const isLight = theme === 'light'

  const Icon = isLight ? Circle : Eclipse

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={() => onThemeChange(isLight ? 'dark' : 'light')}
      aria-label={isLight ? labels.switchToDark : labels.switchToLight}
      aria-pressed={!isLight}
      className="grid size-11 place-items-center bg-transparent text-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:hover:text-[#ff8a7d]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduceMotion ? false : { rotate: -90 }}
          animate={{ rotate: 0 }}
          exit={reduceMotion ? undefined : { rotate: 90 }}
          transition={{ duration: reduceMotion ? 0 : 0.14 }}
          aria-hidden="true"
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
