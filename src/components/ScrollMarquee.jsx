import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Horizontal marquee of words separated by amber asterisks. The strip
 * translates based on page scroll position so it picks up speed as the
 * user scrolls. The text is duplicated so the strip never runs out of
 * content even at extreme scroll positions.
 */
export default function ScrollMarquee({ words, speed = 0.5, className = '' }) {
  const wrapRef = useRef(null)
  const inner = useRef(null)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    const onScroll = () => {
      const el = inner.current
      if (!el) return
      const wrap = wrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      // Only animate when the strip is in view-ish so we do not burn cycles.
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return
      // Use cumulative scroll so the marquee progresses across the page.
      const offset = -(window.scrollY * speed)
      el.style.transform = `translate3d(${offset}px, 0, 0)`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed, reduce])

  // Duplicate the list enough times that even fast scrollers cannot see the end.
  const repeated = Array.from({ length: 8 }).flatMap(() => words)

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`relative overflow-hidden border-y border-white/[0.06] py-6 md:py-8 ${className}`}
    >
      <div
        ref={inner}
        className="flex items-center gap-10 md:gap-16 whitespace-nowrap font-display text-3xl md:text-6xl font-bold tracking-tight text-white/90 will-change-transform"
      >
        {repeated.map((word, i) => (
          <span key={i} className="inline-flex items-center gap-10 md:gap-16">
            <span>{word}</span>
            <span className="text-amber-400 text-2xl md:text-4xl font-light leading-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
