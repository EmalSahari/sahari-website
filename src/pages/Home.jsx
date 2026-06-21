import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code2, Globe, Smartphone, Server, Zap, Lightbulb, Rocket, RefreshCw, Calendar, Hammer, Shield, Quote, Workflow, Briefcase, Wrench, Gauge, Palette } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'
import Reveal from '../components/Reveal'
import ScrollMarquee from '../components/ScrollMarquee'
import GradientMesh from '../components/GradientMesh'
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

function ServiceCard({ service, i }) {
  return (
    <Reveal i={i}>
      <SpotlightCard className="group border border-white/10 rounded-xl bg-[#0f0f0f] p-6 h-full hover:bg-[#131313] transition-colors duration-200">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-white font-semibold mb-2 leading-snug">{service.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
      </SpotlightCard>
    </Reveal>
  )
}

export default function Home() {
  const t = useT()
  const isMobile = useIsMobile()
  const reduce = usePrefersReducedMotion()
  const fadeUp = reduce ? STILL : makeFadeUp(isMobile)
  const heroFadeUp = reduce ? STILL : makeHeroFadeUp(isMobile)

  // Scroll-linked hero parallax: headline scales up slightly while subtitle
  // and feature row drift up faster, giving depth as the user scrolls past.
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 700], [1, 1.06])
  const heroY = useTransform(scrollY, [0, 700], [0, -40])
  const subtitleY = useTransform(scrollY, [0, 700], [0, -90])
  const featureY = useTransform(scrollY, [0, 700], [0, -140])

  const services = [
    { icon: <Globe size={20} />, title: t('services.web.title'), desc: t('services.web.desc') },
    { icon: <Gauge size={20} />, title: t('services.seo.title'), desc: t('services.seo.desc') },
    { icon: <Smartphone size={20} />, title: t('services.mobile.title'), desc: t('services.mobile.desc') },
    { icon: <Server size={20} />, title: t('services.backend.title'), desc: t('services.backend.desc') },
    { icon: <Zap size={20} />, title: t('services.automation.title'), desc: t('services.automation.desc') },
    { icon: <Wrench size={20} />, title: t('services.maintenance.title'), desc: t('services.maintenance.desc') },
  ]

  const process = [
    { icon: <Lightbulb size={20} />, title: t('process.idea.title'), desc: t('process.idea.desc') },
    { icon: <Code2 size={20} />, title: t('process.build.title'), desc: t('process.build.desc') },
    { icon: <Rocket size={20} />, title: t('process.launch.title'), desc: t('process.launch.desc') },
    { icon: <RefreshCw size={20} />, title: t('process.support.title'), desc: t('process.support.desc') },
  ]

  const projects = [
    {
      icon: <Calendar size={20} />,
      title: t('projects.mokio.title'),
      desc: t('projects.mokio.desc'),
      tag: t('projects.mokio.tag'),
      href: 'https://www.mokio.io/',
      image: '/mokio.webp',
      color: 'from-sky-900/40 to-[#0f0f0f]',
      border: 'border-sky-500/20',
      hoverBorder: 'hover:border-sky-400/50',
      iconBg: 'bg-sky-500/15 text-sky-400',
      colSpan: 'md:col-span-3',
      imageAspect: 'aspect-[21/9]',
    },
    {
      icon: <Hammer size={20} />,
      title: t('projects.nexbyg.title'),
      desc: t('projects.nexbyg.desc'),
      tag: t('projects.nexbyg.tag'),
      href: 'https://www.nexbyg.dk/',
      image: '/nexbyg.webp',
      color: 'from-orange-900/40 to-[#0f0f0f]',
      border: 'border-orange-500/20',
      hoverBorder: 'hover:border-orange-400/50',
      iconBg: 'bg-orange-500/15 text-orange-400',
      colSpan: 'md:col-span-3',
      imageAspect: 'aspect-[21/9]',
    },
  ]

  return (
    <div className="pt-16">
      <Seo description="Software studio in Denmark building secure websites, mobile apps, backends and custom tools. End-to-end delivery, fast turnaround, fixed pricing from DKK 4,995. Founded by Emal Sahari." />
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <GradientMesh />
        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          style={reduce ? undefined : { y: heroY }}
          className="relative z-10 mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-zinc-200 text-sm backdrop-blur-sm"
        >
          <Code2 size={14} className="text-amber-400" />
          <span>{t('hero.badge')}</span>
        </motion.div>

        <motion.h1
          style={reduce || isMobile ? undefined : { scale: heroScale, y: heroY }}
          className="relative z-10 font-display text-[clamp(1.875rem,7vw,5.5rem)] font-bold tracking-[-0.025em] text-white leading-[1.05] max-w-5xl"
        >
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
        </motion.h1>

        <motion.p
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          style={reduce || isMobile ? undefined : { y: subtitleY }}
          className="relative z-10 mt-8 text-base md:text-xl text-zinc-400 max-w-xl leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={heroFadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          style={reduce || isMobile ? undefined : { y: subtitleY }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            data-magnetic
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            {t('hero.cta.work')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/work"
            data-magnetic
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 bg-white/5"
          >
            <Briefcase size={16} className="text-amber-400" />
            {t('hero.cta.viewWork')}
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={9}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-zinc-600 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
          {t('hero.scroll')}
        </motion.div>
      </section>

      {/* Services - editorial numbered list */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('services.eyebrow')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
            {t('services.heading')}
          </h2>
          <div className="mt-5 h-[2px] w-12 bg-amber-400" />
          <p className="mt-6 text-zinc-400 max-w-lg leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <Reveal key={i} i={i}>
              <div className="group grid md:grid-cols-12 gap-2 md:gap-6 py-7 border-b border-white/10 items-baseline transition-colors hover:border-amber-500/30">
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

        <p className="mt-10 text-sm text-zinc-500">
          {t('services.openTo')}{' '}
          <Link to="/contact" className="text-amber-400 hover:text-amber-300 transition-colors">
            {t('services.openToCta')}
          </Link>
        </p>
      </section>

      {/* Marquee 1 - services keywords */}
      <ScrollMarquee
        words={t('marquee.services').split('|')}
        speed={0.6}
        className="my-12"
      />

      {/* Free tools */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('tools.eyebrow')}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {t('tools.heading')}
          </h2>
          <p className="text-zinc-400 leading-relaxed">{t('tools.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <Reveal i={0}>
            <Link
              to="/tools/site-check"
              className="group relative block h-full rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 to-[#0f0f0f] p-7 hover:border-amber-400/50 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Gauge size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-amber-400 mb-1">
                    {t('tools.siteCheck.tag')}
                  </p>
                  <h3 className="text-white font-bold text-xl leading-tight">{t('tools.siteCheck.title')}</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {t('tools.siteCheck.desc')}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 group-hover:text-amber-200 transition-colors">
                {t('tools.siteCheck.cta')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>

          <Reveal i={1}>
            <Link
              to="/tools/brand-kit"
              className="group relative block h-full rounded-2xl border border-white/10 bg-[#0f0f0f] p-7 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-white/5 text-zinc-300 flex items-center justify-center flex-shrink-0">
                  <Palette size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-zinc-500 mb-1">
                    {t('tools.brandKit.tag')}
                  </p>
                  <h3 className="text-white font-bold text-xl leading-tight">{t('tools.brandKit.title')}</h3>
                </div>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {t('tools.brandKit.desc')}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                {t('tools.brandKit.cta')}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process - connected timeline */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('process.eyebrow')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-4">
            {t('process.heading')}
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {/* Horizontal connecting line on desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute top-3 left-[11%] right-[11%] h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent origin-left"
          />
          {/* Vertical line on mobile */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-3 bottom-3 left-3 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/40 to-transparent origin-top"
          />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {process.map((p, i) => (
              <Reveal key={i} i={i}>
                <div className="relative pl-10 md:pl-0">
                  {/* Dot on the line */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 ring-[6px] ring-[#080808] shadow-[0_0_20px_rgba(251,191,36,0.4)]" />
                  {/* Number under the dot, big and editorial */}
                  <div className="md:text-center md:pt-12">
                    <span className="block font-display text-xs font-semibold tracking-[0.25em] uppercase text-amber-400 mb-3">
                      Step 0{i + 1}
                    </span>
                    <h3 className="text-white font-semibold text-lg md:text-xl mb-2 leading-snug">{p.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed md:max-w-xs md:mx-auto">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - alternating editorial spreads */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('projects.eyebrow')}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05]">
            {t('projects.heading')}
          </h2>
          <div className="mt-5 h-[2px] w-12 bg-amber-400" />
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1
            return (
              <Reveal key={i} i={i}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className={`group grid md:grid-cols-12 gap-8 md:gap-12 items-center ${reversed ? 'md:[direction:rtl]' : ''}`}
                >
                  <div className={`md:col-span-7 relative overflow-hidden rounded-2xl bg-black/40 border border-white/5 ${reversed ? 'md:[direction:ltr]' : ''}`}>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-30 mix-blend-multiply pointer-events-none`} />
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${reversed ? 'md:[direction:ltr]' : ''}`}>
                    <span className="block text-xs font-medium text-amber-400 uppercase tracking-[0.25em] mb-4">
                      {p.tag}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-5">
                      {p.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
                      {p.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 group-hover:text-amber-300 transition-colors">
                      {t('projects.viewLive')}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>

        <Reveal i={2} className="mt-16">
          <Link
            to="/work"
            data-magnetic
            className="group inline-flex items-center gap-2 text-zinc-300 hover:text-white font-medium transition-colors"
          >
            {t('work.seeAll')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </section>

      {/* Marquee 2 - studio voice */}
      <ScrollMarquee
        words={t('marquee.voice').split('|')}
        speed={0.4}
        className="my-12"
      />

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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            {t('security.heading')}
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            {t('security.subtitle')}
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t('cta.heading')}
          </h2>
          <p className="text-zinc-400 mb-3 text-lg">
            {t('cta.subtitle')}
          </p>
          <p className="text-sm text-zinc-500 mb-8">
            {t('cta.pricing')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            {t('cta.button')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
