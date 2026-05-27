import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Instagram, Send, CheckCircle2 } from 'lucide-react'
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

export default function Contact() {
  const t = useT()
  const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('https://formspree.io/f/xlgvokpj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const socials = [
    { icon: <Mail size={18} />, label: t('contact.socials.email'), value: 'contact@sahari.io', href: 'mailto:contact@sahari.io' },
    { icon: <Instagram size={18} />, label: t('contact.socials.instagram'), value: '@emal.sahari', href: 'https://instagram.com/emal.sahari' },
  ]

  return (
    <div className="pt-28 pb-20">
      <Seo title="Contact" description="Have a project in mind? Get in touch. I typically reply within 24 hours." />
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-14"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">{t('contact.eyebrow')}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {t('contact.heading')}
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="gradient-border bg-[#0f0f0f] rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                <CheckCircle2 size={48} className="text-violet-400" />
                <h3 className="text-white font-semibold text-xl">{t('contact.form.success.title')}</h3>
                <p className="text-zinc-400 text-sm">
                  {t('contact.form.success.subtitle')}
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-2 text-violet-400 hover:text-violet-300 text-sm transition-colors"
                >
                  {t('contact.form.success.again')}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="gradient-border bg-[#0f0f0f] rounded-2xl p-8 space-y-5"
              >
                {/* Honeypot — hidden from real users, bots fill it and get rejected */}
                <input
                  type="text"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="name">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="email">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="message">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/40"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      {t('contact.form.sending')}
                    </span>
                  ) : (
                    <>
                      <Send size={15} />
                      {t('contact.form.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="md:col-span-2 space-y-4"
          >
            <p className="text-zinc-500 text-sm mb-5">{t('contact.socials.heading')}</p>
            {socials.map((s) => (
              <SpotlightCard key={s.value} className="bg-white/5">
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">{s.label}</p>
                    <p className="text-white text-sm font-medium">{s.value}</p>
                  </div>
                </a>
              </SpotlightCard>
            ))}

            <div className="mt-6 p-5 rounded-xl border border-violet-500/20 bg-violet-500/5">
              <p className="text-violet-300 text-sm font-medium mb-1">{t('contact.quick.heading')}</p>
              <p className="text-zinc-500 text-sm">
                {t('contact.quick.subtitle')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
