import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Mail, ExternalLink, Play, Music2 } from 'lucide-react'

const SPOTIFY_ARTIST_ID = '37rvQBNRn9rUEgPDPdOlfC'

const platforms = [
  {
    name: 'Spotify',
    href: `https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`,
    bg: 'bg-white/5',
    text: 'text-white',
    border: 'border-white/10',
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/us/artist/chukz/1711455072',
    bg: 'bg-white/5',
    text: 'text-white',
    border: 'border-white/10',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@ChukzJr',
    bg: 'bg-white/5',
    text: 'text-white',
    border: 'border-white/10',
  },
]

const releases = [
  {
    title: 'Skabt Af Pres',
    year: '2026',
    cover: '/chukz/cover-1.png',
    href: 'https://open.spotify.com/album/7nA98gIKgpHZCzBhBR8ckG',
  },
  {
    title: 'HELE LIVET',
    year: '2025',
    cover: '/chukz/cover-3.png',
    href: 'https://open.spotify.com/album/58IQJ3RO3LRmOvkY4YFtIZ',
  },
  {
    title: 'TO OM NATTEN',
    year: '2025',
    cover: '/chukz/cover-2.png',
    href: 'https://open.spotify.com/album/4YugKOIaP4dq24uqXYWAtI',
  },
]

export default function ChukzHub() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex flex-col items-center text-center px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/chukz/hero.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-80"
            style={{ objectPosition: '50% 40%' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
        </div>


        {/* Content — pinned to top so the image shows below */}
        <div className="relative flex-1 flex flex-col items-center justify-start pt-28 pb-10 w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-zinc-400 text-xs font-semibold tracking-[0.4em] uppercase mb-6"
          >
            Officiel Artist
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16vw] md:text-[10rem] font-black tracking-tighter leading-none text-white drop-shadow-2xl"
          >
            CHUKZ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md mx-auto text-zinc-300 text-lg leading-relaxed"
          >
            Ny musik, drops og alt det andet — ét sted.
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

        {/* Scroll indicator — part of flex flow, never overlaps buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative pb-8 flex flex-col items-center gap-2 text-zinc-500 text-xs"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-zinc-500" />
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
          <p className="text-zinc-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Nu spiller</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8">Seneste udgivelser</h2>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
            <iframe
              title="Chukz på Spotify"
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
          <p className="text-zinc-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Diskografi</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10">Udgivelser</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl">
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
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900/60 to-zinc-950 group-hover:border-white/25 transition-colors">
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
          <p className="text-zinc-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Stream</p>
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
          <p className="text-zinc-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Forbind</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-10">Hold kontakten</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Portrait */}
            <div className="md:col-span-1 relative aspect-[3/4] md:aspect-auto rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950">
              <img
                src="/chukz/portrait.png"
                alt="Chukz"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Links */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <a
                href="https://www.instagram.com/chukz.jr/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                  <Instagram size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Instagram</p>
                  <p className="text-white font-semibold">@chukz.jr</p>
                </div>
                <ExternalLink size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="mailto:booking@chukz.com"
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Booking & Presse</p>
                  <p className="text-white font-semibold">booking@chukz.com</p>
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
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-10 md:p-16 text-center"
        >

          <div className="relative">
            <Music2 size={36} className="text-zinc-400 mx-auto mb-5" />
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
              Vær den første til at høre nyt
            </h2>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              Tilmeld dig maillisten. Nye udgivelser, koncerter og merch — før alle andre.
            </p>

            {subscribed ? (
              <p className="text-zinc-300 font-medium">Du er med. Hold øje med din indbakke.</p>
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
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 focus:border-white/40 focus:outline-none text-white placeholder:text-zinc-500"
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
