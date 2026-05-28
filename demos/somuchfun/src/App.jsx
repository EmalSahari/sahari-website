import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ExternalLink, ShoppingBag, MapPin, Calendar, ChevronRight } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const TRACKS = [
  { n: '01', title: 'I Know',                feat: null },
  { n: '02', title: 'Surf',                  feat: null },
  { n: '03', title: 'Hot',                   feat: 'Gunna' },
  { n: '04', title: 'Jumped Out the Window', feat: null },
  { n: '05', title: 'Rocket Launcher',       feat: null },
  { n: '06', title: 'Sup Mate',              feat: 'Future' },
  { n: '07', title: 'Bad Bad Bad',           feat: 'Lil Baby' },
  { n: '08', title: 'Crushed Up',            feat: null },
  { n: '09', title: 'Big Tipper',            feat: null },
  { n: '10', title: 'Ecstasy',               feat: 'Future' },
  { n: '11', title: 'Yea Yea',               feat: 'J. Cole & Young Scooter' },
  { n: '12', title: 'Mannequin Challenge',   feat: null },
  { n: '13', title: 'Take Care',             feat: null },
  { n: '14', title: 'Biggest Alley Oop',    feat: 'Lil Uzi Vert & Quavo' },
  { n: '15', title: 'Lemon',                 feat: 'Gunna' },
  { n: '16', title: 'The London',            feat: 'J. Cole & Travis Scott' },
  { n: '17', title: "Tomorrow 'Til Infinity",feat: null },
  { n: '18', title: 'Original',              feat: 'Gunna & Lil Baby' },
]

const COLORS = ['#A8E847', '#FF2EC1', '#1E90FF', '#FFD700', '#FF6B35', '#B8F']

const TOUR = [
  { date: 'AUG 16', city: 'ATLANTA, GA',        venue: 'State Farm Arena',         sold: true  },
  { date: 'AUG 20', city: 'NEW YORK, NY',       venue: 'Madison Square Garden',    sold: true  },
  { date: 'AUG 24', city: 'LOS ANGELES, CA',    venue: 'Crypto.com Arena',         sold: true  },
  { date: 'SEP 03', city: 'CHICAGO, IL',        venue: 'United Center',            sold: true  },
  { date: 'SEP 07', city: 'HOUSTON, TX',        venue: 'Toyota Center',            sold: false },
  { date: 'SEP 12', city: 'MIAMI, FL',          venue: 'Kaseya Center',            sold: false },
  { date: 'SEP 18', city: 'TORONTO, ON',        venue: 'Scotiabank Arena',         sold: true  },
  { date: 'SEP 25', city: 'LONDON, UK',         venue: 'The O2 Arena',             sold: false },
  { date: 'OCT 02', city: 'PARIS, FR',          venue: 'Accor Arena',              sold: false },
  { date: 'OCT 09', city: 'AMSTERDAM, NL',      venue: 'Ziggo Dome',               sold: false },
]

const MERCH = [
  { name: 'SO MUCH FUN HOODIE',  price: '$85',  color: '#A8E847', textColor: '#000' },
  { name: 'YSL LOGO TEE',        price: '$45',  color: '#FF2EC1', textColor: '#fff' },
  { name: 'SLIME SEASON CAP',    price: '$35',  color: '#000',    textColor: '#A8E847', border: '#A8E847' },
  { name: 'TOUR CREWNECK',       price: '$75',  color: '#1E90FF', textColor: '#fff' },
]

// ─── Components ──────────────────────────────────────────────────────────────

