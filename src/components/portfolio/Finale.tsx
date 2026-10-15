import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { Link } from '@tanstack/react-router'
import type { SVGProps } from 'react'
import { Award, Download, FileText, GraduationCap, Heart as HeartIcon, Mail, Phone, Send } from 'lucide-react'
import divya from '@/assets/divya.png'
import { education, experience, profile, RESUME_FILE, skillGroups } from '@/content/resume'
import { Heart, Sparkle, Star } from './Doodles'
import { ChapterTitle, Reveal } from './Reveal'
import { wrap } from './Story'

// lucide-react v1 no longer ships brand icons, so these two are inline SVGs.
const Github = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
const Linkedin = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export function Foundations() {
  return (
    <section id="foundations" className={wrap}>
      <ChapterTitle chapter="Chapter 06" kicker="Foundations" title="Education & certification" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {education.map((e, i) => {
          const Icon = e.kind === 'Degree' ? GraduationCap : Award
          return (
            <Reveal key={e.title} delay={i * 120}>
              <div className={`sketch sketch-shadow-lg relative h-full p-7 ${i ? 'tilt-r bg-mint' : 'tilt-l bg-butter'}`}>
                <div className="absolute -right-4 -top-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-primary text-primary-foreground shadow-[3px_4px_0_var(--ink)]">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
                  {e.kind} · {e.period}
                </p>
                <h3 className="mt-2 font-hand text-4xl font-bold leading-tight text-ink">{e.title}</h3>
                <p className="mt-2 font-semibold text-ink/80">{e.org}</p>
                <p className="mt-4 inline-block rounded-full border-2 border-ink bg-paper px-4 py-1 text-sm font-bold text-ink">
                  {e.detail}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

// Chapter 07: the "script" — a paper mini-preview of the resume with download actions.
export function Script() {
  const job = experience[0]!
  return (
    <section id="resume" className={wrap}>
      <ChapterTitle chapter="Chapter 07" kicker="The Script" title="Take the whole story with you" />
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="font-hand text-3xl leading-snug text-ink">
            Every film has a script. Here's mine — one page, everything that matters, ready for your hiring team.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Download the original Word resume, or open the printable web version and save it as a PDF straight from your
            browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={RESUME_FILE} download className="btn-sketch bg-primary text-primary-foreground">
              <Download className="h-5 w-5" /> Download Resume (.docx)
            </a>
            <Link to="/resume" className="btn-sketch bg-paper text-ink">
              <FileText className="h-5 w-5" /> View printable / PDF
            </Link>
          </div>
        </Reveal>
        <Reveal delay={150} className="relative">
          <motion.a
            href={RESUME_FILE}
            download
            aria-label="Download Divyangi Kanchan's resume"
            whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
            initial={false}
            style={{ rotate: 2 }}
            className="sketch-shadow-lg relative block rounded-sm border-2 border-ink bg-paper p-7 text-left"
          >
            <span className="tape -top-3 right-10 rotate-[8deg]" aria-hidden />
            <p className="text-center text-xl font-bold tracking-wide text-ink">{profile.name.toUpperCase()}</p>
            <p className="text-center text-[11px] text-ink/60">
              {profile.role} | {profile.focus.join(' • ')}
            </p>
            <p className="mt-0.5 text-center text-[10px] text-ink/50">
              {profile.email} | {profile.location}
            </p>
            {[
              ['Professional Summary', profile.summary.slice(0, 150) + '…'],
              ['Technical Skills', skillGroups.map((g) => g.title).join(' · ')],
              [`Experience`, `${job.role} — ${job.company} · ${job.period}`],
              ['Education', education.map((e) => e.title).join(' · ')],
            ].map(([h, b]) => (
              <div key={h} className="mt-4">
                <p className="border-b border-ink/30 pb-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-ink">{h}</p>
                <p className="mt-1 text-[11px] leading-snug text-ink/70">{b}</p>
              </div>
            ))}
            <div className="mt-4 space-y-1.5" aria-hidden>
              {[92, 80, 86, 60].map((w, i) => (
                <div key={i} className="h-1.5 rounded bg-ink/10" style={{ width: `${w}%` }} />
              ))}
            </div>
            <span className="sketch absolute -bottom-5 -left-4 -rotate-6 bg-blush px-3 py-1 font-hand text-xl text-ink">
              click to download ↓
            </span>
          </motion.a>
          <Sparkle className="absolute -right-3 -top-6 h-9 w-9 animate-drift text-primary" />
        </Reveal>
      </div>
    </section>
  )
}

type State = 'idle' | 'pending' | 'success' | 'error'

function ContactForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  const field =
    'mt-1 w-full rounded-lg border-2 border-ink bg-paper px-4 py-3 text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-primary'

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state !== 'pending' && state !== 'idle') setState('idle')
      }}
      className="sketch sketch-shadow-lg bg-paper p-6 md:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-4">
        <legend className="font-hand text-3xl font-bold text-ink">Send a note ✉️</legend>
        <label className="block text-sm font-semibold text-ink">
          Name
          <input name="name" autoComplete="name" required maxLength={100} className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={field}
            placeholder="you@company.com"
          />
        </label>
        <label className="block text-sm font-semibold text-ink">
          Message
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={4}
            className={field}
            placeholder="Tell me about the role or the project…"
          />
        </label>
        <button type="submit" className="btn-sketch w-full justify-center bg-primary text-primary-foreground disabled:opacity-60">
          <Send className="h-4 w-4" /> {state === 'pending' ? 'Sending…' : 'Send message'}
        </button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          Your message couldn't be confirmed as sent. Your details are still here — please try again, or email me
          directly.
        </p>
      )}
      {state === 'success' && (
        <p role="status" className="mt-4 font-hand text-2xl text-ink">
          Got it — thank you! I'll write back soon 💌
        </p>
      )}
    </form>
  )
}

