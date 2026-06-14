import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, Code2, ArrowRight, CheckCircle2, Rocket, Briefcase } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import EditorialHeading from '../components/EditorialHeading'

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
    { title: t('about.values.fit.title'), desc: t('about.values.fit.desc') },
    { title: t('about.values.quality.title'), desc: t('about.values.quality.desc') },
    { title: t('about.values.security.title'), desc: t('about.values.security.desc') },
  ]

  const stats = [
    { value: '84K+', label: t('about.stats.subs') },
    { value: '11M+', label: t('about.stats.views') },
    { value: '3', label: t('about.stats.channels') },
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
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero - asymmetric: photo left, heading right */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-20 grid md:grid-cols-12 gap-8 md:gap-12 items-end"
        >
          <div className="md:col-span-4">
            <div className="w-32 h-32 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-lg shadow-black/40 bg-zinc-900">
              <img
                src="/emal.webp"
                alt="Emal Sahari"
                fetchpriority="high"
                decoding="async"
                className="w-full h-full object-cover"
                style={{ objectPosition: '50% 25%' }}
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('about.eyebrow')}</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02]">
              {t('about.heading.start')} <span className="gradient-text">{t('about.heading.highlight')}</span>
            </h1>
            <div className="mt-5 h-[2px] w-12 bg-amber-400" />
            <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
              {t('about.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Values - editorial numbered list */}
        <section className="mb-20">
          <EditorialHeading
            heading={t('about.values.heading')}
            subtitle={t('about.values.subtitle')}
            className="mb-12"
          />
          <div className="border-t border-white/10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group grid md:grid-cols-12 gap-2 md:gap-6 py-7 border-b border-white/10 items-baseline transition-colors hover:border-amber-500/30"
              >
                <span className="md:col-span-1 text-sm text-amber-400 font-medium tabular-nums">0{i + 1}</span>
                <h3 className="md:col-span-4 font-display text-xl md:text-2xl font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-1.5">
                  {v.title}
                </h3>
                <p className="md:col-span-7 text-zinc-500 text-sm md:text-base leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats - editorial big numbers, no card */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-20"
        >
          <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.3em] mb-6">{t('about.stats.heading')}</p>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">{s.value}</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Story */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">{t('about.story.heading')}</h2>
          <div className="h-[2px] w-12 bg-amber-400 mb-6" />
          <div className="space-y-5 text-zinc-400 leading-relaxed text-base md:text-lg">
            <p>{t('about.story.p1')}</p>
            <p>{t('about.story.p2')}</p>
            <p>{t('about.story.p3')}</p>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">{t('about.timeline.heading')}</h2>
          <div className="h-[2px] w-12 bg-amber-400 mb-10" />
          <div className="relative space-y-7 pl-6 border-l border-white/10">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[1.85rem] w-7 h-7 rounded-full bg-[#080808] border border-amber-500/40 flex items-center justify-center text-amber-400">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">{t('about.capabilities.heading')}</h2>
          <div className="h-[2px] w-12 bg-amber-400 mb-8" />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-sm hover:border-amber-500/40 hover:text-white transition-colors"
              >
                <CheckCircle2 size={12} className="text-amber-400" />
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* YouTube channels */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.05] mb-4">{t('about.channels.heading')}</h2>
          <div className="h-[2px] w-12 bg-amber-400 mb-8" />
          <div className="flex flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.handle}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 hover:bg-white/[0.08] transition-all group"
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
        </motion.section>

        {/* CTA - left-aligned editorial */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          <p className="text-zinc-400 mb-5">{t('about.workTogether')}</p>
          <Link
            to="/contact"
            data-magnetic
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            {t('about.cta')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
