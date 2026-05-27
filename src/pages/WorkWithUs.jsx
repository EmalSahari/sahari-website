import { motion } from 'framer-motion'
import { Mic, Sparkles, ArrowRight, CheckCircle2, Mail } from 'lucide-react'
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

const EMAIL = 'contact@sahari.io'

function Section({ title, items, accent }) {
  return (
    <div>
      <h4 className={`text-xs font-medium uppercase tracking-widest mb-3 ${accent}`}>{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-zinc-400 text-sm leading-relaxed">
            <CheckCircle2 size={14} className={`mt-1 flex-shrink-0 ${accent}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RoleCard({
  delay,
  tag,
  icon,
  title,
  about,
  sections,
  applyHeading,
  applyBody,
  applyCta,
  applySubject,
  borderColor,
  iconColor,
  iconBg,
  accentColor,
  buttonGradient,
  buttonShadow,
}) {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(applySubject)}`
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={delay} className="h-full">
      <SpotlightCard className={`border ${borderColor} rounded-2xl bg-[#0f0f0f] p-8 md:p-10 flex flex-col h-full`}>
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>
            {icon}
          </div>
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{tag}</span>
        </div>

        <h3 className="text-white font-semibold text-2xl mb-3 tracking-tight">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-7">{about}</p>

        <div className="space-y-6 mb-8 flex-1">
          {sections.map((s) => (
            <Section key={s.title} title={s.title} items={s.items} accent={accentColor} />
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 mt-auto">
          <h4 className={`text-xs font-medium uppercase tracking-widest mb-2 ${accentColor}`}>{applyHeading}</h4>
          <p className="text-zinc-400 text-sm leading-relaxed mb-5">{applyBody}</p>
          <a
            href={mailto}
            className={`inline-flex items-center gap-2 px-5 py-2.5 ${buttonGradient} text-white font-medium rounded-xl text-sm transition-all duration-200 shadow-lg ${buttonShadow}`}
          >
            <Mail size={14} />
            {applyCta}
            <ArrowRight size={14} />
          </a>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function WorkWithUs() {
  const t = useT()

  return (
    <div className="pt-28 pb-20">
      <Seo title="Work with us" description="Open roles at Sahari: voice actors and open applications for editors, animators, designers, and writers." />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('workWithUs.eyebrow')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            {t('workWithUs.heading.start')} <span className="gradient-text">{t('workWithUs.heading.highlight')}</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {t('workWithUs.subtitle')}
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <RoleCard
            delay={1}
            tag={t('workWithUs.voice.tag')}
            icon={<Mic size={20} />}
            title={t('workWithUs.voice.title')}
            about={t('workWithUs.voice.about')}
            sections={[
              {
                title: t('workWithUs.voice.need.heading'),
                items: [
                  t('workWithUs.voice.need.1'),
                  t('workWithUs.voice.need.2'),
                  t('workWithUs.voice.need.3'),
                  t('workWithUs.voice.need.4'),
                ],
              },
              {
                title: t('workWithUs.voice.offer.heading'),
                items: [
                  t('workWithUs.voice.offer.1'),
                  t('workWithUs.voice.offer.2'),
                  t('workWithUs.voice.offer.3'),
                ],
              },
            ]}
            applyHeading={t('workWithUs.voice.apply.heading')}
            applyBody={t('workWithUs.voice.apply.body')}
            applyCta={t('workWithUs.voice.apply.cta')}
            applySubject="Voice Actor Application"
            borderColor="border-violet-500/20"
            iconBg="bg-violet-500/15"
            iconColor="text-violet-400"
            accentColor="text-violet-400"
            buttonGradient="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            buttonShadow="shadow-violet-900/40"
          />

          <RoleCard
            delay={2}
            tag={t('workWithUs.open.tag')}
            icon={<Sparkles size={20} />}
            title={t('workWithUs.open.title')}
            about={t('workWithUs.open.about')}
            sections={[
              {
                title: t('workWithUs.open.examples.heading'),
                items: [
                  t('workWithUs.open.examples.1'),
                  t('workWithUs.open.examples.2'),
                  t('workWithUs.open.examples.3'),
                  t('workWithUs.open.examples.4'),
                ],
              },
              {
                title: t('workWithUs.open.send.heading'),
                items: [
                  t('workWithUs.open.send.1'),
                  t('workWithUs.open.send.2'),
                  t('workWithUs.open.send.3'),
                ],
              },
            ]}
            applyHeading={t('workWithUs.open.apply.heading')}
            applyBody={t('workWithUs.open.apply.body')}
            applyCta={t('workWithUs.open.apply.cta')}
            applySubject="Open Application"
            borderColor="border-emerald-500/20"
            iconBg="bg-emerald-500/15"
            iconColor="text-emerald-400"
            accentColor="text-emerald-400"
            buttonGradient="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
            buttonShadow="shadow-emerald-900/40"
          />
        </div>
      </div>
    </div>
  )
}
