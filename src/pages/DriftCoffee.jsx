import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const COLORS = {
  bg: '#f5efe6',
  text: '#1f1a16',
  textMuted: '#6b5a4d',
  accent: '#94632d',
  accentDark: '#6b4a23',
  border: '#d8cdbb',
  card: '#ece4d4',
  open: '#3d6b3b',
  closed: '#8b3030',
}

const display = { fontFamily: '"Crimson Pro", serif' }
const body = { fontFamily: '"Manrope", sans-serif' }

const HERO_IMAGE = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=2000&q=85'
const INTERIOR_IMAGE = 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1600&q=85'
const POUR_IMAGE = 'https://images.unsplash.com/photo-1559496417-e7f25cb247cd?w=1200&q=85'

const offerings = [
  {
    section: 'Espresso',
    items: ['Espresso', 'Cortado', 'Flat white', 'Latte', 'Cappuccino'],
  },
  {
    section: 'Hand brews',
    items: ['V60', 'Aeropress', 'Today\'s pour-over'],
  },
  {
    section: 'Beans',
    items: ['Single origin · rotating', 'Seasonal blend', 'Decaf'],
  },
  {
    section: 'On the side',
    items: ['Pastry', 'Banana bread', 'Sourdough toast', 'Cold pressed juice'],
  },
]

// Returns { isOpen, label } based on local time
function useOpenStatus() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  // Open Tue–Sun, 7:30 – 17:00. Closed Mondays.
  const day = now.getDay() // 0 = Sun, 1 = Mon
  const hour = now.getHours() + now.getMinutes() / 60
  const isMonday = day === 1
  const inHours = hour >= 7.5 && hour < 17
  const isOpen = !isMonday && inHours
  return {
    isOpen,
    label: isMonday ? 'Closed Mondays' : (isOpen ? 'Open now — until 17:00' : 'Opens at 7:30'),
  }
}

