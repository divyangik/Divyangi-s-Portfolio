import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { RESUME_FILE } from '@/content/resume'
import { Heart } from './Doodles'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#foundations' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b-2 border-ink/10 bg-background/85 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3" aria-label="Main">
        <a href="#top" className="flex items-center gap-1 font-hand text-3xl font-bold text-ink">
          Divya<span className="text-primary">.</span>
          <Heart className="h-5 w-5 animate-wobble text-primary" />
        </a>
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink/80 decoration-primary decoration-2 underline-offset-8 hover:text-ink hover:underline"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href={RESUME_FILE} download className="btn-sketch bg-secondary py-1.5 text-sm text-ink">
              <Download className="h-4 w-4" /> Resume
            </a>
          </li>
        </ul>
        <button
          className="p-2 text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="sketch mx-4 mb-3 flex flex-col gap-1 p-4 lg:hidden">
          {links.map((l) => (
            <li key={l.label}>
              <a onClick={() => setOpen(false)} href={l.href} className="block py-2.5 font-hand text-2xl text-ink">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              onClick={() => setOpen(false)}
              href={RESUME_FILE}
              download
              className="btn-sketch mt-2 w-full justify-center bg-secondary text-ink"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
