import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Handshake, ListOrdered } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import PastSponsors from '../components/PastSponsors'
import Reveal from '../components/Reveal'
import ChannelCard from '../components/ChannelCard'
import VideoCard from '../components/VideoCard'
import { YT_STATS, YT_AUDIENCE, CHANNELS, POPULAR_VIDEOS, fillStats } from '../data/youtube'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function YouTube() {
  const t = useT()

  const stats = [
    { value: YT_STATS.subs, label: t('about.stats.subs') },
    { value: YT_STATS.views, label: t('about.stats.views') },
    { value: YT_STATS.views28d, label: t('yt.stats.views28d') },
    { value: YT_STATS.channels, label: t('about.stats.channels') },
  ]

  const offers = [t('yt.sponsor.offer.1'), t('yt.sponsor.offer.2'), t('yt.sponsor.offer.3')]

  return (
    <div className="pt-28 pb-20">
      <Seo title="YouTube" description={fillStats(t('yt.seo'))} />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-16 max-w-3xl">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('yt.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02]">
            {t('yt.heading')}
          </h1>
          <div className="mt-5 h-[2px] w-12 bg-amber-400" />
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">{fillStats(t('yt.subtitle'))}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t border-white/10 pt-8 mb-20"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">{s.value}</p>
              <p className="text-zinc-500 text-xs md:text-sm mt-3">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Channels */}
        <div className="grid md:grid-cols-3 gap-5 mb-24">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.key} i={i} className="h-full">
              <ChannelCard channel={c} />
            </Reveal>
          ))}
        </div>

        {/* Popular videos */}
        <section className="mb-24">
          <Reveal className="mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
              {t('yt.videos.heading')}
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {POPULAR_VIDEOS.map((v, i) => (
              <Reveal key={v.id} i={i}>
                <VideoCard video={v} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* The format */}
        <section className="grid md:grid-cols-12 gap-8 md:gap-12 mb-24">
          <Reveal className="md:col-span-5">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-zinc-200 flex items-center justify-center mb-6">
              <ListOrdered size={22} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
              {t('yt.format.heading')}
            </h2>
          </Reveal>
          <Reveal i={1} className="md:col-span-7 space-y-5 text-zinc-400 text-lg leading-relaxed">
            <p>{t('yt.format.p1')}</p>
            <p>{t('yt.format.p2')}</p>
          </Reveal>
        </section>

        {/* Audience */}
        <section className="mb-24">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05]">
              {t('yt.audience.heading')}
            </h2>
            <p className="text-zinc-500 text-sm">{t('yt.audience.note')}</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {YT_AUDIENCE.map((a, i) => (
              <Reveal key={a.key} i={i} className="bg-[#0b0b0b] p-6 md:p-8">
                <p className="font-display text-4xl md:text-5xl font-bold text-amber-400 tracking-tight leading-none">{a.value}</p>
                <p className="text-zinc-400 text-sm mt-3 leading-snug">{t(`yt.audience.${a.key}`)}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sponsorships */}
        <section id="sponsorships" className="scroll-mt-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 via-[#0f0f0f] to-[#0f0f0f] px-8 py-14 md:px-14 md:py-16">
              <div className="grid md:grid-cols-12 gap-10">
                <div className="md:col-span-7">
                  <Handshake size={32} className="text-amber-400 mb-6" />
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
                    {t('yt.sponsor.heading')}
                  </h2>
                  <p className="mt-5 text-zinc-400 text-lg leading-relaxed max-w-xl">
                    {fillStats(t('yt.sponsor.subtitle'))}
                  </p>
                  <PastSponsors className="mt-6" />
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                    <Link
                      to="/contact?type=sponsorship"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
                    >
                      {t('home.sponsor.cta')}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                      href="mailto:contact@sahari.io"
                      className="text-sm text-zinc-400 hover:text-white underline decoration-zinc-700 hover:decoration-white underline-offset-4 transition-colors"
                    >
                      contact@sahari.io
                    </a>
                  </div>
                </div>
                <ul className="md:col-span-5 space-y-4 md:pt-14">
                  {offers.map((o) => (
                    <li key={o} className="flex items-start gap-3 text-zinc-300 leading-snug">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-400/15 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}
