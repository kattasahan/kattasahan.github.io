import { colorTokens, spacingTokens, typographyTokens } from '@portfolio/tokens'
import { useTheme } from '@portfolio/theme'
import { NotesCard, SectionHeader, Timeline } from '@portfolio/ui'
import { articleHref, articles } from './content'

function JournalIndexContent() {
  const { theme } = useTheme()
  const color = colorTokens[theme]

  return (
    <>
      <section className="notes-intro" aria-labelledby="notes-title">
        <SectionHeader
          description="A calm developer journal about the decisions, constraints, and lessons behind this portfolio. These are stories about making the work—not setup instructions."
          eyebrow="How I made this"
          title="Notes from the build."
        />
      </section>
      <section aria-label="Journal themes" style={{ marginTop: spacingTokens[5] }}>
        <Timeline
          items={[
            {
              date: 'Intent',
              title: 'Start with a point of view',
              description:
                'The portfolio is designed as a set of distinct lenses rather than one long case-study feed.',
            },
            {
              date: 'Foundation',
              title: 'Make decisions reusable',
              description:
                'Tokens and components turn repeated choices into reliable building blocks.',
            },
            {
              date: 'Reflection',
              title: 'Share the reasoning',
              description:
                'Notes turn implementation choices into useful lessons for other developers.',
            },
          ]}
        />
      </section>
      <section aria-labelledby="articles-title" style={{ marginTop: spacingTokens[6] }}>
        <h2
          id="articles-title"
          style={{
            color: color.text,
            fontSize: typographyTokens.fontSize.sm,
            letterSpacing: typographyTokens.letterSpacing.wide,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          Articles
        </h2>
        <div
          className="notes-grid"
          style={{ display: 'grid', gap: spacingTokens[2], marginTop: spacingTokens[2] }}
        >
          {articles.map((article) => (
            <NotesCard
              excerpt={article.description}
              href={articleHref(article.route)}
              key={article.route}
              metadata={`${article.eyebrow} · ${article.readTime}`}
              tags={article.tags}
              title={article.title}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export function NotesIndex() {
  return <JournalIndexContent />
}
