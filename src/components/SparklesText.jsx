import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function StarSvg({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 68 68" fill="none">
      <path
        d="M34 0C34 0 34 34 0 34C34 34 34 68 34 68C34 68 34 34 68 34C34 34 34 0 34 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Wraps children and continuously emits sparkle particles around them.
 * Usage: <SparklesText>gradient text here</SparklesText>
 */
export default function SparklesText({ children, className = '', colors = ['#a78bfa', '#818cf8', '#c4b5fd', '#e0e7ff'] }) {
  const containerRef = useRef(null)
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const spawn = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()

      const sparkle = {
        id: Math.random().toString(36).slice(2),
        x: randomBetween(-12, width + 12),
        y: randomBetween(-12, height + 12),
        size: randomBetween(10, 20),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: randomBetween(-45, 45),
      }

      setSparkles(prev => [...prev, sparkle])
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id))
      }, 700)
    }

    const interval = setInterval(spawn, 350)
    return () => clearInterval(interval)
  }, [colors])

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <AnimatePresence>
        {sparkles.map(s => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0, rotate: s.rotation - 20 }}
            animate={{ opacity: 1, scale: 1, rotate: s.rotation }}
            exit={{ opacity: 0, scale: 0, rotate: s.rotation + 20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: s.x,
              top: s.y,
              color: s.color,
              width: s.size,
              height: s.size,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <StarSvg size={s.size} />
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </span>
  )
}
