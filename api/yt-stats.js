// GET /api/yt-stats -> combined YouTube totals for the channels in YT_CHANNELS.
//
// Responds with totals only, never channel names or ids, so the public
// response does not tie the channels together. The channel list lives in an
// environment variable for the same reason: the repository is public.
//
// Env (Vercel -> Settings -> Environment Variables):
//   YOUTUBE_API_KEY  YouTube Data API v3 key
//   YT_CHANNELS      comma-separated handles or channel ids, e.g. "@one,@two,UCxxxx"

const API = 'https://www.googleapis.com/youtube/v3/channels'

async function fetchChannelStats(ref, key) {
  const params = new URLSearchParams({ part: 'statistics', key })
  if (ref.startsWith('UC')) params.set('id', ref)
  else params.set('forHandle', ref.startsWith('@') ? ref : `@${ref}`)

  const res = await fetch(`${API}?${params}`)
  if (!res.ok) throw new Error(`YouTube API responded ${res.status}`)
  const data = await res.json()
  const stats = data.items?.[0]?.statistics
  if (!stats) throw new Error('Channel not found')
  return stats
}

export default async function handler(req, res) {
  const key = process.env.YOUTUBE_API_KEY
  const refs = (process.env.YT_CHANNELS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  if (!key || refs.length === 0) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(503).json({ error: 'not configured' })
  }

  try {
    const all = await Promise.all(refs.map((ref) => fetchChannelStats(ref, key)))
    const sum = (field) => all.reduce((total, s) => total + Number(s[field] || 0), 0)

    // Each refresh costs one API unit per channel out of 10,000 a day.
    // Cache at the edge for 12 hours and keep serving the old copy while it refreshes.
    res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate=86400')
    return res.status(200).json({
      subs: sum('subscriberCount'),
      views: sum('viewCount'),
      channels: all.length,
    })
  } catch {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(502).json({ error: 'upstream' })
  }
}
