import { NICHES } from '../data/youtube'

// One ring per niche, inner to outer. `start` spreads the icons around the
// circle; it is applied as a static rotation so they stay spread out even
// when reduced motion stops the spin.
const RINGS = [
  { inset: '21%', duration: 18, start: 210, style: 'border-white/10' },
  { inset: '10%', duration: 26, start: 330, style: 'border-dashed border-white/[0.09]' },
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

/** Hero visual: a globe with the three niches circling it. Decorative only. */
export default function OrbitVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[30rem]">
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
                        className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d0d]/90 backdrop-blur"
                        style={{ boxShadow: `0 0 28px rgba(${accent.glowRgb},0.28)` }}
                      >
                        <Icon className={`h-5 w-5 md:h-6 md:w-6 ${accent.text}`} strokeWidth={1.7} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Globe */}
      <div
        className="absolute inset-[33%] rounded-full border border-white/15 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 32% 28%, #3f3f46 0%, #18181b 45%, #070707 80%)',
          boxShadow: 'inset -14px -18px 40px rgba(0,0,0,0.7), 0 0 70px rgba(251,191,36,0.18)',
        }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-white/[0.14]" fill="none" stroke="currentColor" strokeWidth="0.7">
          <ellipse cx="50" cy="50" rx="49" ry="14" />
          <ellipse cx="50" cy="30" rx="40" ry="9" />
          <ellipse cx="50" cy="70" rx="40" ry="9" />
          <ellipse cx="50" cy="50" rx="14" ry="49" />
          <ellipse cx="50" cy="50" rx="33" ry="49" />
          <line x1="50" y1="1" x2="50" y2="99" />
        </svg>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/10 via-transparent to-transparent" />
      </div>
    </div>
  )
}
