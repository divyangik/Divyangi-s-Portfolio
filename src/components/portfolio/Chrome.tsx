import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export const chapters = [
  { id: 'top', label: 'Opening' },
  { id: 'prologue', label: 'Prologue' },
  { id: 'about', label: 'The Girl' },
  { id: 'skills', label: 'The Toolkit' },
  { id: 'journey', label: 'The Journey' },
  { id: 'work', label: 'The Work' },
  { id: 'practice', label: 'The Practice' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'resume', label: 'The Script' },
  { id: 'contact', label: 'Next Chapter' },
]

// A pencil-line reading progress bar pinned to the top of the viewport.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      className="no-print fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-primary"
      style={{ scaleX }}
    />
  )
}

// Film-style scene counter on the right edge showing the current chapter.
export function ChapterIndicator() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = chapters.findIndex((c) => c.id === e.target.id)
            if (i >= 0) setActive(i)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <nav
      aria-label="Chapters"
      className="no-print fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col items-end gap-3">
        {chapters.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              className="group flex items-center gap-3"
              aria-current={i === active ? 'true' : undefined}
            >
              <span
                className={`font-hand text-lg leading-none transition-all duration-300 ${i === active ? 'translate-x-0 text-ink opacity-100' : 'translate-x-2 text-ink/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
              >
                {String(i).padStart(2, '0')} {c.label}
              </span>
              <span
                className={`block rounded-full border-2 border-ink transition-all duration-300 ${i === active ? 'h-3 w-8 bg-primary' : 'h-3 w-3 bg-paper'}`}
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function FilmGrain() {
  return <div aria-hidden className="film-grain no-print" />
}
