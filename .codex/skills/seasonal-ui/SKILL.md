---
name: seasonal-ui
description: Maintain the minimal monochrome theme interface for this repository. Use when changing theme behavior, theme icons, typography, animations, or presentation conventions in the site.
---

# Minimal Monochrome UI

## Design context

- Use an editorial palette: warm off-white canvas in Light mode, charcoal rather than pure black in Dark mode, and one restrained coral accent for emphasis and interactive states. Avoid gradients and do not scatter the accent color across every element.
- Use compact, thin-stroked `Circle` for Light and `Eclipse` for Dark from `lucide-react`. Switch page colors instantly. The theme icon may rotate briefly during its immediate swap, but must not fade, scale, delay the theme change, or use a third transitional icon. Do not add seasonal motifs, gradients, or decorative weather effects.
- Keep the toggle in the page's top-right corner. Render only the icon with a transparent button surface; preserve a sufficiently large, keyboard-accessible hit target.
- Keep the left profile sidebar typography-led, with a small circular portrait, name, role, location, Current section, and icon-only social links. Keep description and technology content out of `ProfileCard`; present verified About copy and tech stack in the adjacent `AboutPanel` instead. Do not add a banner, wordmark, company logo, or decorative visuals.
- Preserve the avatar's original colors. Do not use company logos or logo-derived marks unless the user supplies documented authorization; identify employers with plain text only.
- Register `public/service-worker.js` after the initial render so it cannot delay first paint. Cache image requests with a cache-first strategy during the open session, then send a `CLEAR_IMAGE_CACHE` message on `pagehide` so the next visit fetches the latest portrait. SVGL logo components are bundled inline and must not be replaced with remote logo URLs.
- Use the bundled `@ridemountainpig/svgl-react` SVGL community extension for permitted social-brand logos rather than unreliable remote image routes. Preserve each brand's original color treatment: use `GitHubLight`/`GitHubDark` by theme, plus native LinkedIn and Gmail marks. Keep the portfolio action on a Lucide icon.
- Use a quiet social-link hover: no filled button surface or scale effect. Ease non-brand icons from muted neutral into the coral accent over about 200ms. Preserve brand-logo colors and use only a subtle opacity response for their hover state.
- Prioritize compact density: size the desktop profile card at 280px, use 20px internal padding, a 16px card radius, and a 72px portrait. On narrow screens, reserve top space for the page controls and expand the card to the available width; restore the fixed 280px sidebar from the `sm` breakpoint upward.
- Center the combined profile and About panels horizontally on desktop, while retaining a compact, full-width stacked layout on smaller screens. Keep internal spacing compact and corner radii subtle, except for the circular portrait.
- Keep the profile card content-height driven: do not force it to fill the viewport. Use a compact 28px section separation rather than large flexible gaps.
- Use matching small uppercase accent labels for the `CURRENT` employment section and the `CONNECT` social-link section.
- Match the current company’s font treatment to the profile role: 1rem regular weight with -0.015em tracking.
- Use an adjacent `AboutPanel` on desktop and stack it beneath the profile on smaller screens. Give it a short typography-led introduction and a plain, borderless responsive grid of technology names rather than decorative skill chips; a single section divider is sufficient. Keep the stack single-column below 320px, then use two and three columns only as width permits.
- Store each technology as a JSON object with a `name` and optional SVGL `logo` identifier. Render a small native-color SVGL mark to the left when the identifier has a bundled component; leave conceptual technologies text-only.
- Show a compact `ACTIVE` status at the profile card’s top-right: a coral dot with a restrained Tailwind ping animation and `motion-reduce:animate-none` support.
- Prefer Tailwind utilities for component layout, typography, spacing, responsive behavior, and theme variants. Limit global CSS to font setup and true global tokens. Use semantic landmarks and stable IDs for page regions, profile content, and controls.
- Use Tailwind's `text-pretty` for long, responsive profile copy to improve automatic line breaks without hardcoded `<br>` elements. For longer localized editorial paragraphs, pair it with `hyphens-auto` and `text-justify` when it improves the text block; do not apply justification to short copy, labels, or headings.
- Maintain production SEO essentials in `index.html` (title, description, canonical, social metadata, and Person JSON-LD) and in `public/robots.txt` and `public/sitemap.xml`.
- Use `motion/react` only for short, mild state transitions. Respect `useReducedMotion`.
- Use one subtle card entrance only: opacity plus 8px upward movement over about 250ms. Keep social-link motion to a 150ms color/background transition.
- Use Inter Tight as the sans-serif typeface via the existing Tailwind font token.

## Implementation rules

- Keep the theme state explicit (`light` or `dark`) and expose an accessible control label describing the destination state.
- Keep `App` responsible for application theme state. Encapsulate toggle-specific transition state, timer cleanup, accessibility, and icon selection in `ThemeToggle`.
- Keep profile presentation in `ProfileCard`; avoid coupling portfolio content with application theme state.
- Keep every visible portfolio string, accessible label, and metadata value in a language-specific JSON file (`src/data/profile.en.json` and `src/data/profile.ja.json`). Use the typed `src/data/content.ts` registry to select it, so non-developers can edit each locale without editing React components.
- Keep the icon-only language control beside the theme control. Persist the selected locale under `language-preference` in `localStorage`, synchronize it between tabs, and update the document language and metadata when it changes.
- Persist the client-side theme preference under `theme-preference` in `localStorage`; validate stored values and use Light as the safe fallback. Synchronize valid preference changes from other tabs.
- Use Lucide React components instead of hand-drawn SVG icons or icon fonts.
- Prefer CSS transitions for color changes; reserve Motion for stateful content and icon transitions.
- Preserve keyboard focus visibility and do not rely on color alone to communicate theme changes.
- Update this file whenever a durable visual convention, dependency, or interaction rule changes.
