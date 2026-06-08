import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = {
  bg: '#ede4d0',
  text: '#0a0a0a',
  textMuted: '#6b614e',
  accent: '#b46a1f',
  accentDeep: '#7d4612',
  border: '#c8b896',
  card: '#e0d4b8',
  open: '#3d6b3b',
  closed: '#8b3030',
}

const display = { fontFamily: '"Big Shoulders Display", sans-serif' }
const body = { fontFamily: '"Manrope", sans-serif' }

const HERO_IMAGE = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=2000&q=85'

const services = [
  { name: 'Skin fade', desc: 'Tightest fade. Razor-cleaned around the ears and neck.', price: '450' },
  { name: 'Mid / low fade', desc: 'Classic taper, blended into the length on top.', price: '400' },
  { name: 'Scissor cut', desc: 'No clippers. Texture, length, finish.', price: '450' },
  { name: 'Beard trim', desc: 'Shape, line up, hot towel finish.', price: '250' },
  { name: 'Cut + beard combo', desc: 'Save 50 kr when you book them together.', price: '600' },
  { name: 'Father + son (under 12)', desc: 'Two cuts back-to-back. Same chair.', price: '650' },
]

const gallery = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=85',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=85',
  'https://images.unsplash.com/photo-1635273051936-90b9efeb45c0?w=900&q=85',
  'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=900&q=85',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=85',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=900&q=85',
]

const steps = [
  { no: '01', title: 'Book a slot', body: 'Drop me a message with what you want done. I reply same day with a time.' },
  { no: '02', title: 'Show up', body: '15 minutes early. I work alone, so we start on time. Coffee is on the counter.' },
  { no: '03', title: 'Sit back', body: '30 to 45 minutes depending on the cut. Hot towel, line up, brush off. Done.' },
]

function useOpenStatus() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  // Open Wed to Sat, 10:00 to 18:00. Closed Sun, Mon, Tue.
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  const isClosedDay = day < 3 // Sun(0), Mon(1), Tue(2)
  const inHours = hour >= 10 && hour < 18
  const isOpen = !isClosedDay && inHours
  const slotsLeftToday = isOpen ? Math.max(0, 6 - (now.getHours() - 10)) : 0
  return {
    isOpen,
    label: isClosedDay
      ? 'Back Wednesday'
      : (isOpen ? `Open · ${slotsLeftToday} slots left today` : 'Opens at 10:00'),
  }
}

function HeroTitle() {
  const letters = 'MØRK'.split('')
  return (
    <h1
      style={{
        ...display,
        fontWeight: 900,
        lineHeight: 0.78,
        letterSpacing: '-0.04em',
        fontSize: 'clamp(6rem, 26vw, 26rem)',
      }}
      className="flex"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.25 + i * 0.1,
            ease: [0.34, 1.56, 0.64, 1], // overshoot
          }}
          className="inline-block"
        >
          {l}
        </motion.span>
      ))}
    </h1>
  )
}

// Horizontal "clipper buzz" line that draws across when in view
function ClipperLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      className="h-px w-24 md:w-32 origin-left mb-6"
      style={{ backgroundColor: COLORS.accent }}
    />
  )
}

