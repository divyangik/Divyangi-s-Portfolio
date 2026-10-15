import { useEffect, useRef, useState, type ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

// Every section is a "chapter" in the story — numbered like a film's scene card.
export function ChapterTitle({
  chapter,
  kicker,
  title,
  light = false,
}: {
  chapter: string
  kicker: string
  title: string
  light?: boolean
}) {
  return (
    <Reveal className="mb-14 text-center">
      <p
        className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] ${light ? 'text-blush' : 'text-primary'}`}
      >
        <span className={`h-px w-8 ${light ? 'bg-blush' : 'bg-primary'}`} />
        {chapter} · {kicker}
        <span className={`h-px w-8 ${light ? 'bg-blush' : 'bg-primary'}`} />
      </p>
      <h2
        className={`mt-3 font-hand text-5xl font-bold leading-none md:text-7xl ${light ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </h2>
      <svg
        viewBox="0 0 200 24"
        className="draw-line mx-auto mt-2 h-4 w-48 text-primary"
        aria-hidden
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          d="M4 14c30-8 60-10 96-6s70 4 96-4"
        />
      </svg>
    </Reveal>
  )
}