export function Contact() {
  const links = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: Github, label: 'GitHub', href: profile.github },
  ]
  return (
    <section id="contact" className={wrap}>
      <ChapterTitle chapter="Epilogue" kicker="The Next Chapter" title="Let's write it together" />
      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <Reveal className="sketch sketch-shadow-lg relative bg-secondary p-8 md:p-10">
          <h3 className="font-hand text-5xl font-bold leading-none text-ink">Have a role or an idea?</h3>
          <p className="mt-5 max-w-xl text-lg text-ink/75">
            I'm open to full-stack and frontend opportunities — React.js, Shopify, Java / Spring Boot — and always happy to
            chat with people who love building things.
          </p>
          <ul className="mt-8 space-y-3">
            {links.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold text-ink"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper transition-transform group-hover:-rotate-12">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="decoration-primary decoration-2 underline-offset-4 group-hover:underline">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 ml-auto w-32 md:w-40">
            <img src={divya} alt="" loading="lazy" className="h-auto w-full animate-wobble" width={900} height={1152} />
            <Heart className="absolute -right-2 top-0 h-8 w-8 animate-drift text-primary" />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

// Closing credits — rolls slowly like the end of a film.
export function Credits() {
  const lines = [
    ['Written & Directed by', profile.name],
    ['Frontend', 'React.js · Tailwind CSS'],
    ['Backend', 'Java · Spring Boot · FastAPI'],
    ['Commerce', 'Shopify · Liquid · Metafields'],
    ['Filmed on location in', profile.location],
    ['Special thanks', 'Every pencil, every bug, every coffee'],
  ]
  return (
    <footer className="relative overflow-hidden bg-night py-20 text-center text-paper">
      <Star className="absolute left-[10%] top-10 h-6 w-6 animate-drift text-blush/60" />
      <Sparkle className="absolute right-[12%] bottom-16 h-8 w-8 animate-drift text-blush/60" />
      <Reveal>
        <p className="font-hand text-6xl font-bold md:text-7xl">The End</p>
        <p className="mt-1 text-xs uppercase tracking-[0.4em] text-blush">…for now</p>
      </Reveal>
      <dl className="mx-auto mt-12 max-w-md space-y-6">
        {lines.map(([k, v], i) => (
          <Reveal key={k} delay={i * 80}>
            <dt className="text-[11px] uppercase tracking-[0.3em] text-paper/50">{k}</dt>
            <dd className="mt-1 text-lg font-semibold">{v}</dd>
          </Reveal>
        ))}
      </dl>
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <a href={RESUME_FILE} download className="btn-sketch bg-blush text-ink">
          <Download className="h-4 w-4" /> Resume
        </a>
        <a href="#top" className="btn-sketch bg-paper text-ink">
          Replay from the start ↑
        </a>
      </div>
      <p className="mt-12 flex items-center justify-center gap-2 text-sm text-paper/50">
        Made with <HeartIcon className="h-4 w-4 fill-primary text-primary" /> & lots of doodles · © {new Date().getFullYear()}{' '}
        {profile.name}
      </p>
    </footer>
  )
}
