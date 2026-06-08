import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw, Copy, Check, ArrowLeft } from 'lucide-react'

// -- Seed palettes per vibe -----------------------------------------------
// Each entry: [bg, text, muted, accent, surface]
const SEED_PALETTES = {
  premium: [
    ['#0f0e0d', '#f5f0e8', '#8a8478', '#c2722d', '#1c1c1c'],
    ['#1c1917', '#f5f5f4', '#a8a29e', '#dc2626', '#292524'],
    ['#0c1116', '#e8edf2', '#8b97a5', '#d4af37', '#161d24'],
    ['#1a1a2e', '#f2eee6', '#8a8493', '#e94560', '#252540'],
    ['#0d0d0d', '#e5e5e5', '#737373', '#fb923c', '#1a1a1a'],
    ['#1a1611', '#e8d9bf', '#8a7b65', '#c89858', '#251f17'],
    ['#0f1419', '#e8e3d8', '#7d8590', '#b5894e', '#1a2128'],
    ['#0d1f1c', '#e8e0d3', '#7d8a83', '#c89968', '#152825'],
    ['#1a0d0d', '#f0e6dd', '#8a7868', '#c87856', '#241715'],
    ['#0d0d0f', '#e8e8eb', '#7c7c84', '#9d4edd', '#1a1a1c'],
    ['#0c0c0e', '#ece6dd', '#83796b', '#a8856b', '#181818'],
    ['#13110f', '#ebd9be', '#8c7b62', '#8b7355', '#1d1a17'],
    ['#0a1814', '#dfe8df', '#7a8d83', '#c4a06d', '#10221d'],
    ['#1a1217', '#f0e3dd', '#8a7882', '#d4837c', '#241a20'],
    ['#0d0f1a', '#e8eaf5', '#7c7e94', '#fbbf24', '#161a2a'],
    ['#0e0f10', '#ecebe7', '#7b7c7a', '#84a98c', '#1a1b1c'],
    ['#1a1612', '#ebe2d4', '#86796a', '#b8956a', '#221d18'],
  ],
  calm: [
    ['#f4f1ea', '#1d201d', '#6b6d68', '#7a8870', '#ebe6dc'],
    ['#fafaf7', '#1c1917', '#78716c', '#84cc16', '#f5f5f4'],
    ['#eef0ec', '#1f2937', '#6b7280', '#0891b2', '#dde2dc'],
    ['#f5f1ec', '#292524', '#78716c', '#65a30d', '#e7e2d8'],
    ['#f0ede4', '#2d2a26', '#6b6357', '#a16207', '#e3ddd0'],
    ['#f5f0e7', '#2d2a24', '#7a6f5e', '#7a8870', '#ebe5d8'],
    ['#e8f0eb', '#1f2937', '#6b7d75', '#5b8b6f', '#d8e3dc'],
    ['#f5ede1', '#2b2520', '#7a6e5f', '#9c7c4e', '#ebe1d0'],
    ['#eef1f3', '#1f2937', '#6b7785', '#8b7e9e', '#dde3e8'],
    ['#f0eee8', '#2d2a25', '#776e5e', '#5b7068', '#e5e2d8'],
    ['#f5f0e8', '#252320', '#766d5e', '#8d6e58', '#ebe4d6'],
    ['#e8ebe5', '#1d1f1c', '#6a6e68', '#7e8a72', '#d8ddd2'],
    ['#f3eddf', '#252020', '#7a6e64', '#a08868', '#e9e1d4'],
    ['#eef0eb', '#1f2421', '#6b736d', '#5e7d6f', '#dde3dc'],
    ['#f5f0e2', '#1f1a14', '#7a6f5a', '#a07e4c', '#ebe3cf'],
    ['#eeeae0', '#1a1813', '#736c5c', '#5e6a5e', '#e0dac9'],
    ['#f0eeea', '#1a1817', '#736e69', '#9e7e7e', '#e5e1da'],
  ],
  bold: [
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#fbbf24', '#1a1a1a'],
    ['#fffbeb', '#1c1917', '#78716c', '#dc2626', '#fef3c7'],
    ['#18181b', '#fafafa', '#a1a1aa', '#22d3ee', '#27272a'],
    ['#0f0a19', '#fafafa', '#9ca3af', '#a855f7', '#1e1b2e'],
    ['#fff7ed', '#1c1917', '#78716c', '#f97316', '#fed7aa'],
    ['#0a0a0a', '#fafafa', '#a3a3a3', '#10b981', '#1a1a1a'],
    ['#fef3c7', '#1a1a1a', '#737373', '#dc2626', '#fde68a'],
    ['#0f0f0f', '#fafafa', '#9ca3af', '#ec4899', '#1c1c1c'],
    ['#fef2f2', '#1f1717', '#7a6a6a', '#dc2626', '#fecaca'],
    ['#0a0a14', '#fafafa', '#9ca3af', '#3b82f6', '#15151f'],
    ['#fff7e8', '#1a1410', '#73685c', '#ea580c', '#fce4c0'],
    ['#0a0e0a', '#fafaf2', '#9ca39c', '#84cc16', '#15201a'],
    ['#0a0a0a', '#fefefa', '#a3a3a3', '#facc15', '#1a1a1a'],
    ['#fff1f2', '#1a0e10', '#806a6e', '#e11d48', '#ffe4e6'],
    ['#0d0a14', '#fafafa', '#a3a3b3', '#6366f1', '#1a1822'],
    ['#0a0a0a', '#fafaeb', '#a3a38a', '#f59e0b', '#1a1a14'],
    ['#1a0a0a', '#fafafa', '#a3a3a3', '#fbbf24', '#250f0f'],
  ],
  warm: [
    ['#ede4d0', '#0a0a0a', '#6b614e', '#b46a1f', '#e0d4b8'],
    ['#f5efe6', '#1f1a16', '#6b5a4d', '#94632d', '#ece4d4'],
    ['#fbf3e4', '#1c1311', '#7a6450', '#a04621', '#f3e6cf'],
    ['#f0e6d2', '#2d1f15', '#7a5d40', '#c2410c', '#e3d4b5'],
    ['#faf4ea', '#1a1410', '#6b5847', '#854d0e', '#f0e6d5'],
    ['#f5ebd6', '#1f1a14', '#7a6e58', '#aa6228', '#ebe0c4'],
    ['#f5ead3', '#211712', '#7d685a', '#8c4a2b', '#ebdfc4'],
    ['#f7eedc', '#1a1612', '#766b58', '#8d4f1a', '#ede3cd'],
    ['#f0e3c8', '#221912', '#7e6e58', '#9c5e2a', '#e5d6b5'],
    ['#fbf2dc', '#1d1813', '#82715a', '#a25a25', '#f0e6c8'],
    ['#f4e8ce', '#1f1a14', '#7a6c56', '#92571f', '#e8dabb'],
    ['#f8ecd4', '#1c1610', '#7e6e58', '#a76c3a', '#eddfc1'],
    ['#f0e3cc', '#2b1f14', '#7d6c56', '#b8773a', '#e5d6b8'],
    ['#f7eed8', '#1a1410', '#7c6d57', '#9c5226', '#ede1c5'],
    ['#f0e5cf', '#251a12', '#776852', '#7e4524', '#e5d6b6'],
    ['#fbf2d8', '#1a1410', '#7c6c54', '#aa6c30', '#f0e4c0'],
    ['#f5ead0', '#1f1611', '#776854', '#b06f30', '#ebdfb8'],
  ],
  modern: [
    ['#fafafa', '#0a0a0a', '#737373', '#3b82f6', '#f5f5f5'],
    ['#ffffff', '#171717', '#737373', '#10b981', '#fafafa'],
    ['#f8fafc', '#0f172a', '#64748b', '#6366f1', '#e2e8f0'],
    ['#fafafa', '#171717', '#737373', '#ec4899', '#f5f5f5'],
    ['#ffffff', '#0f172a', '#64748b', '#0ea5e9', '#f1f5f9'],
    ['#fafafa', '#0a0a0a', '#737373', '#22c55e', '#f5f5f5'],
    ['#fafafa', '#171717', '#737373', '#f59e0b', '#f5f5f5'],
    ['#f1f5f9', '#0f172a', '#64748b', '#a855f7', '#e2e8f0'],
    ['#ffffff', '#171717', '#737373', '#14b8a6', '#fafafa'],
    ['#fafafa', '#0a0a0a', '#737373', '#f43f5e', '#f5f5f5'],
    ['#f8f9fa', '#1a1a1a', '#6c757d', '#4361ee', '#e9ecef'],
    ['#fafafa', '#171717', '#737373', '#06b6d4', '#f5f5f5'],
    ['#ffffff', '#0a0a0a', '#737373', '#84cc16', '#fafafa'],
    ['#f1f5f9', '#0f172a', '#64748b', '#fb7185', '#e2e8f0'],
    ['#f5f5f4', '#1c1917', '#78716c', '#3b82f6', '#e7e5e4'],
    ['#fafafa', '#0a0a0a', '#737373', '#0d9488', '#f5f5f5'],
    ['#ffffff', '#171717', '#737373', '#7c3aed', '#fafafa'],
  ],
  editorial: [
    ['#0a0a0a', '#f5f0e8', '#8a8478', '#8b1a1a', '#1c1c1c'],
    ['#f5efe6', '#1f1a16', '#6b5a4d', '#0f3d2e', '#ece4d4'],
    ['#1c1917', '#f5f5f4', '#a8a29e', '#a16207', '#292524'],
    ['#f7f3ed', '#1a1614', '#736559', '#5b3a1a', '#ebe5d8'],
    ['#0f0d0b', '#ede5d6', '#857b6e', '#d4af37', '#1a1714'],
    ['#fafaf5', '#1c1917', '#78716c', '#7c2d12', '#f5f5f4'],
    ['#1a1614', '#f0e5d2', '#867866', '#8b6f47', '#251f1a'],
    ['#f5f0e6', '#1a1411', '#7a6c5e', '#1e3a5f', '#ebe2d2'],
    ['#0a0a0a', '#ebe1cd', '#84775f', '#7a8f5b', '#1a1a1a'],
    ['#f0e8d4', '#1a1410', '#7a6e58', '#8b1a1a', '#e5dbc0'],
    ['#0d0c0a', '#e5dbc0', '#7d7361', '#7b5a30', '#1a1916'],
    ['#f3eddf', '#19140e', '#776e5c', '#0f4f4a', '#e8e1cd'],
    ['#1c1815', '#ebe0c5', '#8a7d63', '#b96929', '#262017'],
    ['#f7f0e1', '#1a1410', '#7c6e56', '#4a2c2a', '#ede3d0'],
    ['#0a0a0a', '#ecdfc8', '#857a64', '#a87236', '#1a1a1a'],
    ['#1c1612', '#e8d9bf', '#8b7d65', '#c4a06d', '#251f17'],
    ['#f3ead1', '#1c1612', '#7c6e54', '#a04621', '#e9dfc0'],
  ],
}

