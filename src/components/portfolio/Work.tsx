import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Briefcase, MapPin } from 'lucide-react'
import { academicProjects, experience, professionalProjects, timeline, type Project } from '@/content/resume'
import { Sparkle, Star } from './Doodles'
import { ChapterTitle, Reveal } from './Reveal'
import { wrap } from './Story'

const tints = ['bg-blush', 'bg-mint', 'bg-butter', 'bg-sky', 'bg-lilac']

export function Journey() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const job = experience[0]!
  return (
    <section id="journey" className={wrap}>
      <ChapterTitle chapter="Chapter 03" kicker="The Journey" title="How the story unfolded" />
      <ol ref={ref} className="relative mx-auto max-w-3xl">
        <div aria-hidden className="absolute left-5 top-0 h-full w-0.5 bg-ink/15 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          aria-hidden
          className="absolute left-5 top-0 h-full w-1 origin-top rounded-full bg-primary md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: line }}
        />
        {timeline.map((j, i) => (
          <Reveal
            as="li"
            key={j.title}
            delay={80}
            className={`relative mb-12 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}
          >
            <span
              className={`absolute left-0 top-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper font-hand text-xl font-bold text-ink md:top-4 ${i % 2 ? 'md:-left-5' : 'md:-right-5 md:left-auto'}`}
            >
              {i + 1}
            </span>
            <div className={`sketch sketch-shadow ${tints[i % 5]} p-5 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">{j.year}</p>
              <h3 className="font-hand text-3xl font-bold text-ink">{j.title}</h3>
              <p className="mt-1 text-ink/75">{j.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      {/* Featured role — the "now playing" scene */}
      <Reveal className="relative mx-auto mt-10 max-w-4xl">
        <div className="sketch sketch-shadow-lg relative bg-paper p-7 md:p-10">
          <span className="sketch absolute -top-5 left-6 rotate-[-3deg] bg-primary px-4 py-1 font-hand text-2xl text-primary-foreground">
            ● Now playing
          </span>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-hand text-4xl font-bold text-ink md:text-5xl">
                {job.role} <span className="text-primary">@ {job.company}</span>
              </h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-4 w-4" /> {job.companyNote}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {job.location}
                </span>
              </p>
            </div>
            <span className="rounded-full border-2 border-ink bg-mint px-4 py-1 text-sm font-semibold text-ink">{job.period}</span>
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {job.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-ink/80">
                <Star className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}

function Frame({ p, i, total }: { p: Project; i: number; total: number }) {
  return (
    <article className="relative flex w-[min(86vw,30rem)] shrink-0 flex-col overflow-hidden rounded-xl border-2 border-paper/20 bg-paper text-ink shadow-2xl">
      <div className={`${p.tint} relative flex min-h-52 flex-col justify-between border-b-2 border-ink p-6`}>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
          <span>Scene {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <span>{p.tag}</span>
        </div>
        <h3 className="font-hand text-4xl font-bold leading-tight md:text-5xl">{p.name}</h3>
        <Star className="absolute right-5 top-12 h-8 w-8 text-ink/30" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <ul className="space-y-2 text-ink/75">
          {p.points.map((pt) => (
            <li key={pt} className="flex gap-2">
              <span className="text-primary">✦</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.stack.map((t) => (
            <li key={t} className="rounded-full border-2 border-ink px-3 py-0.5 text-xs font-semibold">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Sprockets() {
  return (
    <div aria-hidden className="flex gap-4 overflow-hidden px-4 opacity-40">
      {Array.from({ length: 60 }).map((_, i) => (
        <span key={i} className="h-3 w-5 shrink-0 rounded-sm bg-paper/70" />
      ))}
    </div>
  )
}

// Chapter 04: vertical scroll drives a horizontal film reel on large screens.
export function Work() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  useEffect(() => {
    const measure = () => {
      const el = track.current
      if (!el) return
      setDistance(window.innerWidth >= 1024 ? Math.max(0, el.scrollWidth - window.innerWidth + 80) : 0)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance])
  const reel = useSpring(x, { stiffness: 90, damping: 24 })

  return (
    <section
      id="work"
      ref={section}
      className="relative bg-night text-paper"
      style={{ height: distance ? `calc(100vh + ${distance}px)` : undefined }}
    >
      <div className={`${distance ? 'sticky top-0 h-[100svh]' : ''} flex flex-col justify-center overflow-hidden py-24`}>
        <div className="mx-auto w-full max-w-6xl px-5">
          <ChapterTitle chapter="Chapter 04" kicker="The Work" title="Scenes from the studio" light />
        </div>
        <Sprockets />
        <motion.div
          ref={track}
          style={{ x: distance ? reel : 0 }}
          className={`flex gap-8 px-5 py-8 lg:px-[max(1.25rem,calc((100vw_-_72rem)/2))] ${distance ? '' : 'snap-x snap-mandatory overflow-x-auto'}`}
        >
          {professionalProjects.map((p, i) => (
            <div key={p.name} className="snap-center">
              <Frame p={p} i={i} total={professionalProjects.length} />
            </div>
          ))}
          <div className="flex w-[min(86vw,22rem)] shrink-0 flex-col items-center justify-center text-center">
            <Sparkle className="h-12 w-12 animate-drift text-blush" />
            <p className="mt-4 font-hand text-4xl">More scenes in production…</p>
            <p className="mt-2 text-paper/60">Built at eDreamz, a Shopify Partner agency in Pune.</p>
          </div>
        </motion.div>
        <Sprockets />
        {!distance && <p className="mt-4 text-center text-sm text-paper/50">Swipe the reel →</p>}
      </div>
    </section>
  )
}

export function Practice() {
  return (
    <section id="practice" className={wrap}>
      <ChapterTitle chapter="Chapter 05" kicker="The Practice Room" title="Where I learned by building" />
      <div className="grid gap-10 sm:grid-cols-2">
        {academicProjects.map((p, i) => (
          <Reveal as="article" key={p.name} delay={i * 90}>
            <motion.div
              whileHover={{ rotate: 0, y: -8 }}
              initial={false}
              style={{ rotate: i % 2 ? 2 : -2 }}
              className="sketch sketch-shadow-lg relative h-full bg-paper p-4 pb-6"
            >
              <span className="tape -top-3 left-8 rotate-[-6deg]" aria-hidden />
              <div className={`${p.tint} flex min-h-40 items-end rounded-md border-2 border-ink p-5`}>
                <h3 className="font-hand text-4xl font-bold leading-tight text-ink">{p.name}</h3>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">{p.tag}</p>
              <p className="mt-2 text-ink/75">{p.points[0]}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="rounded-full border-2 border-ink px-3 py-0.5 text-xs font-semibold text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
