import { motion } from 'framer-motion'
import { ArrowRight, Dumbbell, Trophy, Music, Calendar, Hammer, Flame, Coffee, Scissors } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'
import Reveal from '../components/Reveal'

export default function Work() {
  const t = useT()

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
      iconBg: 'bg-sky-500/15 text-sky-400',
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
      iconBg: 'bg-orange-500/15 text-orange-400',
    },
    {
      icon: <Flame size={20} />,
      title: t('projects.blackstone.title'),
      desc: t('projects.blackstone.desc'),
      tag: t('projects.blackstone.tag'),
      href: '/black-stone',
      image: '/blackstone.webp',
      color: 'from-red-900/40 to-[#0f0f0f]',
      border: 'border-red-500/20',
      iconBg: 'bg-red-500/15 text-red-400',
    },
    {
      icon: <Scissors size={20} />,
      title: t('projects.mork.title'),
      desc: t('projects.mork.desc'),
      tag: t('projects.mork.tag'),
      href: '/mork',
      image: '/mork.webp',
      color: 'from-amber-900/40 to-[#0f0f0f]',
      border: 'border-amber-600/20',
      iconBg: 'bg-amber-600/15 text-amber-500',
    },
    {
      icon: <Coffee size={20} />,
      title: t('projects.drift.title'),
      desc: t('projects.drift.desc'),
      tag: t('projects.drift.tag'),
      href: '/drift',
      image: '/drift.webp',
      color: 'from-amber-900/40 to-[#0f0f0f]',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/15 text-amber-400',
    },
    {
      icon: <Dumbbell size={20} />,
      title: t('projects.fitness.title'),
      desc: t('projects.fitness.desc'),
      tag: t('projects.fitness.tag'),
      href: 'https://fittrack.sahari.io/',
      image: '/fitness-progress.webp',
      color: 'from-emerald-900/40 to-[#0f0f0f]',
      border: 'border-emerald-500/20',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
    },
    {
      icon: <Trophy size={20} />,
      title: t('projects.chess.title'),
      desc: t('projects.chess.desc'),
      tag: t('projects.chess.tag'),
      href: 'https://skak.onrender.com/',
      image: '/chess-board.webp',
      color: 'from-amber-900/40 to-[#0f0f0f]',
      border: 'border-amber-500/20',
      iconBg: 'bg-amber-500/15 text-amber-400',
    },
    {
      icon: <Music size={20} />,
      title: t('projects.somuchfun.title'),
      desc: t('projects.somuchfun.desc'),
      tag: t('projects.somuchfun.tag'),
      href: 'https://somuchfun.vercel.app/',
      image: '/somuchfun.webp',
      color: 'from-lime-900/40 to-[#0f0f0f]',
      border: 'border-lime-500/20',
      iconBg: 'bg-lime-500/15 text-lime-400',
    },
  ]

  return (
    <div className="pt-16">
      <Seo description="Portfolio of projects built by Sahari: client websites, SaaS products, web apps, and design demos." />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('work.eyebrow')}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {t('work.heading')}
          </h1>
          <p className="text-zinc-400 max-w-lg leading-relaxed">
            {t('work.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {projects.map((p, i) => (
            <Reveal key={p.title} i={i}>
              <SpotlightCard className={`group bg-gradient-to-br ${p.color} h-full`}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full flex flex-col transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-black/40 border-b border-white/5">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className={`w-9 h-9 rounded-lg ${p.iconBg} flex items-center justify-center mb-4`}>
                      {p.icon}
                    </div>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{p.tag}</span>
                    <h3 className="text-white font-semibold text-lg mt-1 mb-2">{p.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
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
      </section>
    </div>
  )
}
