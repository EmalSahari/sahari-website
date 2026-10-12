import { useEffect, useState } from 'react'
import {
  Shield, Crown, Rocket, Medal, Castle, Orbit, Anchor, Landmark,
  Satellite, Flag, Building2, Telescope, Siren, Scale, Star, Plane,
} from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

// Generic icons from all three niches, interleaved. They hint at the
// "whole category, item by item" format without pointing at any video.
const ICONS = [
  Shield, Crown, Rocket, Medal, Castle, Orbit, Anchor, Landmark,
  Satellite, Flag, Building2, Telescope, Siren, Scale, Star, Plane,
]

const STEP_MS = 650
const HOLD_MS = 1600

/**
 * Hero visual: a grid that lights up one tile at a time with a running
 * counter, the way a video walks through every item in a category.
 */
export default function FormatGrid() {
  const t = useT()
  const reduce = usePrefersReducedMotion()
  const [active, setActive] = useState(reduce ? 6 : 0)

  useEffect(() => {
    if (reduce) return
    let timer = null
    const tick = (i) => {
      setActive(i)
      const last = i === ICONS.length - 1
      timer = setTimeout(() => tick(last ? 0 : i + 1), last ? HOLD_MS : STEP_MS)
    }
    const start = () => {
      if (!timer) timer = setTimeout(() => tick(0), STEP_MS)
    }
    const stop = () => {
      clearTimeout(timer)
      timer = null
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce])

  const progress = ((active + 1) / ICONS.length) * 100

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-sm md:max-w-none rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-5 md:p-6 shadow-2xl shadow-black/60 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          <span className="relative flex h-2 w-2">
            {!reduce && <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60 animate-ping" />}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          {t('hero.grid.label')}
        </span>
        <span className="font-display text-sm font-bold tabular-nums text-white">
          {String(active + 1).padStart(2, '0')}
          <span className="text-zinc-600"> / {ICONS.length}</span>
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5 md:gap-3">
        {ICONS.map((Icon, i) => {
          const state = i === active ? 'active' : i < active ? 'done' : 'todo'
          return (
            <div
              key={i}
              className={`aspect-square rounded-xl border flex items-center justify-center transition-all duration-500 ${
                state === 'active'
                  ? 'border-amber-400/70 bg-amber-400/15 text-amber-300 scale-[1.06] shadow-[0_0_32px_rgba(251,191,36,0.28)]'
                  : state === 'done'
                    ? 'border-white/10 bg-white/[0.05] text-zinc-300'
                    : 'border-white/[0.06] bg-white/[0.02] text-zinc-600'
              }`}
            >
              <Icon className="w-[38%] h-[38%]" strokeWidth={1.6} />
            </div>
          )
        })}
      </div>

      <div className="mt-6 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-400 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-zinc-500">{t('hero.grid.caption')}</p>
    </div>
  )
}
