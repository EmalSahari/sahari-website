import { motion } from 'framer-motion'
import { Mic, Sparkles, ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
}

const EMAIL = 'contact@sahari.io'

function Section({ title, items, accent }) {
  return (
    <div>
      <h4 className={`text-xs font-medium uppercase tracking-widest mb-3 ${accent}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-zinc-400 text-sm leading-relaxed">
            <CheckCircle2 size={14} className={`mt-1 flex-shrink-0 ${accent}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WorkWithUs() {
  const t = useT()
  const voiceMailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Voice Actor Application')}`
  const openMailto  = `mailto:${EMAIL}?subject=${encodeURIComponent('Open Application')}`

  return (
    <div className="pt-28 pb-20">
      <Seo title="Work with us" description="Open roles at Sahari. Currently hiring voice actors, and open applications welcome." />
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="mb-14 max-w-3xl"
        >
          <p className="text-red-400 text-sm font-medium tracking-widest uppercase mb-3">{t('workWithUs.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02] mb-5">
            {t('workWithUs.heading.start')} <span className="gradient-text">{t('workWithUs.heading.highlight')}</span>
          </h1>
          <div className="h-[2px] w-12 bg-red-400 mb-6" />
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">{t('workWithUs.subtitle')}</p>
        </motion.div>

        {/* ── Featured: Voice Actor ──────────────────────────────── */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mb-6">
          <SpotlightCard className="border border-white/10 bg-[#0f0f0f] p-8 md:p-10">
            {/* Header row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                <Mic size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{t('workWithUs.voice.tag')}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-zinc-200 text-[11px] font-semibold uppercase tracking-wide">
                    {t('workWithUs.hiring')}
                  </span>
                </div>
              </div>
            </div>

            <h2 className="font-display text-white font-bold text-3xl mb-3 tracking-tight">{t('workWithUs.voice.title')}</h2>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl">{t('workWithUs.voice.about')}</p>

            {/* Two-column details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Section
                title={t('workWithUs.voice.need.heading')}
                accent="text-zinc-400"
                items={[
                  t('workWithUs.voice.need.1'),
                  t('workWithUs.voice.need.2'),
                  t('workWithUs.voice.need.3'),
                  t('workWithUs.voice.need.4'),
                ]}
              />
              <Section
                title={t('workWithUs.voice.offer.heading')}
                accent="text-zinc-400"
                items={[
                  t('workWithUs.voice.offer.1'),
                  t('workWithUs.voice.offer.2'),
                  t('workWithUs.voice.offer.3'),
                ]}
              />
            </div>

            {/* Apply */}
            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-zinc-500 text-sm">{t('workWithUs.voice.apply.body')}</p>
              </div>
              <a
                href={voiceMailto}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl text-sm transition-all duration-200 shadow-lg shadow-black/40 flex-shrink-0"
              >
                <Mail size={14} />
                {t('workWithUs.voice.apply.cta')}
                <ArrowRight size={14} />
              </a>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* ── Secondary: Open application ───────────────────────── */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <SpotlightCard className="border border-white/8 bg-[#0c0c0c] p-6" glowColor="134,239,172">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/12 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Sparkles size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">{t('workWithUs.open.tag')}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{t('workWithUs.open.title')}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{t('workWithUs.open.about')}</p>
              </div>
              <a
                href={openMailto}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl text-sm transition-all duration-200 flex-shrink-0"
              >
                <Mail size={14} />
                {t('workWithUs.open.apply.cta')}
                <ArrowRight size={14} />
              </a>
            </div>
          </SpotlightCard>
        </motion.div>

      </div>
    </div>
  )
}
