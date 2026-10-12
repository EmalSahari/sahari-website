import { Play } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'

// hqdefault exists for every video. It is 4:3 with letterbox bars, which
// object-cover inside a 16:9 box crops away exactly.
const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

export default function VideoCard({ video }) {
  const t = useT()
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
        <img
          src={thumb(video.id)}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-black/50">
            <Play size={20} className="text-white fill-white ml-0.5" />
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-white font-semibold leading-snug group-hover:text-amber-200 transition-colors">
        {video.title}
      </h3>
      <p className="mt-1 text-zinc-500 text-sm">
        {video.channel} · {video.views} {t('yt.videos.views')}
      </p>
    </a>
  )
}
