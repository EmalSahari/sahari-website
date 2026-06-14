import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X, ArrowRight, Plus, Minus, Sparkles, Gauge } from 'lucide-react'
import { useT } from '../i18n/LanguageContext'
import Seo from '../components/Seo'
import SpotlightCard from '../components/SpotlightCard'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

function PricingCard({ tier, popular, i }) {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const formattedPrice = new Intl.NumberFormat(lang === 'da' ? 'da-DK' : 'en-US').format(tier.price)
  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={i} className="relative">
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-black text-[10px] font-bold tracking-[0.2em] uppercase">
            <Sparkles size={11} />
            {t('pricing.popular')}
          </span>
        </div>
      )}
      <SpotlightCard
        glowColor={popular ? '251,191,36' : '255,255,255'}
        className={`h-full p-8 ${popular ? 'border border-amber-500/40 bg-gradient-to-b from-amber-950/20 to-[#0f0f0f]' : 'border border-white/10 bg-[#0f0f0f]'}`}
      >
        <div className="flex flex-col h-full">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: popular ? '#fbbf24' : '#a1a1aa' }}>
            {tier.name}
          </p>
          <h3 className="text-white font-semibold text-lg mb-3 leading-snug">
            {tier.tagline}
          </h3>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-zinc-500 text-sm">{tier.prefix}</span>
            <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{formattedPrice}</span>
            <span className="text-zinc-500 text-sm">{t('pricing.currency')}</span>
          </div>
          <p className="text-xs text-zinc-500 mb-7">{tier.delivery}</p>

          <ul className="space-y-3 mb-6 flex-1">
            {tier.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-snug">
                <Check size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {tier.excludes?.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 leading-snug">
                <X size={16} className="text-zinc-700 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to={`/contact?tier=${tier.slug}`}
            className={`mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              popular
                ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-900/40'
                : 'bg-white hover:bg-zinc-200 text-black'
            }`}
          >
            {tier.cta}
            <ArrowRight size={14} />
          </Link>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-5 flex items-start justify-between gap-6 text-left group"
      >
        <span className="text-white font-medium text-base md:text-lg leading-snug">{q}</span>
        <span className="text-amber-400 flex-shrink-0 mt-1">
          {open ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Pricing() {
  const t = useT()

  const tiers = [
    {
      slug: 'single',
      name: t('pricing.single.name'),
      tagline: t('pricing.single.tagline'),
      prefix: t('pricing.from'),
      price: 4995,
      delivery: t('pricing.single.delivery'),
      includes: [
        t('pricing.single.inc.1'),
        t('pricing.single.inc.2'),
        t('pricing.single.inc.3'),
        t('pricing.single.inc.4'),
        t('pricing.single.inc.5'),
        t('pricing.single.inc.6'),
      ],
      excludes: [
        t('pricing.single.exc.1'),
      ],
      cta: t('pricing.single.cta'),
    },
    {
      slug: 'standard',
      name: t('pricing.standard.name'),
      tagline: t('pricing.standard.tagline'),
      prefix: t('pricing.from'),
      price: 9995,
      delivery: t('pricing.standard.delivery'),
      includes: [
        t('pricing.standard.inc.1'),
        t('pricing.standard.inc.2'),
        t('pricing.standard.inc.3'),
        t('pricing.standard.inc.4'),
        t('pricing.standard.inc.5'),
        t('pricing.standard.inc.6'),
        t('pricing.standard.inc.7'),
      ],
      excludes: [
        t('pricing.standard.exc.1'),
      ],
      cta: t('pricing.standard.cta'),
    },
    {
      slug: 'premium',
      name: t('pricing.premium.name'),
      tagline: t('pricing.premium.tagline'),
      prefix: t('pricing.from'),
      price: 19995,
      delivery: t('pricing.premium.delivery'),
      includes: [
        t('pricing.premium.inc.1'),
        t('pricing.premium.inc.2'),
        t('pricing.premium.inc.3'),
        t('pricing.premium.inc.4'),
        t('pricing.premium.inc.5'),
        t('pricing.premium.inc.6'),
        t('pricing.premium.inc.7'),
      ],
      cta: t('pricing.premium.cta'),
    },
  ]

  const addOns = [
    { name: t('pricing.addons.stripe.name'), price: t('pricing.addons.stripe.price'), desc: t('pricing.addons.stripe.desc') },
    { name: t('pricing.addons.mobilepay.name'), price: t('pricing.addons.mobilepay.price'), desc: t('pricing.addons.mobilepay.desc') },
    { name: t('pricing.addons.fix.name'), price: t('pricing.addons.fix.price'), desc: t('pricing.addons.fix.desc') },
    { name: t('pricing.addons.care.name'), price: t('pricing.addons.care.price'), desc: t('pricing.addons.care.desc') },
    { name: t('pricing.addons.extra.name'), price: t('pricing.addons.extra.price'), desc: t('pricing.addons.extra.desc') },
  ]

  const faqs = [
    { q: t('pricing.faq.1.q'), a: t('pricing.faq.1.a') },
    { q: t('pricing.faq.2.q'), a: t('pricing.faq.2.a') },
    { q: t('pricing.faq.3.q'), a: t('pricing.faq.3.a') },
    { q: t('pricing.faq.4.q'), a: t('pricing.faq.4.a') },
    { q: t('pricing.faq.5.q'), a: t('pricing.faq.5.a') },
    { q: t('pricing.faq.6.q'), a: t('pricing.faq.6.a') },
    { q: t('pricing.faq.7.q'), a: t('pricing.faq.7.a') },
  ]

  return (
    <div className="pt-28 pb-20">
      <Seo title="Pricing" description="Three starting points for websites and software. From DKK 4,995 for a single page to custom premium projects." />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-16 max-w-3xl"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('pricing.eyebrow')}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight leading-[1.02] mb-5">
            {t('pricing.heading')}
          </h1>
          <div className="h-[2px] w-12 bg-amber-400 mb-6" />
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} popular={i === 1} i={i + 1} />
          ))}
        </div>

        {/* Site Check nudge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          className="mb-20"
        >
          <Link
            to="/tools/site-check"
            className="group flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-950/[0.08] hover:bg-amber-950/15 hover:border-amber-400/40 px-5 py-4 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Gauge size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm md:text-base">{t('pricing.siteCheck.title')}</p>
              <p className="text-zinc-400 text-xs md:text-sm leading-snug mt-0.5">{t('pricing.siteCheck.body')}</p>
            </div>
            <ArrowRight size={16} className="text-amber-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Custom callout */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-8 md:p-10 text-center mb-20"
        >
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-3">{t('pricing.custom.heading')}</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-6 text-sm md:text-base leading-relaxed">{t('pricing.custom.body')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl text-sm transition-all"
          >
            {t('pricing.custom.cta')}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          className="mb-20"
        >
          <div className="mb-10 max-w-3xl">
            <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('pricing.addons.eyebrow')}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-5">{t('pricing.addons.heading')}</h2>
            <div className="h-[2px] w-12 bg-amber-400 mb-6" />
            <p className="text-zinc-400 max-w-lg leading-relaxed">{t('pricing.addons.subtitle')}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {addOns.map((a) => (
              <div key={a.name} className="border border-white/10 bg-[#0f0f0f] rounded-xl p-5 hover:bg-[#131313] transition-colors">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h3 className="text-white font-semibold text-sm md:text-base">{a.name}</h3>
                  <span className="text-amber-400 text-sm font-semibold whitespace-nowrap">{a.price}</span>
                </div>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-amber-500/20 bg-amber-950/10 rounded-xl p-5">
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h3 className="text-white font-semibold text-sm md:text-base">{t('pricing.mokio.name')}</h3>
              <span className="text-amber-400 text-sm font-semibold whitespace-nowrap">{t('pricing.mokio.price')}</span>
            </div>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-3">{t('pricing.mokio.desc')}</p>
            <a
              href="https://www.mokio.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs md:text-sm font-medium transition-colors"
            >
              {t('pricing.mokio.link')}
              <ArrowRight size={12} />
            </a>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          className="mb-16"
        >
          <div className="mb-10 max-w-3xl">
            <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">{t('pricing.faq.eyebrow')}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-5">{t('pricing.faq.heading')}</h2>
            <div className="h-[2px] w-12 bg-amber-400" />
          </div>

          <div className="border-t border-white/10 max-w-3xl">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          custom={0}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.05] mb-5">{t('pricing.final.heading')}</h2>
          <div className="h-[2px] w-12 bg-amber-400 mb-6" />
          <p className="text-zinc-400 mb-6">{t('pricing.final.subtitle')}</p>
          <Link
            to="/contact"
            data-magnetic
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-200 text-black font-medium rounded-xl transition-all duration-200 shadow-lg shadow-black/40"
          >
            {t('pricing.final.cta')}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
