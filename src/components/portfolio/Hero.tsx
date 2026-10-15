import { useEffect, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, Download } from 'lucide-react'
import divya from '@/assets/divya.png'
import { profile, RESUME_FILE } from '@/content/resume'
import { Arrow, Heart, Pencil, Sparkle, Star } from './Doodles'

type Phase = 0 | 1 | 2 | 3

const roles = ['Full-Stack Developer', 'React.js Builder', 'Shopify App Maker', 'Spring Boot Tinkerer', 'Accessibility Advocate']

function useTypewriter(words: string[], run: boolean) {
  const [text, setText] = useState('')
  useEffect(() => {
    if (!run) return
    let w = 0
    let i = 0
    let deleting = false
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      const word = words[w]!
      i += deleting ? -1 : 1
      setText(word.slice(0, i))
      let delay = deleting ? 35 : 70
      if (!deleting && i === word.length) {
        deleting = true
        delay = 1800
      } else if (deleting && i === 0) {
        deleting = false
        w = (w + 1) % words.length
        delay = 300
      }
      t = setTimeout(tick, delay)
    }
    t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [run, words])
  return text
}

export function Hero({ start }: { start: boolean }) {
  const [phase, setPhase] = useState<Phase>(0)
  useEffect(() => {
    if (!start) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setPhase(3)
      return
    }
    const t = [setTimeout(() => setPhase(1), 100), setTimeout(() => setPhase(2), 900), setTimeout(() => setPhase(3), 3400)]
    return () => t.forEach(clearTimeout)
  }, [start])

  const writing = phase >= 2
  const done = phase >= 3
  const role = useTypewriter(roles, done)

  // Mouse parallax for the drifting doodles
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 15 })
  const sy = useSpring(my, { stiffness: 60, damping: 15 })
  const farX = useTransform(sx, (v) => v * 30)
  const farY = useTransform(sy, (v) => v * 30)
  const nearX = useTransform(sx, (v) => v * -18)
  const nearY = useTransform(sy, (v) => v * -18)

  // Scroll: the scene recedes like a camera pull-back
  const { scrollY } = useScroll()
  const sceneScale = useTransform(scrollY, [0, 700], [1, 0.9])
  const sceneOpacity = useTransform(scrollY, [0, 600], [1, 0])
  const sceneY = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
    >
      {/* soft spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/40 blur-3xl"
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: farX, y: farY }}>
        <Star className="absolute left-[6%] top-28 h-8 w-8 animate-drift text-primary" />
        <Sparkle className="absolute right-[10%] top-32 hidden h-10 w-10 animate-drift text-ink/70 sm:block" style={{ animationDelay: '1s' }} />
        <Star className="absolute bottom-[18%] right-[6%] h-6 w-6 animate-drift text-ink/50" style={{ animationDelay: '3s' }} />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: nearX, y: nearY }}>
        <Heart className="absolute bottom-24 left-[45%] hidden h-7 w-7 animate-drift text-primary md:block" style={{ animationDelay: '2s' }} />
        <Sparkle className="absolute left-[14%] bottom-[22%] h-6 w-6 animate-drift text-primary/70" style={{ animationDelay: '.5s' }} />
      </motion.div>

      <motion.div
        className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-12 pt-24 md:grid-cols-[5fr_7fr]"
        style={{ scale: sceneScale, opacity: sceneOpacity, y: sceneY }}
      >
        {/* Character */}
        <div
          className="relative mx-auto w-52 sm:w-64 md:w-full md:max-w-sm"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: done ? 'none' : 'var(--hero-girl-start, translateY(20px))',
            transition: 'opacity .9s ease, transform 1.2s cubic-bezier(.65,0,.35,1)',
          }}
        >
          <style>{`@media (min-width:768px){:root{--hero-girl-start: translateX(38%) scale(.92)}}`}</style>
          <div className="animate-float">
            <img
              src={divya}
              alt="Divya, an illustrated girl with long brown hair, round tortoiseshell glasses and a pink sweater"
              className="h-auto w-full select-none drop-shadow-sm"
              width={900}
              height={1152}
              fetchPriority="high"
            />
          </div>
          <div
            className={`absolute -right-2 -top-6 rotate-6 transition-all duration-700 md:-left-10 md:right-auto md:-top-10 md:-rotate-6 ${done ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
          >
            <span className="sketch sketch-shadow block bg-secondary px-3 py-1 font-hand text-2xl text-ink">
              Hi, I'm {profile.nickname}!
            </span>
            <Arrow className="ml-2 h-8 w-12 text-ink" />
          </div>
        </div>

        {/* Name + intro */}
        <div className="text-center md:text-left">
          <h1 className="sr-only">
            {profile.name} — {profile.role}
          </h1>
          <div className="relative inline-block" aria-hidden>
            <span
              className="block font-hand text-7xl font-bold leading-none tracking-wide text-ink sm:text-8xl lg:text-[9rem]"
              style={{
                clipPath: writing ? undefined : 'inset(0 100% 0 0)',
                animation: writing && !done ? 'write-reveal 2.4s cubic-bezier(.4,.1,.5,1) forwards' : undefined,
              }}
            >
              DIVYANGI
            </span>
            {writing && !done && (
              <span
                className="pointer-events-none absolute -top-10 h-24"
                style={{ animation: 'pencil-move 2.4s cubic-bezier(.4,.1,.5,1) forwards' }}
              >
                <Pencil
                  className="h-24 w-8 -translate-x-1"
                  style={{ animation: 'pencil-bob .25s ease-in-out infinite', transformOrigin: 'bottom center' }}
                />
              </span>
            )}
            <svg
              viewBox="0 0 400 20"
              className={`absolute -bottom-3 left-0 w-full text-primary transition-opacity ${done ? 'opacity-100' : 'opacity-0'}`}
            >
              <path
                d="M4 12c80-10 200-10 392-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ strokeDasharray: 420, strokeDashoffset: done ? 0 : 420, transition: 'stroke-dashoffset 1s ease .2s' }}
              />
            </svg>
          </div>

          <div
            className={`transition-all duration-700 ${done ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
            style={{ transitionDelay: done ? '300ms' : '0ms' }}
          >
            <p className="mt-6 min-h-[2.25rem] text-xl font-semibold text-ink sm:text-2xl" aria-label={profile.role}>
              <span className="caret">{role}</span>
            </p>
            <p className="mt-1 font-hand text-2xl text-primary">{profile.location}</p>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:mx-0 md:text-lg">
              I turn sketches into working software — React.js interfaces, Shopify apps and Spring Boot back-ends that feel
              as good as they function.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <a href="#work" className="btn-sketch bg-primary text-primary-foreground">
                Explore My Work
              </a>
              <a href={RESUME_FILE} download className="btn-sketch bg-paper text-ink">
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <a
        href="#prologue"
        className={`no-print absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.3em] text-ink/60 transition-opacity duration-700 ${done ? 'opacity-100' : 'opacity-0'}`}
      >
        Scroll the story
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  )
}
