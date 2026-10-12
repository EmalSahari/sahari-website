import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Handshake, Youtube, Hammer, Calendar, Sparkles } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import PastSponsors from '../components/PastSponsors'
import Reveal from '../components/Reveal'
import GradientMesh from '../components/GradientMesh'
import NicheCard from '../components/NicheCard'
import { NICHES, fillStats } from '../data/youtube'
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

/**
 * Highlight word that cycles through a list. Invisible sizers hold the box
 * at the width of the widest word so the surrounding line never reflows and
 * the underline never resizes. The active word is centered in that fixed
 * box and crossfades on each switch.
 */
function CyclingWord({ words, reduce }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduce || words.length <= 1) return

    let interval = null

    const start = () => {
      if (interval) return
      interval = setInterval(() => {
        setActive((v) => (v + 1) % words.length)
      }, 2000)
    }

    const stop = () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduce, words.length])

  if (reduce) return <>{words[0]}</>

  return (
    <span className="relative inline-grid align-bottom">
      {words.map((w, k) => (
        <span key={k} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {w}
        </span>
      ))}
      <span className="col-start-1 row-start-1 relative">
        <AnimatePresence initial={false}>
          <motion.span
            key={active}
            className="absolute left-1/2 top-0 whitespace-nowrap"
            initial={{ opacity: 0, y: '0.35em', x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: '-0.35em', x: '-50%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[active]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

function SectionHeading({ eyebrow, heading, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-3xl"
    >
      <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
        {heading}
      </h2>
      <div className="mt-5 h-[2px] w-12 bg-amber-400" />
      {subtitle && <p className="mt-6 text-zinc-400 max-w-xl leading-relaxed">{subtitle}</p>}
    </motion.div>
  )
}

export default function Home() {
  const t = useT()
  const isMobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  const heroFadeUp = reduce ? STILL : makeHeroFadeUp(isMobile)
  const yt = useYtStats()
  const fill = (text) => fillStats(text, yt)

  const stats = [
    { value: yt.subs, label: t('about.stats.subs') },
    { value: yt.views, label: t('about.stats.views') },
    { value: yt.channels, label: t('about.stats.channels') },
  ]

  const projects = [
    {
      icon: <Sparkles size={16} />,
      title: t('projects.virko.title'),
      desc: t('projects.virko.desc'),
      tag: t('projects.virko.tag'),
      href: 'https://www.virko.io/',
      image: '/virko.png',
    },
    {
      icon: <Calendar size={16} />,
      title: t('projects.mokio.title'),
      desc: t('projects.mokio.desc'),
      tag: t('projects.mokio.tag'),
      href: 'https://www.mokio.io/',
      image: '/mokio.webp',
    },
    {
      icon: <Hammer size={16} />,
      title: t('projects.nexbyg.title'),
      desc: t('projects.nexbyg.desc'),
      tag: t('projects.nexbyg.tag'),
      href: 'https://www.nexbyg.dk/',
      image: '/nexbyg.webp',
    },
  ]

  return (
    <div className="pt-16">
      <Seo description={fill(t('home.seo'))} />

      {/* Hero - leads with the signature "Every X explained" video format */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <GradientMesh />
        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="relative z-10 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-200 text-sm"
        >
          <Youtube size={14} className="text-red-500" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        <motion.h1
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="relative z-10 font-display text-[clamp(1.875rem,7vw,5.5rem)] font-bold tracking-[-0.025em] text-white leading-[1.05] max-w-5xl"
        >
          {t('hero.headline.start')}{' '}
          <span className="gradient-text-animated">
            <CyclingWord words={t('hero.headline.cycle').split('|')} reduce={reduce} />
          </span>{' '}
          {t('hero.headline.end')}
        </motion.h1>

        <motion.p
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="relative z-10 mt-8 text-base md:text-xl text-zinc-400 max-w-xl leading-relaxed"
        >
          {fill(t('hero.subtitle'))}
        </motion.p>

        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
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
      </section>

      {/* Stats strip */}
      <section className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-4xl mx-auto px-6 py-10 grid grid-cols-3 gap-6 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} i={i}>
              <p className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-none">{s.value}</p>
              <p className="text-zinc-500 text-xs md:text-sm mt-2">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Channels */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHeading
          eyebrow={t('home.channels.eyebrow')}
          heading={t('home.channels.heading')}
          subtitle={t('home.channels.subtitle')}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {NICHES.map((n, i) => (
            <Reveal key={n.key} i={i} className="h-full">
              <NicheCard niche={n} />
            </Reveal>
          ))}
        </div>
        <Reveal i={3} className="mt-10">
          <Link
            to="/youtube"
            className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
          >
            {t('home.channels.more')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </section>

      {/* Also building - compact portfolio */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          eyebrow={t('home.build.eyebrow')}
          heading={t('home.build.heading')}
          subtitle={t('home.build.subtitle')}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.href} i={i} className="h-full">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] hover:border-white/25 transition-colors"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
                    {p.icon}
                    {p.tag}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-1.5">
                    {p.title}
                    <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal i={3} className="mt-10">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
          >
            {t('work.seeAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
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
