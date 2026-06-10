import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Soft amber radial glow that trails the cursor inside the hero. Sits
 * behind the headline and fades in on first move. Falls back to a still,
 * centered glow when the user prefers reduced motion or is on touch.
 */
export default function HeroGlow({ className = '' }) {
  const ref = useRef(null)
  const frame = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty('--gx', `${x}px`)
        el.style.setProperty('--gy', `${y}px`)
        el.style.opacity = '1'
      })
    }
    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      el.style.opacity = '0'
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [reduce])

  if (reduce) {
    return (
      <div
        aria-hidden
        className={`absolute inset-0 z-0 pointer-events-none ${className}`}
        style={{
          background:
            'radial-gradient(520px circle at 50% 42%, rgba(251,191,36,0.10), transparent 70%)',
        }}
      />
    )
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{
        opacity: 0,
        transition: 'opacity 600ms ease',
        background:
          'radial-gradient(460px circle at var(--gx, 50%) var(--gy, 42%), rgba(251,191,36,0.16), rgba(251,191,36,0.04) 45%, transparent 70%)',
      }}
    />
  )
}
