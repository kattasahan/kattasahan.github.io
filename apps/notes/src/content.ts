import type { NotesArticleRoute } from '@portfolio/routes'
import { route } from './routes'

export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

export interface Article {
  route: NotesArticleRoute
  title: string
  eyebrow: string
  description: string
  readTime: string
  tags: string[]
  sections: ArticleSection[]
}

export const articles: Article[] = [
  {
    route: 'notesWhyThisPortfolioExists',
    title: 'Why this portfolio exists',
    eyebrow: 'Intent',
    description: 'A portfolio can be evidence of taste, but it should also be evidence of thought.',
    readTime: '4 min read',
    tags: ['Intent', 'Portfolio'],
    sections: [
      {
        heading: 'A collection is not a point of view',
        paragraphs: [
          'Most portfolios begin as a container: a place to put projects, screenshots, and a short biography. That is useful, but it rarely explains how someone sees their work. I wanted this site to make the underlying point of view easier to notice.',
          'The result is not one long page. It is a set of rooms. Each room gives a different quality of the work permission to lead: systems, narrative, typography, or quiet attention.',
        ],
      },
      {
        heading: 'Four lenses, one practice',
        paragraphs: [
          'Workspace is practical and product-minded. Journal is reflective. Editorial gives reading and language priority. Calm makes space for a slower emotional register. Together, they describe a practice that cannot be reduced to a single case-study template.',
          'Home does not ask visitors to consume everything. It asks them to choose a perspective. That small choice makes the experience feel more like entering a conversation than scrolling through an archive.',
        ],
      },
      {
        heading: 'The useful constraint',
        paragraphs: [
          'The project is static, deliberately small in its dependency surface, and designed to live comfortably on GitHub Pages. Constraints like these are not a compromise here; they make the decisions legible.',
          'A portfolio should demonstrate judgment. The most convincing way to do that is to make the judgment visible in the work itself.',
        ],
      },
    ],
  },
  {
    route: 'notesBuildingHome',
    title: 'Building Home',
    eyebrow: 'Entry experience',
    description: 'The root page is a threshold: enough context to orient, enough restraint to invite exploration.',
    readTime: '5 min read',
    tags: ['Home', 'Interaction'],
    sections: [
      {
        heading: 'Start with orientation, not exposition',
        paragraphs: [
          'The first page has a narrow job. It introduces the four experiences, gives each one a short description, and sends the visitor somewhere meaningful. Turning it into a condensed portfolio would make every later page feel redundant.',
          'That constraint shaped the hierarchy: a single statement, a clear invitation to choose a perspective, and four chapter-like entrances. The content is intentionally incomplete. Curiosity does the rest.',
        ],
      },
      {
        heading: 'Theme is part of the welcome',
        paragraphs: [
          'Light and dark mode are not an ornament layered on after the fact. Home uses one semantic theme shape, so every surface, border, and piece of text changes together. The toggle simply lets the visitor choose the reading environment that feels right.',
          'The transition is brief and the reduced-motion preference is respected. The change should feel calm, not theatrical.',
        ],
      },
      {
        heading: 'Responsive by composition',
        paragraphs: [
          'The chapter layout uses available space rather than a fixed device taxonomy. On smaller screens it becomes a single, deliberate reading sequence without losing the order of the perspectives.',
          'This is a small example of a larger preference: preserve the relationship between content before chasing a specific screenshot at every breakpoint.',
        ],
      },
    ],
  },
  {
    route: 'notesDesignSystemDecisions',
    title: 'Design system decisions',
    eyebrow: 'Foundation',
    description: 'A compact token layer creates consistency without asking every experience to look the same.',
    readTime: '6 min read',
    tags: ['Tokens', 'Accessibility'],
    sections: [
      {
        heading: 'Tokens describe decisions, not decoration',
        paragraphs: [
          'The token package starts with the decisions that repeat: semantic colors, type scale, eight-point spacing, radius, elevation, motion, layering, and breakpoints. These are not a list of arbitrary values. They are the small grammar of the interface.',
          'Naming matters. A token called textMuted is easier to apply thoughtfully than a raw gray swatch. It carries intent into the code, and it makes dark mode a change of meaning-preserving values rather than a search-and-replace exercise.',
        ],
      },
      {
        heading: 'Monochrome is an editing tool',
        paragraphs: [
          'A monochrome-first palette removes an easy source of emphasis. When color cannot do all the work, hierarchy has to come from type, spacing, contrast, and rhythm. That is a productive pressure for a portfolio meant to feel composed rather than decorated.',
          'The focus color is a deliberate exception. It exists to make keyboard interaction clear, not to introduce a brand accent everywhere.',
        ],
      },
      {
        heading: 'Motion earns its place',
        paragraphs: [
          'Motion tokens set a small set of durations and easing curves. The goal is not to animate every state; it is to make the few changing states feel connected. Theme changes and interactive controls use short transitions, while reduced-motion settings collapse them.',
          'Consistency is more important than novelty. A restrained system leaves room for a particular experience to become expressive when it truly has something to say.',
        ],
      },
    ],
  },
  {
    route: 'notesSharedComponents',
    title: 'Shared components',
    eyebrow: 'Composition',
    description: 'Reusable components should provide reliable behavior without flattening the character of each mini-site.',
    readTime: '5 min read',
    tags: ['React', 'Components'],
    sections: [
      {
        heading: 'Share the boring parts well',
        paragraphs: [
          'Buttons, form fields, navigation, dialogs, cards, and section headers are familiar patterns. They benefit from one accessible implementation: semantic markup, usable focus states, sensible labels, and a clear theme contract.',
          'The shared library does not try to own every layout. It supplies the pieces that should feel dependable, then lets each experience decide how to arrange them.',
        ],
      },
      {
        heading: 'Composition is the escape hatch',
        paragraphs: [
          'Every primitive accepts children and style overrides where they are useful. That keeps the components practical without turning them into a maze of boolean props. A NotesCard can feel editorial; a future Workspace card can feel more operational.',
          'The rule is simple: reuse behavior and foundations, not sameness for its own sake.',
        ],
      },
      {
        heading: 'Accessibility travels with the primitive',
        paragraphs: [
          'A shared button can carry focus treatment. A modal can handle Escape and backdrop dismissal. Input components can connect labels, descriptions, and error states. These are small details, but they are exactly the details that become inconsistent when every page starts from scratch.',
          'The library is intentionally dependency-light so those guarantees remain easy to inspect and adapt.',
        ],
      },
    ],
  },
  {
    route: 'notesRoutingAndDeployment',
    title: 'Routing and deployment',
    eyebrow: 'Static architecture',
    description: 'The routing model is shaped by a simple promise: every page should remain understandable as a static file.',
    readTime: '4 min read',
    tags: ['Vite', 'GitHub Pages'],
    sections: [
      {
        heading: 'Routes are part of the architecture',
        paragraphs: [
          'Each experience is an independent Vite application with a route-specific base path. Home owns the root route; Notes owns the Engineering Journal; later mini-sites will own their respective paths. This keeps each experience isolated while preserving a coherent public map.',
          'Notes uses a browser-history route tree, but its article URLs still come from the same shared public route contract as every other experience.',
        ],
      },
      {
        heading: 'Static first is a product decision',
        paragraphs: [
          'There is no backend because the portfolio does not need one. The value is in the writing, visual decisions, and interaction quality—not in a service layer that needs maintenance.',
          'A static output is fast to host, straightforward to inspect, and well suited to GitHub Pages. The deployment milestone will automate the publishing path, but the shape of the application already respects that destination.',
        ],
      },
      {
        heading: 'Build for the link you share',
        paragraphs: [
          'The important test for a journal is not only whether navigation works after loading the home page. It is whether an article URL can be opened directly, bookmarked, and shared without special runtime behavior.',
          'Browser-history routing makes the route tree easy to evolve; the deployment configuration must provide a static fallback so a shared article URL still reaches the Notes app first.',
        ],
      },
    ],
  },
  {
    route: 'notesWhatILearned',
    title: 'What I learned',
    eyebrow: 'Reflection',
    description: 'The project keeps returning to the same lesson: restraint becomes easier when the system is clear.',
    readTime: '4 min read',
    tags: ['Lessons', 'Process'],
    sections: [
      {
        heading: 'A clear system creates creative room',
        paragraphs: [
          'It can feel counterintuitive to define tokens and components before building every page. In practice, the shared foundation removes repetitive decisions, which makes the remaining decisions more interesting.',
          'The components do not decide the personality of an experience. They make it safer to spend attention on the personality that matters.',
        ],
      },
      {
        heading: 'Documentation is part of the interface',
        paragraphs: [
          'The internal documents keep architectural decisions visible. These public notes translate the same reasoning into a form that is useful to other developers. They are related, but they do different work.',
          'Writing down a decision is a forcing function. It reveals whether the choice has a reason or only momentum behind it.',
        ],
      },
      {
        heading: 'Future improvements should earn complexity',
        paragraphs: [
          'There are many possible additions: search, view transitions, richer motion, analytics, or a command palette. None are automatically improvements. Each should be tested against the project’s promise of clarity and quiet confidence.',
          'The most useful next step is not to add everything. It is to build the remaining mini-sites and learn what the system needs from real use.',
        ],
      },
    ],
  },
]

export function articleHref(routeName: NotesArticleRoute) {
  return route(routeName)
}

export function findArticle(routeName: NotesArticleRoute | undefined) {
  return articles.find((article) => article.route === routeName)
}
