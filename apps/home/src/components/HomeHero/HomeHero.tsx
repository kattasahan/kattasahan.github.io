import { homeContent } from '../../content'

export function HomeHero() {
  const { hero } = homeContent.home
  const { site, symbols } = homeContent

  return (
    <main className="home-hero" id="home">
      <section aria-labelledby="home-title" className="home-hero__content">
        <p className="home-hero__eyebrow">{hero.eyebrow}</p>
        <h1 id="home-title">
          {hero.title.map((line, index) => (
            <span
              className={`home-hero__title-line home-hero__title-line--${index + 1}`}
              key={line}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="home-hero__description">{site.description}</p>
        <a
          aria-label={hero.scrollLabel}
          className="home-hero__arrow"
          href={`#${hero.scrollTarget}`}
        >
          <span aria-hidden="true">{symbols.downArrow}</span>
        </a>
      </section>
      <div className="home-hero__meta">
        <p>{hero.bottomLeft}</p>
        <a href={`#${hero.scrollTarget}`}>
          {hero.bottomRight} <span aria-hidden="true">{symbols.downArrow}</span>
        </a>
      </div>
    </main>
  )
}
