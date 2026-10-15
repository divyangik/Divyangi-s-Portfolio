import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Code2, GraduationCap, Languages, MapPin } from 'lucide-react'
import divya from '@/assets/divya.png'
import { profile, skillGroups, stats } from '@/content/resume'
import { Sparkle, Squiggle, Star } from './Doodles'
import { ChapterTitle, Reveal } from './Reveal'

export const wrap = 'relative mx-auto max-w-6xl px-5 py-24 md:py-32'

const prologue =
  'Every interface I build starts the same way — as a doodle in the margin. A box becomes a button, a scribble becomes a booking flow, and a late-night idea becomes something real people click on. This is that story.'

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  )
}

// Chapter 00: a sticky, scroll-scrubbed narration where each word lights up in turn.
export function Prologue() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = prologue.split(' ')
  return (
    <section id="prologue" ref={ref} className="relative h-[220vh]" aria-label="Prologue">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto max-w-4xl px-5">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Chapter 00 · Prologue</p>
          <p className="sr-only">{prologue}</p>
          <p aria-hidden className="font-hand text-4xl font-bold leading-[1.15] text-ink sm:text-5xl md:text-6xl">
            {words.map((w, i) => {
              const start = (i / words.length) * 0.85
              return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 0.85 / words.length + 0.04]} />
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

function Counter({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    let raf = 0
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400)
      setN(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return <span ref={ref}>{n.toFixed(decimals)}</span>
}

export function About() {
  const facts = [
    { icon: MapPin, label: profile.location, tint: 'bg-blush' },
    { icon: Code2, label: 'Full-stack web', tint: 'bg-mint' },
    { icon: Languages, label: 'EN / AR content', tint: 'bg-butter' },
    { icon: GraduationCap, label: 'SPPU graduate', tint: 'bg-sky' },
  ]
  return (
    <section id="about" className={wrap}>
      <ChapterTitle chapter="Chapter 01" kicker="The Girl Behind the Pencil" title="A little about me" />
      <div className="grid items-center gap-14 md:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <div className="sketch sketch-shadow-lg tilt-l relative bg-secondary p-6">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-4deg]" aria-hidden />
            <img src={divya} alt="Illustration of Divya" loading="lazy" className="mx-auto h-auto w-3/4" width={900} height={1152} />
            <span className="sketch absolute -bottom-4 right-6 rotate-3 bg-butter px-3 py-1 font-hand text-xl text-ink">
              that's me!
            </span>
          </div>
          <Star className="absolute -left-6 -top-6 h-10 w-10 animate-drift text-primary" />
          <Sparkle className="absolute -right-4 top-1/3 h-8 w-8 animate-drift text-ink/60" style={{ animationDelay: '1.5s' }} />
        </Reveal>
        <Reveal delay={150}>
          <h3 className="font-hand text-4xl font-bold text-ink md:text-5xl">Hello! I'm {profile.short}.</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            By day I ship Shopify storefronts and apps at a partner agency; by night I'm still the student who gets
            excited when a form validates exactly right.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map(({ icon: Icon, label, tint }, i) => (
              <div
                key={label}
                className={`sketch sketch-shadow ${tint} p-4 transition-transform hover:-rotate-2 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
              >
                <Icon className="h-6 w-6 text-ink" />
                <p className="mt-2 text-sm font-semibold text-ink">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <ul className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal as="li" key={s.label} delay={i * 100} className="text-center">
            <p className="font-hand text-6xl font-bold text-ink md:text-7xl">
              <Counter value={s.value} decimals={s.decimals} />
              <span className="text-primary">{s.suffix || '·'}</span>
            </p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

const marquee = ['React.js', 'Spring Boot', 'Shopify', 'Liquid', 'FastAPI', 'MySQL', 'TiDB', 'Tailwind CSS', 'Joomla 6', 'WordPress', 'REST APIs', 'Postman', 'Git']

export function Skills() {
  const [active, setActive] = useState(0)
  const group = skillGroups[active]!
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <ChapterTitle chapter="Chapter 02" kicker="The Toolkit" title="What's in my pencil case" />
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal className="sketch sketch-shadow-lg tilt-l self-start bg-butter p-8">
            <p className="font-hand text-3xl leading-snug text-ink">
              From pixel-perfect layouts to the APIs and tables behind them — I love the whole journey of making things
              work <em>and</em> feel good.
            </p>
            <Squiggle className="is-visible mt-4 h-5 w-40 text-primary" />
          </Reveal>
          <Reveal delay={120}>
            <div role="tablist" aria-label="Skill categories" className="flex flex-wrap gap-2">
              {skillGroups.map((g, i) => (
                <button
                  key={g.title}
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="skill-panel"
                  onClick={() => setActive(i)}
                  className={`btn-sketch py-1.5 text-sm ${i === active ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
                >
                  <span aria-hidden>{g.emoji}</span> {g.title}
                </button>
              ))}
            </div>
            <motion.ul
              id="skill-panel"
              role="tabpanel"
              key={group.title}
              className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {group.items.map((s, i) => (
                <motion.li
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 24, rotate: 0 },
                    show: { opacity: 1, y: 0, rotate: ((i * 37) % 5) - 2 },
                  }}
                  whileHover={{ y: -6, rotate: 2 }}
                  className={`sketch sketch-shadow ${group.tint} flex min-h-20 items-center justify-center p-4 text-center font-semibold text-ink`}
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>
        </div>
      </div>

      <div className="marquee-mask mt-24 -rotate-2 overflow-hidden border-y-2 border-ink bg-ink py-4 text-paper" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 font-hand text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <Star className="h-6 w-6 text-blush" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
