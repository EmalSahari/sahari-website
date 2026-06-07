import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = {
  bg: '#f4f1ea',
  text: '#1d201d',
  textMuted: '#6b6d68',
  accent: '#7a8870',
  accentDeep: '#525e4a',
  border: '#d8d3c8',
  card: '#ebe6dc',
  open: '#5a8055',
  closed: '#8b3030',
}

const display = { fontFamily: '"Bricolage Grotesque", sans-serif' }
const body = { fontFamily: '"Manrope", sans-serif' }

const HERO_IMAGE = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=2000&q=85'
const INTERIOR_IMAGE = 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=85'

const services = [
  { name: 'Womens cut', price: '650', duration: '60 min' },
  { name: 'Mens cut', price: '450', duration: '40 min' },
  { name: 'Kids cut (under 12)', price: '300', duration: '30 min' },
  { name: 'Colour, full', price: 'from 1,200', duration: '120 min' },
  { name: 'Highlights / balayage', price: 'from 1,800', duration: '180 min' },
  { name: 'Toning / glaze', price: '500', duration: '45 min' },
]

const stylists = [
  {
    name: 'Astrid Holm',
    role: 'Founder · Colour',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=85',
    bio: 'Twelve years in. Trained in Berlin and Tokyo. Lives for cool blondes and sharp bobs.',
  },
  {
    name: 'Jonas Vedel',
    role: 'Senior stylist',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=85',
    bio: 'Cuts for the bone structure first. Won the 2022 Danish barber award. Hates dry shampoo.',
  },
  {
    name: 'Maja Brandt',
    role: 'Stylist · Curls',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&q=85',
    bio: 'Specialist in textured, curly, and natural hair. Trained at Curl Lab London.',
  },
]

const gallery = [
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=85',
  'https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=900&q=85',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=900&q=85',
  'https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=900&q=85',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=900&q=85',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=85',
]

function useOpenStatus() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  // Open Tue–Sat, 9:00 – 18:00. Closed Sun + Mon.
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const isClosedDay = day === 0 || day === 1
  const inHours = hour >= 9 && hour < 18
  const isOpen = !isClosedDay && inHours
  return {
    isOpen,
    label: isClosedDay ? 'Closed today' : (isOpen ? 'Open until 18:00' : 'Opens at 9:00'),
  }
}

function HeroTitle() {
  const letters = 'FOLD'.split('')
  return (
    <h1
      style={{
        ...display,
        fontWeight: 700,
        lineHeight: 0.82,
        letterSpacing: '-0.05em',
        fontSize: 'clamp(6rem, 26vw, 26rem)',
        perspective: '1000px',
      }}
      className="flex"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ rotateX: -90, opacity: 0, y: 40 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3 + i * 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
          }}
        >
          {l}
        </motion.span>
      ))}
    </h1>
  )
}

