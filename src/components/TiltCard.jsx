import { useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Wraps a card and tilts it in 3D toward the cursor with a soft magnetic
 * lag. Pairs with SpotlightCard, which handles the glow. Skips the effect
 * when the user prefers reduced motion. Touch devices never fire mousemove,
 * so they stay flat automatically.
 */
export default function TiltCard({ children, className = '', max = 6, scale = 1.015 }) {
  const ref = useRef(null)
  const frame = useRef(null)
  const reduce = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    if (frame.current) cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.transform =
        `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`
    })
  }

  const reset = () => {
    const el = ref.current
    if (!el) return
    if (frame.current) cancelAnimationFrame(frame.current)
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative hover:z-20 ${className}`}
      style={{
        transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
