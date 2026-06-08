import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles, Check, ArrowRight, Minus, Plus, CreditCard,
  Smartphone, Wrench, Calendar, FileText, Info, Search, Globe,
  Image as ImageIcon, Video, Map, Upload, User, LayoutDashboard,
  Mail, MessageCircle, Bot, Zap, Filter, Smartphone as PhoneIcon,
} from 'lucide-react'
import { useT } from '../../i18n/LanguageContext'
import Seo from '../../components/Seo'

const TIERS = [
  {
    slug: 'single',
    base: 4995,
    baseDays: 4,
    includedPages: 1,
  },
  {
    slug: 'standard',
    base: 9995,
    baseDays: 10,
    includedPages: 5,
    popular: true,
  },
  {
    slug: 'premium',
    base: 19995,
    baseDays: 20,
    includedPages: 10,
  },
]

const EXTRA_PAGE_PRICE = 1000
const EXTRA_PAGE_DAYS = 1
const RUSH_PRICE_MULTIPLIER = 1.3
const RUSH_TIME_MULTIPLIER = 0.5
const MIN_RUSH_DAYS = 3
const CARE_MONTHLY = 495

const GROUPS = {
  content: { en: 'Content & structure', da: 'Indhold & struktur' },
  users: { en: 'Users & accounts', da: 'Brugere & konti' },
  commerce: { en: 'Commerce & booking', da: 'Handel & booking' },
  extras: { en: 'Extras', da: 'Ekstra' },
}

const FEATURES = [
  // Content
  {
    id: 'blog', group: 'content', icon: FileText, price: 2500, days: 2,
    title: { en: 'Blog or content section', da: 'Blog eller indholdssektion' },
    desc: { en: 'Listing page, post pages, basic editor flow.', da: 'Oversigt, indlæg-sider og simpelt editor-flow.' },
  },
  {
    id: 'search', group: 'content', icon: Search, price: 1500, days: 1,
    title: { en: 'On-site search', da: 'Søgning på siden' },
    desc: { en: 'Search across pages, posts or products.', da: 'Søg på tværs af sider, indlæg eller produkter.' },
  },
  {
    id: 'multilingual', group: 'content', icon: Globe, price: 1500, days: 1,
    title: { en: 'Multilingual', da: 'Flersproget' },
    desc: { en: 'Add a second language with proper i18n setup.', da: 'Tilføj et andet sprog med ordentlig i18n.' },
  },
  {
    id: 'galleries', group: 'content', icon: ImageIcon, price: 1000, days: 1,
    title: { en: 'Image galleries', da: 'Billed-gallerier' },
    desc: { en: 'Lightbox or grid galleries with image optimization.', da: 'Lightbox eller grid-gallerier med billed-optimering.' },
  },
  {
    id: 'video', group: 'content', icon: Video, price: 500, days: 1,
    title: { en: 'Video integration', da: 'Video-integration' },
    desc: { en: 'YouTube, Vimeo or hosted video with custom player.', da: 'YouTube, Vimeo eller hosted video med custom player.' },
  },
  {
    id: 'uploads', group: 'content', icon: Upload, price: 2000, days: 2,
    title: { en: 'File uploads', da: 'Fil-uploads' },
    desc: { en: 'Visitors upload files. Storage, validation, security.', da: 'Besøgende uploader filer. Storage, validering, sikkerhed.' },
  },

  // Users
  {
    id: 'auth', group: 'users', icon: User, price: 3500, days: 3,
    title: { en: 'User accounts and login', da: 'Brugerkonti og login' },
    desc: { en: 'Sign up, sign in, password reset, sessions.', da: 'Opret bruger, login, password-reset, sessions.' },
  },
  {
    id: 'cms', group: 'users', icon: LayoutDashboard, price: 5000, days: 4,
    title: { en: 'Custom admin or CMS', da: 'Skræddersyet admin eller CMS' },
    desc: { en: 'You edit content yourself without me in the loop.', da: 'Du redigerer indhold selv uden mig som mellemmand.' },
  },
  {
    id: 'newsletter', group: 'users', icon: Mail, price: 500, days: 1,
    title: { en: 'Newsletter signup', da: 'Nyhedsbrev-tilmelding' },
    desc: { en: 'Connected to Mailchimp, Brevo or similar.', da: 'Forbundet til Mailchimp, Brevo eller lignende.' },
  },
  {
    id: 'emailauto', group: 'users', icon: MessageCircle, price: 1500, days: 2,
    title: { en: 'Email automation', da: 'Email-automation' },
    desc: { en: 'Triggered emails on signup, purchase, abandon, etc.', da: 'Trigger-mails ved tilmelding, køb, afbrudt køb osv.' },
  },

  // Commerce
  {
    id: 'stripe', group: 'commerce', icon: CreditCard, price: 2500, days: 2,
    title: { en: 'Stripe payments', da: 'Stripe-betalinger' },
    desc: { en: 'Cards, Apple Pay, Google Pay. You need a Stripe account.', da: 'Kort, Apple Pay, Google Pay. Du skal have en Stripe-konto.' },
  },
  {
    id: 'mobilepay', group: 'commerce', icon: Smartphone, price: 0, quoted: true, days: 3,
    title: { en: 'MobilePay', da: 'MobilePay' },
    desc: { en: 'Quoted per project. Separate approval process.', da: 'Pris per projekt. Separat godkendelses-proces.' },
  },
  {
    id: 'mokio', group: 'commerce', icon: Calendar, price: 0, included: true, days: 1,
    title: { en: 'Booking via Mokio', da: 'Booking via Mokio' },
    desc: { en: 'Free to set up with an active Mokio subscription.', da: 'Gratis at sætte op med et aktivt Mokio-abonnement.' },
    external: 'https://www.mokio.io/',
  },
  {
    id: 'filtering', group: 'commerce', icon: Filter, price: 2000, days: 2,
    title: { en: 'Catalog filtering and sorting', da: 'Katalog-filtrering og sortering' },
    desc: { en: 'For shops or directories with many items.', da: 'Til shops eller kataloger med mange items.' },
  },

  // Extras
  {
    id: 'maps', group: 'extras', icon: Map, price: 500, days: 1,
    title: { en: 'Maps integration', da: 'Kort-integration' },
    desc: { en: 'Embedded map with custom markers.', da: 'Indlejret kort med custom markører.' },
  },
  {
    id: 'chatbot', group: 'extras', icon: Bot, price: 5000, days: 4,
    title: { en: 'AI chatbot', da: 'AI-chatbot' },
    desc: { en: 'Trained on your content. OpenAI or Anthropic backend.', da: 'Trænet på dit indhold. OpenAI eller Anthropic-backend.' },
  },
  {
    id: 'pwa', group: 'extras', icon: PhoneIcon, price: 2000, days: 1,
    title: { en: 'PWA and offline', da: 'PWA og offline' },
    desc: { en: 'Install to home screen, basic offline support.', da: 'Installer til hjemmeskærm, basal offline-support.' },
  },
]