export default function FoldHair() {
  const { isOpen, label } = useOpenStatus()

  useEffect(() => {
    document.title = 'FOLD — Hair studio · Aarhus'
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = COLORS.bg
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  return (
    <div style={{ ...body, backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen overflow-x-hidden">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur" style={{ backgroundColor: 'rgba(244,241,234,0.85)', borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span style={{ ...display, fontWeight: 700, letterSpacing: '-0.02em' }} className="text-lg md:text-xl">FOLD</span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase" style={{ color: COLORS.textMuted }}>
            <a href="#services" className="hover:text-[color:var(--c)]" style={{ '--c': COLORS.accent }}>Services</a>
            <a href="#team" className="hover:opacity-100">Team</a>
            <a href="#gallery" className="hover:opacity-100">Gallery</a>
            <a href="#visit" className="hover:opacity-100">Visit</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs" style={{ color: COLORS.textMuted }}>
              <motion.span
                animate={{ opacity: isOpen ? [1, 0.4, 1] : 1 }}
                transition={{ duration: 2.4, repeat: isOpen ? Infinity : 0 }}
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: isOpen ? COLORS.open : COLORS.closed }}
              />
              <span>{label}</span>
            </div>
            <a
              href="mailto:hello@foldhair.dk"
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase px-3 py-2 transition-all hover:scale-[1.03]"
              style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
            >
              Book now
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end pt-32 pb-12 md:pb-16 px-6 md:px-10 overflow-hidden">
        {/* Background image — corner */}
        <div className="absolute right-0 top-14 bottom-0 w-full md:w-1/2 z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover opacity-50 md:opacity-90"
            style={{ filter: 'grayscale(0.15) brightness(1.05)' }}
            loading="eager"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${COLORS.bg} 0%, transparent 35%), linear-gradient(to bottom, transparent 60%, ${COLORS.bg} 100%)`,
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-sm tracking-[0.3em] uppercase mb-6 md:mb-8"
            style={{ color: COLORS.textMuted }}
          >
            Hair studio · Aarhus · Est. 2018
          </motion.p>

          <HeroTitle />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
          >
            <p className="max-w-md text-base md:text-lg leading-relaxed" style={{ color: COLORS.textMuted }}>
              A small unisex studio above a bookshop. Cuts, colour, curls.
              Three stylists, four chairs, no rush.
            </p>
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase" style={{ color: COLORS.textMuted }}>
              <span>↓</span>
              <span>Take a seat</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-20 items-end">
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
                ¶ Services
              </p>
              <h2 style={{ ...display, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-5xl md:text-7xl">
                What we do,<br />and what it costs.
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              Prices from. The actual quote depends on your hair length, density,
              and what we end up doing once you sit down. We say up front.
            </p>
          </div>

          <ul style={{ borderTop: `1px solid ${COLORS.border}` }}>
            {services.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_auto_auto_auto] items-baseline gap-6 md:gap-10 py-5 md:py-7"
                style={{ borderBottom: `1px solid ${COLORS.border}` }}
              >
                <span style={{ ...display, fontWeight: 500, letterSpacing: '-0.01em' }} className="text-2xl md:text-3xl">
                  {s.name}
                </span>
                <span className="hidden md:inline text-xs tracking-[0.2em] uppercase" style={{ color: COLORS.textMuted }}>
                  {s.duration}
                </span>
                <span className="text-xs tracking-[0.15em] uppercase md:hidden" style={{ color: COLORS.textMuted }}>
                  {s.duration}
                </span>
                <span style={{ ...display, fontWeight: 500 }} className="text-xl md:text-2xl tabular-nums">
                  {s.price}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase hidden md:inline" style={{ color: COLORS.textMuted }}>
                  DKK
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-8 text-xs md:text-sm" style={{ color: COLORS.textMuted }}>
            Cancellation: 24 hours notice. Otherwise we charge 50% of the booking.
          </p>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
              ¶ The chairs
            </p>
            <h2 style={{ ...display, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-5xl md:text-7xl">
              Meet the team.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {stylists.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-5" style={{ backgroundColor: COLORS.border }}>
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'grayscale(0.2)' }}
                  />
                </div>
                <h3 style={{ ...display, fontWeight: 500, letterSpacing: '-0.02em' }} className="text-2xl md:text-3xl mb-1">
                  {s.name}
                </h3>
                <p className="text-sm tracking-[0.15em] uppercase mb-4" style={{ color: COLORS.accent }}>
                  {s.role}
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {s.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
                ¶ Recent work
              </p>
              <h2 style={{ ...display, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-5xl md:text-7xl">
                Heads we've cut.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {gallery.map((src, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group relative aspect-square overflow-hidden"
                style={{ backgroundColor: COLORS.border }}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ color: COLORS.accent }}>
            ¶ How we work
          </p>
          <h2 style={{ ...display, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-4xl md:text-6xl mb-12">
            Cut once,<br />
            <span style={{ color: COLORS.accent }}>fold the rest.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-base md:text-lg leading-relaxed" style={{ color: COLORS.textMuted }}>
            <div className="space-y-5">
              <p>
                Every visit starts with a fifteen-minute consultation. We look at
                your hair, you tell us what you want, and we tell you what's
                actually achievable in the chair.
              </p>
              <p>
                No upselling. No surprise products at the till. The price you
                see is the price you pay.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                We're a small studio on purpose. Three stylists, four chairs,
                two hands each. That means you'll see the same person next time
                if you want to.
              </p>
              <p>
                Cuts last us six to eight weeks. Colour lasts longer. Curls
                live their own life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
                ¶ Find us
              </p>
              <h2 style={{ ...display, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.9 }} className="text-5xl md:text-7xl mb-8">
                Come<br />
                <span style={{ color: COLORS.accent }}>in.</span>
              </h2>
              <a
                href="mailto:hello@foldhair.dk"
                className="inline-block text-sm md:text-base tracking-[0.25em] uppercase px-8 py-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
              >
                Book now
              </a>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Address</p>
                <p style={{ ...display, fontWeight: 500 }} className="text-xl md:text-2xl leading-tight">
                  Klostergade 28, 1. sal<br />
                  8000 Aarhus C
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Hours</p>
                <ul className="space-y-1 text-sm md:text-base" style={{ color: COLORS.text }}>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Tue — Fri</span>
                    <span>9 — 18</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Sat</span>
                    <span>9 — 16</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Sun — Mon</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Email</p>
                <a
                  href="mailto:hello@foldhair.dk"
                  style={{ ...display, fontWeight: 500 }}
                  className="text-xl md:text-2xl hover:underline"
                >
                  hello@foldhair.dk
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Instagram</p>
                <a
                  href="#"
                  style={{ ...display, fontWeight: 500 }}
                  className="text-xl md:text-2xl hover:underline"
                >
                  @fold.hair
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p style={{ ...display, fontWeight: 700, letterSpacing: '-0.02em' }} className="text-lg">FOLD</p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Concept site designed & built by{' '}
            <a href="https://sahari.io" className="underline hover:text-[color:var(--c)]" style={{ '--c': COLORS.accent }}>Sahari</a>
            {' '}· not a real salon
          </p>
        </div>
      </footer>
    </div>
  )
}
