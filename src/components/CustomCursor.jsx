import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

/**
 * Two-layer custom cursor: a small filled dot that hugs the actual mouse
 * position with no lag, and a larger ring that trails the dot with spring
 * easing. When the pointer is over an interactive target the ring snaps to
 * the target's centre and grows to wrap it, giving a magnetic feel without
 * actually moving the target itself. Hidden on touch devices and respects
 * prefers-reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })   // dot target
  const ringTarget = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const ringRadius = useRef(18)
  const ringTargetRadius = useRef(18)
  const raf = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const reduce = usePrefersReducedMotion()

  useEffect(() => {
    if (reduce) return
    // Detect touch: hide on any device without fine pointer.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return
    setEnabled(true)
  }, [reduce])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      // Walk up the tree to find a magnetic ancestor.
      let el = e.target
      let magnetic = null
      let i = 0
      while (el && i < 6) {
        if (el.dataset && (el.dataset.magnetic !== undefined || el.tagName === 'BUTTON' || el.tagName === 'A')) {
          magnetic = el
          break
        }
        el = el.parentElement
        i++
      }
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        // On small targets (chips, icons, buttons) the ring wraps the target.
        // On large targets (cards, hero blocks) wrapping looks goofy, so we
        // just nudge toward the cursor and grow modestly.
        const longestEdge = Math.max(rect.width, rect.height)
        if (longestEdge < 160) {
          ringTarget.current = { x: cx, y: cy }
          ringTargetRadius.current = longestEdge / 2 + 8
        } else {
          // Pull the ring 25% toward the target centre, capped radius.
          ringTarget.current = {
            x: e.clientX + (cx - e.clientX) * 0.25,
            y: e.clientY + (cy - e.clientY) * 0.25,
          }
          ringTargetRadius.current = 28
        }
      } else {
        ringTarget.current = { x: e.clientX, y: e.clientY }
        ringTargetRadius.current = 18
      }
    }

    const onLeave = () => {
      // Park offscreen so it does not flash at top-left when the mouse exits.
      target.current = { x: -100, y: -100 }
      ringTarget.current = { x: -100, y: -100 }
    }

    const tick = () => {
      // Dot: snappy follow (lerp factor 0.5)
      dotPos.current.x += (target.current.x - dotPos.current.x) * 0.5
      dotPos.current.y += (target.current.y - dotPos.current.y) * 0.5
      // Ring: lazy follow (lerp factor 0.18)
      ringPos.current.x += (ringTarget.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (ringTarget.current.y - ringPos.current.y) * 0.18
      ringRadius.current += (ringTargetRadius.current - ringRadius.current) * 0.18

      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) {
        dot.style.transform = `translate3d(${dotPos.current.x - 3}px, ${dotPos.current.y - 3}px, 0)`
      }
      if (ring) {
        const r = ringRadius.current
        ring.style.transform = `translate3d(${ringPos.current.x - r}px, ${ringPos.current.y - r}px, 0)`
        ring.style.width = `${r * 2}px`
        ring.style.height = `${r * 2}px`
      }
      raf.current = requestAnimationFrame(tick)
    }

    // Hide native cursor only when enabled, scoped to body so inputs can
    // still show their caret naturally inside their own elements if needed.
    document.body.style.cursor = 'none'
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[1000] pointer-events-none w-1.5 h-1.5 rounded-full bg-amber-400 mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full border border-white/40 mix-blend-difference will-change-transform transition-[border-color] duration-150"
        style={{
          width: 36,
          height: 36,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
      <style>{`
        a, button, [data-magnetic], [role="button"], input[type="submit"], label[for] {
          cursor: none;
        }
        input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]),
        textarea,
        [contenteditable="true"] {
          cursor: text;
        }
      `}</style>
    </>
  )
}
