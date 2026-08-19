import { ExternalLink, MapPin, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { GitHubDark, GitHubLight, Gmail, LinkedIn } from '@ridemountainpig/svgl-react'
import type { PortfolioContent } from '../data/content'

const socialIcons: Record<string, LucideIcon> = {
  portfolio: ExternalLink,
}

type ProfileCardProps = {
  content: PortfolioContent
}

export function ProfileCard({ content }: ProfileCardProps) {
  const reduceMotion = useReducedMotion()
  const { profile, ui } = content

  return (
    <motion.article
      id="profile"
      aria-labelledby="profile-name"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className="relative flex w-full flex-col rounded-xl border border-[#ddd9d1] bg-surface p-5 text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:w-70 sm:rounded-2xl group-data-[theme=dark]:border-zinc-700 group-data-[theme=dark]:bg-[#22211f] group-data-[theme=dark]:text-zinc-50 group-data-[theme=dark]:shadow-none"
    >
      <p id="profile-status" role="status" className="absolute right-5 top-5 flex whitespace-nowrap items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-accent">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/75 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        {ui.status}
      </p>
      <header id="profile-header" className="min-w-0">
        <img
          className="size-18 rounded-full object-cover"
          src={profile.avatarUrl}
          alt={profile.avatarAlt}
        />

        <h1 id="profile-name" className="mt-3 text-[clamp(1.5rem,8vw,1.75rem)] font-[650] leading-none tracking-[-0.04em]">
          {profile.name}
        </h1>
        <p id="profile-role" className="mt-1 text-pretty text-[1rem] tracking-[-0.015em]">
          {profile.role}
        </p>
        <p id="profile-location" className="flex items-center gap-1.5 text-[0.875rem] text-zinc-500 group-data-[theme=dark]:text-zinc-400">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {profile.location}
        </p>
      </header>

      <section id="current-role" aria-labelledby="current-label" className="mt-7 border-t border-[#ddd9d1] pt-4 group-data-[theme=dark]:border-zinc-700">
        <p id="current-label" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
          {ui.current}
        </p>
        <h2 id="current-company" className="mt-2 text-[1rem] tracking-[-0.015em]">
          {profile.currentRole.company}
        </h2>
        <p className="text-pretty text-[0.875rem] text-zinc-600 group-data-[theme=dark]:text-zinc-300">
          {profile.currentRole.title}
        </p>
        <p className="text-[0.875rem] text-zinc-500 group-data-[theme=dark]:text-zinc-400">
          {profile.currentRole.dates}
        </p>
      </section>

      <nav id="profile-links" aria-labelledby="connect-label" className="mt-7 border-t border-[#ddd9d1] pt-4 group-data-[theme=dark]:border-zinc-700">
        <p id="connect-label" className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-accent">
          {ui.connect}
        </p>
        <div className="mt-2 flex gap-1">
          {profile.links.map((link) => {
            const Icon = socialIcons[link.type] ?? ExternalLink
            const isEmail = link.type === 'email'

            return (
              <a
                key={link.type}
                href={link.url}
                target={isEmail ? undefined : '_blank'}
                rel={isEmail ? undefined : 'noreferrer'}
                aria-label={link.label}
                className="group/link grid size-8 place-items-center text-zinc-400 transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent group-data-[theme=dark]:text-zinc-500 group-data-[theme=dark]:hover:text-accent"
              >
                {link.type === 'github' ? (
                  <>
                    <GitHubLight className="size-4 transition-opacity duration-200 ease-out group-hover/link:opacity-75 group-data-[theme=dark]:hidden" aria-hidden="true" />
                    <GitHubDark className="hidden size-4 transition-opacity duration-200 ease-out group-hover/link:opacity-75 group-data-[theme=dark]:block" aria-hidden="true" />
                  </>
                ) : link.type === 'linkedin' ? (
                  <LinkedIn className="size-4 transition-opacity duration-200 ease-out group-hover/link:opacity-75" aria-hidden="true" />
                ) : link.type === 'email' ? (
                  <Gmail className="size-4 transition-opacity duration-200 ease-out group-hover/link:opacity-75" aria-hidden="true" />
                ) : (
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                )}
              </a>
            )
          })}
        </div>
      </nav>
    </motion.article>
  )
}
