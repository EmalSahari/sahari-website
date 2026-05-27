import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Youtube, Code2, Sparkles, Globe, Smartphone, Server, Zap, Dumbbell, Trophy, Users, Eye, Clock } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ServiceCard({ service, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <SpotlightCard className="group border border-violet-500/15 rounded-xl bg-[#0f0f0f] p-6 h-full hover:bg-[#131313] transition-colors duration-200">
        <div className="w-10 h-10 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center mb-5 group-hover:bg-violet-500/25 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-white font-semibold mb-2 leading-snug">{service.title}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{service.desc}</p>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Home() {
  const t = useT()

  const services = [
    { icon: <Globe size={20} />, title: t('services.web.title'), desc: t('services.web.desc') },
    { icon: <Smartphone size={20} />, title: t('services.mobile.title'), desc: t('services.mobile.desc') },
    { icon: <Server size={20} />, title: t('services.backend.title'), desc: t('services.backend.desc') },
    { icon: <Zap size={20} />, title: t('services.automation.title'), desc: t('services.automation.desc') },
  ]

  const projects = [
    {
      icon: <Dumbbell size={20} />,
      title: t('projects.fitness.title'),
      desc: t('projects.fitness.desc'),
      tag: t('projects.fitness.tag'),
      href: 'https://fitness-mocha-five.vercel.app/',
      image: '/fitness-progress.png',
      color: 'from-emerald-900/40 to-[#0f0f0f]',
      border: 'border-emerald-500/20',
      hoverBorder: 'hover:border-emerald-400/50',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      colSpan: 'md:col-span-2',
      imageAspect: 'aspect-[16/9]',
    },
    {
      icon: <Trophy size={20} />,
      title: t('projects.chess.title'),
      desc: t('projects.chess.desc'),
      tag: t('projects.chess.tag'),
      href: 'https://skak.onrender.com/',
      image: '/chess-board.png',
      color: 'from-amber-900/40 to-[#0f0f0f]',
      border: 'border-amber-500/20',
      hoverBorder: 'hover:border-amber-400/50',
      iconBg: 'bg-amber-500/15 text-amber-400',
      colSpan: 'md:col-span-1',
      imageAspect: 'aspect-[4/3]',
    },
  ]

  const channels = [
    { handle: '@SahariYT', desc: t('youtube.channel1.desc'), href: 'https://youtube.com/@SahariYT' },
    { handle: '@UnclassifiedYTT', desc: t('youtube.channel2.desc'), href: 'https://youtube.com/@UnclassifiedYTT' },
    { handle: '@SupernovaYTT', desc: t('youtube.channel3.desc'), href: 'https://youtube.com/@SupernovaYTT' },
  ]

  const stats = [
    { icon: <Users size={16} />, value: '84K+', label: t('youtube.stats.subs') },
    { icon: <Eye size={16} />, value: '11M+', label: t('youtube.stats.views') },
    { icon: <Clock size={16} />, value: '700K+', label: t('youtube.stats.hours') },
  ]

  return (
    <div className="pt-16">
      <Seo description="Software studio building websites, mobile apps, backends, and custom tools. Also a YouTuber with three channels." />
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px]" />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm"
        >
          <Sparkles size={14} />
          <span>{t('hero.badge')}</span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] max-w-4xl"
        >
          {t('hero.headline.start')}{' '}
          <span className="gradient-text-animated">{t('hero.headline.highlight')}</span>{' '}
          {t('hero.headline.end')}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 text-lg text-zinc-400 max-w-xl leading-relaxed"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            {t('hero.cta.work')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://youtube.com/@SahariYT"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium rounded-xl transition-all duration-200 bg-white/5"
          >
            <Youtube size={16} className="text-red-400" />
            {t('hero.cta.watch')}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
          {t('hero.scroll')}
        </motion.div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('services.eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('services.heading')}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} i={i} />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('projects.eyebrow')}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {t('projects.heading')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 auto-rows-fr">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${p.colSpan}`}
            >
            <SpotlightCard className={`group bg-gradient-to-br ${p.color} h-full`}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full flex flex-col transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className={`relative ${p.imageAspect} overflow-hidden bg-black/40 border-b border-white/5`}>
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className={`w-10 h-10 rounded-lg ${p.iconBg} flex items-center justify-center mb-5`}>
                  {p.icon}
                </div>
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.tag}</span>
                <h3 className="text-white font-semibold text-xl mt-1 mb-2">{p.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-zinc-300 group-hover:text-white transition-colors">
                  {t('projects.viewLive')}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
            </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* YouTube */}
      <section className="max-w-6xl mx-auto px-6 py-12">
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
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
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/15 text-red-400 mb-2">
                  {stat.icon}
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border border-violet-500/20 p-10 md:p-14 text-center"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
          <Code2 size={32} className="text-violet-400 mx-auto mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {t('cta.heading')}
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            {t('cta.button')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
