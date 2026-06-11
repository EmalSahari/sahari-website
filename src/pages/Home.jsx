import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Youtube, Shield, Quote } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'
import Reveal from '../components/Reveal'
import useIsMobile from '../hooks/useIsMobile'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

const STILL = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { duration: 0 } },
}

const makeFadeUp = (isMobile) =>
  isMobile
    ? {
        hidden: { opacity: 0, y: 14 },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, delay: i * 0.04, ease: [0.21, 0.47, 0.32, 0.98] },
        }),
      }
    : {
        hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
        show: (i = 0) => ({
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] },
        }),
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
    const interval = setInterval(() => {
      setActive((v) => (v + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
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

/**
 * Left-aligned section heading with the amber rule, echoing the hero
 * underline so the motif repeats down the page.
 */
function SectionHead({ title, sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
        {title}
      </h2>
      <div className="mt-5 h-[3px] w-12 bg-amber-400" />
      {sub && <p className="mt-5 text-zinc-400 max-w-xl leading-relaxed">{sub}</p>}
    </motion.div>
  )
}

export default function Home() {
  const t = useT()
  const isMobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  const fadeUp = reduce ? STILL : makeFadeUp(isMobile)
  const heroFadeUp = reduce ? STILL : makeHeroFadeUp(isMobile)

  const services = [
    { title: t('services.web.title'), desc: t('services.web.desc') },
    { title: t('services.mobile.title'), desc: t('services.mobile.desc') },
    { title: t('services.backend.title'), desc: t('services.backend.desc') },
    { title: t('services.automation.title'), desc: t('services.automation.desc') },
    { title: t('services.maintenance.title'), desc: t('services.maintenance.desc') },
  ]

  const process = [
    { title: t('process.idea.title'), desc: t('process.idea.desc') },
    { title: t('process.build.title'), desc: t('process.build.desc') },
    { title: t('process.launch.title'), desc: t('process.launch.desc') },
    { title: t('process.support.title'), desc: t('process.support.desc') },
  ]

  const projects = [
    {
      title: t('projects.mokio.title'),
      desc: t('projects.mokio.desc'),
      tag: t('projects.mokio.tag'),
      href: 'https://www.mokio.io/',
      image: '/mokio.webp',
      color: 'from-sky-900/40 to-[#0f0f0f]',
    },
    {
      title: t('projects.nexbyg.title'),
      desc: t('projects.nexbyg.desc'),
      tag: t('projects.nexbyg.tag'),
      href: 'https://www.nexbyg.dk/',
      image: '/nexbyg.webp',
      color: 'from-orange-900/40 to-[#0f0f0f]',
    },
  ]

  const channels = [
    { handle: '@SahariYT', desc: t('youtube.channel1.desc'), href: 'https://youtube.com/@SahariYT' },
    { handle: '@UnclassifiedYTT', desc: t('youtube.channel2.desc'), href: 'https://youtube.com/@UnclassifiedYTT' },
    { handle: '@SupernovaYTT', desc: t('youtube.channel3.desc'), href: 'https://youtube.com/@SupernovaYTT' },
  ]

  const stats = [
    { value: '84K+', label: t('youtube.stats.subs') },
    { value: '11M+', label: t('youtube.stats.views') },
    { value: '700K+', label: t('youtube.stats.hours') },
  ]

  const features = [
    t('hero.feature.speed'),
    t('hero.feature.security'),
    t('hero.feature.endToEnd'),
  ]

  return (
    <div className="pt-16">
      <Seo description="Software studio in Denmark building secure websites, mobile apps, backends and custom tools. End-to-end delivery, fast turnaround, fixed pricing from DKK 4,995. Founded by Emal Sahari." />
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full">
          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-500 mb-7"
          >
            {t('hero.badge')}
          </motion.p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-5xl">
            {reduce ? (
              <>
                {t('hero.headline.start')}{' '}
                <span className="gradient-text-animated">{t('hero.headline.highlight')}</span>{' '}
                {t('hero.headline.end')}
              </>
            ) : (
              (() => {
                const cycleWords = t('hero.headline.cycle').split('|')
                const units = [
                  ...t('hero.headline.start').split(' ').map((w) => ({ word: w, highlight: false })),
                  { word: cycleWords[0], highlight: true },
                  ...t('hero.headline.end').split(' ').map((w) => ({ word: w, highlight: false })),
                ]
                const baseDelay = 0.2
                const stagger = isMobile ? 0.05 : 0.07
                const duration = isMobile ? 0.55 : 0.8
                const yStart = isMobile ? 16 : 28
                return units.flatMap((u, i) => [
                  <motion.span
                    key={`w-${i}`}
                    initial={{ opacity: 0, y: yStart }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration, delay: baseDelay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block ${u.highlight ? 'gradient-text-animated' : ''}`}
                  >
                    {u.highlight ? <CyclingWord words={cycleWords} reduce={reduce} /> : u.word}
                  </motion.span>,
                  i < units.length - 1 ? <span key={`s-${i}`}>{' '}</span> : null,
                ])
              })()
            )}
          </h1>

          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-7 text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={heroFadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
            >
              {t('hero.cta.work')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
            >
              {t('hero.cta.viewWork')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.p
            variants={heroFadeUp}
            initial="hidden"
            animate="show"
            custom={7}
            className="mt-12 text-sm text-zinc-500"
          >
            {features.map((f, i) => (
              <span key={i}>
                {f}
                {i < features.length - 1 && <span className="mx-3 text-zinc-700">·</span>}
              </span>
            ))}
          </motion.p>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={9}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
          {t('hero.scroll')}
        </motion.div>
      </section>

      {/* Services - editorial numbered list */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHead title={t('services.heading')} sub={t('services.subtitle')} />

        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <Reveal key={i} i={i}>
              <div className="group grid md:grid-cols-12 gap-2 md:gap-6 py-7 border-b border-white/10 items-baseline">
                <span className="md:col-span-1 text-sm text-amber-400 font-medium tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="md:col-span-4 font-display text-xl md:text-2xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                  {s.title}
                </h3>
                <p className="md:col-span-7 text-zinc-500 text-sm md:text-base leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          {t('services.openTo')}{' '}
          <Link to="/contact" className="text-amber-400 hover:text-amber-300 transition-colors">
            {t('services.openToCta')}
          </Link>
        </p>
      </section>

      {/* Free tools - asymmetric split */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <SectionHead title={t('tools.heading')} sub={t('tools.subtitle')} />

        <div className="grid md:grid-cols-5 gap-5">
          <Reveal i={0} className="md:col-span-3">
            <Link
              to="/tools/site-check"
              className="group flex flex-col justify-between h-full rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-[#0f0f0f] p-8 md:p-10 hover:border-amber-400/50 transition-all duration-200"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-4">
                  {t('tools.siteCheck.tag')}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4 max-w-md">
                  {t('tools.siteCheck.title')}
                </h3>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                  {t('tools.siteCheck.desc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-300 group-hover:text-amber-200 transition-colors">
                {t('tools.siteCheck.cta')}
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>

          <Reveal i={1} className="md:col-span-2">
            <Link
              to="/tools/brand-kit"
              className="group flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 hover:border-white/30 transition-all duration-200"
            >
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-zinc-500 mb-4">
                  {t('tools.brandKit.tag')}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight leading-tight mb-4">
                  {t('tools.brandKit.title')}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                  {t('tools.brandKit.desc')}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                {t('tools.brandKit.cta')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process - column rule strip */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <SectionHead title={t('process.heading')} sub={t('process.subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {process.map((p, i) => (
            <Reveal key={i} i={i}>
              <div className="border-l border-white/10 pl-6 h-full">
                <span className="text-sm text-amber-400 font-medium tabular-nums">0{i + 1}</span>
                <h3 className="text-white font-semibold mt-3 mb-2 leading-snug">{p.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <SectionHead title={t('projects.heading')} />

        <div className="grid gap-5">
          {projects.map((p, i) => (
            <Reveal key={i} i={i}>
              <SpotlightCard className={`group bg-gradient-to-br ${p.color}`}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full md:grid md:grid-cols-5"
                >
                  <div className="relative md:col-span-3 aspect-[16/9] md:aspect-auto md:min-h-[280px] overflow-hidden bg-black/40 border-b md:border-b-0 md:border-r border-white/5">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.tag}</span>
                    <h3 className="font-display text-white font-bold text-2xl mt-2 mb-3 tracking-tight">{p.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-zinc-300 group-hover:text-white transition-colors">
                      {t('projects.viewLive')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal i={2} className="mt-8">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
          >
            {t('work.seeAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </section>

      {/* Testimonial */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative border-l-2 border-amber-500/40 pl-8 md:pl-12 py-4"
        >
          <Quote size={28} className="text-amber-400 mb-5" />
          <blockquote className="text-xl md:text-2xl text-white font-medium leading-snug mb-6 max-w-3xl">
            {t('testimonial.quote')}
          </blockquote>
          <footer className="text-sm text-zinc-400">
            <span className="text-white font-medium">{t('testimonial.name')}</span>
            <span className="mx-2 text-zinc-600">·</span>
            <a
              href="https://www.nexbyg.dk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors underline decoration-zinc-700 hover:decoration-white underline-offset-4"
            >
              {t('testimonial.role')}
            </a>
          </footer>
        </motion.div>
      </section>

      {/* Security */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">
            <Shield size={16} />
            {t('security.eyebrow')}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.05]">
            {t('security.heading')}
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            {t('security.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* YouTube */}
      <section id="youtube" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/30 to-[#0f0f0f] p-10 md:p-14"
        >
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <Youtube size={36} className="text-red-400 mb-5" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                {t('youtube.heading')}
              </h2>
              <p className="text-zinc-400 leading-relaxed max-w-md">
                {t('youtube.subtitle')}
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[220px]">
              {channels.map((c) => (
                <a
                  key={c.handle}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/8 transition-all group"
                >
                  <Youtube size={16} className="text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{c.handle}</p>
                    <p className="text-zinc-500 text-xs">{c.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-zinc-600 ml-auto group-hover:text-zinc-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.02]">
            {t('cta.heading')}
          </h2>
          <div className="h-[3px] w-12 bg-amber-400 mb-6" />
          <p className="text-zinc-400 mb-3 text-lg">
            {t('cta.subtitle')}
          </p>
          <p className="text-sm text-zinc-500 mb-8">
            {t('cta.pricing')}
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            {t('cta.button')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
