import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Three-phase curtain between routes. Panel covers the screen quickly,
 * holds long enough for the route to swap and the new content to settle,
 * then slides off the top in one motion. The hold phase is what stops
 * the rute-fade from AnimatedRoutes bleeding through and causing the
 * old glitchy feel where both animations were visible at once.
 *
 * Suppressed on the very first mount so it does not collide with the
 * loading sequence, and disabled for reduced-motion users.
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
    const t = setTimeout(() => setAnimating(false), 1050)
    return () => clearTimeout(t)
  }, [location.pathname, reduce])

  if (!animating) return null

  return (
    <motion.div
      key={token}
      initial={{ y: '100%' }}
      animate={{ y: ['100%', '0%', '0%', '-101%'] }}
      transition={{
        duration: 1.0,
        times: [0, 0.28, 0.62, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed inset-0 z-[1100] pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#080808]" />
      {/* Amber strip riding the panel's top edge */}
      <div className="absolute -top-[2px] left-0 right-0 h-[3px] bg-amber-400" />
    </motion.div>
  )
}
