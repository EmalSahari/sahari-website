import { Shield, Landmark, Orbit } from 'lucide-react'

// Fallback numbers, shown until /api/yt-stats answers (and on local dev, where
// the function does not run). Keep them as true lower bounds: the live totals
// replace them as soon as they load.
export const YT_FALLBACK = {
  subs: '100K+',
  views: '16M+',
  videos: null,
  channels: '3',
}

// Round down so the figure stays true until the next refresh: 100,880 -> "100K+".
export function formatCount(n) {
  if (n >= 1e6) return `${Math.floor(n / 1e6)}M+`
  if (n >= 1e3) return `${Math.floor(n / 1e3)}K+`
  return `${Math.floor(n / 10) * 10}+`
}

export const fillStats = (text, stats) =>
  text
    .replaceAll('{subs}', stats.subs)
    .replaceAll('{views}', stats.views)
    .replaceAll('{channels}', stats.channels)

// The channels are described by topic only. Names, handles and links stay off
// the site on purpose, so the channels are not tied together in public.
// `key` maps to the yt.niche.<key>.* translation keys.
export const NICHES = [
  {
    key: 'systems',
    Icon: Shield,
    accent: {
      text: 'text-red-400',
      iconBg: 'bg-red-500/15 text-red-400',
      border: 'border-red-500/20',
      glow: 'from-red-950/40',
      glowRgb: '248,113,113',
    },
  },
  {
    key: 'history',
    Icon: Landmark,
    accent: {
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-400',
      border: 'border-amber-500/20',
      glow: 'from-amber-950/40',
      glowRgb: '251,191,36',
    },
  },
  {
    key: 'space',
    Icon: Orbit,
    accent: {
      text: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      border: 'border-indigo-500/20',
      glow: 'from-indigo-950/40',
      glowRgb: '129,140,248',
    },
  },
]

// Brands that have run a sponsored integration in one of the videos, newest first.
export const PAST_SPONSORS = ['World of Warships', 'Supremacy: World War 3']