const FONT_PAIRS = [
  // Editorial / serif display + clean body
  { display: 'Fraunces', body: 'DM Sans', vibes: ['editorial', 'premium', 'warm'] },
  { display: 'Fraunces', body: 'Manrope', vibes: ['editorial', 'premium', 'calm'] },
  { display: 'Crimson Pro', body: 'Manrope', vibes: ['warm', 'calm', 'editorial'] },
  { display: 'Crimson Pro', body: 'Inter Tight', vibes: ['warm', 'editorial'] },
  { display: 'Playfair Display', body: 'Karla', vibes: ['premium', 'editorial'] },
  { display: 'Playfair Display', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'DM Serif Display', body: 'DM Sans', vibes: ['editorial', 'warm', 'premium'] },
  { display: 'Cormorant Garamond', body: 'Karla', vibes: ['premium', 'editorial'] },
  { display: 'Instrument Serif', body: 'Inter Tight', vibes: ['editorial', 'premium'] },
  { display: 'Spectral', body: 'Karla', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'EB Garamond', body: 'Inter Tight', vibes: ['premium', 'editorial'] },
  { display: 'Libre Caslon Text', body: 'Karla', vibes: ['premium', 'editorial', 'calm'] },
  { display: 'Cardo', body: 'Outfit', vibes: ['warm', 'editorial', 'calm'] },
  { display: 'Domine', body: 'Karla', vibes: ['warm', 'editorial'] },
  { display: 'Lora', body: 'Manrope', vibes: ['warm', 'calm'] },
  { display: 'Lora', body: 'Karla', vibes: ['warm', 'calm'] },
  { display: 'Source Serif 4', body: 'Source Sans 3', vibes: ['editorial', 'calm', 'modern'] },

  // Bold display
  { display: 'Big Shoulders Display', body: 'Manrope', vibes: ['bold', 'modern'] },
  { display: 'Big Shoulders Display', body: 'Inter Tight', vibes: ['bold', 'modern'] },
  { display: 'Archivo Black', body: 'Archivo', vibes: ['bold', 'modern'] },
  { display: 'Anton', body: 'Karla', vibes: ['bold', 'editorial'] },
  { display: 'Bebas Neue', body: 'Inter Tight', vibes: ['bold', 'modern'] },
  { display: 'Oswald', body: 'Open Sans', vibes: ['bold', 'modern'] },

  // Modern sans-only
  { display: 'Bricolage Grotesque', body: 'Manrope', vibes: ['modern', 'calm', 'bold'] },
  { display: 'Outfit', body: 'Inter Tight', vibes: ['modern', 'calm'] },
  { display: 'Plus Jakarta Sans', body: 'Plus Jakarta Sans', vibes: ['modern', 'bold'] },
  { display: 'Sora', body: 'Sora', vibes: ['modern', 'calm'] },
  { display: 'Hanken Grotesk', body: 'Hanken Grotesk', vibes: ['modern', 'calm', 'bold'] },
  { display: 'Work Sans', body: 'Work Sans', vibes: ['modern', 'calm'] },
  { display: 'Space Grotesk', body: 'Inter Tight', vibes: ['modern', 'bold'] },
]

