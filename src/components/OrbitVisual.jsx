import { useEffect, useRef } from 'react'
import { NICHES } from '../data/youtube'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

// One ring per niche, inner to outer. Rings sit 12% of the box apart and
// icons are 9% of the box (.orbit-icon), so icons on neighbouring rings pass
// each other without touching at any size. `start` spreads them
// around the circle and is a static rotation, so they stay apart even when
// reduced motion stops the spin.
const RINGS = [
  { inset: '24%', duration: 18, start: 210, style: 'border-white/10' },
  { inset: '12%', duration: 26, start: 330, style: 'border-dashed border-white/[0.09]' },
  { inset: '0%', duration: 34, start: 90, style: 'border-white/[0.06]' },
]

const STARS = [
  { top: '8%', left: '18%', delay: '0s' },
  { top: '16%', left: '88%', delay: '1.2s' },
  { top: '78%', left: '6%', delay: '0.6s' },
  { top: '92%', left: '70%', delay: '1.8s' },
  { top: '44%', left: '97%', delay: '2.4s' },
  { top: '3%', left: '58%', delay: '0.9s' },
]

const MERIDIANS = 6
const SPIN_MS = 14000

/**
 * Wireframe globe that turns on its axis. A meridian seen from the side is
 * an ellipse whose width follows |cos| of its angle, so animating the widths
 * reads as rotation. Attributes are set through refs to skip React renders.
 */
function Globe() {
  const reduce = usePrefersReducedMotion()
  const refs = useRef([])

  useEffect(() => {
    const draw = (phase) => {
      refs.current.forEach((el, i) => {
        if (!el) return
        const angle = phase + (i * Math.PI) / MERIDIANS
        el.setAttribute('rx', (49 * Math.abs(Math.cos(angle))).toFixed(2))
      })
    }
    if (reduce) {
      draw(0.35)
      return
    }
    let raf
    const start = performance.now()
    const loop = (now) => {
      draw((((now - start) % SPIN_MS) / SPIN_MS) * Math.PI)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  return (
    <div
      className="globe-pulse absolute inset-[34%] rounded-full border border-white/15 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 32% 28%, #3f3f46 0%, #18181b 45%, #070707 80%)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-white/[0.16]"
        style={{ transform: 'rotate(-18deg)' }}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
      >
        <ellipse cx="50" cy="50" rx="49" ry="14" />
        <ellipse cx="50" cy="29" rx="40" ry="9" />
        <ellipse cx="50" cy="71" rx="40" ry="9" />
        {Array.from({ length: MERIDIANS }, (_, i) => (
          <ellipse key={i} ref={(el) => (refs.current[i] = el)} cx="50" cy="50" rx="49" ry="49" />
        ))}
      </svg>
      {/* Lit from the top left: a soft highlight and a dark limb sell the sphere */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/10 via-transparent to-transparent" />
      <div className="absolute inset-0 rounded-full shadow-[inset_-14px_-18px_40px_rgba(0,0,0,0.75)]" />
    </div>
  )
}

/** Hero visual: a turning globe with the three niches circling it. Decorative only. */
export default function OrbitVisual() {
  return (
    <div aria-hidden="true" className="orbit-box relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[30rem]">
      <div className="absolute inset-[22%] rounded-full bg-amber-400/15 blur-3xl" />

      {STARS.map((s, i) => (
        <span
          key={i}
          className="orbit-twinkle absolute h-1 w-1 rounded-full bg-white"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}

      {RINGS.map((ring, i) => {
        const { Icon, accent } = NICHES[i]
        return (
          <div key={i} className={`absolute rounded-full border ${ring.style}`} style={{ inset: ring.inset }}>
            <div className="absolute inset-0" style={{ transform: `rotate(${ring.start}deg)` }}>
              <div className="orbit-spin absolute inset-0" style={{ animationDuration: `${ring.duration}s` }}>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  {/* Counter-rotate so the icon stays upright while it travels */}
                  <div className="orbit-spin-reverse" style={{ animationDuration: `${ring.duration}s` }}>
                    <div style={{ transform: `rotate(${-ring.start}deg)` }}>
                      <div
                        className="orbit-icon flex items-center justify-center rounded-[28%] border border-white/10 bg-[#0d0d0d]/90 backdrop-blur"
                        style={{ boxShadow: `0 0 28px rgba(${accent.glowRgb},0.28)` }}
                      >
                        <Icon className={`h-1/2 w-1/2 ${accent.text}`} strokeWidth={1.7} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <Globe />
    </div>
  )
}
