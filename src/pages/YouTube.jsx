import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Handshake } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import PastSponsors from '../components/PastSponsors'
import Reveal from '../components/Reveal'
import NicheCard from '../components/NicheCard'
import { NICHES, fillStats } from '../data/youtube'
import useYtStats from '../hooks/useYtStats'

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

  const yt = useYtStats()
  const fill = (text) => fillStats(text, yt)

  const stats = [
    { value: yt.subs, label: t('about.stats.subs') },
    { value: yt.views, label: t('about.stats.views') },
    { value: yt.channels, label: t('about.stats.channels') },
  ]

  const offers = [t('yt.sponsor.offer.1'), t('yt.sponsor.offer.2'), t('yt.sponsor.offer.3')]

  return (
    <div className="pt-28 pb-20">
      <Seo title="YouTube" description={fill(t('yt.seo'))} />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-16 max-w-3xl">
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('yt.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02]">
            {t('yt.heading')}
          </h1>
          <div className="mt-5 h-[2px] w-12 bg-amber-400" />
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">{fill(t('yt.subtitle'))}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 border-t border-white/10 pt-8 mb-20"
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
          {NICHES.map((n, i) => (
            <Reveal key={n.key} i={i} className="h-full">
              <NicheCard niche={n} index={i} />
            </Reveal>
          ))}
        </div>

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
                    {fill(t('yt.sponsor.subtitle'))}
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
