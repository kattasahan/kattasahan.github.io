---
name: seasonal-ui
description: Maintain the minimal monochrome theme interface for this repository. Use when changing theme behavior, theme icons, typography, animations, or presentation conventions in the site.
---

# Minimal Monochrome UI

## Design context

- Use an editorial palette: warm off-white canvas in Light mode, charcoal rather than pure black in Dark mode, and one restrained coral accent for emphasis and interactive states. Avoid gradients and do not scatter the accent color across every element.
- Use compact, thin-stroked `Circle` for Light and `Eclipse` for Dark from `lucide-react`. Switch page colors instantly. The theme icon may rotate briefly during its immediate swap, but must not fade, scale, delay the theme change, or use a third transitional icon. Do not add seasonal motifs, gradients, or decorative weather effects.
- Keep the toggle in the page's top-right corner. Render only the icon with a transparent button surface; preserve a sufficiently large, keyboard-accessible hit target.
- Keep the left profile sidebar typography-led, with a small circular portrait, name, role, location, Current section with its technology stack, and icon-only social links. Keep verified About copy in the adjacent `AboutPanel`. Do not add a banner, wordmark, company logo, or decorative visuals.
- Preserve the avatar's original colors. Do not use company logos or logo-derived marks unless the user supplies documented authorization; identify employers with plain text only.
- Serve the portrait from the repository's local `/images/sahan-katta.jpg` asset with intrinsic dimensions, high fetch priority, and an HTML preload. Keep the avatar local rather than relying on a third-party profile-image host.
- Use the Inter Tight Variable Fontsource WOFF2 declaration in `src/index.css`, with `font-display: swap` and the Latin unicode range. Do not request the Google Fonts stylesheet: PageSpeed can block that CSS response and report a console error.
- Use the accessible deep coral `#b42318` for small Light-mode accent text. On charcoal surfaces, use the softer `#ff8a7d` accent text variant so labels and hover states meet contrast expectations in both themes.
- Do not register a service worker: GitHub Pages and normal HTTP caching are sufficient for this small static portfolio. Rely on the local portrait and immutable build assets. SVGL logo components are bundled inline and must not be replaced with remote logo URLs.
- Use the bundled `@ridemountainpig/svgl-react` SVGL community extension for permitted social-brand logos rather than unreliable remote image routes. Preserve each brand's original color treatment: use `GitHubLight`/`GitHubDark` by theme, plus native LinkedIn and Gmail marks. Keep the portfolio action on a Lucide icon.
- Use a quiet social-link hover: no filled button surface or scale effect. Ease non-brand icons from muted neutral into the coral accent over about 200ms. Preserve brand-logo colors and use only a subtle opacity response for their hover state.
- Prioritize compact density: size the desktop profile card at 280px, use 20px internal padding, a 16px card radius, and a 72px portrait. Through tablet widths, reserve top space for the page controls and expand the card to the available width; restore the fixed 280px sidebar only from the `lg` breakpoint upward.
- Center the combined profile and About panels horizontally on desktop, while retaining a compact, full-width stacked layout on smaller screens. Keep internal spacing compact and corner radii subtle, except for the circular portrait.
- Keep the profile card content-height driven: do not force it to fill the viewport. Use a compact 28px section separation rather than large flexible gaps.
- Use matching small uppercase accent labels for the `CURRENT` employment section and the `CONNECT` social-link section.
- Match the current company’s font treatment to the profile role: 1rem regular weight with -0.015em tracking.
- Use adjacent About and Experience cards on desktop and stack them beneath the profile on smaller screens. Group those cards into one vertical right-side column. Keep About to a short typography-led introduction; make each Experience entry an independently toggleable accessible accordion so multiple entries may remain open. Its trigger shows company, role, and dates; its expanded region shows a concise scope line and JSON-driven accomplishment bullets. On mobile, keep the chevron beside the company, then stack role and dates beneath it. From `sm` upward, place dates and the chevron on the company row, keeping the role directly beneath. Use a restrained 180ms Motion height-plus-opacity transition for the expanded region, with no transition under reduced-motion preferences. Preserve entry dividers and avoid company logos or résumé-style decoration. Establish a clear hierarchy: company is strongest, role is medium-weight and slightly larger than the concise muted description, and dates are muted. Place the plain, borderless technology stack beneath CURRENT in `ProfileCard`, separated from the role details by the same subtle top divider used for profile sections. Use one column below 260px and two columns once the available viewport permits.
- Store each technology as a JSON object with a `name` and optional SVGL `logo` identifier. Render a small native-color SVGL mark to the left when the identifier has a bundled component; leave conceptual technologies text-only.
- Show a compact `ACTIVE` status at the profile card’s top-left: a coral dot with a restrained Tailwind ping animation and `motion-reduce:animate-none` support. Through tablet widths, center the portrait with name, role, and location beneath it. From `lg` upward, use a container query to present a horizontal identity row only when at least 224px of card content is available; otherwise retain the centered stack.
- Prefer Tailwind utilities for component layout, typography, spacing, responsive behavior, and theme variants. Limit global CSS to font setup and true global tokens. Use semantic landmarks and stable IDs for page regions, profile content, and controls.
- Use Tailwind's `text-pretty` for long, responsive profile copy to improve automatic line breaks without hardcoded `<br>` elements. For longer localized editorial paragraphs, pair it with `hyphens-auto` and `text-justify` when it improves the text block; do not apply justification to short copy, labels, or headings.
- Follow WCAG-oriented reading conventions: set a 1.5 global line-height, use at least 15px with 1.6 line-height for long-form paragraphs, and at least 14px with roughly 1.5 line-height for supporting detail. Keep metadata and small uppercase labels compact but never make long-form content light-weight. Preserve reflow without horizontal scrolling at 320 CSS pixels and avoid fixed text containers that clip when users resize text to 200%.
- Maintain production SEO essentials in `index.html` (title, description, author, canonical, social preview metadata, crawler-preview directives, linked ProfilePage/Person/WebSite JSON-LD, and name aliases) and in `public/robots.txt` and `public/sitemap.xml`. Give the above-fold profile image intrinsic dimensions and high fetch priority to prevent layout shift.
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
- Whenever visible text is deliberately truncated with an ellipsis, provide its complete value through the native HTML `title` attribute. For interactive portfolio tech items, also provide a small in-app hover tooltip so the full label is reliably visible without waiting for inconsistent browser-native title behavior.
- Before modifying UI files, inspect relevant uncommitted changes. Treat manual user edits as the source of truth: preserve them, build on their conventions, and record any durable design decision in this skill.
- Update this file whenever a durable visual convention, dependency, or interaction rule changes.
