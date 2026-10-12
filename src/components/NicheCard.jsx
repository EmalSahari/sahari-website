import { useT } from '../i18n/LanguageContext'
import SpotlightCard from './SpotlightCard'

export default function NicheCard({ niche }) {
  const t = useT()
  const { key, Icon, accent } = niche
  const topics = t(`yt.niche.${key}.topics`).split('|')

  return (
    <SpotlightCard
      glowColor={accent.glowRgb}
      className={`h-full rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.glow} to-[#0f0f0f] p-7`}
    >
      <div className="flex h-full flex-col">
        <div className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center mb-6`}>
          <Icon size={22} />
        </div>
        <h3 className="font-display text-2xl font-bold text-white tracking-tight leading-tight mb-3">
          {t(`yt.niche.${key}.title`)}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">{t(`yt.niche.${key}.desc`)}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}
