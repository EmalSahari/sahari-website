import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Curtain wipe overlay between routes. A dark panel slides up from the
 * bottom, fully covers the screen for a moment, then continues up and
 * off the top edge. The actual route swap happens behind it via React
 * Router's normal location change, so the panel just hides the visual
 * transition. Suppressed on the very first mount so it does not collide
 * with the loading sequence on first visit.
 */
export default function PageTransition() {
  const location = useLocation()
  const reduce = usePrefersReducedMotion()
  const prevPath = useRef(location.pathname)
  const [animating, setAnimating] = useState(false)
  const [token, setToken] = useState(0)

  useEffect(() => {
    if (reduce) return
    if (prevPath.current === location.pathname) return
    prevPath.current = location.pathname
    setToken((n) => n + 1)
    setAnimating(true)
    const t = setTimeout(() => setAnimating(false), 1000)
    return () => clearTimeout(t)
  }, [location.pathname, reduce])

  if (!animating) return null

  return (
    <motion.div
      key={token}
      initial={{ y: '100%' }}
      animate={{ y: '-101%' }}
      transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[1100] pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#080808]" />
      {/* Amber edge that catches the wipe motion */}
      <div className="absolute -top-[2px] left-0 right-0 h-[3px] bg-amber-400" />
      {/* Subtle Sahari mark dead-centre while the panel covers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1, 1, 1] }}
          transition={{ duration: 0.95, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
          className="flex items-baseline gap-1"
        >
          <span className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Sahari
          </span>
          <span className="font-display text-3xl md:text-4xl font-bold text-amber-400 tracking-tight">
            .
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
