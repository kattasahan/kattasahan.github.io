import type { ReactNode } from 'react'
import { breakpointTokens, spacingTokens } from '@portfolio/tokens'

export interface PageContainerProps {
  children: ReactNode
}

export function PageContainer({ children }: PageContainerProps) {
  return <main style={{ margin: '0 auto', maxWidth: breakpointTokens.xl, padding: `${spacingTokens[5]} ${spacingTokens[3]} ${spacingTokens[6]}` }}>{children}</main>
}
