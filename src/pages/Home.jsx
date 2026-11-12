import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Handshake, Youtube } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import PastSponsors from '../components/PastSponsors'
import GradientMesh from '../components/GradientMesh'
import OrbitVisual from '../components/OrbitVisual'
import { fillStats } from '../data/youtube'
import useYtStats from '../hooks/useYtStats'
import useIsMobile from '../hooks/useIsMobile'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const STILL = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0 } },
}

const makeHeroFadeUp = (isMobile) =>
  isMobile
    ? {
        hidden: { opacity: 0, y: 20 },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
        }),
      }
    : {
        hidden: { opacity: 0, y: 36 },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 1.0, delay: 0.15 + i * 0.18, ease: [0.16, 1, 0.3, 1] },
        }),
      }

export default function Home() {
  const t = useT()
  const isMobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  const heroFadeUp = reduce ? STILL : makeHeroFadeUp(isMobile)
  const yt = useYtStats()
  const fill = (text) => fillStats(text, yt)

  const stats = [
    { value: yt.subs, label: t('stats.subs') },
    { value: yt.views, label: t('stats.views') },
    { value: yt.channels, label: t('stats.channels') },
  ]

  return (
    <div className="pt-16">
      <Seo description={fill(t('home.seo'))} />

      {/* Hero: headline and stats on the left, orbit illustration on the right */}
      <section className="relative overflow-hidden">
        <GradientMesh />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 min-h-[calc(100vh-4rem)] grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.div
              variants={heroFadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-200 text-sm"
            >
              <Youtube size={14} className="text-red-500" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              variants={heroFadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-[clamp(2.2rem,5.4vw,4.25rem)] font-bold tracking-[-0.03em] text-white leading-[1.05]"
            >
              <span className="block">{t('hero.title.top')}</span>
              <span className="gradient-text-animated whitespace-nowrap">{t('hero.title.bottom')}</span>
            </motion.h1>

            <motion.p
              variants={heroFadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-7 text-base md:text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {fill(t('hero.subtitle'))}
            </motion.p>

            <motion.div
              variants={heroFadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <Link
                to="/youtube"
                data-magnetic
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
              >
                {t('hero.cta.channels')}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact?type=sponsorship"
                data-magnetic
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 bg-white/5"
              >
                <Handshake size={16} className="text-amber-400" />
                {t('hero.cta.sponsor')}
              </Link>
            </motion.div>

            <motion.dl
              variants={heroFadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 flex justify-center lg:justify-start divide-x divide-white/10"
            >
              {stats.map((s) => (
                <div key={s.label} className="px-5 sm:px-7 first:pl-0 last:pr-0">
                  <dd className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">{s.value}</dd>
                  <dt className="mt-2 text-xs text-zinc-500">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="lg:col-span-5"
          >
            <OrbitVisual />
          </motion.div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 via-[#0f0f0f] to-[#0f0f0f] px-8 py-14 md:px-14 md:py-16"
        >
          <Handshake size={32} className="text-amber-400 mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] max-w-2xl">
            {t('home.sponsor.heading')}
          </h2>
          <p className="mt-5 text-zinc-400 text-lg leading-relaxed max-w-xl">
            {fill(t('home.sponsor.subtitle'))}
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
        </motion.div>
      </section>
    </div>
  )
}
