import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import {
  academicProjects,
  education,
  experience,
  professionalProjects,
  profile,
  RESUME_FILE,
  skillGroups,
} from '@/content/resume'

export const Route = createFileRoute('/resume')({
  head: () => ({
    meta: [
      { title: `${profile.name} — Resume` },
      { name: 'description', content: `Resume of ${profile.name}, ${profile.role} in ${profile.location}.` },
    ],
  }),
  component: ResumePage,
})

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-6 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-[0.15em] text-ink print:mt-4">
      {children}
    </h2>
  )
}

function ResumePage() {
  return (
    <div className="min-h-svh px-4 py-10 print:p-0">
      <div className="no-print mx-auto mb-6 flex max-w-[52rem] flex-wrap items-center justify-between gap-3">
        <Link to="/" className="btn-sketch bg-paper py-1.5 text-sm text-ink">
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => window.print()} className="btn-sketch bg-paper py-1.5 text-sm text-ink">
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
          <a href={RESUME_FILE} download className="btn-sketch bg-primary py-1.5 text-sm text-primary-foreground">
            <Download className="h-4 w-4" /> Download .docx
          </a>
        </div>
      </div>

      <article className="mx-auto max-w-[52rem] border-2 border-ink bg-white p-8 text-[13.5px] leading-relaxed text-ink shadow-[5px_6px_0_var(--ink)] md:p-12 print:max-w-none print:border-0 print:p-0 print:shadow-none">
        <header className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">{profile.name.toUpperCase()}</h1>
          <p className="mt-1 font-semibold">
            {profile.role} | {profile.focus.join(' • ')}
          </p>
          <p className="mt-1 text-xs text-ink/70">
            {profile.phone} | <a href={`mailto:${profile.email}`}>{profile.email}</a> | {profile.location} |{' '}
            <a href={profile.linkedin}>{profile.linkedinLabel}</a> | <a href={profile.github}>{profile.githubLabel}</a>
          </p>
        </header>

        <H>Professional Summary</H>
        <p className="mt-2">{profile.summary}</p>

        <H>Technical Skills</H>
        <ul className="mt-2 space-y-0.5">
          {skillGroups.map((g) => (
            <li key={g.title}>
              <strong>{g.title}:</strong> {g.items.join(', ')}
            </li>
          ))}
        </ul>

        <H>Professional Experience</H>
        {experience.map((e) => (
          <section key={e.company} className="mt-2">
            <div className="flex flex-wrap justify-between gap-2">
              <strong>
                {e.role} — {e.company} ({e.companyNote})
              </strong>
              <span>
                {e.location} | {e.period}
              </span>
            </div>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              {e.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ))}

        <H>Professional Projects (eDreamz)</H>
        {professionalProjects.map((p) => (
          <section key={p.name} className="mt-2">
            <p>
              <strong>{p.name}</strong> | <em>{p.stack.join(', ')}</em>
            </p>
            <p>{p.points.join(' ')}</p>
          </section>
        ))}

        <H>Academic Projects</H>
        {academicProjects.map((p) => (
          <section key={p.name} className="mt-2">
            <p>
              <strong>{p.name}</strong> ({p.tag}) | <em>{p.stack.join(', ')}</em>
            </p>
            <p>{p.points.join(' ')}</p>
          </section>
        ))}

        <H>Education & Certification</H>
        <ul className="mt-2 space-y-1">
          {education.map((e) => (
            <li key={e.title} className="flex flex-wrap justify-between gap-2">
              <span>
                <strong>{e.title}</strong> — {e.org}
                {e.kind === 'Degree' ? ` | ${e.detail}` : ''}
              </span>
              <span>{e.period}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
