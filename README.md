# Divyangi Kanchan — Portfolio

A cinematic, hand-drawn portfolio for **Divyangi Kanchan**, Full-Stack Developer (React.js · Java / Spring Boot · Shopify) based in Pune, India.

The site is told as a short film in a sketchbook: an opening title card, a scroll-scrubbed prologue, numbered chapters (About, Toolkit, Journey, Work, Practice, Foundations, The Script, Epilogue) and rolling end credits. Visitors can download the resume as the original Word document or open a printable version at `/resume` and save it as a PDF.

## Features

- Opening title sequence with letterbox curtains (once per session, click to skip)
- Pencil-written name, typewriter role rotation and mouse-parallax doodles in the hero
- Scroll progress bar, chapter indicator and subtle film grain
- Word-by-word scroll narration, animated stat counters, tabbed skill boards and a tool marquee
- Scroll-drawn career timeline and a featured "now playing" role
- Client projects in a horizontal film reel driven by vertical scroll (swipeable on mobile)
- Academic projects as taped polaroids, education & certification cards
- Resume download (`.docx`) and printable `/resume` page
- Contact form powered by Netlify Forms, plus email, phone, LinkedIn and GitHub links
- Respects `prefers-reduced-motion`

## Tech

TanStack Start · React 19 · Vite · Tailwind CSS 4 · Motion · Netlify Forms · Netlify

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
# or, with Netlify Forms emulation:
netlify dev
```

## Updating content

All text lives in `src/content/resume.ts`. When the resume changes, update that file and replace `public/Divyangi_Kanchan_Resume.docx`.
