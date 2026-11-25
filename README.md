# Wikky Santoso — Developer Portfolio

An interactive, animation-rich portfolio for Wikky Santoso, an Information Technology student pursuing Software Engineering and Full-Stack Development opportunities.

Dark editorial design with a pinned horizontal project gallery, scroll-driven text, a custom cursor and a project detail modal.

## Tech stack

- React 19 + Vite
- Tailwind CSS v4
- Motion (`motion/react`): entrances, text reveals, hover, modal
- GSAP + ScrollTrigger: pinned horizontal gallery, parallax, timeline
- Lenis: smooth scrolling
- Lucide React: icons
- Fontsource: self-hosted Space Grotesk and Inter

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

```bash
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## Project structure

```
public/                 favicon, og-image, robots.txt, sitemap.xml, resume.pdf
src/
  main.jsx              entry: fonts, MotionConfig, SmoothScroll provider
  App.jsx               preloader state, layout, section order
  index.css             Tailwind theme (colors, fonts) and base styles
  data/content.js       all copy: site info, projects, tech stack, journey
  lib/                  gsap setup, motion presets, text parsing helpers
  hooks/                useMediaQuery, useActiveSection, useScrollLock
  components/
    Preloader.jsx, Navbar.jsx, Footer.jsx
    ProjectModal.jsx, ProjectVisual.jsx
    SmoothScroll.jsx    Lenis + GSAP ticker integration
    sections/           Hero, About, Projects, TechStack, Journey, Contact
    ui/                 Button, Magnetic, Cursor, Tilt, TextReveal, ScrubText,
                        Reveal, SectionHeader, Particles, ScrollProgress, BrandIcons
```

## Editing content

Almost everything lives in `src/data/content.js`:

- `site`: name, email, GitHub, LinkedIn, resume path, school
- `projects`: title, description, tech tags, highlights, modal details
- `techStack`, `journey`, `navLinks`

Before deploying, set your real email and LinkedIn URL in `site`. To replace the resume, overwrite `public/resume.pdf`.

The project visuals are illustrative mockups drawn in `src/components/ProjectVisual.jsx`, not real screenshots. To use real images, swap `ProjectVisual` for an `<img loading="lazy">` in `Projects.jsx` and `ProjectModal.jsx`.

## Design system

| Token          | Value                |
| -------------- | -------------------- |
| Background     | `#111214` (`night`)  |
| Surface        | `#202124` (`surface`)|
| Accent         | `#B8FF65` (`accent`) |
| Text           | `#EDEDEB` (`ink`)    |
| Secondary text | `#A1A1AA` (`muted`)  |

Headings use Space Grotesk and body text uses Inter. Tokens are defined in the `@theme` block in `src/index.css`.

## Behaviour notes

- **Reduced motion:** `prefers-reduced-motion` turns off Lenis smooth scrolling, the pinned horizontal gallery, scroll scrubbing, particles motion, tilt and magnetic effects.
- **Desktop only:** the custom cursor, magnetic buttons and tilt need a fine pointer (`hover: hover`). The horizontal gallery needs a viewport of 1024px or wider.
- **Mobile and tablet:** single-column layout, fewer particles and no custom cursor.
- **Accessibility:** skip link, visible focus states, labelled dialog with focus trap and Escape to close, and screen-reader text for animated headings.

## SEO

Title, description, Open Graph and Twitter tags, JSON-LD `Person` data, `robots.txt` and `sitemap.xml` are set up. The canonical, Open Graph and sitemap URLs assume `https://wikky-santoso.github.io/Portofolio/`. Update them in `index.html`, `public/robots.txt` and `public/sitemap.xml` if you deploy elsewhere.

Some platforms don't render SVG Open Graph images. If link previews look blank, replace `public/og-image.svg` with a 1200x630 PNG and update the URL in `index.html`.

## Deployment

`vite.config.js` uses `base: './'`, so the contents of `dist/` work on GitHub Pages or any static host.
