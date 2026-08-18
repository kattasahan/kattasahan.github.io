import { useCallback, useEffect, useRef, useState } from 'react'
import { Circle, Eclipse } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export type Theme = 'light' | 'dark'

type ThemeToggleProps = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
  labels: {
    changing: string
    switchToLight: string
    switchToDark: string
  }
}

const transitionDuration = 260

export function ThemeToggle({ theme, onThemeChange, labels }: ThemeToggleProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)
  const reduceMotion = useReducedMotion()
  const isLight = theme === 'light'

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  const toggleTheme = useCallback(() => {
    if (isTransitioning) return

    const nextTheme: Theme = isLight ? 'dark' : 'light'
    setIsTransitioning(true)

    timeoutRef.current = window.setTimeout(
      () => {
        onThemeChange(nextTheme)
        setIsTransitioning(false)
      },
      reduceMotion ? 0 : transitionDuration,
    )
  }, [isLight, isTransitioning, onThemeChange, reduceMotion])

  const Icon = isLight ? Circle : Eclipse

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={isTransitioning ? labels.changing : isLight ? labels.switchToDark : labels.switchToLight}
      aria-pressed={!isLight}
      className="grid size-11 place-items-center bg-transparent text-ink transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isTransitioning ? 'transitioning' : theme}
          initial={reduceMotion ? false : { opacity: 0, rotate: -18, scale: 0.86 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, rotate: 18, scale: 0.86 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          aria-hidden="true"
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
