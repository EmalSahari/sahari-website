import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const STORAGE_KEY = 'sahari-seen-loader'

/**
 * Full-screen identity moment that plays on first visit per session.
 * Reads sessionStorage so it does not interrupt repeat navigation within
 * the same browser tab. Skipped entirely for reduced-motion users.
 */
export default function LoadingSequence({ onDone }) {
  const reduce = usePrefersReducedMotion()
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    if (reduce) {
      onDone()
      return
    }
    let seen = false
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // ignore
    }
    if (seen) {
      onDone()
      return
    }
    setShouldShow(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    const t = setTimeout(onDone, 1700)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  if (!shouldShow) return null

  const letters = 'Sahari'.split('')

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1500] bg-[#080808] flex items-center justify-center px-6"
    >
      <div className="relative flex items-baseline gap-1">
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08 + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-none"
          >
            {char}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.08 + letters.length * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-display text-5xl md:text-7xl font-bold text-red-400 tracking-tight leading-none"
        >
          .
        </motion.span>

        {/* Amber rule drawing under the wordmark */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="absolute -bottom-3 left-0 right-0 h-[3px] bg-red-400 origin-left"
        />
      </div>
    </motion.div>
  )
}
