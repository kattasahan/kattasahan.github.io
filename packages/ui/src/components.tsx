import {
  useEffect,
  useId,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { colorTokens, spacingTokens, typographyTokens, zIndexTokens } from '@portfolio/tokens'
import { focusRing, sharedStyles, type Theme, useTheme } from './theme'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

function transition(properties: string) {
  return `${properties} ${sharedStyles.motion.duration.normal} ${sharedStyles.motion.easing.standard}`
}

function buttonStyle(color: (typeof colorTokens)[Theme], variant: ButtonVariant): CSSProperties {
  const common: CSSProperties = {
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: sharedStyles.radius.full,
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: typographyTokens.fontFamily.sans,
    fontSize: typographyTokens.fontSize.sm,
    fontWeight: typographyTokens.fontWeight.semibold,
    gap: spacingTokens[1],
    justifyContent: 'center',
    lineHeight: typographyTokens.lineHeight.snug,
    minHeight: '2.75rem',
    padding: `${spacingTokens[1]} ${spacingTokens[2]}`,
    textDecoration: 'none',
    transition: transition('background-color, border-color, color, transform'),
  }

  if (variant === 'primary') {
    return { ...common, backgroundColor: color.text, color: color.textInverse }
  }

  if (variant === 'secondary') {
    return { ...common, backgroundColor: color.surface, borderColor: color.border, color: color.text }
  }

  return { ...common, backgroundColor: 'transparent', color: color.text, paddingInline: spacingTokens[1] }
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: Theme
  variant?: ButtonVariant
  fullWidth?: boolean
  loading?: boolean
}

export function Button({
  children,
  disabled,
  fullWidth = false,
  loading = false,
  style,
  theme,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { color } = useTheme(theme)

  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      style={{
        ...buttonStyle(color, variant),
        opacity: disabled || loading ? 0.56 : 1,
        pointerEvents: loading ? 'none' : undefined,
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
      onFocus={(event) => {
        Object.assign(event.currentTarget.style, focusRing(color.focus))
        props.onFocus?.(event)
      }}
      onBlur={(event) => {
        event.currentTarget.style.outline = ''
        event.currentTarget.style.outlineOffset = ''
        props.onBlur?.(event)
      }}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  theme?: Theme
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function LinkButton({
  children,
  fullWidth = false,
  style,
  theme,
  variant = 'primary',
  ...props
}: LinkButtonProps) {
  const { color } = useTheme(theme)

  return (
    <a
      {...props}
      style={{ ...buttonStyle(color, variant), width: fullWidth ? '100%' : undefined, ...style }}
      onFocus={(event) => {
        Object.assign(event.currentTarget.style, focusRing(color.focus))
        props.onFocus?.(event)
      }}
      onBlur={(event) => {
        event.currentTarget.style.outline = ''
        event.currentTarget.style.outlineOffset = ''
        props.onBlur?.(event)
      }}
    >
      {children}
    </a>
  )
}

export interface CardProps extends HTMLAttributes<HTMLElement> {
  theme?: Theme
  padding?: keyof typeof spacingTokens
  elevated?: boolean
  as?: 'article' | 'div' | 'section'
}

export function Card({
  as: Component = 'div',
  children,
  elevated = false,
  padding = 3,
  style,
  theme,
  ...props
}: CardProps) {
  const { color } = useTheme(theme)

  return (
    <Component
      {...props}
      style={{
        backgroundColor: color.surface,
        border: `1px solid ${color.border}`,
        borderRadius: sharedStyles.radius.lg,
        boxShadow: elevated ? sharedStyles.shadow.medium : sharedStyles.shadow.none,
        color: color.text,
        padding: spacingTokens[padding],
        ...style,
      }}
    >
      {children}
    </Component>
  )
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  theme?: Theme
}

export function Tag({ children, style, theme, ...props }: TagProps) {
  const { color } = useTheme(theme)

  return (
    <span
      {...props}
      style={{
        backgroundColor: color.surfaceElevated,
        border: `1px solid ${color.border}`,
        borderRadius: sharedStyles.radius.full,
        color: color.textMuted,
        display: 'inline-flex',
        fontFamily: typographyTokens.fontFamily.sans,
        fontSize: typographyTokens.fontSize.xs,
        fontWeight: typographyTokens.fontWeight.medium,
        lineHeight: 1,
        padding: `${spacingTokens[1]} ${spacingTokens[1]}`,
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export interface NavigationItem {
  href: string
  label: string
  current?: boolean
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode
  items: NavigationItem[]
  theme?: Theme
  children?: ReactNode
}

export function Navbar({ brand, children, items, style, theme, ...props }: NavbarProps) {
  const { color } = useTheme(theme)

  return (
    <header
      {...props}
      style={{
        alignItems: 'center',
        backgroundColor: color.background,
        borderBottom: `1px solid ${color.border}`,
        color: color.text,
        display: 'flex',
        fontFamily: typographyTokens.fontFamily.sans,
        gap: spacingTokens[2],
        justifyContent: 'space-between',
        padding: `${spacingTokens[2]} ${spacingTokens[3]}`,
        ...style,
      }}
    >
      <div>{brand}</div>
      <nav aria-label="Primary navigation">
        <ul style={{ display: 'flex', gap: spacingTokens[2], listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((item) => (
            <li key={item.href}>
              <a
                aria-current={item.current ? 'page' : undefined}
                href={item.href}
                style={{
                  color: item.current ? color.text : color.textMuted,
                  fontSize: typographyTokens.fontSize.sm,
                  fontWeight: item.current ? typographyTokens.fontWeight.semibold : typographyTokens.fontWeight.regular,
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {children ? <div>{children}</div> : null}
    </header>
  )
}

export interface MobileNavProps extends Omit<NavbarProps, 'children'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function MobileNav({ brand, items, onOpenChange, open, style, theme, ...props }: MobileNavProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isOpen = open ?? uncontrolledOpen
  const { color } = useTheme(theme)
  const menuId = useId()

  function toggleMenu() {
    const nextOpen = !isOpen
    if (open === undefined) setUncontrolledOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }

  return (
    <header {...props} style={{ backgroundColor: color.background, borderBottom: `1px solid ${color.border}`, ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: `${spacingTokens[2]} ${spacingTokens[3]}` }}>
        <div>{brand}</div>
        <Button aria-controls={menuId} aria-expanded={isOpen} onClick={toggleMenu} theme={theme} variant="ghost">
          Menu
        </Button>
      </div>
      {isOpen ? (
        <nav aria-label="Mobile navigation" id={menuId} style={{ padding: `0 ${spacingTokens[3]} ${spacingTokens[2]}` }}>
          <ul style={{ display: 'grid', gap: spacingTokens[1], listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item) => (
              <li key={item.href}>
                <a aria-current={item.current ? 'page' : undefined} href={item.href} style={{ color: color.text, textDecoration: 'none' }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}

export interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  title: string
  theme?: Theme
  closeLabel?: string
}

export function Modal({ children, closeLabel = 'Close dialog', onClose, open, theme, title }: ModalProps) {
  const { color } = useTheme(theme)
  const titleId = useId()

  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  if (!open) return null

  return (
    <div
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      style={{
        alignItems: 'center',
        backgroundColor: color.overlay,
        display: 'flex',
        inset: 0,
        justifyContent: 'center',
        padding: spacingTokens[3],
        position: 'fixed',
        zIndex: zIndexTokens.modal,
      }}
    >
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        role="dialog"
        style={{
          backgroundColor: color.surfaceElevated,
          borderRadius: sharedStyles.radius.xl,
          boxShadow: sharedStyles.shadow.overlay,
          color: color.text,
          maxWidth: '36rem',
          padding: spacingTokens[3],
          width: '100%',
        }}
      >
        <div style={{ alignItems: 'start', display: 'flex', gap: spacingTokens[2], justifyContent: 'space-between' }}>
          <h2 id={titleId} style={{ fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize['2xl'], margin: 0 }}>
            {title}
          </h2>
          <Button aria-label={closeLabel} onClick={onClose} theme={theme} variant="ghost">
            ×
          </Button>
        </div>
        <div style={{ marginTop: spacingTokens[3] }}>{children}</div>
      </section>
    </div>
  )
}

interface FieldProps {
  label: string
  hint?: string
  error?: string
  theme?: Theme
}

function FieldMessage({ error, hint, id, theme }: Pick<FieldProps, 'error' | 'hint' | 'theme'> & { id: string }) {
  const { color } = useTheme(theme)
  if (!error && !hint) return null
  return <p id={id} style={{ color: error ? color.text : color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: `${spacingTokens[1]} 0 0` }}>{error ?? hint}</p>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}

export function Input({ error, hint, id, label, style, theme, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const { color } = useTheme(theme)

  return (
    <label style={{ color: color.text, display: 'grid', fontFamily: typographyTokens.fontFamily.sans, gap: spacingTokens[1] }}>
      <span style={{ fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.medium }}>{label}</span>
      <input
        {...props}
        aria-describedby={error || hint ? messageId : props['aria-describedby']}
        aria-invalid={error ? true : undefined}
        id={inputId}
        style={{
          backgroundColor: color.surfaceElevated,
          border: `1px solid ${error ? color.borderStrong : color.border}`,
          borderRadius: sharedStyles.radius.md,
          color: color.text,
          font: 'inherit',
          minHeight: '2.75rem',
          padding: `0 ${spacingTokens[1]}`,
          ...style,
        }}
        onFocus={(event) => {
          Object.assign(event.currentTarget.style, focusRing(color.focus))
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          event.currentTarget.style.outline = ''
          event.currentTarget.style.outlineOffset = ''
          props.onBlur?.(event)
        }}
      />
      <FieldMessage error={error} hint={hint} id={messageId} theme={theme} />
    </label>
  )
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export function Textarea({ error, hint, id, label, style, theme, ...props }: TextareaProps) {
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const messageId = `${textareaId}-message`
  const { color } = useTheme(theme)

  return (
    <label style={{ color: color.text, display: 'grid', fontFamily: typographyTokens.fontFamily.sans, gap: spacingTokens[1] }}>
      <span style={{ fontSize: typographyTokens.fontSize.sm, fontWeight: typographyTokens.fontWeight.medium }}>{label}</span>
      <textarea
        {...props}
        aria-describedby={error || hint ? messageId : props['aria-describedby']}
        aria-invalid={error ? true : undefined}
        id={textareaId}
        style={{
          backgroundColor: color.surfaceElevated,
          border: `1px solid ${error ? color.borderStrong : color.border}`,
          borderRadius: sharedStyles.radius.md,
          color: color.text,
          font: 'inherit',
          minHeight: '7rem',
          padding: spacingTokens[1],
          resize: 'vertical',
          ...style,
        }}
        onFocus={(event) => {
          Object.assign(event.currentTarget.style, focusRing(color.focus))
          props.onFocus?.(event)
        }}
        onBlur={(event) => {
          event.currentTarget.style.outline = ''
          event.currentTarget.style.outlineOffset = ''
          props.onBlur?.(event)
        }}
      />
      <FieldMessage error={error} hint={hint} id={messageId} theme={theme} />
    </label>
  )
}

export interface TimelineItem {
  date: ReactNode
  title: ReactNode
  description?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[]
  theme?: Theme
}

export function Timeline({ items, style, theme, ...props }: TimelineProps) {
  const { color } = useTheme(theme)

  return (
    <ol {...props} style={{ borderLeft: `1px solid ${color.border}`, display: 'grid', gap: spacingTokens[3], listStyle: 'none', margin: 0, padding: `0 0 0 ${spacingTokens[3]}`, ...style }}>
      {items.map((item, index) => (
        <li key={index} style={{ position: 'relative' }}>
          <span aria-hidden="true" style={{ backgroundColor: color.text, borderRadius: sharedStyles.radius.full, height: '0.625rem', left: 'calc(-1 * 1.8125rem)', position: 'absolute', top: '0.375rem', width: '0.625rem' }} />
          <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, margin: 0 }}>{item.date}</p>
          <h3 style={{ fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize.lg, margin: `${spacingTokens[1]} 0 0` }}>{item.title}</h3>
          {item.description ? <div style={{ color: color.textMuted, marginTop: spacingTokens[1] }}>{item.description}</div> : null}
        </li>
      ))}
    </ol>
  )
}

export interface SectionHeaderProps extends HTMLAttributes<HTMLElement> {
  title: ReactNode
  eyebrow?: ReactNode
  description?: ReactNode
  action?: ReactNode
  theme?: Theme
}

export function SectionHeader({ action, description, eyebrow, style, theme, title, ...props }: SectionHeaderProps) {
  const { color } = useTheme(theme)

  return (
    <header {...props} style={{ alignItems: 'end', display: 'flex', gap: spacingTokens[3], justifyContent: 'space-between', ...style }}>
      <div>
        {eyebrow ? <p style={{ color: color.textMuted, fontSize: typographyTokens.fontSize.sm, letterSpacing: typographyTokens.letterSpacing.wide, margin: 0, textTransform: 'uppercase' }}>{eyebrow}</p> : null}
        <h2 style={{ color: color.text, fontFamily: typographyTokens.fontFamily.sans, fontSize: typographyTokens.fontSize['4xl'], letterSpacing: typographyTokens.letterSpacing.tight, lineHeight: typographyTokens.lineHeight.tight, margin: eyebrow ? `${spacingTokens[1]} 0 0` : 0 }}>{title}</h2>
        {description ? <p style={{ color: color.textMuted, margin: `${spacingTokens[1]} 0 0`, maxWidth: '42rem' }}>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  )
}

export interface ExperienceSwitcherProps extends HTMLAttributes<HTMLElement> {
  items: NavigationItem[]
  theme?: Theme
}

export function ExperienceSwitcher({ items, style, theme, ...props }: ExperienceSwitcherProps) {
  const { color } = useTheme(theme)

  return (
    <nav {...props} aria-label="Portfolio experiences" style={{ ...style }}>
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: spacingTokens[1], listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li key={item.href}>
            <LinkButton aria-current={item.current ? 'page' : undefined} href={item.href} theme={theme} variant={item.current ? 'primary' : 'ghost'} style={{ color: item.current ? color.textInverse : color.text }}>
              {item.label}
            </LinkButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}

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
