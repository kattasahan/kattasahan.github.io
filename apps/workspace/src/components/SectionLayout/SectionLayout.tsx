import type { ReactNode } from 'react'
import { spacingTokens } from '@portfolio/tokens'
import { SectionHeader } from '@portfolio/ui'

export interface SectionLayoutProps {
  title: ReactNode
  description: ReactNode
  eyebrow?: ReactNode
  children: ReactNode
}

export function SectionLayout({ children, description, eyebrow, title }: SectionLayoutProps) {
  return (
    <section aria-labelledby="workspace-section-title">
      <SectionHeader description={description} eyebrow={eyebrow} title={<span id="workspace-section-title">{title}</span>} />
      <div style={{ marginTop: spacingTokens[4] }}>{children}</div>
    </section>
  )
}
