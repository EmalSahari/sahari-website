import { ArrowUpRight } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import SpotlightCard from './SpotlightCard'

export default function ChannelCard({ channel }) {
  const t = useT()
  const { key, name, handle, href, subs, views, Icon, accent } = channel
  const topics = t(`yt.channel.${key}.topics`).split('|')

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <SpotlightCard
        glowColor={accent.glowRgb}
        className={`h-full rounded-2xl border ${accent.border} bg-gradient-to-br ${accent.glow} to-[#0f0f0f] p-7 transition-all duration-200 group-hover:-translate-y-0.5`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={22} />
            </div>
            <ArrowUpRight
              size={18}
              className="text-zinc-600 transition-all duration-200 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>

          <h3 className="font-display text-2xl font-bold text-white tracking-tight">{name}</h3>
          <p className="text-zinc-500 text-sm mt-1 mb-4">{handle}</p>
          <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accent.text} mb-4`}>
            {t(`yt.channel.${key}.niche`)}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {topics.map((topic) => (
              <span
                key={topic}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400 text-xs"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
            <div>
              <p className="font-display text-2xl font-bold text-white tracking-tight leading-none">{subs}</p>
              <p className="text-zinc-500 text-xs mt-1.5">{t('about.stats.subs')}</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white tracking-tight leading-none">{views}</p>
              <p className="text-zinc-500 text-xs mt-1.5">{t('about.stats.views')}</p>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </a>
  )
}