// Drifting coffee beans background
function DriftingBeans() {
  const beans = Array.from({ length: 16 })
  return (
    <>
      <style>{`
        @keyframes bean-drift {
          0%   { transform: translateY(110vh) rotate(0deg); }
          100% { transform: translateY(-30vh) rotate(360deg); }
        }
      `}</style>
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        {beans.map((_, i) => {
          const x = (i * 47 + 13) % 100
          const duration = 18 + (i % 5) * 4
          // Negative delay so beans start mid-cycle and are visible on load
          const delay = -(((i * 7) % 10) / 10) * duration
          const size = 8 + (i % 4) * 4
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}vw`,
                top: 0,
                width: size,
                height: size * 1.4,
                borderRadius: '50%',
                backgroundColor: COLORS.accentDark,
                opacity: 0.18,
                animation: `bean-drift ${duration}s linear ${delay}s infinite`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '10%',
                  bottom: '10%',
                  left: '50%',
                  width: 1,
                  backgroundColor: COLORS.bg,
                  transform: 'translateX(-0.5px)',
                  opacity: 0.6,
                }}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

// Hero title with letter stagger
function HeroTitle() {
  const letters = 'DRIFT'.split('')
  return (
    <h1
      style={{ ...display, fontWeight: 400, lineHeight: 0.85, letterSpacing: '-0.04em', fontSize: 'clamp(5rem, 22vw, 22rem)' }}
      className="flex"
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, opacity: 0, rotate: -3 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.1,
            delay: 0.3 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {l}
        </motion.span>
      ))}
    </h1>
  )
}

// Menu item that animates in like a chalk stroke
function ChalkItem({ children, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-5 py-1.5"
      style={{ color: COLORS.text }}
    >
      <span
        className="absolute left-0 top-1/2 -translate-y-1/2 inline-block"
        style={{
          width: 8,
          height: 1.5,
          backgroundColor: COLORS.accent,
        }}
      />
      {children}
    </motion.li>
  )
}

export default function DriftCoffee() {
  const { isOpen, label } = useOpenStatus()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])

  useEffect(() => {
    document.title = 'DRIFT — Specialty coffee · København'
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = COLORS.bg
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  return (
    <div style={{ ...body, backgroundColor: COLORS.bg, color: COLORS.text }} className="min-h-screen overflow-x-hidden relative">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur" style={{ backgroundColor: 'rgba(245,239,230,0.85)', borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <span style={{ ...display, letterSpacing: '0.05em' }} className="text-lg md:text-xl font-medium">drift</span>
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase" style={{ color: COLORS.textMuted }}>
            <a href="#menu" className="hover:text-[color:var(--accent)]" style={{ '--accent': COLORS.accent }}>Menu</a>
            <a href="#philosophy" className="hover:opacity-100">Philosophy</a>
            <a href="#visit" className="hover:opacity-100">Visit</a>
          </nav>
          <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.textMuted }}>
            <motion.span
              animate={{ opacity: isOpen ? [1, 0.4, 1] : 1 }}
              transition={{ duration: 2, repeat: isOpen ? Infinity : 0 }}
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: isOpen ? COLORS.open : COLORS.closed }}
            />
            <span className="hidden md:inline">{label}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pt-32 pb-12 md:pb-16 px-6 md:px-10 overflow-hidden">
        <DriftingBeans />

        <motion.div
          style={{ y: imageY, opacity: imageOpacity }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 md:w-2/5 h-[60vh] md:h-[80vh] hidden sm:block"
        >
          <img
            src={POUR_IMAGE}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(0.1)' }}
            loading="eager"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to right, ${COLORS.bg} 0%, transparent 30%, transparent 70%, ${COLORS.bg} 100%)` }}
          />
        </motion.div>

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] md:text-sm tracking-[0.35em] uppercase mb-6 md:mb-8"
            style={{ color: COLORS.textMuted }}
          >
            Specialty coffee · København · Est. 2019
          </motion.p>

          <HeroTitle />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8"
          >
            <p className="max-w-md text-base md:text-lg leading-relaxed" style={{ color: COLORS.textMuted, ...display, fontStyle: 'italic', fontWeight: 400 }}>
              Slow mornings. Rotating beans. A bench by the window.
              No pumpkin spice anything.
            </p>
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase" style={{ color: COLORS.textMuted }}>
              <span>↓</span>
              <span>Find your seat</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 md:py-36 px-6 md:px-10 relative" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20 items-end">
            <div className="md:col-span-7">
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
                ¶ On the board
              </p>
              <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-5xl md:text-7xl">
                Today's menu, more<br />or less.
              </h2>
            </div>
            <p className="md:col-span-5 text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>
              Beans rotate. Pastries rotate. Some weekdays the board says different things.
              The fixed parts are below — ask about the rest when you come in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
            {offerings.map((o, sectionIdx) => (
              <motion.div
                key={o.section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
              >
                <h3
                  style={{ ...display, fontWeight: 500, letterSpacing: '-0.01em', color: COLORS.accent }}
                  className="text-xl md:text-2xl mb-5 pb-3"
                >
                  <span style={{ borderBottom: `1.5px solid ${COLORS.accent}`, paddingBottom: '0.6rem' }}>
                    {o.section}
                  </span>
                </h3>
                <ul className="space-y-0 text-base">
                  {o.items.map((item, i) => (
                    <ChalkItem key={item} index={i}>{item}</ChalkItem>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden" style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.card }}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <motion.figure
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 aspect-[4/5] overflow-hidden"
            style={{ backgroundColor: COLORS.border }}
          >
            <img src={INTERIOR_IMAGE} alt="" className="w-full h-full object-cover" loading="lazy" />
          </motion.figure>

          <div className="md:col-span-7">
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
              ¶ Why we're here
            </p>
            <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1 }} className="text-4xl md:text-6xl mb-8">
              Coffee made slowly,<br />
              <em style={{ color: COLORS.accent }}>on purpose.</em>
            </h2>
            <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: COLORS.textMuted }}>
              <p>
                Drift started in 2019 around the idea that a cup of coffee should be the
                slowest part of your morning, not the fastest.
              </p>
              <p>
                We work with two roasters in Scandinavia and rotate beans by season.
                Every cup is pulled by hand — no automation, no shortcuts.
              </p>
              <p>
                You'll find us in a corner of Vesterbro. Two windows, a long shared
                table, and a small bench outside for when the weather lets you sit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-24 md:py-36 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: COLORS.accent }}>
                ¶ Find us
              </p>
              <h2 style={{ ...display, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95 }} className="text-5xl md:text-7xl">
                Come<br />
                <em style={{ color: COLORS.accent }}>by.</em>
              </h2>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Address</p>
                <p style={{ ...display, fontWeight: 400 }} className="text-xl md:text-2xl mb-2 leading-tight">
                  Vesterbrogade 132<br />
                  1620 København V
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Hours</p>
                <ul className="space-y-1 text-sm md:text-base" style={{ color: COLORS.text }}>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Mon</span>
                    <span>Closed</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Tue — Fri</span>
                    <span>7:30 — 17:00</span>
                  </li>
                  <li className="flex justify-between gap-4 max-w-[14rem]">
                    <span style={{ color: COLORS.textMuted }}>Sat — Sun</span>
                    <span>9:00 — 16:00</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Email</p>
                <a
                  href="mailto:hi@driftcoffee.dk"
                  style={{ ...display, fontWeight: 400 }}
                  className="text-xl md:text-2xl hover:underline"
                >
                  hi@driftcoffee.dk
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: COLORS.textMuted }}>Instagram</p>
                <a
                  href="#"
                  style={{ ...display, fontWeight: 400 }}
                  className="text-xl md:text-2xl hover:underline"
                >
                  @drift.coffee
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-6 md:px-10" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p style={{ ...display, fontWeight: 500, letterSpacing: '0.05em' }} className="text-lg">drift</p>
          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            Concept site designed & built by{' '}
            <a href="https://sahari.io" className="underline hover:text-[color:var(--accent)]" style={{ '--accent': COLORS.accent }}>
              Sahari
            </a>
            {' '}· not a real café
          </p>
        </div>
      </footer>
    </div>
  )
}
