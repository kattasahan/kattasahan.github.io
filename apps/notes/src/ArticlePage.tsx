import { colorTokens, spacingTokens, typographyTokens } from '@portfolio/tokens'
import { LinkButton, Tag, useTheme } from '@portfolio/ui'
import { articleHref, articles, findArticle } from './content'
import { NotesShell } from './NotesShell'

function ArticleContent({ slug }: { slug: string | undefined }) {
  const { theme } = useTheme()
  const color = colorTokens[theme]
  const article = findArticle(slug)

  if (!article) {
    return (
      <section aria-labelledby="not-found-title" className="article-column">
        <p style={{ color: color.textMuted }}>Notes</p>
        <h1 id="not-found-title">That article is not here.</h1>
        <LinkButton href="/notes/" theme={theme} variant="secondary">Return to Notes</LinkButton>
      </section>
    )
  }

  const currentIndex = articles.findIndex((item) => item.slug === article.slug)
  const nextArticle = articles[(currentIndex + 1) % articles.length]

  return (
    <article className="article-column">
      <LinkButton href="/notes/" theme={theme} variant="ghost">← All notes</LinkButton>
      <header style={{ marginTop: spacingTokens[3] }}>
        <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, letterSpacing: typographyTokens.letterSpacing.wide, margin: 0, textTransform: 'uppercase' }}>{article.eyebrow} · {article.readTime}</p>
        <h1 style={{ fontSize: `clamp(${typographyTokens.fontSize['4xl']}, 7vw, ${typographyTokens.fontSize['6xl']})`, letterSpacing: typographyTokens.letterSpacing.tight, lineHeight: typographyTokens.lineHeight.tight, margin: `${spacingTokens[2]} 0 0` }}>{article.title}</h1>
        <p className="article-deck" style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.xl, lineHeight: typographyTokens.lineHeight.relaxed, margin: `${spacingTokens[2]} 0 0` }}>{article.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacingTokens[1], marginTop: spacingTokens[2] }}>{article.tags.map((tag) => <Tag key={tag} theme={theme}>{tag}</Tag>)}</div>
      </header>
      <div style={{ marginTop: spacingTokens[5] }}>
        {article.sections.map((section) => (
          <section key={section.heading} style={{ marginTop: spacingTokens[4] }}>
            <h2 style={{ fontSize: typographyTokens.fontSize['2xl'], letterSpacing: typographyTokens.letterSpacing.tight, lineHeight: typographyTokens.lineHeight.snug, margin: 0 }}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph} className="article-copy" style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.lg, lineHeight: typographyTokens.lineHeight.relaxed, margin: `${spacingTokens[2]} 0 0` }}>{paragraph}</p>)}
          </section>
        ))}
      </div>
      <footer style={{ borderTop: `1px solid ${color.border}`, marginTop: spacingTokens[5], paddingTop: spacingTokens[3] }}>
        <p style={{ color: color.textMuted, margin: 0 }}>Continue reading</p>
        <h2 style={{ fontSize: typographyTokens.fontSize['2xl'], margin: `${spacingTokens[1]} 0 0` }}>{nextArticle.title}</h2>
        <LinkButton href={articleHref(nextArticle.slug)} style={{ marginTop: spacingTokens[2] }} theme={theme} variant="secondary">Read next note</LinkButton>
      </footer>
    </article>
  )
}

export function ArticlePage() {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1)
  return <NotesShell><ArticleContent slug={slug} /></NotesShell>
}
