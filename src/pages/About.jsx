import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, ArrowRight, CheckCircle2, Shield, Rocket, Briefcase, Target, Users, Eye } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  const t = useT()

  const values = [
    {
      icon: <Target size={22} />,
      title: t('about.values.fit.title'),
      desc: t('about.values.fit.desc'),
      iconBg: 'bg-violet-500/15 text-violet-400',
    },
    {
      icon: <CheckCircle2 size={22} />,
      title: t('about.values.quality.title'),
      desc: t('about.values.quality.desc'),
      iconBg: 'bg-sky-500/15 text-sky-400',
    },
    {
      icon: <Shield size={22} />,
      title: t('about.values.security.title'),
      desc: t('about.values.security.desc'),
      iconBg: 'bg-emerald-500/15 text-emerald-400',
    },
  ]

  const stats = [
    { value: '4+', label: t('about.stats.coding') },
    { value: '5+', label: t('about.stats.projects') },
    { value: '84K+', label: t('about.stats.subs') },
    { value: '11M+', label: t('about.stats.views') },
  ]

  const skills = [
    t('about.capabilities.webApps'),
    t('about.capabilities.mobileApps'),
    t('about.capabilities.backend'),
    t('about.capabilities.ai'),
    t('about.capabilities.automation'),
    t('about.capabilities.custom'),
    t('about.capabilities.cyber'),
    t('about.capabilities.fullstack'),
    t('about.capabilities.responsive'),
  ]

  const timeline = [
    { icon: <Youtube size={16} />, title: t('about.timeline.youtube.title'), desc: t('about.timeline.youtube.desc') },
    { icon: <Code2 size={16} />, title: t('about.timeline.dev.title'), desc: t('about.timeline.dev.desc') },
    { icon: <Briefcase size={16} />, title: t('about.timeline.sahari.title'), desc: t('about.timeline.sahari.desc') },
    { icon: <Rocket size={16} />, title: t('about.timeline.services.title'), desc: t('about.timeline.services.desc') },
  ]

  const channels = [
    { handle: '@SahariYT', desc: t('about.channels.channel1.desc'), href: 'https://youtube.com/@SahariYT' },
    { handle: '@UnclassifiedYTT', desc: t('about.channels.channel2.desc'), href: 'https://youtube.com/@UnclassifiedYTT' },
    { handle: '@SupernovaYTT', desc: t('about.channels.channel3.desc'), href: 'https://youtube.com/@SupernovaYTT' },
  ]

  return (
    <div className="pt-28 pb-20">
      <Seo title="About" description="Software builder behind Sahari. Building secure, well-functioning software for businesses and creators. Also a YouTuber with 84K+ subscribers." />
      <div className="max-w-4xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/40">
              <span className="text-white font-bold text-3xl tracking-tight">ES</span>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30 blur-lg -z-10" />
            </div>
          </div>
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('about.eyebrow')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            {t('about.heading.start')} <span className="gradient-text">{t('about.heading.highlight')}</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>

          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-300 font-medium">{t('about.currentFocus')}:</span>
            <span className="text-zinc-300">{t('about.currentFocusValue')}</span>
          </div>
        </motion.div>

        {/* Values — how I work */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mb-14"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">{t('about.values.heading')}</h2>
            <p className="text-zinc-400 max-w-lg mx-auto">{t('about.values.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <SpotlightCard
                key={v.title}
                glowColor={v.iconBg.includes('emerald') ? '52,211,153' : v.iconBg.includes('sky') ? '56,189,248' : '167,139,250'}
                className="bg-[#0f0f0f] p-6 h-full"
              >
                <div className={`w-11 h-11 rounded-lg ${v.iconBg} flex items-center justify-center mb-5`}>
                  {v.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mb-14"
        >
          <SpotlightCard className="bg-gradient-to-br from-violet-950/30 to-[#0f0f0f] p-8">
            <h2 className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-6">{t('about.stats.heading')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-bold text-white tracking-tight">{s.value}</p>
                  <p className="text-zinc-500 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Story */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mb-14">
          <SpotlightCard className="bg-[#0f0f0f] p-8">
            <h2 className="text-white font-semibold text-xl mb-4">{t('about.story.heading')}</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>{t('about.story.p1')}</p>
              <p>{t('about.story.p2')}</p>
              <p>{t('about.story.p3')}</p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mb-14"
        >
          <h2 className="text-white font-semibold text-xl mb-6">{t('about.timeline.heading')}</h2>
          <div className="relative space-y-6 pl-6 border-l border-white/10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.85rem] w-7 h-7 rounded-full bg-[#0f0f0f] border border-violet-500/40 flex items-center justify-center text-violet-400">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mb-14"
        >
          <h2 className="text-white font-semibold text-xl mb-5">{t('about.capabilities.heading')}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm hover:border-violet-500/40 hover:text-white transition-colors"
              >
                <CheckCircle2 size={12} className="text-violet-400" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* YouTube channels */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="mb-14"
        >
          <h2 className="text-white font-semibold text-xl mb-5">{t('about.channels.heading')}</h2>
          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.handle}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/8 transition-all group"
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
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={7}
          className="text-center"
        >
          <p className="text-zinc-400 mb-5">{t('about.workTogether')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
          >
            {t('about.cta')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
