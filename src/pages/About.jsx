import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, ArrowRight, CheckCircle2, Shield, Rocket, Briefcase } from 'lucide-react'
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
    { icon: <Briefcase size={16} />, title: t('about.timeline.sahari.title'), desc: t('about.timeline.sahari.desc') },
    { icon: <Rocket size={16} />, title: t('about.timeline.channels.title'), desc: t('about.timeline.channels.desc') },
    { icon: <Code2 size={16} />, title: t('about.timeline.dev.title'), desc: t('about.timeline.dev.desc') },
    { icon: <Shield size={16} />, title: t('about.timeline.cyber.title'), desc: t('about.timeline.cyber.desc') },
    { icon: <Code2 size={16} />, title: t('about.timeline.services.title'), desc: t('about.timeline.services.desc') },
  ]

  const channels = [
    { handle: '@SahariYT', desc: t('about.channels.channel1.desc'), href: 'https://youtube.com/@SahariYT' },
    { handle: '@UnclassifiedYTT', desc: t('about.channels.channel2.desc'), href: 'https://youtube.com/@UnclassifiedYTT' },
    { handle: '@SupernovaYTT', desc: t('about.channels.channel3.desc'), href: 'https://youtube.com/@SupernovaYTT' },
  ]

  return (
    <div className="pt-28 pb-20">
      <Seo title="About" description="Self-taught developer, YouTuber with three channels, currently studying cybersecurity, and the person behind Sahari." />
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-16"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('about.eyebrow')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            {t('about.heading.start')} <span className="gradient-text">{t('about.heading.highlight')}</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Story */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mb-10">
          <SpotlightCard className="bg-[#0f0f0f] p-8">
            <h2 className="text-white font-semibold text-xl mb-4">{t('about.story.heading')}</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>{t('about.story.p1')}</p>
              <p>{t('about.story.p2')}</p>
              <p>{t('about.story.p3')}</p>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          {[
            { label: t('about.facts.location.label'), value: t('about.facts.location.value'), emoji: '📍' },
            { label: t('about.facts.cvr.label'), value: t('about.facts.cvr.value'), emoji: '🏢' },
            { label: t('about.facts.interests.label'), value: t('about.facts.interests.value'), emoji: '💡' },
          ].map((fact) => (
            <SpotlightCard key={fact.label} className="bg-[#0f0f0f] p-4">
              <p className="text-lg mb-1">{fact.emoji}</p>
              <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">{fact.label}</p>
              <p className="text-white text-sm font-medium leading-snug">{fact.value}</p>
            </SpotlightCard>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mb-12"
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
          custom={4}
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
          custom={5}
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
          custom={6}
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