function Marquee() {
  const text = '  SO MUCH FUN  ·  YOUNG THUG  ·  YSL  ·  300 ENTERTAINMENT  ·  2019  ·'
  const repeated = text.repeat(6)
  return (
    <div className="overflow-hidden border-y border-slime/30 py-3 bg-black">
      <div className="animate-marquee text-slime font-display text-sm tracking-widest">
        {repeated}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black noise">
      {/* Background glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-slime/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-pink/10 blur-[100px] pointer-events-none" />

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8">
        <div className="font-display text-slime text-sm tracking-widest">YSL · 300 ENT</div>
        <div className="flex gap-6 text-xs font-body tracking-widest text-white/50 uppercase">
          <a href="#tracks" className="hover:text-slime transition-colors">Tracks</a>
          <a href="#video"  className="hover:text-slime transition-colors">Video</a>
          <a href="#tour"   className="hover:text-slime transition-colors">Tour</a>
          <a href="#merch"  className="hover:text-slime transition-colors">Merch</a>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 py-8 flex-1">
        {/* Left: Title stack */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-white/40 tracking-[0.4em] text-xs uppercase mb-6"
          >
            Young Thug · August 16, 2019
          </motion.p>

          <div className="font-display leading-none">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-outline text-[18vw] lg:text-[14vw] block"
            >
              SO
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slime text-[18vw] lg:text-[14vw] block"
            >
              MUCH
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-outline-white text-[18vw] lg:text-[14vw] block"
            >
              FUN
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="https://open.spotify.com/album/6tkjU4Umpo79wwkgPMV3nZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slime text-black font-body font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors"
            >
              <Play size={14} fill="currentColor" />
              Stream Now
            </a>
            <a
              href="#video"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-body text-sm uppercase tracking-widest hover:border-slime hover:text-slime transition-colors"
            >
              Watch Video
              <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Right: Album art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0 w-72 h-72 lg:w-[420px] lg:h-[420px] mt-12 lg:mt-0 relative animate-float"
        >
          {/* Stylized album cover stand-in */}
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slime/80 via-black to-pink/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-display text-center">
                <div className="text-black/80 text-8xl leading-none">YSL</div>
                <div className="text-white/30 text-2xl tracking-widest mt-2">YOUNG THUG</div>
              </div>
            </div>
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'linear-gradient(#A8E847 1px, transparent 1px), linear-gradient(90deg, #A8E847 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-pink rotate-12" />
            <div className="absolute bottom-4 left-4 w-10 h-10 bg-slime" />
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 bg-slime/20 blur-2xl -z-10 rounded-full" />
        </motion.div>
      </div>

      {/* Bottom label row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 px-8 pb-6 flex items-center gap-4 text-white/20 text-xs font-body tracking-widest uppercase"
      >
        <span>18 Tracks</span>
        <span className="text-slime">·</span>
        <span>YSL Records</span>
        <span className="text-slime">·</span>
        <span>300 Entertainment</span>
        <span className="text-slime">·</span>
        <span>Atlantic Records</span>
      </motion.div>
    </section>
  )
}

function Tracklist() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <section id="tracks" className="bg-black py-24 px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-slime/60 font-body text-xs tracking-[0.4em] uppercase mb-2">Full Tracklist</p>
            <h2 className="font-display text-6xl lg:text-8xl text-outline leading-none">18</h2>
            <h2 className="font-display text-6xl lg:text-8xl text-white leading-none -mt-2">TRACKS</h2>
          </div>
          <div className="text-right text-white/20 text-xs font-body">
            <div>YOUNG THUG</div>
            <div>SO MUCH FUN</div>
            <div>2019</div>
          </div>
        </div>

        {/* Track rows */}
        <div className="divide-y divide-white/5">
          {TRACKS.map((track, i) => {
            const color = COLORS[i % COLORS.length]
            const isHovered = hoveredIdx === i
            return (
              <motion.div
                key={track.n}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="flex items-center gap-6 py-4 cursor-default group transition-all duration-150"
                style={{ backgroundColor: isHovered ? `${color}12` : 'transparent' }}
              >
                <span
                  className="font-display text-4xl w-14 text-right flex-shrink-0 transition-colors duration-150"
                  style={{ color: isHovered ? color : 'rgba(255,255,255,0.08)' }}
                >
                  {track.n}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-body font-semibold text-lg transition-colors duration-150 truncate"
                    style={{ color: isHovered ? color : '#fff' }}
                  >
                    {track.title}
                  </div>
                  {track.feat && (
                    <div className="text-white/30 text-xs font-body uppercase tracking-wider mt-0.5">
                      feat. {track.feat}
                    </div>
                  )}
                </div>
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ borderColor: color }}
                >
                  <Play size={10} fill={color} color={color} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="video" className="bg-black py-24 px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slime/3 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-slime/60 font-body text-xs tracking-[0.4em] uppercase mb-2">Featured Video</p>
          <h2 className="font-display text-5xl lg:text-7xl">
            <span className="text-white">THE </span>
            <span className="text-outline-pink">LONDON</span>
          </h2>
          <p className="text-white/30 font-body text-sm mt-2 tracking-wider">ft. J. Cole & Travis Scott</p>
        </div>

        <div className="relative aspect-video bg-zinc-900 overflow-hidden group">
          {!playing ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slime/20 to-pink/20 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(168,232,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,232,71,0.05) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlaying(true)}
                  className="relative z-10 w-24 h-24 rounded-full bg-slime flex items-center justify-center shadow-lg shadow-slime/40"
                >
                  <Play size={32} fill="#000" color="#000" className="ml-1" />
                </motion.button>
                <div className="absolute bottom-6 left-6 text-white/40 font-body text-xs uppercase tracking-widest">
                  Official Music Video
                </div>
              </div>
            </>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Zo_DmFSxRvk?autoplay=1"
              title="The London"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-slime/40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink/40 pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

function TourDates() {
  return (
    <section id="tour" className="bg-black py-24 px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-slime/60 font-body text-xs tracking-[0.4em] uppercase mb-2">Live Dates</p>
          <h2 className="font-display text-5xl lg:text-7xl">
            <span className="text-outline">SO MUCH</span>
            <br />
            <span className="text-white">FUN TOUR</span>
          </h2>
          <p className="text-white/30 font-body text-sm mt-3 tracking-wider">2019 World Tour</p>
        </div>

        <div className="space-y-1">
          {TOUR.map((show, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 lg:gap-8 py-5 border-b border-white/5 group"
            >
              <span className="font-display text-slime text-sm w-16 flex-shrink-0">{show.date}</span>
              <div className="flex-1 min-w-0">
                <div className="font-body font-semibold text-white group-hover:text-slime transition-colors truncate">
                  {show.city}
                </div>
                <div className="text-white/30 text-xs font-body flex items-center gap-1 mt-0.5">
                  <MapPin size={10} />
                  {show.venue}
                </div>
              </div>
              {show.sold ? (
                <span className="flex-shrink-0 px-3 py-1 text-[10px] font-body font-bold uppercase tracking-widest bg-pink/10 text-pink border border-pink/30">
                  Sold Out
                </span>
              ) : (
                <a
                  href="#"
                  className="flex-shrink-0 px-4 py-1.5 text-[10px] font-body font-bold uppercase tracking-widest bg-slime text-black hover:bg-white transition-colors"
                >
                  Tickets
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Merch() {
  return (
    <section id="merch" className="bg-black py-24 px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-slime/60 font-body text-xs tracking-[0.4em] uppercase mb-2">Official Store</p>
          <h2 className="font-display text-5xl lg:text-7xl">
            <span className="text-white">MERCH</span>
            <span className="text-outline ml-4">DROP</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MERCH.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div
                className="aspect-square flex items-center justify-center relative overflow-hidden mb-3"
                style={{
                  backgroundColor: item.color,
                  border: item.border ? `2px solid ${item.border}` : 'none',
                }}
              >
                {/* Product visual */}
                <div
                  className="font-display text-center px-4 leading-tight"
                  style={{ color: item.textColor }}
                >
                  <div className="text-xl">{item.name.split(' ').slice(0, 2).join('\n')}</div>
                  <ShoppingBag size={28} className="mx-auto mt-3 opacity-60" />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-end p-3">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                    View
                  </span>
                </div>
              </div>
              <div className="font-body">
                <div className="text-white text-sm font-semibold">{item.name}</div>
                <div className="text-slime text-sm font-bold mt-0.5">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black border-t border-slime/20 py-12 px-8 lg:px-16">
      <Marquee />
      <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="font-display text-4xl text-slime leading-none">YOUNG</div>
          <div className="font-display text-4xl text-outline leading-none">THUG</div>
          <div className="text-white/20 font-body text-xs tracking-widest uppercase mt-3">
            YSL Records · 300 Entertainment · 2019
          </div>
        </div>

        <div className="flex flex-col gap-2 text-white/30 text-xs font-body tracking-widest uppercase">
          <a href="https://youngthug.com" target="_blank" rel="noopener noreferrer" className="hover:text-slime transition-colors flex items-center gap-1">
            youngthug.com <ExternalLink size={10} />
          </a>
          <a href="#" className="hover:text-slime transition-colors">Instagram</a>
          <a href="#" className="hover:text-slime transition-colors">Twitter / X</a>
          <a href="#" className="hover:text-slime transition-colors">YouTube</a>
        </div>

        <div className="text-right">
          <div className="text-white/10 font-body text-xs">
            Concept site. Not affiliated with Young Thug or YSL Records.
          </div>
          <div className="text-white/10 font-body text-xs mt-1">
            Design by <a href="https://sahari.io" className="text-slime/40 hover:text-slime transition-colors">sahari.io</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Marquee />
      <Tracklist />
      <VideoSection />
      <TourDates />
      <Merch />
      <Footer />
    </div>
  )
}
