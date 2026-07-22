import { spacingTokens, typographyTokens } from '@portfolio/tokens'
import type { ReactNode } from 'react'
import { useTheme } from '../../theme'
import { Card, type CardProps } from '../Card/Card'
import { LinkButton } from '../LinkButton/LinkButton'
import { Tag } from '../Tag/Tag'

export interface NotesCardProps extends Omit<CardProps, 'children' | 'as'> {
  title: string
  excerpt: string
  href: string
  metadata?: ReactNode
  tags?: string[]
}

export function NotesCard({ excerpt, href, metadata, tags = [], theme, title, ...props }: NotesCardProps) {
  const { color } = useTheme(theme)

  return (
    <Card {...props} as="article" elevated theme={theme}>
      {metadata ? <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: 0 }}>{metadata}</p> : null}
      <h3 style={{ fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize['2xl'], margin: `${spacingTokens[1]} 0 0` }}>{title}</h3>
      <p style={{ color: color.textMuted, lineHeight: typographyTokens.lineHeight.relaxed, margin: `${spacingTokens[1]} 0 0` }}>{excerpt}</p>
      {tags.length ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacingTokens[1], marginTop: spacingTokens[2] }}>{tags.map((tag) => <Tag key={tag} theme={theme}>{tag}</Tag>)}</div> : null}
      <LinkButton href={href} theme={theme} variant="ghost" style={{ marginTop: spacingTokens[2] }}>Read article</LinkButton>
    </Card>
  )
}
