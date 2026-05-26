import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Youtube, Twitter, Send, CheckCircle2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const socials = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'hello@sahari.io',
    href: 'mailto:hello@sahari.io',
  },
  {
    icon: <Youtube size={18} />,
    label: 'YouTube',
    value: '@sahari',
    href: 'https://youtube.com/@sahari',
  },
  {
    icon: <Twitter size={18} />,
    label: 'Twitter / X',
    value: '@sahari',
    href: 'https://twitter.com/sahari',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission — replace with your real endpoint or Formspree
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center mb-14"
        >
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Let's build something
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Have a project in mind? Want to work together? Or just want to say hey?
            My inbox is open.
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
                <h3 className="text-white font-semibold text-xl">Message sent!</h3>
                <p className="text-zinc-400 text-sm">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }) }}
                  className="mt-2 text-violet-400 hover:text-violet-300 text-sm transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="gradient-border bg-[#0f0f0f] rounded-2xl p-8 space-y-5"
              >
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2" htmlFor="message">
                    What's on your mind?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or just say hi..."
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
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send size={15} />
                      Send message
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
            <p className="text-zinc-500 text-sm mb-5">Or find me here:</p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20 transition-all duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-violet-500/15 text-violet-400 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">{s.label}</p>
                  <p className="text-white text-sm font-medium">{s.value}</p>
                </div>
              </a>
            ))}

            <div className="mt-6 p-5 rounded-xl border border-violet-500/20 bg-violet-500/5">
              <p className="text-violet-300 text-sm font-medium mb-1">⚡ Quick response</p>
              <p className="text-zinc-500 text-sm">
                I typically reply within 24–48 hours. For urgent projects, DM me on Twitter.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