const VIBES = [
  { id: 'any', label: 'Any' },
  { id: 'premium', label: 'Premium' },
  { id: 'calm', label: 'Calm' },
  { id: 'bold', label: 'Bold' },
  { id: 'warm', label: 'Warm' },
  { id: 'modern', label: 'Modern' },
  { id: 'editorial', label: 'Editorial' },
]

const VIBE_IDS = VIBES.filter((v) => v.id !== 'any').map((v) => v.id)

function resolveVibe(selectedVibe) {
  if (selectedVibe === 'any') {
    return VIBE_IDS[Math.floor(Math.random() * VIBE_IDS.length)]
  }
  return selectedVibe
}

// -- Helpers --------------------------------------------------------------
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  const l = (max + min) / 2
  if (max === min) { h = s = 0 }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break
      case g: h = ((b - r) / d + 2) * 60; break
      case b: h = ((r - g) / d + 4) * 60; break
      default: h = 0
    }
  }
  return [h, s * 100, l * 100]
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function jitter(hex, range = { h: 4, s: 4, l: 2 }) {
  const [h, s, l] = hexToHsl(hex)
  const newH = h + (Math.random() * 2 - 1) * range.h
  const newS = s + (Math.random() * 2 - 1) * range.s
  const newL = l + (Math.random() * 2 - 1) * range.l
  return hslToHex(newH, newS, newL)
}

