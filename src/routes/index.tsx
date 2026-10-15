import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Intro } from '@/components/portfolio/Intro'
import { ChapterIndicator, FilmGrain, ScrollProgress } from '@/components/portfolio/Chrome'
import { Nav } from '@/components/portfolio/Nav'
import { Hero } from '@/components/portfolio/Hero'
import { About, Prologue, Skills } from '@/components/portfolio/Story'
import { Journey, Practice, Work } from '@/components/portfolio/Work'
import { Contact, Credits, Foundations, Script } from '@/components/portfolio/Finale'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [started, setStarted] = useState(false)
  return (
    <>
      <Intro onDone={() => setStarted(true)} />
      <ScrollProgress />
      <FilmGrain />
      <Nav />
      <ChapterIndicator />
      <main>
        <Hero start={started} />
        <Prologue />
        <About />
        <Skills />
        <Journey />
        <Work />
        <Practice />
        <Foundations />
        <Script />
        <Contact />
      </main>
      <Credits />
    </>
  )
}
