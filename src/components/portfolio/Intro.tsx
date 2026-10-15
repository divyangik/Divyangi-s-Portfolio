import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const KEY = 'divya-intro-seen'

// Opening title sequence: a letterboxed "film card" that splits open like curtains.
// Plays once per browser session and can be skipped with a click or any key.
export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)
  const [beat, setBeat] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || sessionStorage.getItem(KEY)) {
      setShow(false)
      onDone()
      return
    }
    const finish = () => {
      sessionStorage.setItem(KEY, '1')
      setShow(false)
      onDone()
    }
    const t = [
      setTimeout(() => setBeat(1), 300),
      setTimeout(() => setBeat(2), 1300),
      setTimeout(finish, 2900),
    ]
    window.addEventListener('keydown', finish, { once: true })
    return () => {
      t.forEach(clearTimeout)
      window.removeEventListener('keydown', finish)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = () => {
    sessionStorage.setItem(KEY, '1')
    setShow(false)
    onDone()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="no-print fixed inset-0 z-[100] cursor-pointer"
          onClick={skip}
          role="presentation"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-night"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-night"
            exit={{ y: '100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-paper"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.5em] text-blush"
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={beat >= 1 ? { opacity: 1, letterSpacing: '0.5em' } : {}}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            >
              A sketchbook story
            </motion.p>
            <motion.p
              className="mt-5 font-hand text-6xl font-bold sm:text-8xl"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={beat >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Divyangi Kanchan
            </motion.p>
            <motion.p
              className="mt-4 text-sm text-paper/60"
              initial={{ opacity: 0 }}
              animate={beat >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              starring React · Spring Boot · Shopify — and a lot of pencils
            </motion.p>
            <motion.div
              className="mt-8 h-px bg-blush"
              initial={{ width: 0 }}
              animate={{ width: beat >= 1 ? 220 : 0 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
            <p className="absolute bottom-8 text-[11px] uppercase tracking-[0.3em] text-paper/40">
              Click anywhere to skip
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