export default function MorkBarber() {
  const { isOpen, label } = useOpenStatus()

  useEffect(() => {
    document.title = 'MØRK · Barber by Rasmus Mørk · Aarhus'
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = COLORS.bg
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  return (
    <div style={{ ...body, backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen overflow-x-hidden">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur" style={{ backgroundColor: 'rgba(237,228,208,0.9)', borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span style={{ ...display, fontWeight: 800, letterSpacing: '0.02em' }} className="text-xl md:text-2xl">MØRK</span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-medium" style={{ color: COLORS.textMuted }}>
            <a href="#about" className="hover:text-black">About</a>
            <a href="#services" className="hover:text-black">Cuts</a>
            <a href="#gallery" className="hover:text-black">Work</a>
            <a href="#visit" className="hover:text-black">Visit</a>
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.text }}>
              <motion.span
                animate={{ opacity: isOpen ? [1, 0.35, 1] : 1 }}
                transition={{ duration: 2, repeat: isOpen ? Infinity : 0 }}
                className="inline-block w-2 h-2"
                style={{ backgroundColor: isOpen ? COLORS.open : COLORS.closed }}
              />
              <span>{label}</span>
            </div>
            <a
              href="mailto:book@morkbarber.dk"
              className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold px-3 py-2"
              style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
            >
              Book
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end pt-28 pb-12 md:pb-16 px-6 md:px-10 overflow-hidden">
        <div className="absolute right-0 top-14 bottom-0 w-full md:w-[45%] z-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="w-full h-full object-cover opacity-30 md:opacity-100"
            style={{ filter: 'grayscale(0.7) contrast(1.1)' }}
            loading="eager"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${COLORS.bg} 0%, transparent 40%), linear-gradient(to bottom, transparent 65%, ${COLORS.bg} 100%)`,
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="block w-8 h-px" style={{ backgroundColor: COLORS.accent }} />
            <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: COLORS.text }}>
              Cuts by Rasmus Mørk · Aarhus
            </p>
          </motion.div>

          <HeroTitle />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
          >
            <p className="max-w-md text-base md:text-xl leading-snug font-medium" style={{ color: COLORS.text }}>
              Solo barber. One chair. Fades, classic cuts, beards.
              By appointment only.
            </p>
            <div className="flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold">
              <span>↓</span>
              <span>Scroll</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <ClipperLine />
          <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: COLORS.accent }}>
            About
          </p>
          <h2 style={{ ...display, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9 }} className="text-5xl md:text-7xl mb-10">
            Hej. I'm Rasmus.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-base md:text-lg leading-relaxed">
            <div className="space-y-5">
              <p>
                Eight years cutting. Trained at a shop in Copenhagen, then a year
                in London learning fades the hard way. Opened my own chair in
                Aarhus in 2022.
              </p>
              <p>
                I work alone, so the chair is always yours for the time you book.
                No waiting, no rushing the cut so the next guy can sit down.
              </p>
            </div>
            <div className="space-y-5">
              <p>
                What I'm good at: skin fades, taper fades, classic scissor cuts,
                clean beard work. What I don't do: highlights, perms, kids under
                seven, anything you wouldn't show your grandma.
              </p>
              <p>
                If you're not sure if I'm the right barber for what you want,
                send a photo before you book. I'll tell you straight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card }}>
        <div className="max-w-[1400px] mx-auto">
          <ClipperLine />
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16 items-end">
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: COLORS.accent }}>
                Cuts
              </p>
              <h2 style={{ ...display, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9 }} className="text-5xl md:text-7xl">
                What I do.<br />What it costs.
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              Prices are fixed. No surprises, no upsells at the till.
              All cuts include the wash, the cut itself, and a hot towel finish.
            </p>
          </div>

          <ul style={{ borderTop: `2px solid ${COLORS.text}` }}>
            {services.map((s, i) => (
              <motion.li
                key={s.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-10 py-6 md:py-8"
                style={{ borderBottom: `1px solid ${COLORS.border}` }}
              >
                <span style={{ ...display, fontWeight: 800, letterSpacing: '-0.02em', color: COLORS.text }} className="text-3xl md:text-4xl md:col-span-1 md:w-auto col-span-2 md:col-start-1">
                  {s.name}
                </span>
                <p className="text-sm md:text-base leading-relaxed col-span-2 md:col-span-1 -mt-2 md:mt-0" style={{ color: COLORS.textMuted }}>
                  {s.desc}
                </p>
                <span style={{ ...display, fontWeight: 800 }} className="text-2xl md:text-3xl tabular-nums whitespace-nowrap col-span-2 md:col-span-1 md:text-right">
                  {s.price} <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: COLORS.textMuted }}>kr</span>
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-8 text-xs md:text-sm" style={{ color: COLORS.textMuted }}>
            Cancellation: 12 hours notice. No-shows are charged 50%.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <ClipperLine />
          <div className="flex items-baseline justify-between mb-12 md:mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: COLORS.accent }}>
                Work
              </p>
              <h2 style={{ ...display, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9 }} className="text-5xl md:text-7xl">
                Recent cuts.
              </h2>
            </div>
            <span className="hidden md:block text-xs tracking-[0.2em] uppercase font-semibold" style={{ color: COLORS.textMuted }}>
              More on Instagram
            </span>
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
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'grayscale(0.4) contrast(1.05)' }}
                />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card }}>
        <div className="max-w-[1400px] mx-auto">
          <ClipperLine />
          <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: COLORS.accent }}>
            How it works
          </p>
          <h2 style={{ ...display, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.9 }} className="text-5xl md:text-7xl mb-12 md:mb-16">
            From message to chair.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.no}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="flex items-baseline gap-4 mb-5">
                  <span style={{ ...display, fontWeight: 800, color: COLORS.accent }} className="text-4xl md:text-5xl">
                    {step.no}
                  </span>
                  <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
                </div>
                <h3 style={{ ...display, fontWeight: 700, letterSpacing: '-0.02em' }} className="text-2xl md:text-3xl mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-5">
              <ClipperLine />
              <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: COLORS.accent }}>
                Visit
              </p>
              <h2 style={{ ...display, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 0.85 }} className="text-6xl md:text-8xl mb-10">
                The chair<br />is here.
              </h2>
              <a
                href="mailto:book@morkbarber.dk"
                className="inline-block text-sm md:text-base tracking-[0.25em] uppercase font-bold px-8 py-4 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
              >
                Book a slot
              </a>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: COLORS.textMuted }}>Address</p>
                <p style={{ ...display, fontWeight: 700 }} className="text-2xl md:text-3xl leading-tight">
                  Mejlgade 17, kld.<br />
                  8000 Aarhus C
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: COLORS.textMuted }}>Hours</p>
                <ul className="space-y-1 text-sm md:text-base font-medium" style={{ color: COLORS.text }}>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Wed-Fri</span>
                    <span>10-18</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Sat</span>
                    <span>9-15</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Sun-Tue</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: COLORS.textMuted }}>Email</p>
                <a
                  href="mailto:book@morkbarber.dk"
                  style={{ ...display, fontWeight: 700 }}
                  className="text-2xl md:text-3xl hover:underline"
                >
                  book@morkbarber.dk
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: COLORS.textMuted }}>Instagram</p>
                <a
                  href="#"
                  style={{ ...display, fontWeight: 700 }}
                  className="text-2xl md:text-3xl hover:underline"
                >
                  @mork.barber
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p style={{ ...display, fontWeight: 800, letterSpacing: '0.02em' }} className="text-xl">MØRK</p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Concept site designed & built by{' '}
            <a href="https://sahari.io" className="underline hover:text-black">Sahari</a>
            {' '}· not a real barber
          </p>
        </div>
      </footer>
    </div>
  )
}
