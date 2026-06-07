import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const COLORS = {
  bg: '#0a0a0a',
  text: '#f5f0e8',
  textMuted: '#8a8478',
  accent: '#8b1a1a',
  grey: '#1c1c1c',
  border: '#2a2826',
}

const display = { fontFamily: '"Fraunces", serif' }
const body = { fontFamily: '"DM Sans", sans-serif' }

const artists = [
  { name: 'Mira Vex', style: 'Fine line · Botanical', instagram: '@miravex.ink' },
  { name: 'Adam Krohn', style: 'Blackwork · Ornamental', instagram: '@krohn.tattoo' },
  { name: 'Sasha Lund', style: 'Custom · Neo-traditional', instagram: '@sashalund.tat' },
]

const specialties = [
  {
    no: '01',
    title: 'Fine line',
    desc: 'Delicate strokes and minimalist motifs. Made with single needles for precision. Quiet, considered, legible thirty years from now.',
  },
  {
    no: '02',
    title: 'Blackwork',
    desc: 'Heavy black areas, ornamental shapes, and graphic symbolism. Inspired by woodblock prints, old typography, and religious iconography.',
  },
  {
    no: '03',
    title: 'Custom design',
    desc: 'Original pieces drawn from scratch with you. We meet for a consultation, sketches go back and forth, we build it together.',
  },
]

const works = [
  { src: '/blackstone/blackwork%20tattoo%20design1.jpg', title: 'Snake & dagger', artist: 'Adam', year: '2024' },
  { src: '/blackstone/blackwork%20tattoo%20design2.jpg', title: 'Botanical sleeve', artist: 'Mira', year: '2024' },
  { src: '/blackstone/blackwork%20tattoo%20design3.jpg', title: 'Ornamental hand', artist: 'Adam', year: '2024' },
  { src: '/blackstone/blackwork%20tattoo%20design4.jpg', title: 'Black moth', artist: 'Sasha', year: '2023' },
  { src: '/blackstone/blackwork%20tattoo%20design5.jpg', title: 'Fine line floral', artist: 'Mira', year: '2023' },
  { src: '/blackstone/blackwork%20tattoo%20design6.jpg', title: 'Sacred geometry', artist: 'Adam', year: '2023' },
]

const HERO_IMAGE = '/blackstone/tattoo%20close%20up%20black%20and%20white.jpg'
const STUDIO_IMAGE = '/blackstone/tattoo%20studio%20dark%20aesthetic.jpg'

const faqs = [
  {
    q: 'How does booking work?',
    a: 'Send us your idea, placement, and rough size. We respond within a couple of days and book a consultation when we have a slot that fits.',
  },
  {
    q: 'What does a tattoo cost?',
    a: 'Pricing depends on size, complexity, and the artist. We provide a quote during the consultation, before any sketches go on paper.',
  },
  {
    q: 'How long is the waitlist?',
    a: 'Waitlists vary by artist. We let you know what to expect after your first message, so you can plan around it.',
  },
  {
    q: 'Do you do walk-ins?',
    a: 'No. The studio runs by appointment only. Every piece starts with a conversation.',
  },
  {
    q: 'What about touch-ups?',
    a: 'A first touch-up within six months is included for any piece we make. Just write to your artist when you are ready.',
  },
  {
    q: 'Can I bring a reference image?',
    a: 'Yes. References help us understand what you are after. We will not copy another artist\'s work, but we use it as a starting point.',
  },
]

const aftercareSteps = [
  { day: 'Day 0–2', title: 'Keep the wrap on', body: 'Your artist sends you home with a fresh wrap. Follow the timing they give you for when to take it off.' },
  { day: 'Day 2–14', title: 'Wash and moisturise', body: 'Gentle soap, clean water, fragrance-free lotion. Twice a day. No soaking, no sun.' },
  { day: 'Day 14+', title: 'Settle in', body: 'The tattoo is healed on the surface but still settling underneath. Keep it out of direct sun and moisturise as needed.' },
]

