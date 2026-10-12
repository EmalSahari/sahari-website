import { useT } from '../i18n/LanguageContext'
import { PAST_SPONSORS } from '../data/youtube'

export default function PastSponsors({ className = '' }) {
  const t = useT()
  if (PAST_SPONSORS.length === 0) return null
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-zinc-500 text-sm mr-1">{t('yt.sponsor.past')}</span>
      {PAST_SPONSORS.map((name) => (
        <span
          key={name}
          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-200 text-sm font-medium"
        >
          {name}
        </span>
      ))}
    </div>
  )
}
