import { LinkButton } from '@portfolio/ui'
import { homeContent } from '../../content'

export interface PerspectiveListProps {
  resolveRoute: (route: string) => string
  theme: 'light' | 'dark'
}

export function PerspectiveList({ resolveRoute, theme }: PerspectiveListProps) {
  const { perspectives } = homeContent.home
  const { symbols } = homeContent

  return (
    <>
      <section aria-labelledby="perspectives-title" className="home-intro">
        <p className="home-section-label">{perspectives.label}</p>
        <h2 id="perspectives-title">
          {perspectives.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </section>
      <section
        aria-label={perspectives.ariaLabel}
        className="home-perspectives"
        id={perspectives.id}
      >
        {perspectives.items.map((perspective) => (
          <article
            className={`home-perspective home-perspective--${perspective.title.toLowerCase()}`}
            key={perspective.title}
          >
            <div
              aria-label={perspective.ornamentLabel}
              className="home-perspective__ornament"
              role="img"
            >
              <span>{perspective.ornament}</span>
            </div>
            <div className="home-perspective__title">
              <h3>{perspective.title}</h3>
              {perspective.supportingTitle ? <p>{perspective.supportingTitle}</p> : null}
            </div>
            <div className="home-perspective__detail">
              <p>{perspective.description}</p>
              <LinkButton
                className="home-text-link"
                href={resolveRoute(perspective.route)}
                theme={theme}
                variant="ghost"
              >
                {perspective.action} <span aria-hidden="true">{symbols.forwardArrow}</span>
              </LinkButton>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
