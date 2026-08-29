import { Check, Palette } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { accents, type Accent } from '@/data/accents'

type AccentColorToggleProps = {
  accent: Accent
  onAccentChange: (accent: Accent) => void
  label: string
  options: Record<Accent, string>
}

export function AccentColorToggle({ accent, onAccentChange, label, options }: AccentColorToggleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const controlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsidePress = (event: MouseEvent) => {
      if (!controlRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  return (
    <div ref={controlRef} className="relative">
      <button
        id="accent-color-toggle"
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={menuId}
        title={label}
        onClick={() => setIsOpen((open) => !open)}
        className="grid size-11 place-items-center bg-transparent text-ink transition-colors duration-150 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] group-data-[theme=dark]:text-neutral-50 group-data-[theme=dark]:hover:text-[var(--color-accent-dark)]"
      >
        <Palette aria-hidden="true" />
      </button>
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute right-0 top-full z-20 mt-2 grid w-26 grid-cols-3 gap-1 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg group-data-[theme=dark]:border-neutral-800 group-data-[theme=dark]:bg-neutral-950"
        >
          {(Object.keys(accents) as Accent[]).map((accentOption) => {
            const isSelected = accentOption === accent

            return (
              <button
                key={accentOption}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                aria-label={options[accentOption]}
                title={options[accentOption]}
                onClick={() => {
                  onAccentChange(accentOption)
                  setIsOpen(false)
                }}
                className={`grid size-7 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${accentOption === 'white' ? 'border border-neutral-300' : ''}`}
                style={{ backgroundColor: accentOption === 'white' ? '#ffffff' : accents[accentOption].light }}
              >
                {isSelected && (
                  <Check
                    className="size-3.5"
                    strokeWidth={2.5}
                    style={{ color: accentOption === 'white' ? '#171717' : '#ffffff' }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
