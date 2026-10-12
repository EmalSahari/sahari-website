import { Shield, Landmark, Orbit } from 'lucide-react'

// Single source of truth for YouTube numbers. Update these when the stats move;
// every page and translated sentence that uses {subs}, {views}, {channels} or {views28d} follows.
export const YT_STATS = {
  subs: '100K+',
  views: '16M+',
  channels: '3',
  // Rolling 28-day views, from YouTube Studio. Unclassified alone, so a floor for all three.
  views28d: '2.4M+',
}

export const fillStats = (text) =>
  text
    .replaceAll('{subs}', YT_STATS.subs)
    .replaceAll('{views}', YT_STATS.views)
    .replaceAll('{channels}', YT_STATS.channels)
    .replaceAll('{views28d}', YT_STATS.views28d)

// Ordered by size. `key` maps to the yt.channel.<key>.* translation keys.
export const CHANNELS = [
  {
    key: 'unclassified',
    name: 'Unclassified',
    handle: '@UnclassifiedYTT',
    href: 'https://youtube.com/@UnclassifiedYTT',
    subs: '59K+',
    views: '10M+',
    Icon: Shield,
    accent: {
      text: 'text-red-400',
      iconBg: 'bg-red-500/15 text-red-400',
      border: 'border-red-500/20 hover:border-red-400/50',
      glow: 'from-red-950/40',
      glowRgb: '248,113,113',
    },
  },
  {
    key: 'sahari',
    name: 'Sahari',
    handle: '@SahariYT',
    href: 'https://youtube.com/@SahariYT',
    subs: '31K+',
    views: '4M+',
    Icon: Landmark,
    accent: {
      text: 'text-amber-400',
      iconBg: 'bg-amber-500/15 text-amber-400',
      border: 'border-amber-500/20 hover:border-amber-400/50',
      glow: 'from-amber-950/40',
      glowRgb: '251,191,36',
    },
  },
  {
    key: 'supernova',
    name: 'Supernova',
    handle: '@SupernovaYTT',
    href: 'https://youtube.com/@SupernovaYTT',
    subs: '9.9K+',
    views: '1.9M+',
    Icon: Orbit,
    accent: {
      text: 'text-indigo-400',
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      border: 'border-indigo-500/20 hover:border-indigo-400/50',
      glow: 'from-indigo-950/40',
      glowRgb: '129,140,248',
    },
  },
]

// Most-watched videos. View counts are rounded down from a 28-day Studio export,
// so they are a floor for lifetime views and never go stale in the wrong direction.
export const POPULAR_VIDEOS = [
  { id: 'K41m75_OapU', title: 'Every US Army Rank Explained', channel: 'Unclassified', views: '496K+' },
  { id: 'S8la96LpApQ', title: 'Every Prison Uniform Color Explained', channel: 'Unclassified', views: '204K+' },
  { id: 'QlPLtq7c77A', title: 'Every Hospital Wristband Color Explained', channel: 'Unclassified', views: '198K+' },
  { id: 'orpJeKtIUPs', title: 'Every US Army Badge Explained', channel: 'Unclassified', views: '174K+' },
  { id: 'nnxruXJv_Pk', title: 'Every US Combat Decoration Explained', channel: 'Unclassified', views: '142K+' },
  { id: 'Bx8FLAzqf1s', title: 'Every Hospital Emergency Code Explained', channel: 'Unclassified', views: '138K+' },
]

// Unclassified audience, last 28 days (YouTube Studio). `key` maps to yt.audience.<key>.
export const YT_AUDIENCE = [
  { key: 'us', value: '55%' },
  { key: 'male', value: '87%' },
  { key: 'adults', value: '92%' },
  { key: 'tv', value: '50%' },
]
