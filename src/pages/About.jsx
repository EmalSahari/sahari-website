import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, Dumbbell, Trophy, ArrowRight, CheckCircle2, Shield } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'

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
    { icon: <Code2 size={16} />, title: t('about.timeline.dev.title'), desc: t('about.timeline.dev.desc') },
    { icon: <Dumbbell size={16} />, title: t('about.timeline.fitness.title'), desc: t('about.timeline.fitness.desc') },
    { icon: <Trophy size={16} />, title: t('about.timeline.chess.title'), desc: t('about.timeline.chess.desc') },
    { icon: <Shield size={16} />, title: t('about.timeline.cyber.title'), desc: t('about.timeline.cyber.desc') },
    { icon: <Code2 size={16} />, title: t('about.timeline.sahari.title'), desc: t('about.timeline.sahari.desc') },
  ]

  const channels = [
    { handle: '@SahariYT', desc: t('about.channels.channel1.desc'), href: 'https://youtube.com/@SahariYT' },
    { handle: '@UnclassifiedYTT', desc: t('about.channels.channel2.desc'), href: 'https://youtube.com/@UnclassifiedYTT' },
    { handle: '@SupernovaYTT', desc: t('about.channels.channel3.desc'), href: 'https://youtube.com/@SupernovaYTT' },
  ]

  return (
    <div className="pt-28 pb-20">
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="gradient-border bg-[#0f0f0f] rounded-2xl p-8 mb-10"
        >
          <h2 className="text-white font-semibold text-xl mb-4">{t('about.story.heading')}</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>{t('about.story.p1')}</p>
            <p>{t('about.story.p2')}</p>
            <p>{t('about.story.p3')}</p>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
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
          custom={3}
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
          custom={4}
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
          custom={5}
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