function fmt(amount, lang) {
  return new Intl.NumberFormat(lang === 'da' ? 'da-DK' : 'en-US').format(Math.round(amount))
}

function formatDelivery(days, lang) {
  if (days <= 0) return ''
  if (days <= 9) {
    return `${days} ${lang === 'da' ? 'dage' : 'days'}`
  }
  const weeksMin = Math.floor(days / 7)
  const weeksMax = Math.ceil(days / 5)
  if (weeksMin === weeksMax) return `${weeksMin} ${lang === 'da' ? 'uger' : 'weeks'}`
  return `${weeksMin} - ${weeksMax} ${lang === 'da' ? 'uger' : 'weeks'}`
}

export default function QuoteEstimate() {
  const t = useT()
  const lang = t('nav.home') === 'Hjem' ? 'da' : 'en'
  const currency = t('pricing.currency')
  const navigate = useNavigate()

  const [tier, setTier] = useState('standard')
  const [extraPages, setExtraPages] = useState(0)
  const [features, setFeatures] = useState(() => new Set())
  const [carePlan, setCarePlan] = useState(false)
  const [rush, setRush] = useState(false)

  useEffect(() => {
    document.title = `${t('estimate.heading')} | Sahari`
  }, [t])

  const selectedTier = TIERS.find((x) => x.slug === tier)

  const tierContent = {
    single: { title: t('pricing.single.name'), tagline: t('pricing.single.tagline') },
    standard: { title: t('pricing.standard.name'), tagline: t('pricing.standard.tagline') },
    premium: { title: t('pricing.premium.name'), tagline: t('pricing.premium.tagline') },
  }

  const toggleFeature = (id) => {
    setFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const { featuresCost, featuresDays, selectedFeatures } = useMemo(() => {
    const list = FEATURES.filter((f) => features.has(f.id))
    return {
      selectedFeatures: list,
      featuresCost: list.reduce((s, f) => s + (f.price || 0), 0),
      featuresDays: list.reduce((s, f) => s + (f.days || 0), 0),
    }
  }, [features])

  const rawSubtotal = (selectedTier?.base || 0) + extraPages * EXTRA_PAGE_PRICE + featuresCost
  const subtotal = rush ? Math.round(rawSubtotal * RUSH_PRICE_MULTIPLIER) : rawSubtotal
  const rushSurcharge = subtotal - rawSubtotal

  const rawDays = (selectedTier?.baseDays || 0) + extraPages * EXTRA_PAGE_DAYS + featuresDays
  const finalDays = rush ? Math.max(MIN_RUSH_DAYS, Math.round(rawDays * RUSH_TIME_MULTIPLIER)) : rawDays

  const monthly = carePlan ? CARE_MONTHLY : 0

  const groupedFeatures = useMemo(() => {
    const out = {}
    for (const key of Object.keys(GROUPS)) out[key] = []
    for (const f of FEATURES) out[f.group].push(f)
    return out
  }, [])

  const goToContact = () => {
    const lines = []
    lines.push(lang === 'da' ? 'Mit estimat fra estimatoren:' : 'My estimate from the calculator:')
    lines.push('')
    lines.push(`${tierContent[tier].title}: ${fmt(selectedTier.base, lang)} ${currency}`)
    if (extraPages > 0) {
      lines.push(`+${extraPages} ${lang === 'da' ? 'ekstra sider' : 'extra pages'}: ${fmt(extraPages * EXTRA_PAGE_PRICE, lang)} ${currency}`)
    }
    for (const f of selectedFeatures) {
      let valueLabel
      if (f.quoted) valueLabel = lang === 'da' ? 'Pris aftales' : 'Quoted'
      else if (f.included) valueLabel = lang === 'da' ? 'Inkluderet' : 'Included'
      else valueLabel = `${fmt(f.price, lang)} ${currency}`
      lines.push(`${f.title[lang]}: ${valueLabel}`)
    }
    if (rush) {
      lines.push(`${lang === 'da' ? 'Rush-levering' : 'Rush delivery'} (+30%): ${fmt(rushSurcharge, lang)} ${currency}`)
    }
    lines.push('')
    lines.push(`${t('estimate.summary.total')}: ${fmt(subtotal, lang)} ${currency}`)
    if (carePlan) lines.push(`${lang === 'da' ? 'Care-aftale' : 'Care plan'}: ${fmt(CARE_MONTHLY, lang)} ${currency} ${t('estimate.perMonth')}`)
    lines.push(`${t('estimate.summary.delivery')}: ${formatDelivery(finalDays, lang)}`)
    lines.push('')
    lines.push(lang === 'da' ? '(Skriv her hvad projektet handler om)' : '(Tell me about the project)')

    const message = encodeURIComponent(lines.join('\n'))
    navigate(`/contact?tier=${tier}&message=${message}`)
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <Seo title={t('estimate.heading')} description="Pick a tier, add features and get an instant rough estimate for your Sahari project." />

      <div className="max-w-6xl mx-auto px-6">
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
                      <p className="text-white font-medium text-sm leading-snug mb-3 min-h-[3.5rem]">
                        {content.tagline}
                      </p>
                      <p className="text-xs text-zinc-500 mb-3">
                        {lang === 'da' ? 'Inkluderer' : 'Includes'} {tx.includedPages} {lang === 'da' ? (tx.includedPages === 1 ? 'side' : 'sider') : (tx.includedPages === 1 ? 'page' : 'pages')}
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

            {/* Extra pages */}
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                {lang === 'da' ? 'Sider' : 'Pages'}
              </h2>
              <div className="rounded-2xl border border-white/10 bg-[#0f0f0f] p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 text-zinc-400 flex items-center justify-center flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-white font-medium leading-tight">
                          {lang === 'da' ? 'Sider udover dit niveau' : 'Pages beyond your tier'}
                        </p>
                        <p className="text-zinc-500 text-sm mt-0.5">
                          {lang === 'da' ? `${selectedTier.includedPages} sider er allerede inkluderet.` : `${selectedTier.includedPages} pages already included.`}
                        </p>
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
                          onClick={() => setExtraPages((n) => Math.min(50, n + 1))}
                          className="w-8 h-8 rounded-lg border border-white/10 hover:border-white/30 text-zinc-300 flex items-center justify-center transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2">
                      {fmt(EXTRA_PAGE_PRICE, lang)} {currency} / {lang === 'da' ? 'side' : 'page'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Feature groups */}
            {Object.entries(GROUPS).map(([key, label]) => (
              <section key={key}>
                <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                  {label[lang]}
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {groupedFeatures[key].map((f) => (
                    <FeatureTile
                      key={f.id}
                      feature={f}
                      lang={lang}
                      currency={currency}
                      active={features.has(f.id)}
                      onToggle={() => toggleFeature(f.id)}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Delivery and ongoing */}
            <section>
              <h2 className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-semibold mb-4">
                {lang === 'da' ? 'Levering & support' : 'Delivery and support'}
              </h2>
              <button
                onClick={() => setRush((v) => !v)}
                className={`w-full rounded-2xl border p-5 mb-3 text-left transition-all duration-200 ${
                  rush ? 'border-amber-400 bg-amber-500/[0.06]' : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${rush ? 'bg-amber-400 text-black' : 'bg-white/5 text-zinc-400'}`}>
                    {rush ? <Check size={18} /> : <Zap size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p className="text-white font-medium leading-tight">
                        {lang === 'da' ? 'Rush-levering' : 'Rush delivery'}
                      </p>
                      <p className={`text-sm font-semibold tracking-tight ${rush ? 'text-amber-300' : 'text-zinc-300'}`}>
                        +30%
                      </p>
                    </div>
                    <p className="text-zinc-500 text-sm mt-0.5">
                      {lang === 'da' ? 'Halvér leveringstiden, jeg prioriterer dit projekt.' : 'Cut delivery time in half, your project goes to the top.'}
                    </p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setCarePlan((v) => !v)}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 ${
                  carePlan ? 'border-amber-400 bg-amber-500/[0.06]' : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${carePlan ? 'bg-amber-400 text-black' : 'bg-white/5 text-zinc-400'}`}>
                    {carePlan ? <Check size={18} /> : <Wrench size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p className="text-white font-medium leading-tight">
                        {t('estimate.addons.care.title')}
                      </p>
                      <p className={`text-sm font-semibold tracking-tight ${carePlan ? 'text-amber-300' : 'text-zinc-300'}`}>
                        {fmt(CARE_MONTHLY, lang)} {currency} {t('estimate.perMonth')}
                      </p>
                    </div>
                    <p className="text-zinc-500 text-sm mt-0.5">
                      {t('estimate.addons.care.desc')}
                    </p>
                  </div>
                </div>
              </button>
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
                  label={`+${extraPages} ${lang === 'da' ? (extraPages === 1 ? 'side' : 'sider') : (extraPages === 1 ? 'page' : 'pages')}`}
                  value={`${fmt(extraPages * EXTRA_PAGE_PRICE, lang)} ${currency}`}
                />
              )}
              {selectedFeatures.map((f) => (
                <SummaryRow
                  key={f.id}
                  label={f.title[lang]}
                  value={
                    f.quoted ? (lang === 'da' ? 'Pris aftales' : 'Quoted')
                      : f.included ? (lang === 'da' ? 'Inkluderet' : 'Included')
                      : `${fmt(f.price, lang)} ${currency}`
                  }
                  muted={f.quoted || f.included}
                />
              ))}
              {rush && (
                <SummaryRow
                  label={lang === 'da' ? 'Rush (+30%)' : 'Rush (+30%)'}
                  value={`+${fmt(rushSurcharge, lang)} ${currency}`}
                />
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
                  <span className="text-zinc-300 font-medium">{formatDelivery(finalDays, lang)}</span>
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

function FeatureTile({ feature, lang, currency, active, onToggle }) {
  const Icon = feature.icon
  const priceLabel = feature.quoted
    ? (lang === 'da' ? 'Pris aftales' : 'Quoted')
    : feature.included
    ? (lang === 'da' ? 'Inkluderet' : 'Included')
    : `${new Intl.NumberFormat(lang === 'da' ? 'da-DK' : 'en-US').format(feature.price)} ${currency}`

  return (
    <button
      onClick={onToggle}
      className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
        active ? 'border-amber-400 bg-amber-500/[0.06]' : 'border-white/10 bg-[#0f0f0f] hover:border-white/25'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
            active ? 'bg-amber-400 text-black' : 'bg-white/5 text-zinc-400'
          }`}
        >
          {active ? <Check size={16} /> : <Icon size={16} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-medium text-sm leading-tight">
                {feature.title[lang]}
              </p>
              {feature.external && (
                <a
                  href={feature.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  ↗
                </a>
              )}
            </div>
            <p className={`text-xs font-semibold tracking-tight whitespace-nowrap ${active ? 'text-amber-300' : 'text-zinc-400'}`}>
              {priceLabel}
            </p>
          </div>
          <p className="text-zinc-500 text-xs mt-1 leading-snug">{feature.desc[lang]}</p>
        </div>
      </div>
    </button>
  )
}

function SummaryRow({ label, value, muted }) {
  return (
    <div className="flex items-baseline justify-between text-sm mb-2 gap-2">
      <span className="text-zinc-400 truncate">{label}</span>
      <span className={`font-medium tracking-tight flex-shrink-0 text-right ${muted ? 'text-zinc-500' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}