function generatePalette(vibe) {
  const actualVibe = resolveVibe(vibe)
  const seeds = SEED_PALETTES[actualVibe]
  const seed = seeds[Math.floor(Math.random() * seeds.length)]
  return seed.map((hex, i) => {
    // Slightly looser jitter than before so the same seed produces more
    // visibly different results between shuffles.
    const range = i < 2 ? { h: 3, s: 4, l: 2 } : { h: 10, s: 12, l: 5 }
    return jitter(hex, range)
  })
}

function pickFontPair(vibe) {
  if (vibe === 'any') {
    return FONT_PAIRS[Math.floor(Math.random() * FONT_PAIRS.length)]
  }
  const filtered = FONT_PAIRS.filter((p) => p.vibes.includes(vibe))
  const pool = filtered.length ? filtered : FONT_PAIRS
  return pool[Math.floor(Math.random() * pool.length)]
}

function getContrastColor(bg) {
  const [, , l] = hexToHsl(bg)
  return l > 50 ? '#000000' : '#ffffff'
}

export default function BrandKit() {
  const [vibe, setVibe] = useState('any')
  const [palette, setPalette] = useState(() => generatePalette('any'))
  const [fontPair, setFontPair] = useState(() => pickFontPair('any'))
  const [copied, setCopied] = useState(false)

  const regenerate = useCallback(() => {
    setPalette(generatePalette(vibe))
    setFontPair(pickFontPair(vibe))
  }, [vibe])

  useEffect(() => {
    setPalette(generatePalette(vibe))
    setFontPair(pickFontPair(vibe))
  }, [vibe])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        regenerate()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [regenerate])

  useEffect(() => {
    const id = 'brand-kit-fonts'
    let link = document.getElementById(id)
    if (!link) {
      link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
    const displayParam = fontPair.display.replace(/\s+/g, '+')
    const bodyParam = fontPair.body.replace(/\s+/g, '+')
    const sameFont = fontPair.display === fontPair.body
    link.href = sameFont
      ? `https://fonts.googleapis.com/css2?family=${displayParam}:wght@400;500;600;700;800&display=swap`
      : `https://fonts.googleapis.com/css2?family=${displayParam}:wght@400;500;600;700;800&family=${bodyParam}:wght@400;500;600;700&display=swap`
  }, [fontPair])

  useEffect(() => {
    document.title = 'Brand Kit Generator · Sahari Tools'
  }, [])

  const copyCSS = () => {
    const css = `:root {
  --color-bg: ${palette[0]};
  --color-text: ${palette[1]};
  --color-muted: ${palette[2]};
  --color-accent: ${palette[3]};
  --color-surface: ${palette[4]};
  --font-display: "${fontPair.display}", serif;
  --font-body: "${fontPair.body}", sans-serif;
}`
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const [bg, text, muted, accent, surface] = palette
  const buttonTextColor = getContrastColor(accent)

  const swatches = [
    { label: 'Background', hex: palette[0] },
    { label: 'Text', hex: palette[1] },
    { label: 'Muted', hex: palette[2] },
    { label: 'Accent', hex: palette[3] },
    { label: 'Surface', hex: palette[4] },
  ]

  return (
    <div className="h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col overflow-hidden" style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Top bar */}
      <header className="border-b border-white/5 backdrop-blur bg-[#0a0a0a]/85 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs md:text-sm">
            <ArrowLeft size={14} />
            <span>Sahari</span>
          </Link>
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-amber-400 font-semibold">
            Brand Kit Generator
          </span>
          <span className="hidden md:block text-xs text-zinc-500">
            <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">space</kbd> to shuffle
          </span>
        </div>
      </header>

      {/* Vibe + actions row */}
      <div className="border-b border-white/5 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {VIBES.map((v) => (
              <button
                key={v.id}
                onClick={() => setVibe(v.id)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  vibe === v.id
                    ? 'bg-amber-400 text-black'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={regenerate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded-lg text-xs md:text-sm font-medium hover:bg-zinc-200 transition-all"
            >
              <RefreshCw size={12} />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <button
              onClick={copyCSS}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-zinc-200 border border-white/10 rounded-lg text-xs md:text-sm font-medium hover:bg-white/10 transition-all"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main split */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_360px] overflow-hidden">
        {/* Preview */}
        <motion.div
          key={`${vibe}-${palette[0]}-${fontPair.display}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-y-auto"
          style={{ backgroundColor: bg, color: text }}
        >
          <div className="p-6 md:p-10 lg:p-12 h-full flex flex-col">
            {/* Mini "navbar" */}
            <div
              className="flex items-center justify-between mb-10 md:mb-14"
              style={{ fontFamily: `"${fontPair.body}", sans-serif` }}
            >
              <span
                style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 700 }}
                className="text-base md:text-lg tracking-tight"
              >
                Your Brand
              </span>
              <nav className="hidden sm:flex items-center gap-5 text-[10px] tracking-widest uppercase" style={{ color: muted }}>
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
              </nav>
              <span
                className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5 rounded-md"
                style={{ backgroundColor: accent, color: buttonTextColor }}
              >
                Book
              </span>
            </div>

            {/* Hero */}
            <div className="max-w-2xl flex-1">
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ color: accent, fontFamily: `"${fontPair.body}", sans-serif`, fontWeight: 600 }}
              >
                ¶ A real layout
              </p>
              <h2
                style={{
                  fontFamily: `"${fontPair.display}", serif`,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                }}
                className="text-4xl md:text-6xl lg:text-7xl mb-5"
              >
                Made by hand,<br />
                <span style={{ color: accent, fontStyle: 'italic', fontWeight: 400 }}>for real.</span>
              </h2>
              <p
                style={{ color: muted, fontFamily: `"${fontPair.body}", sans-serif` }}
                className="text-sm md:text-base leading-relaxed mb-6 max-w-lg"
              >
                This is how your palette and typography look together on a
                real page. Hit space to try another combination, or pick a
                different vibe above.
              </p>
              <div className="flex flex-wrap items-center gap-3" style={{ fontFamily: `"${fontPair.body}", sans-serif` }}>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: accent, color: buttonTextColor }}
                >
                  Primary action
                  <ArrowRight size={13} />
                </button>
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border"
                  style={{ borderColor: muted, color: text }}
                >
                  Secondary
                </button>
              </div>
            </div>

            {/* Surface sample at the bottom */}
            <div
              className="mt-8 p-5 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: surface }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: accent, color: buttonTextColor }}
              >
                01
              </div>
              <div>
                <p
                  style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 600 }}
                  className="text-base md:text-lg leading-tight"
                >
                  Surface card
                </p>
                <p
                  style={{ color: muted, fontFamily: `"${fontPair.body}", sans-serif` }}
                  className="text-xs md:text-sm"
                >
                  This is how a card or callout looks on this palette.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right column: specs */}
        <aside className="border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0d0d0d] overflow-y-auto">
          <div className="p-5 md:p-6 space-y-6">
            {/* Palette */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-3 font-semibold">
                Palette
              </p>
              <div className="space-y-2">
                {swatches.map((swatch) => (
                  <button
                    key={swatch.label}
                    onClick={() => navigator.clipboard.writeText(swatch.hex)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Click to copy"
                  >
                    <div
                      className="w-9 h-9 rounded-md border border-white/10 flex-shrink-0"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="flex-1 flex items-baseline justify-between min-w-0">
                      <span className="text-xs text-zinc-400">{swatch.label}</span>
                      <span className="text-xs font-mono text-zinc-500 tabular-nums group-hover:text-zinc-300">
                        {swatch.hex}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-400 mb-3 font-semibold">
                Typography
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Display</p>
                  <p
                    className="text-xl text-white leading-tight truncate"
                    style={{ fontFamily: `"${fontPair.display}", serif`, fontWeight: 700 }}
                  >
                    {fontPair.display}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Body</p>
                  <p
                    className="text-base text-white truncate"
                    style={{ fontFamily: `"${fontPair.body}", sans-serif` }}
                  >
                    {fontPair.body}
                  </p>
                </div>
                <a
                  href={`https://fonts.google.com/?query=${encodeURIComponent(fontPair.display)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-xs transition-colors"
                >
                  Find on Google Fonts
                  <ArrowRight size={11} />
                </a>
              </div>
            </section>

            {/* Sahari CTA */}
            <section className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4">
              <p
                className="text-sm font-semibold text-white mb-2 leading-snug"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Like the vibe? I can build a real site with it.
              </p>
              <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
                Sahari builds custom websites from DKK 4,995.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-zinc-200 text-black font-medium rounded-lg text-xs transition-all"
              >
                See pricing
                <ArrowRight size={12} />
              </Link>
            </section>
          </div>
        </aside>
      </div>
    </div>
  )
}
