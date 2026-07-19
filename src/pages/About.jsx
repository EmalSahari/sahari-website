import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Youtube, ArrowRight, CheckCircle2 } from 'lucide-react'
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
    { value: '85K+', label: t('about.stats.subs') },
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

  return (
    <div className="pt-28 pb-20">
      <Seo title="About" description="Software builder behind Sahari. Building secure, well-functioning software for businesses and creators. Also a YouTuber with 85K+ subscribers." />
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-20"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('about.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02]">
            {t('about.heading.start')} <span className="gradient-text">{t('about.heading.highlight')}</span>
          </h1>
          <div className="mt-5 h-[2px] w-12 bg-amber-400" />
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
            {t('about.subtitle')}
          </p>
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
          <div className="flex items-center gap-2.5 mb-6">
            <Youtube size={16} className="text-red-500" />
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.3em]">{t('about.stats.heading')}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-none">{s.value}</p>
                <p className="text-zinc-500 text-xs md:text-sm mt-3">{s.label}</p>
              </div>
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
