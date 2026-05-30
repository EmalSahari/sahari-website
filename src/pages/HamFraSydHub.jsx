import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, ExternalLink, Play, Music2 } from 'lucide-react'

const SPOTIFY_ARTIST_ID = '142bVo1OspxTJbxwyawU5h'

const platforms = [
  {
    name: 'Spotify',
    href: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
    bg: 'bg-[#1DB954]/10',
    text: 'text-[#1DB954]',
    border: 'border-[#1DB954]/30',
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/dk/artist/ham-fra-syd/1489584760',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCxrjdPDb8GLbt7_5NTe1R9A',
    bg: 'bg-white/5',
    text: 'text-white',
    border: 'border-white/10',
  },
]

const releases = [
  {
    title: 'KTK',
    year: '2021',
    cover: '/hamfrasyd/cover-1.png',
    href: 'https://open.spotify.com/album/0rwvBdhO09iJ73IA493pgm',
  },
  {
    title: 'Narnia',
    year: '2023',
    cover: '/hamfrasyd/cover-2.png',
    href: 'https://open.spotify.com/album/5032mDWdcMx0FmEJViNijl',
  },
  {
    title: 'Offside',
    year: '2025',
    cover: '/hamfrasyd/cover-3.png',
    href: 'https://open.spotify.com/album/3W8d8UncswlwSJ82td84Ni',
  },
  {
    title: 'Money Talks',
    year: '2024',
    cover: '/hamfrasyd/cover-4.png',
    href: 'https://open.spotify.com/album/3tPZCAN5x9qk2KIwjqfyPN',
  },
]

export default function HamFraSydHub() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center text-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hamfrasyd/hero.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-70"
            style={{ objectPosition: '50% 30%' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black" />
        </div>

        {/* Gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-red-800/10 rounded-full blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col items-center justify-start pt-28 pb-10 w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-red-500 text-xs font-semibold tracking-[0.4em] uppercase mb-6"
          >
            Officiel Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] md:text-[8rem] font-black tracking-tighter leading-none text-white drop-shadow-2xl uppercase"
          >
            HAM fra Syd
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md mx-auto text-zinc-400 text-lg leading-relaxed"
          >
            Musik, drops og alt det andet — ét sted.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#listen"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-colors"
            >
              <Play size={16} className="fill-black" />
              Lyt nu
            </a>
            <a
              href="#connect"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/30 hover:border-white/60 text-white font-medium rounded-full backdrop-blur-sm bg-black/20 transition-colors"
            >
              Følg
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative pb-8 flex flex-col items-center gap-2 text-zinc-600 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-600" />
          scroll
        </motion.div>
      </section>

      {/* Latest — Spotify embed */}
      <section id="listen" className="max-w-5xl mx-auto px-6 py-24 scroll-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-red-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Nu spiller</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Seneste udgivelser</h2>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
            <iframe
              title="HAM fra Syd på Spotify"
              src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="420"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Releases */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-red-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Diskografi</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10">Udgivelser</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {releases.map((r, i) => (
              <motion.a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900 group-hover:border-red-800/50 transition-colors">
                  <img
                    src={r.cover}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                      <Play size={16} className="fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-white font-semibold truncate">{r.title}</h3>
                  <span className="text-zinc-500 text-xs flex-shrink-0">{r.year}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Listen on — platforms */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-red-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Stream</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Lyt overalt</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {platforms.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`group flex items-center justify-between gap-3 px-5 py-4 rounded-xl border ${p.bg} ${p.border} hover:bg-white/10 transition-all`}
              >
                <span className={`font-semibold ${p.text}`}>{p.name}</span>
                <ExternalLink size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Connect */}
      <section id="connect" className="max-w-6xl mx-auto px-6 py-12 scroll-mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-red-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Forbind</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10">Hold kontakten</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Portrait */}
            <div className="md:col-span-1 relative aspect-[3/4] md:aspect-auto rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <img
                src="/hamfrasyd/portrait.png"
                alt="HAM fra Syd"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Links */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <a
                href="https://www.instagram.com/ham_fra_syd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 hover:border-red-800/50 bg-white/5 hover:bg-white/8 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                  <Instagram size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <p className="text-white font-semibold">@ham_fra_syd</p>
                </div>
                <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="mailto:booking@hamfrasyd.dk"
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 hover:border-red-800/50 bg-white/5 hover:bg-white/8 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Booking & Presse</p>
                  <p className="text-white font-semibold">booking@hamfrasyd.dk</p>
                </div>
                <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mailing list */}
      <section className="max-w-5xl mx-auto px-6 py-12 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-red-900/30 bg-gradient-to-br from-red-950/30 via-black to-zinc-900/30 p-10 md:p-16 text-center"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <Music2 size={36} className="text-red-500 mx-auto mb-5" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
              Vær den første til at høre nyt
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Tilmeld dig maillisten. Nye udgivelser, koncerter og merch — før alle andre.
            </p>

            {subscribed ? (
              <p className="text-red-400 font-medium">Du er med. Hold øje med din indbakke.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email) setSubscribed(true)
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 focus:border-red-700/50 focus:outline-none text-white placeholder:text-zinc-500"
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-100 transition-colors"
                >
                  Tilmeld
                </button>
              </form>
            )}
          </div>
        </motion.div>

        <p className="text-center text-zinc-600 text-xs mt-12">
          Concept-side af{' '}
          <a href="/" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4">
            Sahari
          </a>
        </p>
      </section>
    </div>
  )
}
