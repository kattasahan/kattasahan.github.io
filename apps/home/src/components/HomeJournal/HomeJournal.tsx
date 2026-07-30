import { LinkButton } from '@portfolio/ui'
import { homeContent } from '../../content'

export interface HomeJournalProps {
  resolveRoute: (route: string) => string
  theme: 'light' | 'dark'
}

export function HomeJournal({ resolveRoute, theme }: HomeJournalProps) {
  const { journal } = homeContent.home
  const { symbols } = homeContent

  return (
    <section aria-labelledby="journal-title" className="home-journal" id={journal.id}>
      <p className="home-section-label">{journal.label}</p>
      <div className="home-journal__grid">
        <div>
          <h2 id="journal-title">
            {journal.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <LinkButton
            className="home-text-link"
            href={resolveRoute(journal.route)}
            theme={theme}
            variant="ghost"
          >
            {journal.action} <span aria-hidden="true">{symbols.forwardArrow}</span>
          </LinkButton>
        </div>
        <p>{journal.description}</p>
      </div>
    </section>
  )
}
