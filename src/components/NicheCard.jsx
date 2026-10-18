import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import SpotlightCard from './SpotlightCard'

/**
 * One channel, described by topic only. Pass `to` to make the whole card a
 * link (the home page points it at /youtube); without it the card is static.
 */
export default function NicheCard({ niche, index, to }) {
  const t = useT()
  const { key, Icon, accent } = niche
  const topics = t(`yt.niche.${key}.topics`).split('|')

  const card = (
    <SpotlightCard
      glowColor={accent.glowRgb}
      className={`h-full rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.glow} to-[#0f0f0f] p-7 ${
        to ? 'transition-transform duration-200 group-hover:-translate-y-0.5' : ''
      }`}
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
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-4">
          {/* One topic per line: every card gets the same footer height, so the dividers line up */}
          <ul className={`space-y-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${accent.text}`}>
            {topics.map((topic) => (
              <li key={topic} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-current opacity-70" />
                {topic}
              </li>
            ))}
          </ul>
          {to && (
            <ArrowUpRight
              size={18}
              className="flex-shrink-0 text-zinc-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          )}
        </div>
      </div>
    </SpotlightCard>
  )

  return to ? (
    <Link to={to} className="group block h-full">
      {card}
    </Link>
  ) : (
    card
  )
}
