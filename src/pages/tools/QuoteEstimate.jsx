import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Check, ArrowRight, Minus, Plus, CreditCard,
  Smartphone, Wrench, Calendar, FileText, Info,
} from 'lucide-react'
import { useT } from '../../i18n/LanguageContext'
import Seo from '../../components/Seo'

const TIERS = [
  {
    slug: 'single',
    base: 4995,
    deliveryDaysMin: 3,
    deliveryDaysMax: 5,
    deliveryUnit: 'days',
  },
  {
    slug: 'standard',
    base: 9995,
    deliveryDaysMin: 1,
    deliveryDaysMax: 2,
    deliveryUnit: 'weeks',
    popular: true,
  },
  {
    slug: 'premium',
    base: 19995,
    deliveryDaysMin: 2,
    deliveryDaysMax: 4,
    deliveryUnit: 'weeks',
  },
]

const EXTRA_PAGE_PRICE = 995
const STRIPE_PRICE = 2500
const CARE_MONTHLY = 495

function fmt(amount, lang) {
  return new Intl.NumberFormat(lang === 'da' ? 'da-DK' : 'en-US').format(amount)
}

export default function QuoteEstimate() {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const currency = t('pricing.currency')
  const navigate = useNavigate()

  const [tier, setTier] = useState('standard')
  const [extraPages, setExtraPages] = useState(0)
  const [stripe, setStripe] = useState(false)
  const [mobilepay, setMobilepay] = useState(false)
  const [carePlan, setCarePlan] = useState(false)
  const [mokio, setMokio] = useState(false)

  useEffect(() => {
    document.title = `${t('estimate.heading')} | Sahari`
  }, [t])

  const selectedTier = TIERS.find((x) => x.slug === tier)

  const subtotal = useMemo(() => {
    let s = selectedTier?.base || 0
    s += extraPages * EXTRA_PAGE_PRICE
    if (stripe) s += STRIPE_PRICE
    return s
  }, [selectedTier, extraPages, stripe])

  const monthly = carePlan ? CARE_MONTHLY : 0

  const deliveryText = useMemo(() => {
    if (!selectedTier) return ''
    const { deliveryDaysMin: a, deliveryDaysMax: b, deliveryUnit } = selectedTier
    const unitDa = deliveryUnit === 'days' ? (lang === 'da' ? 'dage' : 'days') : (lang === 'da' ? 'uger' : 'weeks')
    return `${a}${b !== a ? ` - ${b}` : ''} ${unitDa}`
  }, [selectedTier, lang])

  const tierContent = {
    single: {
      title: t('pricing.single.name'),
      tagline: t('pricing.single.tagline'),
    },
    standard: {
      title: t('pricing.standard.name'),
      tagline: t('pricing.standard.tagline'),
    },
    premium: {
      title: t('pricing.premium.name'),
      tagline: t('pricing.premium.tagline'),
    },
  }

  const goToContact = () => {
    const lines = []
    lines.push(lang === 'da' ? 'Mit estimat fra estimatoren:' : 'My estimate from the calculator:')
    lines.push('')
    lines.push(`${tierContent[tier].title}: ${fmt(selectedTier.base, lang)} ${currency}`)
    if (extraPages > 0) {
      lines.push(`${t('estimate.addons.extraPages.title')} (${extraPages}): ${fmt(extraPages * EXTRA_PAGE_PRICE, lang)} ${currency}`)
    }
    if (stripe) lines.push(`${t('estimate.addons.stripe.title')}: ${fmt(STRIPE_PRICE, lang)} ${currency}`)
    if (mobilepay) lines.push(`${t('estimate.addons.mobilepay.title')}: ${t('estimate.contactPrice')}`)
    if (mokio) lines.push(`${t('estimate.addons.mokio.title')}: ${t('estimate.included')}`)
    lines.push('')
    lines.push(`${t('estimate.summary.subtotal')}: ${fmt(subtotal, lang)} ${currency}`)
    if (carePlan) lines.push(`${t('estimate.addons.care.title')}: ${fmt(CARE_MONTHLY, lang)} ${currency} ${t('estimate.perMonth')}`)
    lines.push('')
    lines.push(lang === 'da' ? '(Skriv her hvad projektet handler om)' : '(Tell me about the project)')

    const message = encodeURIComponent(lines.join('\n'))
    navigate(`/contact?tier=${tier}&message=${message}`)
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <Seo title={t('estimate.heading')} description="Pick a tier, add what you need, and get an instant rough estimate for your Sahari project." />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <p className="text-amber-400 text-sm font-medium tracking-widest uppercase mb-3">
            {t('estimate.eyebrow')}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-5 leading-[1.05]">
            {t('estimate.heading')}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {t('estimate.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selectors */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tier */}
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                {t('estimate.tier.title')}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {TIERS.map((tx) => {
                  const selected = tier === tx.slug
                  const content = tierContent[tx.slug]
                  return (
                    <button
                      key={tx.slug}
                      onClick={() => setTier(tx.slug)}
                      className={`text-left rounded-2xl border p-5 transition-all duration-200 relative ${
                        selected
                          ? 'border-amber-400 bg-amber-500/[0.06]'
                          : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
                      }`}
                    >
                      {tx.popular && !selected && (
                        <span className="absolute -top-2 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9px] font-bold tracking-widest uppercase">
                          <Sparkles size={9} />
                          {t('pricing.popular')}
                        </span>
                      )}
                      <p className={`text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 ${selected ? 'text-amber-300' : 'text-zinc-500'}`}>
                        {content.title}
                      </p>
                      <p className="text-white font-medium text-sm leading-snug mb-4 min-h-[3.5rem]">
                        {content.tagline}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xs text-zinc-500">{t('pricing.from')}</span>
                        <span className="text-2xl font-bold text-white tracking-tight">
                          {fmt(tx.base, lang)}
                        </span>
                        <span className="text-xs text-zinc-500">{currency}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Add-ons */}
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                {t('estimate.addons.title')}
              </h2>

              {/* Extra pages with counter */}
              <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5 mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-white font-medium leading-tight">{t('estimate.addons.extraPages.title')}</p>
                        <p className="text-zinc-500 text-sm mt-0.5">{t('estimate.addons.extraPages.desc')}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={() => setExtraPages((n) => Math.max(0, n - 1))}
                          className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 text-zinc-300 flex items-center justify-center transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-semibold tabular-nums min-w-[2ch] text-center">{extraPages}</span>
                        <button
                          onClick={() => setExtraPages((n) => Math.min(20, n + 1))}
                          className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 text-zinc-300 flex items-center justify-center transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                      {fmt(EXTRA_PAGE_PRICE, lang)} {currency} / {t('estimate.addons.extraPages.unit')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggle add-ons */}
              <AddonRow
                icon={<CreditCard size={18} />}
                title={t('estimate.addons.stripe.title')}
                desc={t('estimate.addons.stripe.desc')}
                price={`${fmt(STRIPE_PRICE, lang)} ${currency}`}
                active={stripe}
                onToggle={() => setStripe((v) => !v)}
              />
              <AddonRow
                icon={<Smartphone size={18} />}
                title={t('estimate.addons.mobilepay.title')}
                desc={t('estimate.addons.mobilepay.desc')}
                price={t('estimate.contactPrice')}
                active={mobilepay}
                onToggle={() => setMobilepay((v) => !v)}
              />
              <AddonRow
                icon={<Wrench size={18} />}
                title={t('estimate.addons.care.title')}
                desc={t('estimate.addons.care.desc')}
                price={`${fmt(CARE_MONTHLY, lang)} ${currency} ${t('estimate.perMonth')}`}
                active={carePlan}
                onToggle={() => setCarePlan((v) => !v)}
              />
              <AddonRow
                icon={<Calendar size={18} />}
                title={t('estimate.addons.mokio.title')}
                desc={t('estimate.addons.mokio.desc')}
                price={t('estimate.included')}
                active={mokio}
                onToggle={() => setMokio((v) => !v)}
                external="https://www.mokio.io/"
              />
            </section>
          </div>

          {/* Summary */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/15 to-[#0f0f0f] p-6">
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-5">
                {t('estimate.summary.title')}
              </h2>

              <SummaryRow label={tierContent[tier].title} value={`${fmt(selectedTier.base, lang)} ${currency}`} />
              {extraPages > 0 && (
                <SummaryRow
                  label={`${t('estimate.addons.extraPages.title')} × ${extraPages}`}
                  value={`${fmt(extraPages * EXTRA_PAGE_PRICE, lang)} ${currency}`}
                />
              )}
              {stripe && (
                <SummaryRow label={t('estimate.addons.stripe.title')} value={`${fmt(STRIPE_PRICE, lang)} ${currency}`} />
              )}
              {mobilepay && (
                <SummaryRow label={t('estimate.addons.mobilepay.title')} value={t('estimate.contactPrice')} muted />
              )}
              {mokio && (
                <SummaryRow label={t('estimate.addons.mokio.title')} value={t('estimate.included')} muted />
              )}

              <div className="border-t border-white/10 mt-4 pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs tracking-widest uppercase text-zinc-400">
                    {t('estimate.summary.total')}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-white tracking-tight">
                      {fmt(subtotal, lang)}
                    </span>
                    <span className="text-sm text-zinc-400 ml-1">{currency}</span>
                  </div>
                </div>
                {monthly > 0 && (
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xs tracking-widest uppercase text-zinc-400">
                      {t('estimate.summary.monthly')}
                    </span>
                    <div className="text-right">
                      <span className="text-base font-semibold text-amber-300 tracking-tight">
                        +{fmt(monthly, lang)}
                      </span>
                      <span className="text-xs text-zinc-400 ml-1">{currency} {t('estimate.perMonth')}</span>
                    </div>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                  <span>{t('estimate.summary.delivery')}</span>
                  <span className="text-zinc-300 font-medium">{deliveryText}</span>
                </div>
              </div>

              <button
                onClick={goToContact}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-amber-900/40"
              >
                {t('estimate.cta')}
                <ArrowRight size={14} />
              </button>

              <p className="mt-4 text-[11px] text-zinc-500 leading-relaxed flex gap-2 items-start">
                <Info size={12} className="flex-shrink-0 mt-0.5 text-zinc-600" />
                <span>{t('estimate.disclaimer')}</span>
              </p>

              <div className="mt-4 pt-4 border-t border-white/5">
                <Link to="/pricing" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5">
                  {lang === 'da' ? 'Se fuld prisliste' : 'See full pricing page'}
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function AddonRow({ icon, title, desc, price, active, onToggle, external }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full rounded-2xl border p-5 mb-3 text-left transition-all duration-200 ${
        active
          ? 'border-amber-400 bg-amber-500/[0.06]'
          : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            active ? 'bg-amber-400 text-black' : 'bg-white/5 text-zinc-400'
          }`}
        >
          {active ? <Check size={18} /> : icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="text-white font-medium leading-tight">{title}</p>
              {external && (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  ↗
                </a>
              )}
            </div>
            <p className={`text-sm font-semibold tracking-tight ${active ? 'text-amber-300' : 'text-zinc-300'}`}>
              {price}
            </p>
          </div>
          <p className="text-zinc-500 text-sm mt-0.5">{desc}</p>
        </div>
      </div>
    </button>
  )
}

function SummaryRow({ label, value, muted }) {
  return (
    <div className="flex items-baseline justify-between text-sm mb-2">
      <span className="text-zinc-400 truncate pr-2">{label}</span>
      <span className={`font-medium tracking-tight flex-shrink-0 ${muted ? 'text-zinc-500' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}