function Faq({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full py-7 md:py-8 flex items-start justify-between gap-6 text-left group"
      >
        <span style={{ ...display, fontWeight: 400, letterSpacing: '-0.01em' }} className="text-xl md:text-2xl flex-1">
          {q}
        </span>
        <span className="mt-1 flex-shrink-0 transition-transform" style={{ color: COLORS.accent }}>
          {open ? <Minus size={22} strokeWidth={1.25} /> : <Plus size={22} strokeWidth={1.25} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 max-w-2xl text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BlackStone() {
  useEffect(() => {
    document.title = 'BLACK STONE — Custom tattoo studio · Copenhagen'
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = COLORS.bg
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  return (
    <div style={{ ...body, backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen overflow-x-hidden relative">
      {/* Film grain overlay — site-wide */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm" style={{ backgroundColor: 'rgba(10,10,10,0.6)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span style={display} className="text-base md:text-lg tracking-[0.25em] uppercase">Black Stone</span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.textMuted }}>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#studio" className="hover:text-white transition-colors">Studio</a>
            <a href="#artists" className="hover:text-white transition-colors">Artists</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#booking" className="hover:text-white transition-colors">Book</a>
          </nav>
          <a
            href="#booking"
            className="text-[10px] md:text-xs tracking-[0.25em] uppercase border px-3 py-2 transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            Consultation
          </a>
        </div>
      </header>

      {/* Hero with image overlay */}
      <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-12 md:pb-16 px-6 md:px-10 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-50"
            style={{ filter: 'grayscale(0.4) contrast(1.05)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${COLORS.bg} 0%, rgba(10,10,10,0.35) 35%, rgba(10,10,10,0.55) 65%, ${COLORS.bg} 100%)`,
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-sm tracking-[0.35em] uppercase mb-6 md:mb-8"
            style={{ color: COLORS.textMuted }}
          >
            Custom tattoo studio · Copenhagen · Est. 2017
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              ...display,
              fontWeight: 400,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              fontSize: 'clamp(4rem, 16vw, 14rem)',
            }}
          >
            BLACK<br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: COLORS.accent }}>stone</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
          >
            <p className="max-w-md text-sm md:text-lg leading-relaxed" style={{ color: COLORS.textMuted }}>
              Three artists. Fine line, blackwork, and custom. By
              appointment only — every piece starts with a conversation.
            </p>
            <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.textMuted }}>
              <span>↓</span>
              <span>Scroll</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-24 md:py-48 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-8 md:mb-10" style={{ color: COLORS.accent }}>
            ¶ Manifesto
          </p>
          <blockquote
            style={{ ...display, fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.02em' }}
            className="text-2xl md:text-5xl lg:text-6xl"
          >
            <span style={{ color: COLORS.accent, fontStyle: 'italic' }}>"</span>
            A tattoo isn't an accessory. It's a decision you carry
            for the rest of your life. Our job is to make sure it still
            makes sense <em style={{ color: COLORS.accent }}>thirty years</em> from now.
            <span style={{ color: COLORS.accent, fontStyle: 'italic' }}>"</span>
          </blockquote>
          <p className="mt-8 md:mt-10 text-xs md:text-sm tracking-[0.25em] uppercase" style={{ color: COLORS.textMuted }}>
            — The Black Stone studio
          </p>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6">
            <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-7xl leading-[0.95]">
              Three ways<br />we work.
            </h2>
            <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              We stay narrow on purpose. That way you get a piece that
              holds together — not a catalogue of effects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: COLORS.border }}>
            {specialties.map((s) => (
              <div key={s.no} className="p-7 md:p-10" style={{ backgroundColor: COLORS.bg }}>
                <div className="flex items-baseline gap-4 mb-5 md:mb-6">
                  <span style={{ ...display, color: COLORS.accent }} className="text-sm">{s.no}</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
                </div>
                <h3 style={{ ...display, fontWeight: 400, letterSpacing: '-0.02em' }} className="text-2xl md:text-4xl mb-4 md:mb-5">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio interior */}
      <section id="studio" className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-14">
            <div className="md:col-span-7">
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 md:mb-6" style={{ color: COLORS.accent }}>
                ¶ Inside
              </p>
              <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-7xl leading-[0.95]">
                The studio.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: COLORS.textMuted }}>
                A quiet room on Jægersborggade. Three chairs, good light,
                and a strict no-walk-ins policy. Come for the consultation,
                come back for the work.
              </p>
              <p className="text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.accent }}>
                Open Tue — Sat · By appointment
              </p>
            </div>
          </div>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[21/9] overflow-hidden"
            style={{ backgroundColor: COLORS.grey }}
          >
            <img src={STUDIO_IMAGE} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)`,
              }}
            />
          </motion.figure>
        </div>
      </section>

      {/* Artists */}
      <section id="artists" className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-6 md:mb-8" style={{ color: COLORS.accent }}>
            ¶ The collective
          </p>
          <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-7xl leading-[0.95] mb-12 md:mb-16">
            Three artists.<br />
            <em style={{ color: COLORS.accent, fontWeight: 300 }}>One room.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: COLORS.border }}>
            {artists.map((a) => (
              <div key={a.name} className="p-7 md:p-10" style={{ backgroundColor: COLORS.bg }}>
                <h3 style={{ ...display, fontWeight: 400, letterSpacing: '-0.02em' }} className="text-2xl md:text-3xl mb-2">
                  {a.name}
                </h3>
                <p className="text-sm tracking-wider mb-5 md:mb-6" style={{ color: COLORS.accent }}>
                  {a.style}
                </p>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>
                  {a.instagram}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section id="work" className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-7xl">
              Recent work
            </h2>
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.textMuted }}>
              2023 — 2024
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {works.map((w, i) => (
              <motion.figure
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden"
                style={{ backgroundColor: COLORS.grey }}
              >
                <img src={w.src} alt={w.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex items-baseline justify-between"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)' }}
                >
                  <div>
                    <p style={display} className="text-sm md:text-lg leading-tight">{w.title}</p>
                    <p className="text-[10px] md:text-xs mt-1" style={{ color: COLORS.textMuted }}>by {w.artist}</p>
                  </div>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: COLORS.textMuted }}>{w.year}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 md:mb-6" style={{ color: COLORS.accent }}>
                ¶ Common questions
              </p>
              <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-6xl leading-[0.95]">
                The things people<br />always ask.
              </h2>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${COLORS.border}` }}>
            {faqs.map((f) => (
              <Faq key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Aftercare */}
      <section className="py-20 md:py-32 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-4 md:mb-6" style={{ color: COLORS.accent }}>
                ¶ Aftercare
              </p>
              <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em' }} className="text-4xl md:text-6xl leading-[0.95]">
                Once you<br />walk out.
              </h2>
            </div>
            <p className="max-w-sm text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              The work we do lives on you. How you look after it the first few weeks decides how it looks for the rest of your life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: COLORS.border }}>
            {aftercareSteps.map((step) => (
              <div key={step.day} className="p-7 md:p-10" style={{ backgroundColor: COLORS.bg }}>
                <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: COLORS.accent }}>
                  {step.day}
                </p>
                <h3 style={{ ...display, fontWeight: 400, letterSpacing: '-0.02em' }} className="text-2xl md:text-3xl mb-4">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="py-24 md:py-48 px-6 md:px-10 relative" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase mb-8 md:mb-10" style={{ color: COLORS.accent }}>
            ¶ Book a consultation
          </p>
          <h2
            style={{ ...display, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
            className="mb-8 md:mb-10"
          >
            Ready for
            <br />
            <em style={{ color: COLORS.accent, fontWeight: 300 }}>new ink?</em>
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg leading-relaxed mb-10 md:mb-12" style={{ color: COLORS.textMuted }}>
            Send us an email with the motif, placement, and rough size.
            Consultation is free, no commitment. You'll hear from us within
            a couple of days.
          </p>
          <a
            href="mailto:hello@blackstone.tattoo"
            className="inline-block text-xs md:text-base tracking-[0.3em] uppercase px-8 py-4 md:px-10 md:py-5 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: COLORS.accent, color: COLORS.text }}
          >
            hello@blackstone.tattoo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p style={display} className="text-sm md:text-base tracking-[0.25em] uppercase mb-2">BLACK STONE TATTOO</p>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              Jægersborggade 47 · 2200 Copenhagen N · By appointment only
            </p>
          </div>
          <div className="flex items-center gap-5 md:gap-6 text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.textMuted }}>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="mailto:hello@blackstone.tattoo" className="hover:text-white transition-colors">Mail</a>
            <span>© 2024</span>
          </div>
        </div>
        <div className="mt-10 md:mt-12 pt-6 max-w-[1400px] mx-auto" style={{ borderTop: `1px solid ${COLORS.border}` }}>
          <p className="text-[10px] md:text-xs text-center" style={{ color: COLORS.textMuted }}>
            Concept site designed & built by{' '}
            <a href="https://sahari.io" className="underline hover:text-white transition-colors">Sahari</a>
            {' '}· not a real business
          </p>
        </div>
      </footer>
    </div>
  )
}
