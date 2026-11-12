import { useT } from '../i18n/LanguageContext'
import SpotlightCard from './SpotlightCard'

/** One channel, described by topic only. */
export default function NicheCard({ niche, index }) {
  const t = useT()
  const { key, Icon, accent } = niche
  const topics = t(`yt.niche.${key}.topics`).split('|')

  return (
    <SpotlightCard
      glowColor={accent.glowRgb}
      className={`h-full rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.glow} to-[#0f0f0f] p-7`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center`}>
            <Icon size={22} />
          </div>
          <span className="font-display text-sm font-bold tabular-nums text-zinc-600">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-tight mb-3">
          {t(`yt.niche.${key}.title`)}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{t(`yt.niche.${key}.desc`)}</p>
        <div className="mt-auto border-t border-white/10 pt-4">
          {/* One topic per line: every card gets the same footer height, so the dividers line up */}
          <ul className={`space-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${accent.text}`}>
            {topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SpotlightCard>
  )
}
