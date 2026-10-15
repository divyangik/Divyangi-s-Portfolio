# AGENTS.md

Guide for developers and AI agents working on this codebase.

## Project Overview

The personal portfolio of **Divyangi Kanchan**, a Full-Stack Developer (React.js · Java / Spring Boot · Shopify) in Pune, India. The site tells her story like a short film in a hand-drawn sketchbook style: an opening title sequence, a scroll-scrubbed prologue, numbered "chapters" for each section, a horizontal film reel of client work, and closing credits. It also hosts her downloadable resume and a contact form.

The original design came from a Lovable project (sketchbook palette, Caveat + Outfit fonts, the `divya.png` illustration and the pencil-writing hero). It was ported onto Netlify's TanStack Start starter and extended with the resume content.

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | TanStack Start (React 19, TanStack Router), Vite 8     |
| Styling    | Tailwind CSS 4, theme + custom utilities in `src/styles.css` |
| Motion     | `motion` (Framer Motion) for scroll-linked and enter animations; CSS keyframes for loops |
| Forms      | Netlify Forms (contact form)                           |
| Icons      | lucide-react                                           |
| Deployment | Netlify via `@netlify/vite-plugin-tanstack-start`      |

## Key Files

```
public/
  Divyangi_Kanchan_Resume.docx  # The original resume, served for download
  contact-form.html             # Static Netlify Forms registration (must match ContactForm fields)
src/
  assets/divya.png              # Illustrated character used throughout
  content/resume.ts             # SINGLE SOURCE OF TRUTH for all resume/portfolio text
  components/portfolio/
    Intro.tsx      # Letterboxed opening title card (once per session, skippable)
    Chrome.tsx     # Scroll progress bar, chapter indicator (xl screens), film grain; `chapters` list
    Nav.tsx        # Fixed header + mobile menu + resume download
    Hero.tsx       # Pencil-writes the name, typewriter roles, mouse parallax, scroll pull-back
    Story.tsx      # Prologue (sticky word-by-word reveal), About + stat counters, Skills tabs + marquee
    Work.tsx       # Journey timeline (scroll-drawn line), featured job, film-reel projects, academic polaroids
    Finale.tsx     # Education, resume "script" preview, contact + form, closing credits footer
    Reveal.tsx     # IntersectionObserver reveal wrapper and ChapterTitle
    Doodles.tsx    # Hand-drawn SVG doodles (Star, Heart, Sparkle, Squiggle, Arrow, Pencil)
  routes/
    index.tsx      # Composes the story in chapter order
    resume.tsx     # /resume — printable resume (browser "Save as PDF")
```

## Conventions & Non-obvious Decisions

- **Edit content in `src/content/resume.ts` only.** Both the home page and `/resume` render from it. When the resume changes, also replace `public/Divyangi_Kanchan_Resume.docx` so the download matches.
- Section ids must match the `chapters` array in `Chrome.tsx` for the chapter indicator to track them.
- `body` uses `overflow-x: clip`, not `hidden` — `hidden` on html/body breaks `position: sticky`, which the Prologue and the Work film reel depend on.
- The Work reel only pins and scrolls horizontally at ≥1024px (it measures the track in `useEffect`); below that it's a native swipeable, snap-scrolling row.
- All motion respects `prefers-reduced-motion` (global CSS override; Intro and Hero skip straight to their final state).
- The contact form posts to `/contact-form.html` (not `/`, which the SSR handler owns). Field names must stay in sync with `public/contact-form.html`.
- Use the sketch utilities (`sketch`, `sketch-shadow(-lg)`, `btn-sketch`, `tilt-l/r`, `tape`) and palette colors (`ink`, `paper`, `blush`, `mint`, `butter`, `sky`, `lilac`, `night`) rather than raw colors.
- Reading `sessionStorage`/`window` happens only inside `useEffect` to avoid hydration mismatches.
- `src/components/ui/` holds the shadcn/ui kit from the starter; the portfolio mostly uses its own sketch components. `sonner`'s Toaster stays mounted in `__root.tsx`.

## Commands

```bash
npm run dev        # Vite dev server on port 3000 (or `netlify dev` for Forms emulation)
npm run build      # Production build
npm run typecheck  # tsc --noEmit
npm run lint
```
